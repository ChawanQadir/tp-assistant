/**
 * TP ORCA AI — Framework Extraction Script
 *
 * Reads IRC Section 482 Regulations PDF, splits it into provision-level chunks,
 * extracts structured data via Claude, and writes a YAML staging file for
 * human review. Does NOT write to lib/frameworks/ directly.
 *
 * Required dependencies (not yet in package.json):
 *   npm install --save-dev @anthropic-ai/sdk pdf-parse js-yaml ts-node
 *   npm install --save-dev @types/pdf-parse @types/js-yaml @types/node
 *
 * Usage:
 *   npx ts-node --project tsconfig.json scripts/extract-framework.ts
 *
 * Output:
 *   lib/frameworks/staging/irc-482.staging.yaml
 *
 * After running: open the staging file, verify each provision against the PDF,
 * set _review.status and _review.citationVerified, then run promote-framework.ts.
 */

import fs from "fs";
import path from "path";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PagedText {
  page: number;
  text: string;
}

interface SectionTarget {
  sectionId: string;
  baseCitation: string;
  baseId: string;
  defaultWeight: number;
}

interface SectionText extends SectionTarget {
  markedText: string;
}

interface TextChunk {
  id: string;
  citation: string;
  sectionId: string;
  rawText: string;
  pageStart: number;
  pageEnd: number;
}

interface ReviewBlock {
  status: "pending" | "approved" | "rejected";
  reviewedBy: string | null;
  reviewedAt: string | null;
  citationVerified: boolean;
  notes: string;
}

interface StagingSource {
  pageStart: number;
  pageEnd: number;
  sectionId: string;
  rawText: string;
}

interface StagingProvision {
  _review: ReviewBlock;
  source: StagingSource;
  id: string;
  frameworkId: string;
  citation: string;
  title: string;
  text: string;
  provisionType: string;
  categories: string[];
  transactionTypes: string[];
  jurisdictions: string[];
  riskTypes: string[];
  conceptTags: string[];
  jurisdictionAuthority: string;
  crossReferences: string[];
  orcaMapping: {
    riskTriggers: string[];
    controlImplications: string[];
    testingApproaches: string[];
    evidenceTypes: string[];
  };
  penaltyExposure: {
    applies: boolean;
    level: string | null;
    trigger: string;
    penaltyRate: string;
  };
  weight: number;
}

interface StagingDocument {
  _meta: {
    frameworkId: string;
    frameworkName: string;
    version: string;
    effectiveDate: string;
    extractedAt: string;
    pdfSource: string;
    totalExtracted: number;
    totalApproved: number;
    totalPending: number;
    totalRejected: number;
  };
  provisions: StagingProvision[];
}

// ─── Config ───────────────────────────────────────────────────────────────────

const ROOT = path.resolve(process.cwd());

const CONFIG = {
  pdfPath: path.join(
    ROOT,
    "Frameworks/Tier 01 - Mandatory/IRC Section 482 Regulations.pdf"
  ),
  outputDir: path.join(ROOT, "lib/frameworks/staging"),
  outputFile: "irc-482.staging.yaml",
  framework: {
    id: "irc-482",
    name: "IRC Section 482 Regulations",
    version: "26 CFR Part 1 (2020 revision)",
    effectiveDate: "2020-01-01",
    jurisdictionAuthority: "domestic" as const,
  },
  targetSections: [
    { sectionId: "1.482-1", baseCitation: "§ 1.482-1", baseId: "irc482-1",        defaultWeight: 10 },
    { sectionId: "1.482-2", baseCitation: "§ 1.482-2", baseId: "irc482-2",        defaultWeight: 8  },
    { sectionId: "1.482-3", baseCitation: "§ 1.482-3", baseId: "irc482-3",        defaultWeight: 9  },
    { sectionId: "1.482-4", baseCitation: "§ 1.482-4", baseId: "irc482-4",        defaultWeight: 9  },
    { sectionId: "1.482-5", baseCitation: "§ 1.482-5", baseId: "irc482-5",        defaultWeight: 8  },
    { sectionId: "1.482-6", baseCitation: "§ 1.482-6", baseId: "irc482-6",        defaultWeight: 7  },
    { sectionId: "1.482-9", baseCitation: "§ 1.482-9", baseId: "irc482-9",        defaultWeight: 8  },
    { sectionId: "1.6662-6", baseCitation: "§ 1.6662-6", baseId: "irc482-6662-6", defaultWeight: 9  },
  ] as SectionTarget[],
  wordCeiling: 600,
  rateLimitMs: 1200,
};

