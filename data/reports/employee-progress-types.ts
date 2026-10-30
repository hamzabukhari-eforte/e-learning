export type MonthMetrics = {
  totalAssigned: number;
  assignment: number;
  timeDependant: number;
};

export type ProgressMonth = {
  key: string;
  label: string;
};

export type EmployeeProgressRow = {
  id: string;
  employeeId: string;
  employeeNo: string;
  employeeName: string;
  trainingId: string;
  subTrainingId: string;
  subTrainingName: string;
  /** Metrics keyed by YYYY-MM */
  months: Record<string, MonthMetrics>;
};

export type EmployeeProgressFilter = {
  dateFrom: string;
  dateTo: string;
  trainingId: string;
  subTrainingId: string;
  employeeId: string;
};

export const EMPTY_MONTH_METRICS: MonthMetrics = {
  totalAssigned: 0,
  assignment: 0,
  timeDependant: 0,
};
