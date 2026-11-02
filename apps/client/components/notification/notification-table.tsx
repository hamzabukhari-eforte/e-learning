"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { AppNotification } from "@/data/notification/types";
import { formatDateTime } from "@/lib/datetime";

const HEADERS = ["Serial #", "Date and Time", "Notification Text"];

type NotificationTableProps = {
  rows: AppNotification[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
};

export function NotificationTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
}: NotificationTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search notification..."
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
            No notifications found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.createdAt)}
            </TableCell>
            <TableCell className="max-w-xl whitespace-pre-wrap">
              {row.text}
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
