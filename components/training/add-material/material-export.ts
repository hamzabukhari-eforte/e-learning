import type { TrainingMaterial } from "@/data/training/types";
import type { ExportColumn } from "@/lib/table-export";

export const MATERIAL_EXPORT_COLUMNS: ExportColumn<TrainingMaterial>[] = [
  { header: "Serial #", getValue: (_, index) => String(index + 1) },
  { header: "Training title", getValue: (row) => row.trainingTitle },
  { header: "Sub training title", getValue: (row) => row.subTrainingTitle },
];
