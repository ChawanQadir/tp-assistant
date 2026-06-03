// Shared types for the framework reference layer.
// No imports from other framework files — this is a pure leaf module.

export type ProvisionType =
  | "rule"
  | "documentation"
  | "method"
  | "penalty"
  | "control"
  | "safe_harbor";

export type JurisdictionAuthority = "global" | "regional" | "domestic";

export type RiskType =
  | "pricing-risk"
  | "documentation-risk"
  | "penalty-risk"
  | "comparability-risk"
  | "substance-risk"
  | "recharacterisation-risk"
  | "intangible-risk"
  | "financial-transaction-risk"
  | "cost-sharing-risk"
  | "service-risk";

export type TransactionType =
  | "tangible goods"
  | "intangibles"
  | "services"
  | "loans"
  | "cost sharing";

export interface PenaltyExposure {
  applies: boolean;
  level: "substantial" | "gross" | null;
  trigger: string;
  penaltyRate: string;
}

export interface OrcaMapping {
  riskTriggers: string[];
  controlImplications: string[];
  testingApproaches: string[];
  evidenceTypes: string[];
}

export interface ProvisionSource {
  pageStart: number;
  pageEnd: number;
  sectionId: string;
}

export interface FrameworkProvision {
  id: string;
  frameworkId: string;
  citation: string;
  title: string;
  text: string;
  provisionType: ProvisionType;
  categories: string[];
  transactionTypes: TransactionType[];
  jurisdictions: string[];
  riskTypes: RiskType[];
  conceptTags: string[];
  jurisdictionAuthority: JurisdictionAuthority;
  crossReferences: string[];
  orcaMapping: OrcaMapping;
  penaltyExposure: PenaltyExposure;
  source: ProvisionSource;
  weight: number;
}

export interface FrameworkDocument {
  id: string;
  name: string;
  shortName: string;
  jurisdiction: string[];
  tier: "mandatory" | "valuable";
  version: string;
  effectiveDate: string;
  provisions: FrameworkProvision[];
}

export interface ProvisionQuery {
  transactionTypes?: TransactionType[];
  jurisdictions?: string[];
  riskTypes?: RiskType[];
  provisionTypes?: ProvisionType[];
  frameworks?: string[];
  frameworkVersion?: string;
  maxResults?: number;
}
