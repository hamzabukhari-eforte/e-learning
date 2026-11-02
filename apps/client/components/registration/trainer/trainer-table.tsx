"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { RowActions } from "@/components/system-setup/row-actions";
import { StatusBadge } from "@/components/system-setup/status-badge";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Trainer } from "@/data/registration/types";

const TYPE_LABEL: Record<Trainer["trainerType"], string> = {
  master: "Master",
  departmental: "Departmental",
};

type TrainerTableProps = {
  rows: Trainer[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onEdit: (row: Trainer) => void;
  onDelete: (row: Trainer) => void;
};

export function TrainerTable({
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
}: TrainerTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search trainer..."
      headers={["Serial #", "Employee Name", "Trainer Type", "Status", "Actions"]}
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
            No trainers found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell>{row.employeeName}</TableCell>
            <TableCell>{TYPE_LABEL[row.trainerType]}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
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
  );
}
