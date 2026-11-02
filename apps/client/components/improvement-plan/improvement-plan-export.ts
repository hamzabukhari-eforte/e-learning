import type { ImprovementPlan } from "@/data/improvement-plan/types";
import type { ExportColumn } from "@/lib/table-export";
import { formatDate, formatDateTime } from "@/lib/datetime";

export const IMPROVEMENT_PLAN_EXPORT_COLUMNS: ExportColumn<ImprovementPlan>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Training", getValue: (row) => row.trainingName },
  { header: "Sub training", getValue: (row) => row.subTrainingName },
  {
    header: "Sent date",
    getValue: (row) => formatDateTime(row.sentAt),
  },
  { header: "Message", getValue: (row) => row.taskMaterial },
  {
    header: "End date",
    getValue: (row) => formatDate(row.targetCompletionDate),
  },
  {
    header: "Sent to",
    getValue: (row) => row.employeeNames.join(", "),
  },
];
