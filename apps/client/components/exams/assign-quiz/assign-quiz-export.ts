import {
  QUIZ_ASSIGN_TYPE_LABEL,
  type AssignedQuiz,
} from "@/data/exams/types";
import type { ExportColumn } from "@/lib/table-export";
import { formatDate, formatDateTime } from "@/lib/datetime";

export const ASSIGNED_QUIZ_EXPORT_COLUMNS: ExportColumn<AssignedQuiz>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Assigned quiz id", getValue: (row) => row.assignedQuizId },
  { header: "Quiz name", getValue: (row) => row.quizName },
  {
    header: "Type",
    getValue: (row) => QUIZ_ASSIGN_TYPE_LABEL[row.quizType],
  },
  {
    header: "Assign date",
    getValue: (row) => formatDateTime(row.assignedAt),
  },
  {
    header: "Validity",
    getValue: (row) =>
      `${formatDate(row.validFrom)} – ${formatDate(row.validTo)}`,
  },
];
