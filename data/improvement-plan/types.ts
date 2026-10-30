export type ImprovementPlanResponse = {
  id: string;
  employeeId: string;
  employeeName: string;
  response: string;
  respondedAt: string;
};

export type ImprovementPlan = {
  id: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  dateFrom: string;
  dateTo: string;
  employeeIds: string[];
  employeeNames: string[];
  targetCompletionDate: string;
  taskMaterial: string;
  sentAt: string;
  responses: ImprovementPlanResponse[];
};

export type ImprovementPlanInput = {
  dateFrom: string;
  dateTo: string;
  trainingId: string;
  subTrainingId: string;
  employeeIds: string[];
  targetCompletionDate: string;
  taskMaterial: string;
};