// ─── Chunking Patterns ────────────────────────────────────────────────────────
// Applied in order. Each level is tried only when the current text exceeds
// the word ceiling. Lookahead splits preserve the delimiter in the right part.
//
// Patterns match only at the start of an indented line to avoid false positives
// from mid-sentence cross-references like "…under paragraph (b)(1) of this section…"

const SPLIT_LEVELS: Array<{ name: string; charClass: string }> = [
  { name: "subsection",   charClass: "[a-z]" },
  { name: "paragraph",    charClass: "[0-9]+" },
  { name: "subparagraph", charClass: "ii?i?|iv|vi?i?|ix|x[ivx]*" },
  { name: "clause",       charClass: "[A-Z]" },
];

// ─── Minimum-Indentation Splitter ─────────────────────────────────────────────
// Finds all markers matching charClass at the start of indented lines, then
// returns split points only at the minimum (outermost) indentation level.
// Labels are deduplicated — only the first occurrence of each label at the
// minimum indentation is kept. This prevents roman numeral (i) from being
// confused with alphabetic subsection (i) at a different indentation depth.

interface SplitPoint {
  label: string;
  start: number; // index of the \n immediately before (label)
}

function splitAtMinIndent(text: string, charClass: string): SplitPoint[] {
  const re = new RegExp(`\n([ \t]*)\\((${charClass})\\)[ \t]`, "g");
  const allMatches: { indent: number; label: string; start: number }[] = [];

  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    allMatches.push({ indent: m[1].length, label: m[2], start: m.index });
  }

  if (allMatches.length === 0) return [];

  const minIndent = Math.min(...allMatches.map((x) => x.indent));

  const seenLabels = new Set<string>();
  const splitPoints: SplitPoint[] = [];
  for (const match of allMatches) {
    if (match.indent === minIndent && !seenLabels.has(match.label)) {
      seenLabels.add(match.label);
      splitPoints.push({ label: match.label, start: match.start });
    }
  }

  return splitPoints;
}

// ─── Step 1: Per-Page Text Extraction ─────────────────────────────────────────

async function extractTextByPage(pdfPath: string): Promise<PagedText[]> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require("pdf-parse");
  const pages: PagedText[] = [];
  let pageIndex = 0;

  const options = {
    pagerender: async function (pageData: {
      getTextContent: (opts?: object) => Promise<{
        items: Array<{ str: string; transform: number[] }>;
      }>;
    }) {
      pageIndex++;
      const currentPage = pageIndex;
      const content = await pageData.getTextContent({
        normalizeWhitespace: false,
      });

      let text = "";
      let lastY: number | null = null;

      for (const item of content.items) {
        const y = item.transform[5];
        if (lastY !== null && Math.abs(y - lastY) > 4) {
          text += "\n";
        }
        text += item.str;
        lastY = y;
      }

      pages.push({ page: currentPage, text });
      return text;
    },
  };

  await pdfParse(fs.readFileSync(pdfPath), options);
  return pages;
}

// ─── Step 2: Page Marker Injection ────────────────────────────────────────────

function buildPageMarkedText(pages: PagedText[]): string {
  return pages.map((p) => `[PAGE ${p.page}]\n${p.text}`).join("\n");
}

// ─── Step 3: Target Section Isolation ─────────────────────────────────────────

