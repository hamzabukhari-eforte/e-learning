"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { StatusBadge } from "@/components/system-setup/status-badge";
import { ExportButtons } from "@/components/survey/export-buttons";
import {
  TRAINER_REPORT_EXPORT_COLUMNS,
  TRAINER_TYPE_LABEL,
} from "@/components/reports/trainer/trainer-report-export";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Trainer } from "@/data/registration/types";

const HEADERS = ["Serial #", "Employee Name", "Trainer Type", "Status"];

type TrainerReportTableProps = {
  rows: Trainer[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<Trainer[]>;
};

export function TrainerReportTable({
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
}: TrainerReportTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search trainer report..."
      headers={HEADERS}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Trainer Report"
          filename="trainer-report"
          columns={TRAINER_REPORT_EXPORT_COLUMNS}
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
            No trainers found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell>{row.employeeName}</TableCell>
            <TableCell>{TRAINER_TYPE_LABEL[row.trainerType]}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
