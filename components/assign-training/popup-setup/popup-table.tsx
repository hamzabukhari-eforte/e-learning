"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { RowActions } from "@/components/system-setup/row-actions";
import { StatusBadge } from "@/components/system-setup/status-badge";
import { ExportButtons } from "@/components/survey/export-buttons";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { PopupSetup } from "@/data/assign-training/popup-setup";
import type { ExportColumn } from "@/lib/table-export";

const EXPORT_COLUMNS: ExportColumn<PopupSetup>[] = [
  { header: "Serial #", getValue: (_, i) => String(i + 1) },
  { header: "Minutes", getValue: (r) => String(r.minutes) },
  { header: "Seconds", getValue: (r) => String(r.seconds) },
  { header: "Status", getValue: (r) => r.status },
];

type PopupTableProps = {
  rows: PopupSetup[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onEdit: (row: PopupSetup) => void;
  onDelete: (row: PopupSetup) => void;
  getExportRows: () => Promise<PopupSetup[]>;
};

export function PopupTable({
  rows, page, pageSize, totalPages, total,
  search, onSearchChange, onPageChange, onPageSizeChange,
  onEdit, onDelete, getExportRows,
}: PopupTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search popup setup..."
      headers={["Serial #", "Minutes", "Seconds", "Status", "Actions"]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Popup Setup"
          filename="popup-setup"
          columns={EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={5} className="py-8 text-center text-zinc-500">
            No popup setups found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell>{row.minutes}</TableCell>
            <TableCell>{row.seconds}</TableCell>
            <TableCell><StatusBadge status={row.status} /></TableCell>
            <TableCell>
              <RowActions onEdit={() => onEdit(row)} onDelete={() => onDelete(row)} />
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