function isolateSection(
  markedText: string,
  target: SectionTarget
): SectionText | null {
  const { sectionId } = target;
  const escaped = sectionId.replace(/\./g, "\\.").replace(/-/g, "\\-");

  // Try all occurrences of the section header in multiple formats.
  // The § form, "Section N" form, and bare number are all accepted.
  const startRe = new RegExp(
    `(?:§\\s*${escaped}|Section\\s+${escaped}|${escaped})(?=[\\s(])`,
    "gi"
  );

  // End marker: next top-level § 1.xxx-x header on its own line.
  // Requiring a leading \n avoids premature termination at inline citations.
  const nextSectionPattern = /\n§\s*1\.[0-9]+-[0-9]+[\s(]/g;

  let startMatch: RegExpExecArray | null;
  while ((startMatch = startRe.exec(markedText)) !== null) {
    const startIdx = startMatch.index;

    nextSectionPattern.lastIndex = startIdx + startMatch[0].length;
    const nextMatch = nextSectionPattern.exec(markedText);
    const endIdx = nextMatch ? nextMatch.index : markedText.length;

    const sectionText = markedText.slice(startIdx, endIdx);

    // TOC entries are brief outlines — skip them and continue to the actual
    // regulatory text, which is always substantially longer.
    if (countWords(sectionText) < 200) continue;

    return { ...target, markedText: sectionText };
  }

  console.warn(`  ⚠  Section ${sectionId} not found (or only present in TOC)`);
  return null;
}

// ─── Step 4: Hierarchical Chunking ────────────────────────────────────────────

function countWords(text: string): number {
  return text
    .replace(/\[PAGE \d+\]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

interface PageRange {
  pageStart: number;
  pageEnd: number;
  cleanText: string;
}

function extractPageRange(text: string, inheritedPage: number): PageRange {
  const markers = [...text.matchAll(/\[PAGE (\d+)\]/g)];
  const pageStart =
    markers.length > 0 ? parseInt(markers[0][1]) : inheritedPage;
  const pageEnd =
    markers.length > 0
      ? parseInt(markers[markers.length - 1][1])
      : inheritedPage;
  const cleanText = text.replace(/\[PAGE \d+\]\n?/g, "").trim();
  return { pageStart, pageEnd, cleanText };
}

function chunkHierarchically(
  section: SectionText,
  text: string,
  citation: string,
  id: string,
  inheritedPage: number,
  levelIndex = 0
): TextChunk[] {
  const wordCount = countWords(text);

  // Under ceiling or no more split levels — emit as single chunk
  if (wordCount <= CONFIG.wordCeiling || levelIndex >= SPLIT_LEVELS.length) {
    const { pageStart, pageEnd, cleanText } = extractPageRange(
      text,
      inheritedPage
    );
    return [
      {
        id,
        citation,
        sectionId: section.sectionId,
        rawText: cleanText,
        pageStart,
        pageEnd,
      },
    ];
  }

  const level = SPLIT_LEVELS[levelIndex];
  const splitPoints = splitAtMinIndent(text, level.charClass);

  // No split points at this level — try next level
  if (splitPoints.length === 0) {
    return chunkHierarchically(
      section,
      text,
      citation,
      id,
      inheritedPage,
      levelIndex + 1
    );
  }

  const chunks: TextChunk[] = [];
  let runningPage = inheritedPage;

  for (let i = 0; i < splitPoints.length; i++) {
    const sp = splitPoints[i];
    const partStart = sp.start;
    const partEnd =
      i + 1 < splitPoints.length ? splitPoints[i + 1].start : text.length;
    const part = text.slice(partStart, partEnd);

    // Update running page from markers in this part
    const markers = [...part.matchAll(/\[PAGE (\d+)\]/g)];
    const partStartPage =
      markers.length > 0 ? parseInt(markers[0][1]) : runningPage;
    if (markers.length > 0) {
      runningPage = parseInt(markers[markers.length - 1][1]);
    }

    const label = sp.label;
    const subCitation = `${citation}(${label})`;
    const subId = `${id}${label}`;

    const subChunks = chunkHierarchically(
      section,
      part,
      subCitation,
      subId,
      partStartPage,
      levelIndex + 1
    );
    chunks.push(...subChunks);
  }

  // Safety: if splitting produced nothing usable, fall back to whole text
  if (chunks.length === 0) {
    const { pageStart, pageEnd, cleanText } = extractPageRange(
      text,
      inheritedPage
    );
    return [
      {
        id,
        citation,
        sectionId: section.sectionId,
        rawText: cleanText,
        pageStart,
        pageEnd,
      },
    ];
  }

  return chunks;
}

function buildChunks(section: SectionText): TextChunk[] {
  // Get the page of the first [PAGE N] marker in this section as the seed
  const firstMarker = section.markedText.match(/\[PAGE (\d+)\]/);
  const seedPage = firstMarker ? parseInt(firstMarker[1]) : 1;

  return chunkHierarchically(
    section,
    section.markedText,
    section.baseCitation,
    section.baseId,
    seedPage,
    0
  );
}

// ─── Step 5: Claude Extraction ────────────────────────────────────────────────

function buildExtractionPrompt(authority: string): string {
  return `You are a structured data extraction specialist for transfer pricing regulations.

You will receive raw text from a US Treasury regulation (26 CFR Part 1 — IRC Section 482 and related penalty sections).
Extract exactly one FrameworkProvision object from this text.

Respond with valid JSON only — no markdown fences, no prose outside the JSON.

Required JSON schema:
{
  "title": "string — concise professional title for this provision",
  "text": "string — verbatim or close paraphrase of the core regulatory text, max 350 words",
  "provisionType": "rule" | "documentation" | "method" | "penalty" | "control" | "safe_harbor",
  "categories": ["string"],
  "transactionTypes": array of zero or more: "tangible goods" | "intangibles" | "services" | "loans" | "cost sharing",
  "jurisdictions": array of applicable: "US" | "US-outbound" | "US-inbound" | "cross-border",
  "riskTypes": array of applicable: "pricing-risk" | "documentation-risk" | "penalty-risk" | "comparability-risk" | "substance-risk" | "recharacterisation-risk" | "intangible-risk" | "financial-transaction-risk" | "cost-sharing-risk" | "service-risk",
  "conceptTags": ["string — framework-neutral concept labels in kebab-case"],
  "jurisdictionAuthority": "${authority}",
  "crossReferences": [],
  "orcaMapping": {
    "riskTriggers": ["string — 2-4 specific risk scenarios this provision creates or addresses"],
    "controlImplications": ["string — 2-4 specific controls implied by this provision"],
    "testingApproaches": ["string — 2-4 audit testing steps for this provision"],
    "evidenceTypes": ["string — 2-4 specific documents an auditor would request to test this provision"]
  },
  "penaltyExposure": {
    "applies": boolean,
    "level": "substantial" | "gross" | null,
    "trigger": "string or empty string",
    "penaltyRate": "string or empty string"
  },
  "weight": integer 1-10 reflecting importance to transfer pricing compliance
}

All provisions in this framework have jurisdictionAuthority: "${authority}" and crossReferences: [].
Be specific. Use professional transfer pricing terminology.
Reference the OECD Guidelines where the US regulation aligns with international standards.`;
}

function stripJsonFences(raw: string): string {
  return raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
}

function validateExtracted(raw: unknown): Omit<StagingProvision, "_review" | "source" | "id" | "frameworkId" | "citation"> {
  const p = raw as Record<string, unknown>;

  const requiredStrings = ["title", "text", "provisionType", "jurisdictionAuthority"];
  for (const field of requiredStrings) {
    if (typeof p[field] !== "string" || (p[field] as string).trim() === "") {
      throw new Error(`Missing or empty string field: ${field}`);
    }
  }

  const requiredArrays = [
    "categories", "transactionTypes", "jurisdictions", "riskTypes",
    "conceptTags", "crossReferences",
  ];
  for (const field of requiredArrays) {
    if (!Array.isArray(p[field])) {
      throw new Error(`Expected array for field: ${field}`);
    }
  }

  const validProvisionTypes = ["rule", "documentation", "method", "penalty", "control", "safe_harbor"];
  if (!validProvisionTypes.includes(p.provisionType as string)) {
    throw new Error(`Invalid provisionType: ${p.provisionType}`);
  }

  if (typeof p.weight !== "number" || p.weight < 1 || p.weight > 10) {
    throw new Error(`Invalid weight: ${p.weight}`);
  }

  const pm = p.penaltyExposure as Record<string, unknown>;
  if (typeof pm?.applies !== "boolean") {
    throw new Error("penaltyExposure.applies must be boolean");
  }

  const om = p.orcaMapping as Record<string, unknown>;
  const orcaFields = ["riskTriggers", "controlImplications", "testingApproaches", "evidenceTypes"];
  for (const field of orcaFields) {
    if (!Array.isArray(om?.[field])) {
      throw new Error(`orcaMapping.${field} must be an array`);
    }
  }

  return p as ReturnType<typeof validateExtracted>;
}

async function extractProvision(
  client: { messages: { create: (opts: object) => Promise<{ content: Array<{ type: string; text?: string }> }> } },
  chunk: TextChunk
): Promise<StagingProvision | null> {
  const userMessage = `Extract a FrameworkProvision from this ${chunk.citation} regulatory text:\n\n${chunk.rawText}`;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: buildExtractionPrompt(CONFIG.framework.jurisdictionAuthority),
      messages: [{ role: "user", content: userMessage }],
    });

    const content = response.content[0];
    if (content.type !== "text" || !content.text) return null;

    const cleaned = stripJsonFences(content.text);
    const parsed = JSON.parse(cleaned) as unknown;
    const validated = validateExtracted(parsed);

    const provision: StagingProvision = {
      _review: {
        status: "pending",
        reviewedBy: null,
        reviewedAt: null,
        citationVerified: false,
        notes: "",
      },
      source: {
        pageStart: chunk.pageStart,
        pageEnd: chunk.pageEnd,
        sectionId: chunk.sectionId,
        rawText: chunk.rawText,
      },
      id: chunk.id,
      frameworkId: CONFIG.framework.id,
      citation: chunk.citation,
      ...validated,
    };

    return provision;
  } catch (err) {
    console.error(`  ✗ ${chunk.citation} — ${(err as Error).message}`);
    return null;
  }
}

