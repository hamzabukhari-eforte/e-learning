import {
  formatQuestionBody,
  QUESTION_TYPE_LABEL,
} from "@/data/survey/types";
import type { ExamQuestion } from "@/data/exams/types";
import type { ExportColumn } from "@/lib/table-export";

export const EXAM_QUESTION_EXPORT_COLUMNS: ExportColumn<ExamQuestion>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Training", getValue: (row) => row.trainingName },
  { header: "Sub training", getValue: (row) => row.subTrainingName },
  {
    header: "Question type",
    getValue: (row) => QUESTION_TYPE_LABEL[row.type],
  },
  { header: "Question", getValue: (row) => formatQuestionBody(row) },
  { header: "Created by", getValue: (row) => row.createdBy },
];
