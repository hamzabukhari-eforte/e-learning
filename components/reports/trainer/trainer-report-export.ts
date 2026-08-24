import type { Trainer } from "@/data/registration/types";
import type { ExportColumn } from "@/lib/table-export";

const TYPE_LABEL: Record<Trainer["trainerType"], string> = {
  master: "Master",
  departmental: "Departmental",
};

export const TRAINER_REPORT_EXPORT_COLUMNS: ExportColumn<Trainer>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Employee Name", getValue: (row) => row.employeeName },
  {
    header: "Trainer Type",
    getValue: (row) => TYPE_LABEL[row.trainerType],
  },
  { header: "Status", getValue: (row) => row.status },
];

export { TYPE_LABEL as TRAINER_TYPE_LABEL };
