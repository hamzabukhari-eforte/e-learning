import type { FocusItem } from "@/data/reports/items-to-focus-types";
import { QUESTION_TYPE_LABEL } from "@/data/survey/types";
import type { ExportColumn } from "@/lib/table-export";

export const ITEMS_TO_FOCUS_EXPORT_COLUMNS: ExportColumn<FocusItem>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Question", getValue: (row) => row.question },
  {
    header: "Question Type",
    getValue: (row) => QUESTION_TYPE_LABEL[row.questionType],
  },
  { header: "Category", getValue: (row) => row.category },
];
