"use client";

import { PENDING_RESULT_EXPORT_COLUMNS } from "@/components/results/pending-report/pending-report-export";
import { ExportButtons } from "@/components/survey/export-buttons";
import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import type { PendingResultRow } from "@/data/results/types";
import { formatDateTime } from "@/lib/datetime";

type PendingReportTableProps = {
  rows: PendingResultRow[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onAssignedEmployees: (row: PendingResultRow) => void;
  onAttemptedEmployees: (row: PendingResultRow) => void;
  onPendingEmployees: (row: PendingResultRow) => void;
  onViewDetails: (row: PendingResultRow) => void;
  getExportRows: () => Promise<PendingResultRow[]>;
};

export function PendingReportTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onAssignedEmployees,
  onAttemptedEmployees,
  onPendingEmployees,
  onViewDetails,
  getExportRows,
}: PendingReportTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search pending results..."
      headers={[
        "Serial #",
        "Training",
        "Sub training",
        "Quiz name",
        "Quiz type",
        "Assign date",
        "Assigned employees",
        "Attempted employee",
        "Pending employee results",
        "Action",
      ]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Pending Result's Report"
          filename="pending-results-report"
          columns={PENDING_RESULT_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={10} className="py-8 text-center text-zinc-500">
            No pending results found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
            <TableCell className="whitespace-nowrap">{row.subTrainingName}</TableCell>
            <TableCell className="whitespace-nowrap">{row.quizName}</TableCell>
            <TableCell>{QUIZ_ASSIGN_TYPE_LABEL[row.quizType]}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.assignedAt)}
            </TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => onAssignedEmployees(row)}
              >
                {row.assignedEmployees.length}
              </Button>
            </TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => onAttemptedEmployees(row)}
              >
                {row.attemptedEmployees.length}
              </Button>
            </TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => onPendingEmployees(row)}
              >
                {row.pendingEmployees.length}
              </Button>
            </TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => onViewDetails(row)}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
