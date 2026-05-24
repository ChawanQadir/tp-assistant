"use client";

import { useState, ReactNode } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  title: string;
  icon?: ReactNode;
  content: string;
  children: ReactNode;
  accent?: string;
}

export default function SectionCard({ title, icon, content, children, accent = "#0f2a4a" }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100" style={{ backgroundColor: `${accent}08` }}>
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: accent }}>
              {icon}
            </div>
          )}
          <h3 className="font-semibold text-base" style={{ color: accent }}>
            {title}
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