// ─── Step 6: Staging File Writer ──────────────────────────────────────────────

function writeStagingYaml(doc: StagingDocument, outputDir: string, filename: string): void {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const yaml = require("js-yaml");
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, filename);

  const header = [
    "# TP ORCA AI — Framework Extraction Staging File",
    `# Framework : ${doc._meta.frameworkName}`,
    `# Version   : ${doc._meta.version}`,
    `# Extracted : ${doc._meta.extractedAt}`,
    "#",
    "# REVIEW INSTRUCTIONS:",
    "#   1. Open the PDF to source.pageStart for each provision.",
    "#   2. Compare source.rawText against the printed text.",
    "#   3. Correct any field that differs from the source.",
    "#   4. Set _review.citationVerified: true after confirming the citation.",
    "#   5. Set _review.status: approved  (or rejected with a note).",
    "#   6. Run scripts/promote-framework.ts when all provisions are reviewed.",
    "#",
    "# NOTE: Citation strings containing § or parentheses are double-quoted.",
    "#       Do not remove those quotes.",
    "",
    "",
  ].join("\n");

  const body = yaml.dump(doc, {
    lineWidth: 120,
    quotingType: '"',
    forceQuotes: false,
    noRefs: true,
    styles: { "!!null": "empty" },
  });

  fs.writeFileSync(outputPath, header + body, "utf-8");
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function log(msg: string): void {
  process.stdout.write(msg);
}

