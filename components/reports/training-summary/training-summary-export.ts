import {
  TRAINING_PROGRESS_STATUS_LABEL,
  type TrainingSummaryRow,
} from "@/data/reports/training-summary-types";
import { formatDate, formatDateTime } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

export const TRAINING_SUMMARY_EXPORT_COLUMNS: ExportColumn<TrainingSummaryRow>[] =
  [
    { header: "Serial #", getValue: (_row, index) => String(index + 1) },
    { header: "Training", getValue: (row) => row.trainingName },
    { header: "Sub-training", getValue: (row) => row.subTrainingName },
    { header: "Description", getValue: (row) => row.description },
    {
      header: "Publish Date",
      getValue: (row) => formatDateTime(row.publishDate),
    },
    {
      header: "Start and End Date",
      getValue: (row) =>
        `${formatDate(row.startDate)} – ${formatDate(row.endDate)}`,
    },
    { header: "Publish By", getValue: (row) => row.publishedBy },
    {
      header: "Total Assigned Employees",
      getValue: (row) => String(row.assignedEmployees),
    },
    {
      header: "Training Attempted by Employees",
      getValue: (row) => String(row.attemptedByEmployees),
    },
    { header: "Total Slides", getValue: (row) => String(row.totalSlides) },
    {
      header: "Status",
      getValue: (row) => (row.status === "active" ? "Active" : "Inactive"),
    },
    {
      header: "Training Status",
      getValue: (row) => TRAINING_PROGRESS_STATUS_LABEL[row.trainingStatus],
    },
  ];
