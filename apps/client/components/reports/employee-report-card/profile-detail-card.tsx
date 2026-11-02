"use client";

import type { ReportCardProfile } from "@/data/reports/employee-report-card-types";

type ProfileDetailCardProps = {
  profile: ReportCardProfile;
};

export function ProfileDetailCard({ profile }: ProfileDetailCardProps) {
  const rows = [
    { label: "Name", value: profile.name },
    { label: "Gender", value: profile.gender },
    { label: "Employee #", value: profile.employeeNo },
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
  ];

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-[#042954]">
        Employee Profile Detail
      </h2>
      <dl className="grid gap-3 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="space-y-1">
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {row.label}
            </dt>
            <dd className="text-sm font-medium text-black">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
