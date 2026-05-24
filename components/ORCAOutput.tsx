"use client";

import { ORCAOutput as ORCAOutputType } from "@/lib/types";
import SectionCard from "./SectionCard";
import Badge from "./Badge";
import {
  Target,
  AlertTriangle,
  Shield,
  ClipboardList,
  FileText,
  Flag,
  Activity,
  BookOpen,
  Download,
} from "lucide-react";

interface Props {
  output: ORCAOutputType;
  isMock: boolean;
}

function toMarkdown(output: ORCAOutputType): string {
  const lines: string[] = [];

  lines.push("# TP ORCA AI — Transfer Pricing ORCA Framework\n");

  lines.push("## 1. Business Objective\n");
  lines.push(`**Restatement:** ${output.businessObjective.restatement}\n`);
  lines.push(`**Relevance:** ${output.businessObjective.relevance}\n`);

  lines.push("## 2. Key Transfer Pricing Risks\n");
  output.keyRisks.forEach((r) => {
    lines.push(`### ${r.risk} [${r.severity}]`);
    lines.push(`${r.description}\n`);
  });

  lines.push("## 3. Control Activities\n");
  output.controlActivities.forEach((c) => {
    lines.push(`### ${c.name}`);
    lines.push(`- **Objective:** ${c.objective}`);
    lines.push(`- **Owner:** ${c.owner}`);
    lines.push(`- **Frequency:** ${c.frequency}`);
    lines.push(`- **Type:** ${c.type}`);
    lines.push(`- **Method:** ${c.method}`);
    lines.push(`- **Description:** ${c.description}\n`);
  });

  lines.push("## 4. Testing Procedures\n");
  output.testingProcedures.forEach((t) => {
    lines.push(`### ${t.controlName}`);
    lines.push(`- **Inquiry:** ${t.inquiry}`);
    lines.push(`- **Inspection:** ${t.inspection}`);
    lines.push(`- **Reperformance:** ${t.reperformance}`);
    lines.push(`- **Recalculation:** ${t.recalculation}`);
    lines.push(`- **Walkthrough:** ${t.walkthrough}`);
    lines.push(`- **Sample Selection:** ${t.sampleSelection}`);
    lines.push(`- **Evidence Review:** ${t.evidenceReview}\n`);
  });

  lines.push("## 5. Evidence Required\n");
  output.evidenceRequired.forEach((e) => lines.push(`- ${e}`));
  lines.push("");

  lines.push("## 6. Red Flags\n");
  output.redFlags.forEach((f) => lines.push(`- ${f}`));
  lines.push("");

  lines.push("## 7. Monitoring Recommendations\n");
  output.monitoringRecommendations.forEach((m) => lines.push(`- ${m}`));
  lines.push("");

  lines.push("## 8. Executive Summary\n");
  lines.push(`${output.executiveSummary}\n`);

  lines.push("---");
  lines.push(
    "_This output is for workflow and control design support only and should be reviewed by a qualified transfer pricing professional._"
  );

  return lines.join("\n");
}

