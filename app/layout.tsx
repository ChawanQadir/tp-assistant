import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TP ORCA AI — Transfer Pricing Risk & Controls Intelligence",
  description:
    "Generate ORCA-based transfer pricing risk, control, testing, and evidence frameworks in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <span>
              &copy; {new Date().getFullYear()} TP ORCA AI. For workflow support only.
            </span>
            <span>Not legal or tax advice. Review all output with a qualified professional.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
