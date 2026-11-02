"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { AssignTrainingRow } from "@/components/assign-training/assign-training-row";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Training } from "@/data/system-setup/types";

type AssignTrainingTableProps = {
  rows: Training[];
  selectedIds: string[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onToggle: (id: string) => void;
};

export function AssignTrainingTable({
  rows,
  selectedIds,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onToggle,
}: AssignTrainingTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search training..."
      headers={["Serial #", "Training ID", "Training Name", "Status"]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={4} className="py-8 text-center text-zinc-500">
            No trainings found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <AssignTrainingRow
            key={row.id}
            row={row}
            index={(page - 1) * pageSize + index}
            checked={selectedIds.includes(row.id)}
            onToggle={onToggle}
          />
        ))
      )}
    </DataTableShell>
  );
}
