import {
  feedbackStatusLabel,
  type AssignedFeedback,
} from "@/data/feedback/types";
import type { ExportColumn } from "@/lib/table-export";
import { formatDate, formatDateTime } from "@/lib/datetime";

export const FEEDBACK_EXPORT_COLUMNS: ExportColumn<AssignedFeedback>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  {
    header: "Sub training Start and end date",
    getValue: (row) =>
      `${formatDate(row.startDate)} – ${formatDate(row.endDate)}`,
  },
  { header: "Employee name", getValue: (row) => row.employeeName },
  {
    header: "Feedback status",
    getValue: (row) => feedbackStatusLabel(row.status),
  },
  {
    header: "Assign date",
    getValue: (row) => formatDateTime(row.assignedAt),
  },
];
