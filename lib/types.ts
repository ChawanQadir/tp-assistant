export interface ORCAInput {
  businessObjective: string;
  transferPricingRisk: string;
  transactionType: string;
  jurisdictions: string;
  industry: string;
  additionalContext?: string;
}

export interface Control {
  name: string;
  objective: string;
  owner: string;
  frequency: string;
  type: "Preventive" | "Detective";
  method: "Manual" | "Automated" | "Hybrid";
  description: string;
}

export interface TestingProcedure {
  controlName: string;
  inquiry: string;
  inspection: string;
  reperformance: string;
  recalculation: string;
  walkthrough: string;
  sampleSelection: string;
  evidenceReview: string;
}

export interface ORCAOutput {
  businessObjective: {
    restatement: string;
    relevance: string;
  };
  keyRisks: Array<{
    risk: string;
    description: string;
    severity: "High" | "Medium" | "Low";
  }>;
  controlActivities: Control[];
  testingProcedures: TestingProcedure[];
  evidenceRequired: string[];
  redFlags: string[];
  monitoringRecommendations: string[];
  executiveSummary: string;
}
