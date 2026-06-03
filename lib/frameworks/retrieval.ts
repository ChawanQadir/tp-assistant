import type {
  FrameworkDocument,
  FrameworkProvision,
  ProvisionQuery,
} from "./types";
import { ALL_FRAMEWORKS, FRAMEWORK_MAP } from "./index";

// ─── Version Resolution ───────────────────────────────────────────────────────
// When multiple versions of the same framework are loaded, select the correct one.
// Default: latest by effectiveDate. Respects an explicit frameworkVersion pin.

function resolveVersions(
  frameworks: FrameworkDocument[],
  frameworkVersion?: string
): FrameworkDocument[] {
  const byId = new Map<string, FrameworkDocument[]>();

  for (const fw of frameworks) {
    const group = byId.get(fw.id) ?? [];
    group.push(fw);
    byId.set(fw.id, group);
  }

  return Array.from(byId.values()).map((group) => {
    if (group.length === 1) return group[0];

    if (frameworkVersion) {
      const pinned = group.find((fw) => fw.version === frameworkVersion);
      if (pinned) return pinned;
    }

    return group.slice().sort(
      (a, b) =>
        new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime()
    )[0];
  });
}

// ─── Scoring ──────────────────────────────────────────────────────────────────
// Produces a relevance score for one provision against the query.
// Weight multiplier ensures high-importance provisions surface first.

function scoreProvision(
  provision: FrameworkProvision,
  query: ProvisionQuery
): number {
  const { transactionTypes = [], jurisdictions = [], riskTypes = [] } = query;

  const txScore =
    provision.transactionTypes.filter((t) => transactionTypes.includes(t))
      .length * 3;
  const jxScore =
    provision.jurisdictions.filter((j) => jurisdictions.includes(j)).length * 3;
  const riskScore =
    provision.riskTypes.filter((r) => riskTypes.includes(r)).length * 2;

  return (txScore + jxScore + riskScore) * provision.weight;
}

// ─── Deduplication ────────────────────────────────────────────────────────────
// Prevents the same concept from appearing multiple times from the same framework.
// For cross-framework overlap (same conceptTag, different frameworkId):
//   - keeps "domestic" provisions as primary authority
//   - retains "global" provisions as supporting context (max one per framework)

function deduplicateByConceptTag(
  provisions: Array<{ provision: FrameworkProvision; frameworkId: string; score: number }>
): Array<{ provision: FrameworkProvision; frameworkId: string; score: number }> {
  // Group by conceptTag × frameworkId — keep highest scorer within each group
  const byConceptAndFramework = new Map<
    string,
    { provision: FrameworkProvision; frameworkId: string; score: number }
  >();

  for (const entry of provisions) {
    for (const tag of entry.provision.conceptTags) {
      const key = `${tag}::${entry.frameworkId}`;
      const existing = byConceptAndFramework.get(key);
      if (!existing || entry.score > existing.score) {
        byConceptAndFramework.set(key, entry);
      }
    }
  }

  return Array.from(byConceptAndFramework.values());
}

// ─── Main Selection Function ──────────────────────────────────────────────────

export function selectProvisions(query: ProvisionQuery): FrameworkProvision[] {
  const {
    transactionTypes = [],
    jurisdictions = [],
    riskTypes = [],
    provisionTypes,
    frameworks,
    frameworkVersion,
    maxResults = 15,
  } = query;

  // Step 1: Resolve versions — one document per framework id
  const resolvedFrameworks = resolveVersions(ALL_FRAMEWORKS, frameworkVersion);

  // Step 2: Restrict to requested frameworks if specified
  const activeFrameworks = frameworks
    ? resolvedFrameworks.filter((fw) => frameworks.includes(fw.id))
    : resolvedFrameworks;

  // Step 3: Filter provisions across all active frameworks
  const candidates: Array<{
    provision: FrameworkProvision;
    frameworkId: string;
    score: number;
  }> = [];

  for (const fw of activeFrameworks) {
    for (const provision of fw.provisions) {
      const txMatch =
        transactionTypes.length === 0 ||
        provision.transactionTypes.some((t) => transactionTypes.includes(t));
      const jxMatch =
        jurisdictions.length === 0 ||
        provision.jurisdictions.some((j) => jurisdictions.includes(j));
      const typeMatch =
        !provisionTypes || provisionTypes.includes(provision.provisionType);

      if (txMatch && jxMatch && typeMatch) {
        candidates.push({
          provision,
          frameworkId: fw.id,
          score: scoreProvision(provision, query),
        });
      }
    }
  }

  // Step 4: Deduplicate by conceptTag within each framework
  const deduplicated = deduplicateByConceptTag(candidates);

  // Step 5: Sort by score, resolve cross-framework overlap
  // Domestic authority provisions are preferred over global for the same concept,
  // but both are retained (domestic ranked higher).
  const sorted = deduplicated
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const authorityRank = { domestic: 3, regional: 2, global: 1 };
      return (
        (authorityRank[b.provision.jurisdictionAuthority] ?? 0) -
        (authorityRank[a.provision.jurisdictionAuthority] ?? 0)
      );
    })
    .slice(0, maxResults)
    .map((entry) => entry.provision);

  return sorted;
}

// ─── Prompt Reference Block Builder ──────────────────────────────────────────
// Formats selected provisions into a structured block for injection into
// lib/prompt.ts. Groups provisions by framework for clarity.

export function buildPromptReferenceBlock(
  provisions: FrameworkProvision[],
  frameworkMap: Map<string, FrameworkDocument> = FRAMEWORK_MAP
): string {
  if (provisions.length === 0) return "";

  const grouped = new Map<string, FrameworkProvision[]>();

  for (const provision of provisions) {
    const group = grouped.get(provision.frameworkId) ?? [];
    group.push(provision);
    grouped.set(provision.frameworkId, group);
  }

  const lines: string[] = ["## Applicable Framework Provisions\n"];

  for (const [frameworkId, group] of grouped.entries()) {
    const fw = frameworkMap.get(frameworkId);
    const header = fw
      ? `### ${fw.name} (${fw.jurisdiction.join(", ")} — ${fw.tier === "mandatory" ? "Mandatory" : "Reference"})`
      : `### ${frameworkId}`;
    lines.push(header);

    for (const p of group) {
      lines.push(`\n[${p.citation}] ${p.title}`);
      lines.push(`"${p.text}"`);
    }

    lines.push("");
  }

  lines.push(
    "For each risk, control, and testing procedure you generate, cite the most specific applicable provision using the format: (Source, Citation). Where multiple frameworks address the same concept, cite all relevant provisions.\n"
  );

  return lines.join("\n");
}

export { FRAMEWORK_MAP } from "./index";
