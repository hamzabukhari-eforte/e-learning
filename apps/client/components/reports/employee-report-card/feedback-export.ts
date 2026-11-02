import { feedbackStatusLabel } from "@/data/feedback/types";
import type { ReportCardFeedback } from "@/data/reports/employee-report-card-types";
import { formatDateTime } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

export const REPORT_CARD_FEEDBACK_EXPORT: ExportColumn<ReportCardFeedback>[] = [
  { header: "SNo", getValue: (_row, index) => String(index + 1) },
  { header: "Feedback", getValue: (row) => row.feedback },
  {
    header: "Feedback Status",
    getValue: (row) => feedbackStatusLabel(row.status),
  },
  {
    header: "Assign Date",
    getValue: (row) => formatDateTime(row.assignDate),
  },
];
