"use client";

import { TRAINER_NOTIFICATION_EXPORT_COLUMNS } from "@/components/notification/trainer-notification-export";
import { ExportButtons } from "@/components/survey/export-buttons";
import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { RowActions } from "@/components/system-setup/row-actions";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TrainerNotification } from "@/data/notification/trainer-types";
import { formatDateTime } from "@/lib/datetime";

type TrainerNotificationTableProps = {
  rows: TrainerNotification[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onEdit: (row: TrainerNotification) => void;
  onDelete: (row: TrainerNotification) => void;
  getExportRows: () => Promise<TrainerNotification[]>;
};

export function TrainerNotificationTable({
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
  getExportRows,
}: TrainerNotificationTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search notification..."
      headers={["Serial #", "Date and Time", "Notification Text", "Actions"]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Notifications"
          filename="trainer-notifications"
          columns={TRAINER_NOTIFICATION_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={4} className="py-8 text-center text-zinc-500">
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
