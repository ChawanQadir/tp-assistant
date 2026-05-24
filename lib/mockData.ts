import { ORCAOutput } from "./types";

export const MOCK_OUTPUT: ORCAOutput = {
  businessObjective: {
    restatement:
      "Achieve sustainable global tax compliance and mitigate transfer pricing risk across all intercompany IP licensing arrangements between the United States parent and Irish operating subsidiary within the Technology sector.",
    relevance:
      "Transfer pricing compliance is foundational to this objective. IP licensing structures between high-tax and low-tax jurisdictions attract heightened scrutiny from the IRS, Irish Revenue, and the OECD's BEPS framework. Failure to maintain arm's-length pricing, robust documentation, and proactive APA/MAP strategies creates exposure to double taxation, penalties, and reputational risk that directly threatens the group's effective tax rate and investor confidence.",
  },
  keyRisks: [
    {
      risk: "Double Taxation Risk",
      description:
        "Divergent pricing positions taken by the IRS and Irish Revenue on the same intercompany IP royalty stream may result in double taxation of the same income, increasing the group's total tax burden and triggering MAP proceedings with uncertain timelines.",
      severity: "High",
    },
    {
      risk: "APA Expiration Without Renewal",
      description:
        "Expiration of an existing Advance Pricing Agreement without timely rollover leaves the IP royalty rate unsupported during the gap period, exposing the group to retroactive adjustments and interest charges.",
      severity: "High",
    },
    {
      risk: "Benchmarking Study Obsolescence",
      description:
        "Use of outdated comparable data (more than three years old) fails to reflect current market conditions and may not satisfy OECD Chapter V documentation standards or local country requirements under country-by-country reporting.",
      severity: "High",
    },
    {
      risk: "Missing or Deficient Intercompany Agreement",
      description:
        "Absence of a legally executed intercompany license agreement, or one that does not reflect actual conduct, undermines the arm's-length position and may result in tax authorities recharacterizing the transaction.",
      severity: "High",
    },
    {
      risk: "Correlative Adjustment Failure",
      description:
        "When a primary transfer pricing adjustment is made by one jurisdiction, the corresponding correlative adjustment in the counterparty jurisdiction may not be timely requested or recognized, resulting in economic double taxation.",
      severity: "High",
    },
    {
      risk: "True-Up Process Failure",
      description:
        "Inadequate quarterly or annual true-up mechanisms to align actual royalty rates with tested party results may cause year-end margins to fall outside the arm's-length range established in the benchmarking study.",
      severity: "Medium",
    },
    {
      risk: "Documentation Readiness Gap",
      description:
        "Transfer pricing documentation (local file, master file, CbCR) prepared after the tax return filing date or with insufficient contemporaneous support exposes the group to automatic penalties in multiple jurisdictions.",
      severity: "Medium",
    },
    {
      risk: "Lack of Economic Substance",
      description:
        "Irish entities that do not demonstrate sufficient DEMPE functions (development, enhancement, maintenance, protection, exploitation) over the IP may have their licensing arrangement challenged under BEPS Action 8-10 substance requirements.",
      severity: "Medium",
    },
  ],
  controlActivities: [
    {
      name: "MAP Escalation and Monitoring Control",
      objective:
        "Ensure timely initiation of Mutual Agreement Procedure requests when double taxation arises and maintain systematic tracking of MAP case status.",
      owner: "VP of Tax / Head of International Tax",
      frequency: "Quarterly review; immediate escalation upon adjustment notice",
      type: "Detective",
      method: "Manual",
      description:
        "The tax team maintains a MAP case register updated each quarter. Upon receipt of any transfer pricing adjustment notice from IRS or Irish Revenue, the control requires a mandatory escalation decision within 30 days. Competent authority requests must be filed within applicable treaty deadlines. Case status, proposed resolution timelines, and reserve positions are reviewed by the Tax Committee each quarter.",
    },
    {
      name: "APA Lifecycle Management Control",
      objective:
        "Track APA expiration dates and initiate renewal negotiations at least 18 months prior to expiration to prevent coverage gaps.",
      owner: "Director of Transfer Pricing",
      frequency: "Annual planning; 18-month pre-expiration trigger",
      type: "Preventive",
      method: "Hybrid",
      description:
        "A centralized APA tracking register records agreement term dates, covered transactions, and renewal milestones. An automated calendar alert triggers 18 months before expiration to initiate rollover discussions with external counsel and the IRS Large Business & International division. Renewal submissions are reviewed and approved by the VP of Tax before filing.",
    },
    {
      name: "Annual Benchmarking Refresh Control",
      objective:
        "Ensure that comparable royalty rate data is current, representative, and consistent with OECD Chapter II and Chapter VI guidelines for intangible transactions.",
      owner: "Transfer Pricing Manager / External Advisor",
      frequency: "Annual",
      type: "Preventive",
      method: "Manual",
      description:
        "Each year, the benchmarking study supporting the IP royalty rate is refreshed using a three-year weighted average from approved commercial databases (e.g., RoyaltySource, ktMINE, or equivalent). The study is reviewed for changes in comparability, profit level indicators, and arm's-length range shifts. Results are approved by the VP of Tax and retained as contemporaneous documentation.",
    },
    {
      name: "Intercompany Agreement Review and Execution Control",
      objective:
        "Ensure all IP licensing arrangements are supported by legally executed intercompany agreements that accurately reflect the economic terms and actual conduct of the parties.",
      owner: "Tax Counsel / Legal Department",
      frequency: "Annual review; immediate update upon material change",
      type: "Preventive",
      method: "Manual",
      description:
        "All intercompany license agreements are reviewed annually against actual transaction terms, including royalty rates, payment schedules, exclusivity provisions, and DEMPE responsibilities. Any deviation between agreement terms and actual conduct triggers a mandatory amendment. Agreements are executed before intercompany transactions commence and retained in a centralized contract repository.",
    },
    {
      name: "Correlative Adjustment Clause Control",
      objective:
        "Ensure intercompany agreements include enforceable correlative adjustment provisions and that corresponding adjustments are requested promptly following any primary tax authority adjustment.",
      owner: "Tax Counsel / Director of Transfer Pricing",
      frequency: "Event-driven; annual agreement review",
      type: "Preventive",
      method: "Manual",
      description:
        "Standard intercompany license agreements include a correlative adjustment clause requiring the counterparty to request and accept corresponding adjustments within a defined window following any primary adjustment. The tax team monitors tax authority correspondence and, upon any adjustment, prepares a correlative adjustment analysis within 60 days. Requests are tracked in the MAP register.",
    },
    {
      name: "Quarterly True-Up Monitoring Control",
      objective:
        "Detect and correct deviations between actual royalty payments and the arm's-length range established in the benchmarking study on a quarterly basis.",
      owner: "Transfer Pricing Manager / Tax Accounting",
      frequency: "Quarterly",
      type: "Detective",
      method: "Hybrid",
      description:
        "Each quarter, actual royalty payments are compared against target profit level indicators from the benchmarking study. A variance analysis is prepared showing the tested party's actual margin versus the arm's-length range. Where margins fall outside the interquartile range, a true-up adjustment is calculated and approved by the Director of Transfer Pricing before the next payment cycle.",
    },
    {
      name: "Documentation Readiness and Calendar Control",
      objective:
        "Ensure transfer pricing documentation (local file, master file, CbCR) is prepared contemporaneously and is ready for disclosure within applicable statutory deadlines.",
      owner: "Director of Transfer Pricing",
      frequency: "Annual; deadline-driven",
      type: "Preventive",
      method: "Hybrid",
      description:
        "A documentation calendar is maintained listing deadlines for local file, master file, and CbCR filings across all relevant jurisdictions. Documentation preparation is initiated at least six months before the earliest filing deadline. Completed documentation is reviewed by external counsel and approved by the VP of Tax before the deadline. Version control and approval records are retained.",
    },
    {
      name: "Economic Substance Assessment Control",
      objective:
        "Verify that Irish entities performing DEMPE functions over licensed IP maintain sufficient personnel, resources, and decision-making authority to support the arm's-length royalty characterization under BEPS Action 8-10.",
      owner: "VP of Tax / Irish Entity Management",
      frequency: "Annual",
      type: "Preventive",
      method: "Manual",
      description:
        "An annual substance assessment is prepared documenting headcount, functional responsibilities, key decisions made locally, and expenditures attributable to each DEMPE function. The assessment is reviewed against the functional analysis in the local file and benchmarking study. Deficiencies in substance trigger a remediation plan reviewed by the Tax Committee.",
    },
  ],
  testingProcedures: [
    {
      controlName: "MAP Escalation and Monitoring Control",
      inquiry:
        "Inquire of the VP of Tax and Head of International Tax whether any MAP requests have been filed during the period, the current status of open MAP cases, and whether escalation procedures were followed within required timelines.",
      inspection:
        "Inspect the MAP case register for completeness, timeliness of filings, and evidence of quarterly status reviews. Review competent authority correspondence for consistency with treaty requirements.",
      reperformance:
        "Reperform the case status tracking by independently reviewing IRS and Irish Revenue correspondence and confirming case statuses match register entries.",
      recalculation:
        "Recalculate whether MAP requests were filed within applicable treaty deadlines (typically three years from the date of the first notification of the action resulting in double taxation).",
      walkthrough:
        "Walk through one MAP escalation from receipt of the adjustment notice through the filing of the competent authority request, tracing approvals, filings, and documentation at each step.",
      sampleSelection:
        "Select all MAP cases opened during the audit period (population expected to be small; test 100% if fewer than five cases).",
      evidenceReview:
        "Review MAP case register, competent authority requests, IRS correspondence, Irish Revenue correspondence, Tax Committee minutes, and external counsel engagement letters.",
    },
    {
      controlName: "APA Lifecycle Management Control",
      inquiry:
        "Inquire of the Director of Transfer Pricing whether all APAs covering IP licensing transactions are current, when renewal discussions were initiated, and whether any coverage gaps exist.",
      inspection:
        "Inspect the APA tracking register and confirm expiration dates, renewal milestones, and filing records. Review APA agreements for covered transaction scope and term dates.",
      reperformance:
        "Reperform the expiration tracking by independently calculating renewal trigger dates (18 months prior to expiration) and confirming whether the control was activated on schedule.",
      recalculation:
        "Verify that royalty rates applied during the period fall within the APA-specified range and that no transactions outside APA coverage were treated as covered.",
      walkthrough:
        "Walk through the most recent APA renewal cycle, tracing the 18-month alert, internal approval, external counsel engagement, and IRS submission.",
      sampleSelection:
        "Test all APAs applicable to IP licensing transactions between the U.S. and Ireland during the audit period.",
      evidenceReview:
        "Review APA agreements, renewal correspondence, IRS pre-filing meeting records, calendar alerts, VP of Tax approval emails, and external counsel submissions.",
    },
    {
      controlName: "Annual Benchmarking Refresh Control",
      inquiry:
        "Inquire of the Transfer Pricing Manager and external advisors whether the benchmarking study was updated during the current year, which database was used, and whether any comparability adjustments were made.",
      inspection:
        "Inspect the benchmarking study for vintage of comparable data, search strategy documentation, rejection criteria, and statistical range calculations.",
      reperformance:
        "Reperform the database search using the documented search criteria and confirm the comparable set is reproducible and consistent with the study.",
      recalculation:
        "Recalculate the interquartile range and median from the comparable set and confirm the royalty rate applied falls within the arm's-length range.",
      walkthrough:
        "Walk through the benchmarking refresh process from database search through VP of Tax approval and retention in the documentation file.",
      sampleSelection:
        "Test the most recent annual benchmarking study and the prior year study to assess refresh consistency.",
      evidenceReview:
        "Review benchmarking study, database search outputs, comparability analysis, rejection log, arm's-length range calculation, VP of Tax approval record, and retention confirmation.",
    },
    {
      controlName: "Intercompany Agreement Review and Execution Control",
      inquiry:
        "Inquire of Tax Counsel whether intercompany license agreements were reviewed during the year, whether any amendments were executed, and whether actual transaction terms were reconciled to agreement terms.",
      inspection:
        "Inspect executed intercompany license agreements for completeness of key provisions including royalty rate, term, exclusivity, DEMPE responsibilities, and correlative adjustment clause. Confirm execution dates precede transaction commencement.",
      reperformance:
        "Reperform the agreement-to-transaction reconciliation by independently comparing actual royalty rates and payment terms to agreement provisions for a sample of payment periods.",
      recalculation:
        "Confirm royalty payments are calculated in accordance with agreement formula and that no unauthorized deviations from contractual terms exist.",
      walkthrough:
        "Walk through the annual agreement review process from legal department initiation through execution and repository filing.",
      sampleSelection:
        "Select all intercompany license agreements covering IP transactions between the U.S. and Ireland; test 100% given the significance of the arrangement.",
      evidenceReview:
        "Review executed intercompany license agreements, amendment records, legal department review workpapers, repository filing confirmations, and payment records.",
    },
    {
      controlName: "Correlative Adjustment Clause Control",
      inquiry:
        "Inquire of Tax Counsel and the Director of Transfer Pricing whether any primary adjustments were received during the period and whether correlative adjustment requests were prepared and filed on a timely basis.",
      inspection:
        "Inspect intercompany agreements for correlative adjustment clause language. Review any correlative adjustment analyses prepared during the period for completeness and timeliness.",
      reperformance:
        "Reperform the correlative adjustment calculation for any primary adjustment received, confirming the amount, applicable period, and requesting entity.",
      recalculation:
        "Verify that correlative adjustment amounts match the primary adjustment amounts net of any agreed methodology differences.",
      walkthrough:
        "Walk through one correlative adjustment event (if applicable) from receipt of primary adjustment notice through filing of the correlative request.",
      sampleSelection:
        "Test all primary transfer pricing adjustments received during the audit period and corresponding correlative adjustment filings.",
      evidenceReview:
        "Review tax authority adjustment notices, correlative adjustment analyses, MAP register entries, filing confirmations, and Tax Counsel correspondence.",
    },
    {
      controlName: "Quarterly True-Up Monitoring Control",
      inquiry:
        "Inquire of the Transfer Pricing Manager whether quarterly variance analyses were prepared for all four quarters of the audit period and whether any out-of-range results triggered true-up adjustments.",
      inspection:
        "Inspect quarterly variance analysis workpapers for completeness, arithmetic accuracy, and evidence of Director of Transfer Pricing approval.",
      reperformance:
        "Reperform the quarterly margin calculation for a selected quarter using actual financial data from trial balance reports and confirm the variance analysis is accurate.",
      recalculation:
        "Recalculate the true-up adjustment amounts for any quarters where margins fell outside the arm's-length range and confirm adjustments were recorded in the correct period.",
      walkthrough:
        "Walk through one quarterly true-up cycle from financial data extraction through variance analysis preparation, approval, and payment adjustment.",
      sampleSelection:
        "Select all four quarters of the audit period for testing; perform detailed recalculation on the two quarters with largest absolute deviations from target.",
      evidenceReview:
        "Review quarterly variance analysis workpapers, trial balance reports, entity profit margin reports, true-up calculation schedules, approval records, and payment documentation.",
    },
    {
      controlName: "Documentation Readiness and Calendar Control",
      inquiry:
        "Inquire of the Director of Transfer Pricing whether documentation was prepared contemporaneously, whether all applicable deadlines were met, and whether external counsel reviewed the documentation before filing.",
      inspection:
        "Inspect the documentation calendar for completeness of jurisdiction deadlines and evidence that preparation was initiated at least six months before the earliest deadline. Review local file, master file, and CbCR for contemporaneous preparation evidence.",
      reperformance:
        "Reperform the deadline calculation for each jurisdiction, confirm the documentation calendar is accurate, and verify that preparation start dates satisfy the six-month lead time requirement.",
      recalculation:
        "Verify that financial data used in the documentation (operating margins, royalty amounts, entity revenues) reconciles to audited financial statements and tax return figures.",
      walkthrough:
        "Walk through the documentation preparation cycle for one jurisdiction from calendar initiation through external counsel review, VP of Tax approval, and retention.",
      sampleSelection:
        "Test local file and master file for the current audit year and prior year to assess consistency and contemporaneous preparation.",
      evidenceReview:
        "Review documentation calendar, local file, master file, CbCR, preparation start records, external counsel review letters, VP of Tax approval emails, and version control logs.",
    },
    {
      controlName: "Economic Substance Assessment Control",
      inquiry:
        "Inquire of the VP of Tax and Irish entity management whether an annual substance assessment was prepared, what DEMPE functions are performed locally, and whether any deficiencies were identified and remediated.",
      inspection:
        "Inspect the annual substance assessment for completeness of DEMPE function documentation, headcount data, decision-making records, and expenditure attribution. Confirm consistency with functional analysis in the local file.",
      reperformance:
        "Reperform the DEMPE function mapping by independently reviewing Irish entity organizational charts, job descriptions, board minutes, and expense reports.",
      recalculation:
        "Verify that headcount ratios and expenditure allocations in the substance assessment are arithmetically accurate and consistent with payroll and financial records.",
      walkthrough:
        "Walk through the annual substance assessment process from Irish entity management input collection through Tax Committee review and approval.",
      sampleSelection:
        "Test the substance assessment for the current audit year; perform supplementary testing on one DEMPE function identified as having the lowest substantiation level.",
      evidenceReview:
        "Review substance assessment workpaper, organizational charts, job descriptions, board minutes, payroll records, expense reports, Tax Committee meeting minutes, and remediation plans if applicable.",
    },
  ],
  evidenceRequired: [
    "Transfer pricing policy (global intercompany pricing policy document)",
    "Local file for each relevant jurisdiction (United States and Ireland)",
    "Master file (OECD-compliant group overview)",
    "Country-by-Country Report (CbCR) for the audit period",
    "Benchmarking study supporting IP royalty rate (current year and prior two years)",
    "Executed intercompany license agreements with all amendments",
    "APA agreement(s) and all correspondence with the IRS and Irish Revenue",
    "MAP correspondence and competent authority requests (if applicable)",
    "Correlative adjustment analyses and filing confirmations",
    "Quarterly true-up calculation workpapers for all four quarters",
    "Trial balance reports and entity-level profit margin reports",
    "Annual economic substance assessment for Irish entities",
    "Tax Committee and Board minutes referencing transfer pricing matters",
    "External counsel engagement letters and review memoranda",
    "Tax authority audit correspondence and information document requests",
    "Transfer pricing documentation calendar and preparation log",
    "Version control records for all documentation files",
  ],
  redFlags: [
    "APA expired without renewal or pending rollover application",
    "Benchmarking study data is more than three years old or sourced from an unapproved database",
    "Royalty margins fall outside the arm's-length interquartile range in any tested quarter without a true-up adjustment",
    "Intercompany license agreement executed after the start of the transaction period or not executed at all",
    "No correlative adjustment clause in the intercompany license agreement",
    "MAP request not filed within applicable treaty deadlines following a primary adjustment",
    "Documentation prepared after the tax return filing deadline with no contemporaneous evidence",
    "Irish entity lacks DEMPE headcount, resources, or decision-making records sufficient to support the royalty characterization",
    "Inconsistent functional analysis or pricing positions adopted in U.S. and Irish documentation",
    "No quarterly true-up process or true-up adjustments not recorded in the correct period",
    "Transfer pricing policy not updated to reflect changes in business model or group structure",
    "Tax authority correspondence not escalated to VP of Tax within required timeframes",
    "External counsel has not reviewed documentation for the current year prior to the filing deadline",
  ],
  monitoringRecommendations: [
    "Quarterly margin review: Compare actual tested party margins to arm's-length benchmarks each quarter and document variance analysis in a standardized template approved by the Director of Transfer Pricing.",
    "Annual benchmarking refresh: Commission a full benchmarking refresh each year using a three-year weighted average from approved databases; obtain VP of Tax sign-off before documentation finalization.",
    "APA expiration tracking: Maintain a centralized APA register with automated 18-month renewal alerts and assign ownership to the Director of Transfer Pricing with escalation to VP of Tax.",
    "Documentation calendar: Maintain and update a multi-jurisdiction documentation deadline calendar at the start of each fiscal year; initiate preparation at least six months prior to the earliest deadline.",
    "Contract review cycle: Conduct annual legal review of all intercompany license agreements; trigger immediate amendment review upon any change in royalty rate, covered IP, or entity structure.",
    "MAP case tracking: Update the MAP case register monthly and present to the Tax Committee quarterly; track treaty deadlines and escalation thresholds.",
    "Substance assessment: Perform annual DEMPE function and substance assessment for Irish entities; compare to prior year and flag any reduction in headcount, expenditure, or decision-making authority.",
    "Exception reporting: Generate a monthly exception report flagging any missed true-ups, expired agreements, overdue documentation milestones, or unanswered tax authority correspondence.",
    "Tax authority audit readiness review: Conduct a semi-annual internal audit readiness review assessing completeness of evidence files, consistency of positions across jurisdictions, and control effectiveness.",
    "BEPS monitoring: Monitor OECD and local jurisdiction BEPS implementation updates on a quarterly basis; assess impact on current APA terms, documentation requirements, and substance standards.",
  ],
  executiveSummary:
    "This ORCA framework addresses transfer pricing risks arising from IP licensing transactions between the United States parent and the Irish operating subsidiary in the Technology sector. The primary risk — double taxation — is driven by divergent arm's-length pricing determinations by the IRS and Irish Revenue, compounded by APA lifecycle gaps, benchmarking obsolescence, and inadequate true-up mechanisms. Eight control activities have been designed across preventive and detective categories, covering MAP escalation, APA renewal, benchmarking, intercompany agreements, correlative adjustments, quarterly true-ups, documentation readiness, and economic substance. Each control is supported by a full suite of audit testing procedures including inquiry, inspection, reperformance, recalculation, walkthrough, sample selection, and evidence review. Seventeen categories of evidence are required for a complete audit file. Thirteen red flags have been identified that would indicate material control breakdowns warranting immediate remediation. Ongoing monitoring through ten recurring activities — including quarterly margin reviews, annual benchmarking refreshes, and semi-annual audit readiness reviews — is recommended to sustain compliance posture. This framework is designed to be presented to the VP of Tax, Audit Committee, or external auditors as evidence of a structured, proactive approach to transfer pricing governance. It should be reviewed and validated by a qualified transfer pricing professional before implementation.",
};
