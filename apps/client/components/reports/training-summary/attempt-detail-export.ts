import type { TrainingAttemptEmployee } from "@/data/reports/training-summary-types";
import { formatDateTime } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

function displayDateTime(value: string) {
  return value ? formatDateTime(value) : "—";
}

export const ATTEMPT_DETAIL_EXPORT_COLUMNS: ExportColumn<TrainingAttemptEmployee>[] =
  [
    { header: "Sr.No", getValue: (_row, index) => String(index + 1) },
    { header: "Employee Name", getValue: (row) => row.name },
    { header: "Employee#", getValue: (row) => row.employeeNo },
    { header: "Sub-Training", getValue: (row) => row.subTrainingName },
    {
      header: "Start DateTime",
      getValue: (row) => displayDateTime(row.startDateTime),
    },
    {
      header: "End DateTime",
      getValue: (row) => displayDateTime(row.endDateTime),
    },
    {
      header: "Total Slides Attached",
      getValue: (row) => String(row.totalSlidesAttached),
    },
    {
      header: "Total Slides Attempts",
      getValue: (row) => String(row.totalSlidesAttempts),
    },
    {
      header: "1st Attempt Date",
      getValue: (row) => displayDateTime(row.firstAttemptDate),
    },
    {
      header: "Total Time Expected",
      getValue: (row) => row.totalTimeExpected,
    },
    { header: "Total Time Spent", getValue: (row) => row.totalTimeSpent },
  ];
