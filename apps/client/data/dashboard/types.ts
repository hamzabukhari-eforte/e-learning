export type DashboardKpis = {
  registeredEmployees: number;
  unregisteredEmployees: number;
  registeredTrainers: number;
  unregisteredTrainers: number;
};

export type ChartSlice = {
  name: string;
  value: number;
  color: string;
};

export type DashboardOverview = {
  kpis: DashboardKpis;
  gender: ChartSlice[];
  departments: ChartSlice[];
  trainerTypes: ChartSlice[];
  trainingStatus: ChartSlice[];
  surveyAttempts: ChartSlice[];
  testSubmitStatus: ChartSlice[];
};
