"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { StatusBadge } from "@/components/system-setup/status-badge";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Trainer } from "@/data/registration/types";

const TYPE_LABEL: Record<Trainer["trainerType"], string> = {
  master: "Master",
  departmental: "Departmental",
};

type TrainerDetailsTableProps = {
  rows: Trainer[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onRemove: (row: Trainer) => void;
};

export function TrainerDetailsTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onRemove,
}: TrainerDetailsTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search trainer..."
      headers={[
        "Serial #",
        "Employee Name",
        "Trainer Type",
        "Status",
        "Actions",
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 border-red-600 text-red-600 hover:bg-red-50"
                onClick={() => onRemove(row)}
              >
                Remove from trainer list
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
