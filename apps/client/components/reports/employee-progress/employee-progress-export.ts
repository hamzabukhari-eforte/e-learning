import type {
  EmployeeProgressRow,
  ProgressMonth,
} from "@/data/reports/employee-progress-types";
import { metricsForMonth } from "@/data/reports/employee-progress";
import type { ExportColumn } from "@/lib/table-export";

export function buildEmployeeProgressExportColumns(
  months: ProgressMonth[],
): ExportColumn<EmployeeProgressRow>[] {
  const base: ExportColumn<EmployeeProgressRow>[] = [
    { header: "Employee No", getValue: (row) => row.employeeNo },
    { header: "Employee Name", getValue: (row) => row.employeeName },
    { header: "Sub-Training Name", getValue: (row) => row.subTrainingName },
  ];

  const monthColumns = months.flatMap((month) => [
    {
      header: `${month.label} - Total Assigned`,
      getValue: (row: EmployeeProgressRow) =>
        String(metricsForMonth(row, month.key).totalAssigned),
    },
    {
      header: `${month.label} - Assignment`,
      getValue: (row: EmployeeProgressRow) =>
        String(metricsForMonth(row, month.key).assignment),
    },
    {
      header: `${month.label} - Time Dependant`,
      getValue: (row: EmployeeProgressRow) =>
        String(metricsForMonth(row, month.key).timeDependant),
    },
  ]);

  return [...base, ...monthColumns];
}
