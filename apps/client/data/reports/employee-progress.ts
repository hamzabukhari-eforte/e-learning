import {
  EMPTY_MONTH_METRICS,
  type EmployeeProgressFilter,
  type EmployeeProgressRow,
  type MonthMetrics,
  type ProgressMonth,
} from "@/data/reports/employee-progress-types";
import { EMPLOYEE_PROGRESS_SEED } from "@/data/reports/employee-progress-seed";
import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";

export type {
  EmployeeProgressFilter,
  EmployeeProgressRow,
  MonthMetrics,
  ProgressMonth,
};

const records = [...EMPLOYEE_PROGRESS_SEED];

export function monthsInDateRange(
  dateFrom: string,
  dateTo: string,
): ProgressMonth[] {
  if (!dateFrom || !dateTo) return [];
  const start = new Date(dateFrom);
  const end = new Date(dateTo);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];
  if (end < start) return [];

  const months: ProgressMonth[] = [];
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(end.getFullYear(), end.getMonth(), 1);
  const spansYears = start.getFullYear() !== end.getFullYear();

  while (cursor <= last) {
    const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
    const monthName = cursor.toLocaleString("en-US", { month: "long" });
    months.push({
      key,
      label: spansYears ? `${monthName} ${cursor.getFullYear()}` : monthName,
    });
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }
  return months;
}

export function metricsForMonth(
  row: EmployeeProgressRow,
  monthKey: string,
): MonthMetrics {
  return row.months[monthKey] ?? EMPTY_MONTH_METRICS;
}

export async function listEmployeeProgress(params?: {
  filter?: Partial<EmployeeProgressFilter>;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<EmployeeProgressRow>> {
  await delay();
  const filter = params?.filter ?? {};
  const search = params?.search ?? "";
  const filtered = records.filter((item) => {
    if (filter.trainingId && item.trainingId !== filter.trainingId) return false;
    if (filter.subTrainingId && item.subTrainingId !== filter.subTrainingId)
      return false;
    if (filter.employeeId && item.employeeId !== filter.employeeId) return false;
    return (
      matchesSearch(item.employeeNo, search) ||
      matchesSearch(item.employeeName, search) ||
      matchesSearch(item.subTrainingName, search)
    );
  });
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
