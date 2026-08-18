import {
  SENT_FORM_TYPE_LABEL,
  type SurveyResult,
} from "@/data/survey/types";
import { formatDateTime, formatValidity } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

export const SURVEY_RESULT_EXPORT_COLUMNS: ExportColumn<SurveyResult>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Form Name", getValue: (row) => row.formName },
  {
    header: "Form Type",
    getValue: (row) => SENT_FORM_TYPE_LABEL[row.formType],
  },
  {
    header: "Assign Date",
    getValue: (row) => formatDateTime(row.assignedAt),
  },
  {
    header: "Validity",
    getValue: (row) => formatValidity(row.validFrom, row.validTo),
  },
  {
    header: "Assigned Employees",
    getValue: (row) => String(row.assignedCount),
  },
  {
    header: "Attempted Employees",
    getValue: (row) => String(row.attemptedCount),
  },
];
