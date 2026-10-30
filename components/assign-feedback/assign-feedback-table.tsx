"use client";

import { FEEDBACK_EXPORT_COLUMNS } from "@/components/assign-feedback/feedback-export";
import { FeedbackRowActions } from "@/components/assign-feedback/feedback-row-actions";
import { ExportButtons } from "@/components/survey/export-buttons";
import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  feedbackStatusLabel,
  type AssignedFeedback,
} from "@/data/feedback/types";
import { formatDate, formatDateTime } from "@/lib/datetime";

type AssignFeedbackTableProps = {
  rows: AssignedFeedback[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onAddComments: (row: AssignedFeedback) => void;
  onViewComments: (row: AssignedFeedback) => void;
  getExportRows: () => Promise<AssignedFeedback[]>;
};

export function AssignFeedbackTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onAddComments,
  onViewComments,
  getExportRows,
}: AssignFeedbackTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search feedback..."
      headers={[
        "Serial #",
        "Sub training Start and end date",
        "Employee name",
        "Feedback status",
        "Assign date",
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
          title="Assign Feedback"
          filename="assigned-feedback"
          columns={FEEDBACK_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={6} className="py-8 text-center text-zinc-500">
            No feedback assignments found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDate(row.startDate)} – {formatDate(row.endDate)}
            </TableCell>
            <TableCell className="whitespace-nowrap">{row.employeeName}</TableCell>
            <TableCell>{feedbackStatusLabel(row.status)}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.assignedAt)}
            </TableCell>
            <TableCell>
              <FeedbackRowActions
                onAddComments={() => onAddComments(row)}
                onViewComments={() => onViewComments(row)}
              />
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
