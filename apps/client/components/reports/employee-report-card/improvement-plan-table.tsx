"use client";

import { useMemo, useState } from "react";
import { REPORT_CARD_PLAN_EXPORT } from "@/components/reports/employee-report-card/improvement-plan-export";
import { SearchField } from "@/components/system-setup/search-field";
import { ExportButtons } from "@/components/survey/export-buttons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IMPROVEMENT_PLAN_STATUS_LABEL,
  type ReportCardImprovementPlan,
} from "@/data/reports/employee-report-card-types";
import { formatDate } from "@/lib/datetime";

type ImprovementPlanTableProps = {
  rows: ReportCardImprovementPlan[];
};

export function ImprovementPlanTable({ rows }: ImprovementPlanTableProps) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      [
        row.subTrainingName,
        row.message,
        IMPROVEMENT_PLAN_STATUS_LABEL[row.status],
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [rows, search]);

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-4 py-3">
        <h2 className="text-base font-semibold text-[#042954]">
          Employee Improvement Plan
        </h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search improvement plans..."
        />
        <ExportButtons
          title="Employee Improvement Plan"
          filename="employee-report-card-improvement-plan"
          columns={REPORT_CARD_PLAN_EXPORT}
          getRows={async () => filtered}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
            {[
              "SNo",
              "Sub-Training",
              "Message",
              "Send Date",
              "End Date",
              "Status",
            ].map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center text-zinc-500">
                No data available in table.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.subTrainingName}
                </TableCell>
                <TableCell className="max-w-md">{row.message}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(row.sendDate)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(row.endDate)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {IMPROVEMENT_PLAN_STATUS_LABEL[row.status]}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}
