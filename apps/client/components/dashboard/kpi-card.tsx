"use client";

import type { IconType } from "react-icons";

type KpiCardProps = {
  label: string;
  value: number;
  accent: string;
  icon: IconType;
};

export function KpiCard({ label, value, accent, icon: Icon }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">

        <div
          className="flex size-11 items-center justify-center rounded-md"
          style={{ backgroundColor: `${accent}1A`, color: accent }}
        >
          <Icon className="size-5" />
        </div>
      <p className="mt-1 text-3xl font-bold text-[#042954]">{value}</p>

      </div>
      <p className="text-sm text-zinc-500">{label}</p>
    </div>
  );
}
