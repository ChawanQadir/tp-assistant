import Link from "next/link";
import { ArrowRight, Shield, BarChart3, FileSearch, CheckSquare } from "lucide-react";

const PILLARS = [
  {
    letter: "O",
    label: "Objective",
    desc: "Define the transfer pricing business objective — compliance, risk mitigation, or operational efficiency.",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    letter: "R",
    label: "Risk",
    desc: "Identify 5–8 material transfer pricing risks including double taxation, APA gaps, and benchmarking failures.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    letter: "C",
    label: "Control Activities",
    desc: "Design preventive and detective controls with owners, frequencies, and operating descriptions.",
    icon: <CheckSquare className="w-5 h-5" />,
  },
  {
    letter: "A",
    label: "Audit / Testing",
    desc: "Generate inquiry, inspection, reperformance, and walkthrough procedures for each control.",
    icon: <FileSearch className="w-5 h-5" />,
  },
];

const FEATURES = [
  {
    title: "APA & MAP Intelligence",
    desc: "Controls and testing procedures tailored to Advance Pricing Agreements and Mutual Agreement Procedure escalation.",
  },
  {
    title: "Benchmarking Governance",
    desc: "Annual refresh controls, arm's-length range monitoring, and comparable data documentation requirements.",
  },
  {
    title: "Documentation Readiness",
    desc: "Local file, master file, and CbCR calendars with contemporaneous preparation controls.",
  },
  {
    title: "True-Up Process Controls",
    desc: "Quarterly variance analysis, margin monitoring, and true-up adjustment approval workflows.",
  },
  {
    title: "Red Flag Detection",
    desc: "Systematic identification of control gaps: expired APAs, missing agreements, out-of-range margins.",
  },
  {
    title: "Executive Summaries",
    desc: "Professional one-page summaries suitable for Tax Committee, Audit Committee, or Board review.",
  },
];

const NAVY = "#0f2a4a";
const TEAL = "#0d6e6e";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border mb-8"
            style={{ color: TEAL, borderColor: `${TEAL}40`, backgroundColor: `${TEAL}08` }}
          >
            <Shield className="w-3.5 h-3.5" />
            Transfer Pricing Risk &amp; Controls Intelligence
          </div>

          <h1 className="text-5xl font-bold tracking-tight mb-5 leading-tight" style={{ color: NAVY }}>
            TP ORCA AI
          </h1>
          <p className="text-sm text-slate-500 mt-4">
            Built by Chawan Qadir
          </p>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-3 font-medium">
            Transfer Pricing Risk &amp; Controls Intelligence
          </p>

          <p className="text-base text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Generate ORCA-based transfer pricing risk, control, testing, and evidence frameworks in minutes. Purpose-built for tax, audit, and risk professionals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/agent"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              Start Framework
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-slate-600 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ORCA Pillars */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-3" style={{ color: NAVY }}>
            The ORCA Methodology
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            Apply internal control thinking to transfer pricing governance. ORCA structures every engagement around four rigorous disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map(({ letter, label, desc, icon }) => (
            <div
              key={letter}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: NAVY }}
                >
                  {letter}
                </div>
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: `${TEAL}15`, color: TEAL }}
                >
                  {icon}
                </div>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3" style={{ color: NAVY }}>
              Built for Transfer Pricing Professionals
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              TP ORCA AI accelerates first-draft risk assessment, control design, and documentation readiness — so your team focuses on judgment, not structure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ title, desc }) => (
              <div
                key={title}
                className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors"
              >
                <div className="w-1.5 h-6 rounded-full mb-4" style={{ backgroundColor: TEAL }} />
                <h3 className="font-semibold text-slate-800 mb-2 text-sm">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1 text-white">Ready to build your ORCA framework?</h2>
            <p className="text-slate-300 text-sm">
              Takes under two minutes. No account required.
            </p>
          </div>
          <Link
            href="/agent"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-white rounded-lg hover:bg-slate-100 transition-colors shrink-0"
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