export default function ORCAOutput({ output, isMock }: Props) {
  const handleExport = () => {
    const md = toMarkdown(output);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tp-orca-framework.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const NAVY = "#0f2a4a";
  const TEAL = "#0d6e6e";

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: NAVY }}>
            ORCA Framework Output
          </h2>
          {isMock && (
            <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium mt-1 inline-block">
              Demo Mode — Add API key for AI-generated output
            </span>
          )}
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
          style={{ backgroundColor: NAVY }}
        >
          <Download className="w-4 h-4" />
          Export as Markdown
        </button>
      </div>

      {/* 1. Business Objective */}
      <SectionCard
        title="1. Business Objective"
        icon={<Target className="w-4 h-4" />}
        content={`${output.businessObjective.restatement}\n\n${output.businessObjective.relevance}`}
        accent={NAVY}
      >
        <p className="text-sm text-slate-700 leading-relaxed font-medium mb-2">
          {output.businessObjective.restatement}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          {output.businessObjective.relevance}
        </p>
      </SectionCard>

      {/* 2. Key Transfer Pricing Risks */}
      <SectionCard
        title="2. Key Transfer Pricing Risks"
        icon={<AlertTriangle className="w-4 h-4" />}
        content={output.keyRisks.map((r) => `${r.risk} [${r.severity}]\n${r.description}`).join("\n\n")}
        accent="#b45309"
      >
        <div className="space-y-4">
          {output.keyRisks.map((risk, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-400 mt-0.5 w-5 shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-semibold text-slate-800">{risk.risk}</span>
                  <Badge
                    label={risk.severity}
                    variant={risk.severity.toLowerCase() as "high" | "medium" | "low"}
                  />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{risk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 3. Control Activities */}
      <SectionCard
        title="3. Control Activities"
        icon={<Shield className="w-4 h-4" />}
        content={output.controlActivities
          .map(
            (c) =>
              `${c.name}\nObjective: ${c.objective}\nOwner: ${c.owner}\nFrequency: ${c.frequency}\nType: ${c.type} | ${c.method}\n${c.description}`
          )
          .join("\n\n")}
        accent={TEAL}
      >
        <div className="space-y-5">
          {output.controlActivities.map((control, i) => (
            <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{control.name}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  <Badge
                    label={control.type}
                    variant={control.type.toLowerCase() as "preventive" | "detective"}
                  />
                  <Badge
                    label={control.method}
                    variant={control.method.toLowerCase() as "manual" | "automated" | "hybrid"}
                  />
                </div>
              </div>
              <div className="px-4 py-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Objective</span>
                  <p className="text-slate-700 mt-0.5">{control.objective}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Owner</span>
                  <p className="text-slate-700 mt-0.5">{control.owner}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Frequency</span>
                  <p className="text-slate-700 mt-0.5">{control.frequency}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Description</span>
                  <p className="text-slate-600 leading-relaxed mt-0.5">{control.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 4. Testing Procedures */}
      <SectionCard
        title="4. Testing Procedures"
        icon={<ClipboardList className="w-4 h-4" />}
        content={output.testingProcedures
          .map(
            (t) =>
              `${t.controlName}\nInquiry: ${t.inquiry}\nInspection: ${t.inspection}\nReperformance: ${t.reperformance}\nRecalculation: ${t.recalculation}\nWalkthrough: ${t.walkthrough}\nSample Selection: ${t.sampleSelection}\nEvidence Review: ${t.evidenceReview}`
          )
          .join("\n\n")}
        accent="#1e40af"
      >
        <div className="space-y-5">
          {output.testingProcedures.map((proc, i) => (
            <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
                <p className="text-sm font-semibold text-blue-900">{proc.controlName}</p>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  ["Inquiry", proc.inquiry],
                  ["Inspection", proc.inspection],
                  ["Reperformance", proc.reperformance],
                  ["Recalculation", proc.recalculation],
                  ["Walkthrough", proc.walkthrough],
                  ["Sample Selection", proc.sampleSelection],
                  ["Evidence Review", proc.evidenceReview],
                ].map(([label, value]) => (
                  <div key={label} className="px-4 py-2.5 flex gap-3 text-sm">
                    <span className="font-medium text-slate-500 w-36 shrink-0">{label}</span>
                    <span className="text-slate-700 leading-relaxed">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 5. Evidence Required */}
      <SectionCard
        title="5. Evidence Required"
        icon={<FileText className="w-4 h-4" />}
        content={output.evidenceRequired.join("\n")}
        accent="#065f46"
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {output.evidenceRequired.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* 6. Red Flags */}
      <SectionCard
        title="6. Red Flags"
        icon={<Flag className="w-4 h-4" />}
        content={output.redFlags.join("\n")}
        accent="#991b1b"
      >
        <ul className="space-y-2">
          {output.redFlags.map((flag, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 p-2.5 rounded-lg bg-red-50 border border-red-100">
              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              {flag}
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* 7. Monitoring Recommendations */}
      <SectionCard
        title="7. Monitoring Recommendations"
        icon={<Activity className="w-4 h-4" />}
        content={output.monitoringRecommendations.join("\n")}
        accent="#1e3a5f"
      >
        <ul className="space-y-3">
          {output.monitoringRecommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="mt-0.5 w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-semibold shrink-0">
                {i + 1}
              </span>
              <span className="leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* 8. Executive Summary */}
      <SectionCard
        title="8. Executive Summary"
        icon={<BookOpen className="w-4 h-4" />}
        content={output.executiveSummary}
        accent={NAVY}
      >
        <p className="text-sm text-slate-700 leading-relaxed">{output.executiveSummary}</p>
      </SectionCard>

      {/* Disclaimer */}
      <div className="border border-amber-200 bg-amber-50 rounded-xl px-6 py-4">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This output is for workflow and control design support only and should be reviewed by a qualified transfer pricing professional. TP ORCA AI does not provide legal or tax advice and does not replace the judgment of experienced transfer pricing specialists.
        </p>
      </div>
    </div>
  );
}
