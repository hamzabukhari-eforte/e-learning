import type { MaterialSlide } from "@/data/training/types";
import type { ExportColumn } from "@/lib/table-export";

export const SEQUENCE_EXPORT_COLUMNS: ExportColumn<MaterialSlide>[] = [
  { header: "Sr.No", getValue: (_, index) => String(index + 1) },
  { header: "File Name", getValue: (row) => row.fileName },
  { header: "Date", getValue: (row) => row.date },
  { header: "Slide Sequence", getValue: (row) => String(row.sequence) },
  { header: "Minutes", getValue: (row) => row.minutes },
  { header: "Seconds", getValue: (row) => row.seconds },
];
