"use client";

import type { IconType } from "react-icons";

type KpiCardProps = {
  label: string;
  value: number;
  hint: string;
  accent: string;
  icon: IconType;
};

export function KpiCard({
  label,
  value,
  hint,
  accent,
  icon: Icon,
}: KpiCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className="flex size-11 items-center justify-center rounded-md"
          style={{ backgroundColor: `${accent}1A`, color: accent }}
        >
          <Icon className="size-5" aria-hidden />
        </div>
        <p className="text-3xl font-bold text-[#042954]">{value}</p>
      </div>
      <p className="text-sm font-medium text-zinc-700">{label}</p>
      <p className="mt-1 text-xs text-zinc-500">{hint}</p>
    </div>
  );
}
