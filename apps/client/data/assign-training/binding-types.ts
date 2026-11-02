export type DesignationBinding = {
  departmentId: string;
  designationId: string;
  subTrainingIds: string[];
};

export type BindingReportSubTraining = {
  id: string;
  name: string;
};

export type BindingReportRow = {
  id: string;
  departmentId: string;
  departmentName: string;
  designationId: string;
  designationName: string;
  trainingId: string;
  trainingName: string;
  subTrainings: BindingReportSubTraining[];
};
