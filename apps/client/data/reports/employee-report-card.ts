import { EMPLOYEE_REPORT_CARD_SEED } from "@/data/reports/employee-report-card-seed";
import type { EmployeeReportCard } from "@/data/reports/employee-report-card-types";

export type { EmployeeReportCard };

export async function getEmployeeReportCard(
  employeeId: string,
): Promise<EmployeeReportCard | null> {
  await delay();
  return EMPLOYEE_REPORT_CARD_SEED[employeeId] ?? null;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
