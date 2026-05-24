interface Props {
  label: string;
  variant?: "high" | "medium" | "low" | "preventive" | "detective" | "manual" | "automated" | "hybrid" | "neutral";
}

const styles: Record<string, string> = {
  high: "bg-red-50 text-red-700 border border-red-200",
  medium: "bg-amber-50 text-amber-700 border border-amber-200",
  low: "bg-green-50 text-green-700 border border-green-200",
  preventive: "bg-blue-50 text-blue-700 border border-blue-200",
  detective: "bg-purple-50 text-purple-700 border border-purple-200",
  manual: "bg-slate-50 text-slate-700 border border-slate-200",
  automated: "bg-teal-50 text-teal-700 border border-teal-200",
  hybrid: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  neutral: "bg-slate-50 text-slate-600 border border-slate-200",
};

export default function Badge({ label, variant = "neutral" }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
      {label}
    </span>
  );
}
