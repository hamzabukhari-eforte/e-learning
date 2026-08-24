import {
  CHECK_STATUS_LABEL,
  SUBMIT_STATUS_LABEL,
  TEST_TYPE_LABEL,
  type TestAttemptHistory,
} from "@/data/reports/types";
import { formatDate } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

export const TEST_HISTORY_EXPORT_COLUMNS: ExportColumn<TestAttemptHistory>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Assigned Quiz ID", getValue: (row) => row.assignedQuizId },
  { header: "Training", getValue: (row) => row.trainingName },
  { header: "Sub Training", getValue: (row) => row.subTrainingName },
  { header: "Quiz Name", getValue: (row) => row.quizName },
  { header: "Quiz Type", getValue: (row) => TEST_TYPE_LABEL[row.quizType] },
  { header: "Employee No", getValue: (row) => row.employeeNo },
  { header: "Employee Name", getValue: (row) => row.employeeName },
  { header: "Assign Date", getValue: (row) => formatDate(row.assignDate) },
  { header: "Valid From Date", getValue: (row) => formatDate(row.validFrom) },
  { header: "Valid Till Date", getValue: (row) => formatDate(row.validTill) },
  { header: "Submit Status", getValue: (row) => SUBMIT_STATUS_LABEL[row.submitStatus] },
  { header: "Attempt Date", getValue: (row) => (row.attemptDate ? formatDate(row.attemptDate) : "—") },
  { header: "Attempt No", getValue: (row) => String(row.attemptNo) },
  { header: "Check Status", getValue: (row) => CHECK_STATUS_LABEL[row.checkStatus] },
  { header: "Total Marks", getValue: (row) => String(row.totalMarks) },
  { header: "Obtained Marks", getValue: (row) => String(row.obtainedMarks) },
  { header: "Percentage", getValue: (row) => `${row.percentage}%` },
  { header: "Grade", getValue: (row) => row.grade },
];
