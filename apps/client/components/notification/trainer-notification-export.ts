import type { TrainerNotification } from "@/data/notification/trainer-types";
import type { ExportColumn } from "@/lib/table-export";
import { formatDateTime } from "@/lib/datetime";

export const TRAINER_NOTIFICATION_EXPORT_COLUMNS: ExportColumn<TrainerNotification>[] =
  [
    { header: "Serial #", getValue: (_row, index) => String(index + 1) },
    {
      header: "Date and Time",
      getValue: (row) => formatDateTime(row.createdAt),
    },
    { header: "Notification Text", getValue: (row) => row.text },
  ];
