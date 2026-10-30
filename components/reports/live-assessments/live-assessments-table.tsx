"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import type { LiveAssessment } from "@/data/reports/live-assessment-types";
import { formatDate, formatDateTime } from "@/lib/datetime";

type LiveAssessmentsTableProps = {
  rows: LiveAssessment[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onViewScore: (row: LiveAssessment) => void;
};

export function LiveAssessmentsTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onViewScore,
}: LiveAssessmentsTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search live assessments..."
      headers={[
        "Serial #",
        "Assigned Quiz ID",
        "Quiz Name",
        "Type",
        "Assign Date",
        "Validity",
        "View Score",
      ]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7} className="py-8 text-center text-zinc-500">
            No live assessments found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.assignedQuizId}</TableCell>
            <TableCell className="whitespace-nowrap">{row.quizName}</TableCell>
            <TableCell>{QUIZ_ASSIGN_TYPE_LABEL[row.quizType]}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.assignedAt)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDate(row.validFrom)} – {formatDate(row.validTo)}
            </TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => onViewScore(row)}
              >
                View Score
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