function logln(msg = ""): void {
  console.log(msg);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  logln("TP ORCA AI — Framework Extraction");
  logln(`Framework : ${CONFIG.framework.name}`);
  logln(`PDF       : ${CONFIG.pdfPath}`);
  logln(`Output    : ${path.join(CONFIG.outputDir, CONFIG.outputFile)}`);
  logln();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("Error: ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  // Lazy-require so missing packages produce a clear message
  let Anthropic: { new (opts: object): unknown };
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Anthropic = require("@anthropic-ai/sdk");
  } catch {
    console.error("Error: @anthropic-ai/sdk not installed. Run: npm install --save-dev @anthropic-ai/sdk");
    process.exit(1);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = new (Anthropic as any)({ apiKey });

  // ── Step 1: Extract text by page ──────────────────────────────────────────
  log("Step 1  Extracting text by page ... ");
  const pages = await extractTextByPage(CONFIG.pdfPath);
  logln(`${pages.length} pages`);

  // ── Step 2: Inject page markers ───────────────────────────────────────────
  log("Step 2  Injecting page markers ... ");
  const markedText = buildPageMarkedText(pages);
  logln(`${markedText.length.toLocaleString()} chars`);

  // ── Step 3 + 4: Isolate sections and chunk hierarchically ─────────────────
  logln("Step 3  Isolating and chunking target sections ...");
  const allChunks: TextChunk[] = [];

  for (const target of CONFIG.targetSections) {
    log(`        § ${target.sectionId} ... `);
    const section = isolateSection(markedText, target);
    if (!section) {
      logln("not found, skipped");
      continue;
    }
    const chunks = buildChunks(section);
    logln(`${chunks.length} chunk${chunks.length !== 1 ? "s" : ""}`);
    allChunks.push(...chunks);
  }

  logln(`        Total chunks: ${allChunks.length}`);
  logln();

  // ── Step 5: Extract provisions via Claude ─────────────────────────────────
  logln("Step 4  Extracting provisions via Claude ...");
  const provisions: StagingProvision[] = [];

  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];
    log(`        [${i + 1}/${allChunks.length}] ${chunk.citation} ... `);

    const provision = await extractProvision(client, chunk);
    if (provision) {
      provisions.push(provision);
      logln("✓");
    } else {
      logln("✗ skipped");
    }

    // Rate limit between calls (skip delay after last chunk)
    if (i < allChunks.length - 1) {
      await delay(CONFIG.rateLimitMs);
    }
  }

  logln(`        Extracted: ${provisions.length} / ${allChunks.length}`);
  logln();

  // ── Step 6: Write staging YAML ────────────────────────────────────────────
  log("Step 5  Writing staging file ... ");

  const doc: StagingDocument = {
    _meta: {
      frameworkId: CONFIG.framework.id,
      frameworkName: CONFIG.framework.name,
      version: CONFIG.framework.version,
      effectiveDate: CONFIG.framework.effectiveDate,
      extractedAt: new Date().toISOString(),
      pdfSource: path.relative(ROOT, CONFIG.pdfPath),
      totalExtracted: provisions.length,
      totalApproved: 0,
      totalPending: provisions.length,
      totalRejected: 0,
    },
    provisions,
  };

  writeStagingYaml(doc, CONFIG.outputDir, CONFIG.outputFile);
  logln("done");
  logln();
  logln(`Staging file written to:`);
  logln(`  ${path.join(CONFIG.outputDir, CONFIG.outputFile)}`);
  logln();
  logln("Next step: review each provision, then run scripts/promote-framework.ts");
}

main().catch((err: Error) => {
  console.error("\nFatal:", err.message);
  process.exit(1);
});
