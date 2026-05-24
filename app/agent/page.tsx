"use client";

import { useState } from "react";
import ORCAForm from "@/components/ORCAForm";
import ORCAOutputComponent from "@/components/ORCAOutput";
import { ORCAOutput } from "@/lib/types";
import { Sparkles } from "lucide-react";

const NAVY = "#0f2a4a";

export default function AgentPage() {
  const [output, setOutput] = useState<ORCAOutput | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (data: object, mock: boolean) => {
    setOutput(data as ORCAOutput);
    setIsMock(mock);
    setTimeout(() => {
      document.getElementById("output-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <Sparkles className="w-5 h-5" style={{ color: NAVY }} />
          <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
            ORCA Framework Agent
          </h1>
        </div>
        <p className="text-sm text-slate-500 max-w-xl">
          Complete the fields below and click <strong>Generate ORCA Framework</strong>. The agent will produce a structured transfer pricing risk, control, testing, and evidence framework tailored to your scenario.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-5">
              Input Parameters
            </h2>
            <ORCAForm
              onGenerate={handleGenerate}
              onLoading={setLoading}
              loading={loading}
            />
          </div>
        </div>

        {/* Right: Output */}
        <div className="lg:col-span-3" id="output-section">
          {!output && !loading && (
            <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-slate-200 rounded-xl text-center px-8">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${NAVY}10` }}
              >
                <Sparkles className="w-6 h-6" style={{ color: NAVY }} />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">No framework generated yet</h3>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                Fill in the parameters on the left and click &ldquo;Generate ORCA Framework&rdquo; to produce a comprehensive transfer pricing risk and controls analysis.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-slate-200 rounded-xl text-center px-8">
              <div className="relative mb-4">
                <div
                  className="w-14 h-14 rounded-full border-4 border-t-transparent animate-spin"
                  style={{ borderColor: `${NAVY}30`, borderTopColor: NAVY }}
                />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Generating ORCA Framework</h3>
              <p className="text-sm text-slate-400">
                Analyzing risks, designing controls, and building testing procedures...
              </p>
            </div>
          )}

          {output && !loading && (
            <ORCAOutputComponent output={output} isMock={isMock} />
          )}
        </div>
      </div>
    </div>
  );
}
