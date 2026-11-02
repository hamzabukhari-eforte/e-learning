import type { GroupChat } from "@/data/group-chat/types";
import type { ExportColumn } from "@/lib/table-export";
import { formatDateTime } from "@/lib/datetime";

export const GROUP_CHAT_EXPORT_COLUMNS: ExportColumn<GroupChat>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Group title", getValue: (row) => row.title },
  {
    header: "Sent Date",
    getValue: (row) => formatDateTime(row.sentAt),
  },
  {
    header: "End Date",
    getValue: (row) => formatDateTime(row.endAt),
  },
];
