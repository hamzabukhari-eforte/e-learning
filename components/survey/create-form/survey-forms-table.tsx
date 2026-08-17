"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { RowActions } from "@/components/system-setup/row-actions";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { SurveyForm } from "@/data/survey/types";

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type SurveyFormsTableProps = {
  rows: SurveyForm[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onEdit: (row: SurveyForm) => void;
  onDelete: (row: SurveyForm) => void;
};

export function SurveyFormsTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: SurveyFormsTableProps) {
  return (
    <div>
      <h2 className="border-b border-zinc-200 px-4 py-3 text-base font-semibold text-black">
        List of Forms
      </h2>
      <DataTableShell
        search={search}
        onSearchChange={onSearchChange}
        searchPlaceholder="Search forms..."
        headers={["S. No", "Form Name", "Created By", "Created Date", "Actions"]}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      >
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="py-8 text-center text-zinc-500">
              No forms found.
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.createdBy}</TableCell>
              <TableCell>{formatDate(row.createdDate)}</TableCell>
              <TableCell>
                <RowActions
                  onEdit={() => onEdit(row)}
                  onDelete={() => onDelete(row)}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </DataTableShell>
    </div>
  );
}
