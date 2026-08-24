import { TEST_TYPE_LABEL, type TestAttemptDetail } from "@/data/reports/types";
import { formatDate } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

export const TEST_DETAIL_EXPORT_COLUMNS: ExportColumn<TestAttemptDetail>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Training", getValue: (row) => row.trainingName },
  { header: "Sub Training", getValue: (row) => row.subTrainingName },
  { header: "Trainer", getValue: (row) => row.trainerName },
  { header: "Employee No", getValue: (row) => row.employeeNo },
  { header: "Employee Name", getValue: (row) => row.employeeName },
  { header: "Assign Date", getValue: (row) => formatDate(row.assignDate) },
  { header: "Test Name", getValue: (row) => row.testName },
  { header: "Test Type", getValue: (row) => TEST_TYPE_LABEL[row.testType] },
  { header: "Valid From Date", getValue: (row) => formatDate(row.validFrom) },
  { header: "Valid Till Date", getValue: (row) => formatDate(row.validTill) },
  { header: "No of Attempts", getValue: (row) => String(row.attemptCount) },
];
