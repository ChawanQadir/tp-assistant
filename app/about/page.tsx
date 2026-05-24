import Link from "next/link";
import { ArrowRight, Shield, BookOpen, Scale, Globe } from "lucide-react";

const NAVY = "#0f2a4a";
const TEAL = "#0d6e6e";

const USE_CASES = [
  {
    icon: <Scale className="w-5 h-5" />,
    title: "Double Taxation & MAP",
    desc: "Design controls for Mutual Agreement Procedure escalation, correlative adjustment tracking, and competent authority request deadlines across tax treaty jurisdictions.",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "APA Lifecycle Management",
    desc: "Generate controls for Advance Pricing Agreement renewal, rollover negotiations, and gap period analysis when APA coverage lapses.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Benchmarking Governance",
    desc: "Structure annual benchmarking refresh procedures, comparable data review, interquartile range monitoring, and arm's-length range documentation.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Documentation Readiness",
    desc: "Create contemporaneous documentation calendars covering local file, master file, and CbCR requirements across multiple jurisdictions.",
  },
];

const METHODOLOGY = [
  {
    step: "1",
    label: "Objective",
    desc: "The framework begins by restating the transfer pricing business objective in precise terms, anchoring all subsequent analysis to a defined compliance or risk management goal.",
  },
  {
    step: "2",
    label: "Risk Identification",
    desc: "5 to 8 material transfer pricing risks are identified using a structured taxonomy including double taxation, penalty exposure, APA gaps, benchmarking failures, documentation deficiencies, and economic substance concerns.",
  },
  {
    step: "3",
    label: "Control Design",
    desc: "For each major risk, a control activity is designed specifying the control name, objective, owner, frequency, preventive or detective classification, and manual, automated, or hybrid method of operation.",
  },
  {
    step: "4",
    label: "Audit Testing",
    desc: "Audit-style testing procedures are generated for each control covering inquiry, inspection, reperformance, recalculation, walkthrough, sample selection, and evidence review steps.",
  },
  {
    step: "5",
    label: "Evidence & Monitoring",
    desc: "The framework concludes with a structured evidence request list, red flag indicators, recurring monitoring recommendations, and an executive summary suitable for Tax Committee or Board review.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center text-white"
              style={{ backgroundColor: NAVY }}
            >
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">About</span>
          </div>
          <h1 className="text-3xl font-bold mb-4" style={{ color: NAVY }}>
            What is TP ORCA AI?
          </h1>
          <p className="text-base text-slate-600 leading-relaxed mb-4">
            TP ORCA AI applies the Objective, Risk, Control Activities, and Audit/Testing logic to transfer pricing governance. It helps tax, audit, and risk teams structure risks, controls, evidence, and testing procedures for areas such as double taxation, APAs, MAP, benchmarking, documentation, and true-ups.
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            The ORCA methodology originates from internal control frameworks — particularly the COSO model — adapted here to the specific demands of cross-border transfer pricing compliance. TP ORCA AI operationalizes this methodology through an AI agent that converts user-supplied facts into a complete, audit-ready governance framework in minutes.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold mb-8" style={{ color: NAVY }}>
          How the ORCA Framework Works
        </h2>
        <div className="space-y-5">
          {METHODOLOGY.map(({ step, label, desc }) => (
            <div key={step} className="flex gap-5 p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ backgroundColor: NAVY }}
              >
                {step}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold mb-8" style={{ color: NAVY }}>
            Primary Use Cases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {USE_CASES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center mb-3 text-white"
                  style={{ backgroundColor: TEAL }}
                >
                  {icon}
                </div>
                <h3 className="font-semibold text-slate-800 mb-2 text-sm">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="border border-slate-200 rounded-xl bg-white shadow-sm p-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: NAVY }}>
            AI as a First-Draft Accelerator
          </h2>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              TP ORCA AI is designed to accelerate the first-draft risk assessment, control design, and documentation readiness phases of transfer pricing engagements. It does not replace the judgment of experienced transfer pricing professionals, tax attorneys, or audit specialists.
            </p>
            <p>
              The agent draws on structured transfer pricing knowledge to generate frameworks that reflect current practice areas including OECD BEPS Actions 8-10, Chapter V documentation requirements, US Section 482 regulations, and treaty-based MAP and APA procedures. All output should be reviewed and validated by a qualified professional before being relied upon.
            </p>
            <p>
              The tool is appropriate for use by in-house tax teams, Big Four and national firm transfer pricing practitioners, internal audit departments, tax technology teams, and risk advisors seeking to structure their analysis efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="border border-amber-200 bg-amber-50 rounded-xl px-6 py-4">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Disclaimer:</strong> This output is for workflow and control design support only and should be reviewed by a qualified transfer pricing professional. TP ORCA AI does not provide legal or tax advice. The tool does not create an attorney-client or advisor-client relationship. All frameworks generated should be independently validated before use in any compliance, audit, or litigation context.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: NAVY }}>
        <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Ready to generate your framework?</h2>
            <p className="text-slate-300 text-sm">Takes under two minutes. No account required.</p>
          </div>
          <Link
            href="/agent"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-white rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            style={{ color: NAVY }}
          >
            Start Framework
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
