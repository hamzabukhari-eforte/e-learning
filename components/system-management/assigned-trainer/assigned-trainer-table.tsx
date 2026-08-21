"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { AssignedTrainerRow } from "@/components/system-management/assigned-trainer/assigned-trainer-row";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { AssignedTrainer } from "@/data/assign-training/types";

const HEADERS = ["Serial #", "ID", "Name", "Courses", "Actions"];

type AssignedTrainerTableProps = {
  rows: AssignedTrainer[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onUnassign: (row: AssignedTrainer) => void;
};

export function AssignedTrainerTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onUnassign,
}: AssignedTrainerTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search assigned trainer..."
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
            No assigned trainers found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <AssignedTrainerRow
            key={row.trainerId}
            row={row}
            serial={(page - 1) * pageSize + index + 1}
            onUnassign={onUnassign}
          />
        ))
      )}
    </DataTableShell>
  );
}
