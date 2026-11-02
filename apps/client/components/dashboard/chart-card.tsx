"use client";

import type { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  children: ReactNode;
};

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-black">{title}</h3>
      <div className="h-64 w-full">{children}</div>
    </div>
  );
}
