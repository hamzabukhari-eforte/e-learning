import { TEST_TYPE_LABEL, type TestAttemptSummary } from "@/data/reports/types";
import { formatDateTime } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

export const TEST_SUMMARY_EXPORT_COLUMNS: ExportColumn<TestAttemptSummary>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Training", getValue: (row) => row.trainingName },
  { header: "Sub-Training", getValue: (row) => row.subTrainingName },
  { header: "Trainer", getValue: (row) => row.trainerName },
  { header: "Test Name", getValue: (row) => row.testName },
  { header: "Test Type", getValue: (row) => TEST_TYPE_LABEL[row.testType] },
  { header: "Valid From", getValue: (row) => formatDateTime(row.validFrom) },
  { header: "Valid Till", getValue: (row) => formatDateTime(row.validTill) },
  {
    header: "Total Assigned Employees",
    getValue: (row) => String(row.totalAssigned),
  },
  {
    header: "Total Attempted Employee",
    getValue: (row) => String(row.totalAttempted),
  },
];
