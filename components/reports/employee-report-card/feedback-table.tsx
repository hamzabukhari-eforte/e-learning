"use client";

import { useMemo, useState } from "react";
import { REPORT_CARD_FEEDBACK_EXPORT } from "@/components/reports/employee-report-card/feedback-export";
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
import { feedbackStatusLabel } from "@/data/feedback/types";
import type { ReportCardFeedback } from "@/data/reports/employee-report-card-types";
import { formatDateTime } from "@/lib/datetime";

type FeedbackTableProps = {
  rows: ReportCardFeedback[];
};

export function FeedbackTable({ rows }: FeedbackTableProps) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      [row.feedback, feedbackStatusLabel(row.status)]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [rows, search]);

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-4 py-3">
        <h2 className="text-base font-semibold text-[#042954]">
          Employee Positive/Negative Feedback
        </h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search feedback..."
        />
        <ExportButtons
          title="Employee Feedback"
          filename="employee-report-card-feedback"
          columns={REPORT_CARD_FEEDBACK_EXPORT}
          getRows={async () => filtered}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
            {["SNo", "Feedback", "Feedback Status", "Assign Date"].map(
              (header) => (
                <TableHead key={header}>{header}</TableHead>
              ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-8 text-center text-zinc-500">
                No data available in table.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-md">{row.feedback}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {feedbackStatusLabel(row.status)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDateTime(row.assignDate)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}
