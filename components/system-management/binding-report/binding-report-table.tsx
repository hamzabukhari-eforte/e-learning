"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { BindingReportTableRow } from "@/components/system-management/binding-report/binding-report-row";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { BindingReportRow } from "@/data/assign-training/binding-types";

const HEADERS = [
  "Serial #",
  "Department Name",
  "Designation Name",
  "Training Name",
  "Sub-Training Name",
  "Actions",
];

type BindingReportTableProps = {
  rows: BindingReportRow[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onUnbind: (row: BindingReportRow) => void;
};

export function BindingReportTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onUnbind,
}: BindingReportTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search binding report..."
      headers={HEADERS}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={HEADERS.length}
            className="py-8 text-center text-zinc-500"
          >
            No bindings found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <BindingReportTableRow
            key={row.id}
            row={row}
            serial={(page - 1) * pageSize + index + 1}
            onUnbind={onUnbind}
          />
        ))
      )}
    </DataTableShell>
  );
}
