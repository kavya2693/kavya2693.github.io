"use client";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="no-print inline-flex min-h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-[0.9rem] text-ink hover:border-accent hover:text-accent">
      <Printer className="h-4 w-4" aria-hidden /> Save as PDF
    </button>
  );
}
