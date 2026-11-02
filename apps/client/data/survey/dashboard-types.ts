export type SurveyAnswerStat = {
  label: string;
  percentage: number;
  color: string;
};

export type SurveyQuestionChart = {
  questionNumber: number;
  questionId: string;
  question: string;
  answers: SurveyAnswerStat[];
};

export type SurveyDashboardFilter = {
  formId: string;
  assignedFormId: string;
};

export type SurveyDashboardReport = {
  formId: string;
  formName: string;
  assignedFormId: string;
  assignedLabel: string;
  questions: SurveyQuestionChart[];
};
