import type { ProgressMonth } from "@/data/reports/employee-progress-types";
import { EMPTY_MONTH_METRICS } from "@/data/reports/employee-progress-types";
import type { ReportCardProgressRow } from "@/data/reports/employee-report-card-types";
import type { ExportColumn } from "@/lib/table-export";

export function buildReportCardProgressExport(
  months: ProgressMonth[],
): ExportColumn<ReportCardProgressRow>[] {
  const base: ExportColumn<ReportCardProgressRow>[] = [
    { header: "Sub-Training Name", getValue: (row) => row.subTrainingName },
    { header: "Employee Name", getValue: (row) => row.employeeName },
    { header: "Employee No", getValue: (row) => row.employeeNo },
  ];

  const monthColumns = months.flatMap((month) => [
    {
      header: `${month.label} - Total Assigned`,
      getValue: (row: ReportCardProgressRow) =>
        String(
          (row.months[month.key] ?? EMPTY_MONTH_METRICS).totalAssigned,
        ),
    },
    {
      header: `${month.label} - Assignment`,
      getValue: (row: ReportCardProgressRow) =>
        String((row.months[month.key] ?? EMPTY_MONTH_METRICS).assignment),
    },
    {
      header: `${month.label} - Time Dependant`,
      getValue: (row: ReportCardProgressRow) =>
        String((row.months[month.key] ?? EMPTY_MONTH_METRICS).timeDependant),
    },
  ]);

  return [...base, ...monthColumns];
}
