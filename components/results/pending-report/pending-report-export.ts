import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import type { PendingResultRow } from "@/data/results/types";
import type { ExportColumn } from "@/lib/table-export";
import { formatDateTime } from "@/lib/datetime";

export const PENDING_RESULT_EXPORT_COLUMNS: ExportColumn<PendingResultRow>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Training", getValue: (row) => row.trainingName },
  { header: "Sub training", getValue: (row) => row.subTrainingName },
  { header: "Quiz name", getValue: (row) => row.quizName },
  {
    header: "Quiz type",
    getValue: (row) => QUIZ_ASSIGN_TYPE_LABEL[row.quizType],
  },
  {
    header: "Assign date",
    getValue: (row) => formatDateTime(row.assignedAt),
  },
  {
    header: "Assigned employees",
    getValue: (row) => String(row.assignedEmployees.length),
  },
  {
    header: "Attempted employees",
    getValue: (row) => String(row.attemptedEmployees.length),
  },
  {
    header: "Pending employee results",
    getValue: (row) => String(row.pendingEmployees.length),
  },
];
