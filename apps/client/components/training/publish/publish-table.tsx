"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { StatusBadge } from "@/components/system-setup/status-badge";
import { PublishRowActions } from "@/components/training/publish/publish-row-actions";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import { purposeLabel, type PublishedTraining } from "@/data/training/publish-types";
import { formatDate, formatDateTime } from "@/lib/datetime";

type PublishTableProps = {
  rows: PublishedTraining[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onViewEmployees: (row: PublishedTraining) => void;
  onChangeStatus: (row: PublishedTraining) => void;
};

export function PublishTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onViewEmployees,
  onChangeStatus,
}: PublishTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search published training..."
      headers={[
        "Serial #",
        "Training name",
        "Assign date time",
        "Validity (from - to)",
        "Purpose",
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
          <TableCell colSpan={7} className="py-8 text-center text-zinc-500">
            No published trainings found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.assignedAt)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDate(row.validityFrom)} – {formatDate(row.validityTo)}
            </TableCell>
            <TableCell>{purposeLabel(row.purpose)}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
            <TableCell>
              <PublishRowActions
                onViewEmployees={() => onViewEmployees(row)}
                onChangeStatus={() => onChangeStatus(row)}
              />
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
