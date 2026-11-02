import {
  formatQuestionBody,
  QUESTION_TYPE_LABEL,
  type SurveyQuestion,
} from "@/data/survey/types";
import type { ExportColumn } from "@/lib/table-export";

export const QUESTION_EXPORT_COLUMNS: ExportColumn<SurveyQuestion>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  {
    header: "Questions Type",
    getValue: (row) => QUESTION_TYPE_LABEL[row.type],
  },
  { header: "Questions", getValue: (row) => formatQuestionBody(row) },
  { header: "Created By", getValue: (row) => row.createdBy },
];
