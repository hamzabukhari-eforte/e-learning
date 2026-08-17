"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { ExportButtons } from "@/components/survey/export-buttons";
import { SENT_FORM_EXPORT_COLUMNS } from "@/components/survey/send-form/sent-form-export";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import { SENT_FORM_TYPE_LABEL, type SentForm } from "@/data/survey/types";
import { formatDateTime, formatValidity } from "@/lib/datetime";

type SentFormsTableProps = {
  rows: SentForm[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<SentForm[]>;
};

export function SentFormsTable({
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
}: SentFormsTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search sent forms..."
      headers={["S. No", "ID", "Form Name", "Form Type", "Assign Date", "Validity"]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Sent Forms"
          filename="sent-forms"
          columns={SENT_FORM_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={6} className="py-8 text-center text-zinc-500">
            No sent forms found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.formName}</TableCell>
            <TableCell>{SENT_FORM_TYPE_LABEL[row.formType]}</TableCell>
            <TableCell>{formatDateTime(row.assignedAt)}</TableCell>
            <TableCell>{formatValidity(row.validFrom, row.validTo)}</TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
