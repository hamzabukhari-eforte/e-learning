import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import type { TestWiseAssessment } from "@/data/reports/test-wise-analysis-types";
import { formatDateTime } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

export const TEST_WISE_ASSESSMENT_EXPORT_COLUMNS: ExportColumn<TestWiseAssessment>[] =
  [
    { header: "Sr.No", getValue: (_row, index) => String(index + 1) },
    { header: "Test Name", getValue: (row) => row.testName },
    {
      header: "Test Type",
      getValue: (row) => QUIZ_ASSIGN_TYPE_LABEL[row.testType],
    },
    {
      header: "Valid From",
      getValue: (row) => formatDateTime(row.validFrom),
    },
    {
      header: "Valid Till",
      getValue: (row) => formatDateTime(row.validTill),
    },
    {
      header: "Assigned Date",
      getValue: (row) => formatDateTime(row.assignedDate),
    },
    {
      header: "Total Assigned Employees",
      getValue: (row) => String(row.totalAssignedEmployees),
    },
    {
      header: "Total Attempted Employees",
      getValue: (row) => String(row.totalAttemptedEmployees),
    },
    {
      header: "Average Score",
      getValue: (row) => String(row.averageScore),
    },
  ];
