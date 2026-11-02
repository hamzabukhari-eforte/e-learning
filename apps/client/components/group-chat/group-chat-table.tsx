"use client";

import { GROUP_CHAT_EXPORT_COLUMNS } from "@/components/group-chat/group-chat-export";
import { GroupChatRowActions } from "@/components/group-chat/group-chat-row-actions";
import { ExportButtons } from "@/components/survey/export-buttons";
import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { GroupChat } from "@/data/group-chat/types";
import { formatDateTime } from "@/lib/datetime";

type GroupChatTableProps = {
  rows: GroupChat[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onSentList: (row: GroupChat) => void;
  onViewMessage: (row: GroupChat) => void;
  onEdit: (row: GroupChat) => void;
  getExportRows: () => Promise<GroupChat[]>;
};

export function GroupChatTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onSentList,
  onViewMessage,
  onEdit,
  getExportRows,
}: GroupChatTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search group chats..."
      headers={["Serial #", "Group title", "Sent Date", "End Date", "Actions"]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Group Chat"
          filename="group-chat"
          columns={GROUP_CHAT_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={5} className="py-8 text-center text-zinc-500">
            No group chats found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.title}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.sentAt)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.endAt)}
            </TableCell>
            <TableCell>
              <GroupChatRowActions
                onSentList={() => onSentList(row)}
                onViewMessage={() => onViewMessage(row)}
                onEdit={() => onEdit(row)}
              />
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
