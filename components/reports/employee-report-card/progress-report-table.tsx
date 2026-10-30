"use client";

import { useMemo, useState } from "react";
import { buildReportCardProgressExport } from "@/components/reports/employee-report-card/progress-export";
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
import { EMPTY_MONTH_METRICS } from "@/data/reports/employee-progress-types";
import type { ProgressMonth } from "@/data/reports/employee-progress-types";
import type { ReportCardProgressRow } from "@/data/reports/employee-report-card-types";

type ProgressReportTableProps = {
  rows: ReportCardProgressRow[];
  months: ProgressMonth[];
};

const STICKY =
  "sticky z-10 bg-inherit left-0 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.15)]";

export function ProgressReportTable({ rows, months }: ProgressReportTableProps) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      [row.subTrainingName, row.employeeName, row.employeeNo]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [rows, search]);

  const exportColumns = buildReportCardProgressExport(months);

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-4 py-3">
        <h2 className="text-base font-semibold text-[#042954]">
          Employee Progress Report
        </h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search progress..."
        />
        <ExportButtons
          title="Employee Progress Report"
          filename="employee-report-card-progress"
          columns={exportColumns}
          getRows={async () => filtered}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
            <TableHead
              rowSpan={months.length > 0 ? 2 : 1}
              className={`${STICKY} left-0 min-w-[12rem] bg-[#042954]`}
            >
              Sub-Training Name
            </TableHead>
            <TableHead
              rowSpan={months.length > 0 ? 2 : 1}
              className={`${STICKY} left-[12rem] min-w-[11rem] bg-[#042954]`}
            >
              Employee Name
            </TableHead>
            <TableHead
              rowSpan={months.length > 0 ? 2 : 1}
              className={`${STICKY} left-[23rem] min-w-[8rem] border-r border-white/20 bg-[#042954]`}
            >
              Employee No
            </TableHead>
            {months.map((month) => (
              <TableHead
                key={month.key}
                colSpan={3}
                className="border-l border-white/20 text-center"
              >
                {month.label}
              </TableHead>
            ))}
          </TableRow>
          {months.length > 0 ? (
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {months.map((month) => (
                <MonthSubHeaders key={month.key} />
              ))}
            </TableRow>
          ) : null}
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={Math.max(3, 3 + months.length * 3)}
                className="py-8 text-center text-zinc-500"
              >
                No data available in table.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((row) => (
              <TableRow key={row.id} className="group">
                <TableCell
                  className={`${STICKY} left-0 min-w-[12rem] whitespace-nowrap bg-white group-hover:bg-zinc-50`}
                >
                  {row.subTrainingName}
                </TableCell>
                <TableCell
                  className={`${STICKY} left-[12rem] min-w-[11rem] whitespace-nowrap bg-white group-hover:bg-zinc-50`}
                >
                  {row.employeeName}
                </TableCell>
                <TableCell
                  className={`${STICKY} left-[23rem] min-w-[8rem] border-r border-zinc-200 bg-white group-hover:bg-zinc-50`}
                >
                  {row.employeeNo}
                </TableCell>
                {months.map((month) => {
                  const metrics = row.months[month.key] ?? EMPTY_MONTH_METRICS;
                  return (
                    <MonthCells key={month.key} metrics={metrics} />
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}

function MonthSubHeaders() {
  return (
    <>
      <TableHead className="border-l border-white/20 text-center">
        Total Assigned
      </TableHead>
      <TableHead className="text-center">Assignment</TableHead>
      <TableHead className="text-center">Time Dependant</TableHead>
    </>
  );
}

function MonthCells({
  metrics,
}: {
  metrics: { totalAssigned: number; assignment: number; timeDependant: number };
}) {
  return (
    <>
      <TableCell className="border-l border-zinc-100 text-center">
        {metrics.totalAssigned}
      </TableCell>
      <TableCell className="text-center">
        {formatPercent(metrics.assignment)}
      </TableCell>
      <TableCell className="text-center">
        {formatPercent(metrics.timeDependant)}
      </TableCell>
    </>
  );
}

function formatPercent(value: number) {
  if (value === 0) return "0";
  return `${value.toFixed(2)}%`;
}
