"use client";

import { TruncatedDescription } from "@/components/reports/training-summary/truncated-description";
import { TRAINING_SUMMARY_EXPORT_COLUMNS } from "@/components/reports/training-summary/training-summary-export";
import { TrainingStatusBadge } from "@/components/reports/training-summary/training-status-badge";
import { TrainingSummaryRowActions } from "@/components/reports/training-summary/training-summary-row-actions";
import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { StatusBadge } from "@/components/system-setup/status-badge";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { ExportButtons } from "@/components/survey/export-buttons";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TrainingSummaryRow } from "@/data/reports/training-summary-types";
import { formatDate, formatDateTime } from "@/lib/datetime";

const HEADERS = [
  "Serial #",
  "Training",
  "Sub-training",
  "Description",
  "Publish Date",
  "Start and End Date",
  "Publish By",
  "Total Assigned Employees",
  "Training Attempted by Employees",
  "Total Slides",
  "Status",
  "Training Status",
  "Action",
];

type TrainingSummaryTableProps = {
  rows: TrainingSummaryRow[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<TrainingSummaryRow[]>;
  onViewContent: (row: TrainingSummaryRow) => void;
  onViewAssigned: (row: TrainingSummaryRow) => void;
  onViewAttempted: (row: TrainingSummaryRow) => void;
};

export function TrainingSummaryTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  getExportRows,
  onViewContent,
  onViewAssigned,
  onViewAttempted,
}: TrainingSummaryTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search training summary..."
      headers={HEADERS}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Training Summary"
          filename="training-summary"
          columns={TRAINING_SUMMARY_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={HEADERS.length}
            className="py-8 text-center text-zinc-500"
          >
            No training summary records found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
            <TableCell className="whitespace-nowrap">
              {row.subTrainingName}
            </TableCell>
            <TableCell>
              <TruncatedDescription text={row.description} />
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.publishDate)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDate(row.startDate)} – {formatDate(row.endDate)}
            </TableCell>
            <TableCell className="whitespace-nowrap">{row.publishedBy}</TableCell>
            <TableCell>{row.assignedEmployees}</TableCell>
            <TableCell>{row.attemptedByEmployees}</TableCell>
            <TableCell>{row.totalSlides}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
            <TableCell>
              <TrainingStatusBadge status={row.trainingStatus} />
            </TableCell>
            <TableCell>
              <TrainingSummaryRowActions
                onViewContent={() => onViewContent(row)}
                onViewAssigned={() => onViewAssigned(row)}
                onViewAttempted={() => onViewAttempted(row)}
              />
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
