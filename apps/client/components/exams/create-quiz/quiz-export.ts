import type { ExamQuiz } from "@/data/exams/types";
import type { ExportColumn } from "@/lib/table-export";
import { formatDate } from "@/lib/datetime";

export const QUIZ_EXPORT_COLUMNS: ExportColumn<ExamQuiz>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Sub training", getValue: (row) => row.subTrainingName },
  { header: "Training", getValue: (row) => row.trainingName },
  { header: "Quiz", getValue: (row) => row.name },
  { header: "Created by", getValue: (row) => row.createdBy },
  {
    header: "Created date",
    getValue: (row) => formatDate(`${row.createdDate}T00:00:00`),
  },
];
