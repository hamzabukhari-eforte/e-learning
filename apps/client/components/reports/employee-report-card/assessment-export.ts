import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import type { ReportCardAssessment } from "@/data/reports/employee-report-card-types";
import { formatDateTime } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

export const REPORT_CARD_ASSESSMENT_EXPORT: ExportColumn<ReportCardAssessment>[] =
  [
    { header: "Sr.No", getValue: (_row, index) => String(index + 1) },
    { header: "Training", getValue: (row) => row.trainingName },
    { header: "SubTraining", getValue: (row) => row.subTrainingName },
    { header: "Test Name", getValue: (row) => row.testName },
    {
      header: "Test Type",
      getValue: (row) => QUIZ_ASSIGN_TYPE_LABEL[row.testType],
    },
    { header: "Valid From", getValue: (row) => formatDateTime(row.validFrom) },
    { header: "Valid Till", getValue: (row) => formatDateTime(row.validTill) },
    {
      header: "Total Questions",
      getValue: (row) => String(row.totalQuestions),
    },
    {
      header: "Total Wrong Questions",
      getValue: (row) => String(row.totalWrongQuestions),
    },
    { header: "Attempt No.", getValue: (row) => String(row.attemptNo) },
  ];
