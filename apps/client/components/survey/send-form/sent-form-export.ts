import {
  SENT_FORM_TYPE_LABEL,
  type SentForm,
} from "@/data/survey/types";
import { formatDateTime, formatValidity } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

export const SENT_FORM_EXPORT_COLUMNS: ExportColumn<SentForm>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "ID", getValue: (row) => row.id },
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
];
