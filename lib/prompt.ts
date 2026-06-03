import { ORCAInput } from "./types";
import { selectProvisions, buildPromptReferenceBlock } from "./frameworks/retrieval";
import type { ProvisionQuery, TransactionType } from "./frameworks/types";

const TX_MAP: Record<string, TransactionType> = {
  "intercompany services": "services",
  "tangible goods": "tangible goods",
  "ip licensing": "intangibles",
  "cost sharing arrangement": "cost sharing",
  "financing transaction": "loans",
  "management fees": "services",
};

function toTransactionTypes(raw: string): TransactionType[] {
  const mapped = TX_MAP[raw.toLowerCase().trim()];
  return mapped ? [mapped] : [];
}

function toJurisdictions(raw: string): string[] {
  const lower = raw.toLowerCase();
  const hits: Array<[string, string]> = [
    ["united states", "US"], ["u.s.", "US"],
    ["ireland", "IE"], ["united kingdom", "UK"], [" uk ", "UK"],
    ["germany", "DE"], ["france", "FR"], ["canada", "CA"],
    ["australia", "AU"], ["japan", "JP"], ["china", "CN"],
    ["india", "IN"], ["singapore", "SG"], ["netherlands", "NL"],
    ["luxembourg", "LU"], ["switzerland", "CH"],
  ];
  const codes = new Set<string>();
  for (const [needle, code] of hits) {
    if (lower.includes(needle)) codes.add(code);
  }
  return Array.from(codes);
}

export const SYSTEM_PROMPT = `You are a senior transfer pricing risk and controls specialist. You apply ORCA methodology: Objectives, Risks, Control Activities, and Audit/Testing Procedures. Your job is to help tax and audit professionals convert transfer pricing objectives and risks into practical controls, evidence requests, testing procedures, red flags, and monitoring recommendations. Be specific, professional, and conservative. Do not provide legal advice. Always recommend review by a qualified transfer pricing expert.

You must respond with valid JSON only — no markdown, no prose outside the JSON. The JSON must conform exactly to this structure:

{
  "businessObjective": {
    "restatement": "string",
    "relevance": "string"
  },
  "keyRisks": [
    {
      "risk": "string",
      "description": "string",
      "severity": "High" | "Medium" | "Low"
    }
  ],
  "controlActivities": [
    {
      "name": "string",
      "objective": "string",
      "owner": "string",
      "frequency": "string",
      "type": "Preventive" | "Detective",
      "method": "Manual" | "Automated" | "Hybrid",
      "description": "string"
    }
  ],
  "testingProcedures": [
    {
      "controlName": "string",
      "inquiry": "string",
      "inspection": "string",
      "reperformance": "string",
      "recalculation": "string",
      "walkthrough": "string",
      "sampleSelection": "string",
      "evidenceReview": "string"
    }
  ],
  "evidenceRequired": ["string"],
  "redFlags": ["string"],
  "monitoringRecommendations": ["string"],
  "executiveSummary": "string"
}

Generate 5-8 key risks relevant to the transaction type and jurisdictions. Generate one control activity per major risk (5-8 controls). Generate one testing procedure block per control. Be thorough, specific to the facts provided, and use professional transfer pricing terminology including references to OECD Guidelines where relevant.`;

export function buildUserPrompt(input: ORCAInput): string {
  const query: ProvisionQuery = {
    transactionTypes: toTransactionTypes(input.transactionType),
    jurisdictions: toJurisdictions(input.jurisdictions),
    maxResults: 12,
  };

  const provisions = selectProvisions(query);
  const referenceBlock = buildPromptReferenceBlock(provisions);

  return `${referenceBlock ? referenceBlock + "\n" : ""}Please generate a complete ORCA framework for the following transfer pricing scenario:

Business Objective: ${input.businessObjective}
Transfer Pricing Risk: ${input.transferPricingRisk}
Transaction Type: ${input.transactionType}
Countries / Jurisdictions Involved: ${input.jurisdictions}
Industry: ${input.industry}
${input.additionalContext ? `\nAdditional Context:\n${input.additionalContext}` : ""}

Generate all eight sections of the ORCA output with specificity appropriate for a ${input.industry} company engaging in ${input.transactionType} transactions between ${input.jurisdictions}.`;
}
