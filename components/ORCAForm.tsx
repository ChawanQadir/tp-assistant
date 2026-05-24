"use client";

import { useState } from "react";
import { ORCAInput } from "@/lib/types";
import { Loader2, Zap } from "lucide-react";

const TRANSACTION_TYPES = [
  "Intercompany services",
  "Tangible goods",
  "IP licensing",
  "Cost sharing arrangement",
  "Financing transaction",
  "Management fees",
  "Other",
];

const DEFAULT: ORCAInput = {
  businessObjective: "",
  transferPricingRisk: "",
  transactionType: "IP licensing",
  jurisdictions: "",
  industry: "",
  additionalContext: "",
};

interface Props {
  onGenerate: (output: object, isMock: boolean) => void;
  onLoading: (loading: boolean) => void;
  loading: boolean;
}

export default function ORCAForm({ onGenerate, onLoading, loading }: Props) {
  const [form, setForm] = useState<ORCAInput>(DEFAULT);

  const set = (field: keyof ORCAInput) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      onGenerate(data.output, data.mock);
    } catch {
      onGenerate({}, true);
    } finally {
      onLoading(false);
    }
  };

  const NAVY = "#0f2a4a";

  const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";
  const inputClass =
    "w-full px-3.5 py-2.5 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Business Objective</label>
        <input
          className={inputClass}
          placeholder="Global tax compliance and risk mitigation"
          value={form.businessObjective}
          onChange={set("businessObjective")}
          required
        />
      </div>

      <div>
        <label className={labelClass}>Transfer Pricing Risk</label>
        <input
          className={inputClass}
          placeholder="Double taxation risk"
          value={form.transferPricingRisk}
          onChange={set("transferPricingRisk")}
          required
        />
      </div>

      <div>
        <label className={labelClass}>Transaction Type</label>
        <select
          className={inputClass}
          value={form.transactionType}
          onChange={set("transactionType")}
          required
        >
          {TRANSACTION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Countries / Jurisdictions Involved</label>
        <input
          className={inputClass}
          placeholder="United States and Ireland"
          value={form.jurisdictions}
          onChange={set("jurisdictions")}
          required
        />
      </div>

      <div>
        <label className={labelClass}>Industry</label>
        <input
          className={inputClass}
          placeholder="Technology, pharmaceuticals, retail, manufacturing..."
          value={form.industry}
          onChange={set("industry")}
          required
        />
      </div>

      <div>
        <label className={labelClass}>
          Optional Context{" "}
          <span className="normal-case text-slate-400 font-normal">(additional facts, entities, concerns)</span>
        </label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={5}
          placeholder="Describe the entity structure, current documentation status, known tax authority positions, APA or MAP history, or any other facts relevant to this analysis..."
          value={form.additionalContext}
          onChange={set("additionalContext")}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: NAVY }}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating Framework...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            Generate ORCA Framework
          </>
        )}
      </button>
    </form>
  );
}
