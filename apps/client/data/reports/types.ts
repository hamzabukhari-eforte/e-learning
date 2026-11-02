export type TestType = "pre-test" | "post-test";

export type TestAttemptSummary = {
  id: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  trainerId: string;
  trainerName: string;
  testName: string;
  testType: TestType;
  validFrom: string;
  validTill: string;
  totalAssigned: number;
  totalAttempted: number;
};

export type TestSummaryFilter = {
  dateFrom: string;
  dateTo: string;
  trainingId: string;
  subTrainingId: string;
  trainerId: string;
};

export type TestAttemptDetail = {
  id: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  trainerId: string;
  trainerName: string;
  employeeNo: string;
  employeeName: string;
  assignDate: string;
  testName: string;
  testType: TestType;
  validFrom: string;
  validTill: string;
  attemptCount: number;
};

export const TEST_TYPE_LABEL: Record<TestType, string> = {
  "pre-test": "Pre Test",
  "post-test": "Post Test",
};

export type SubmitStatus = "submitted" | "not-submitted";
export type CheckStatus = "checked" | "unchecked";

export type TestHistoryFilter = TestSummaryFilter & {
  testId: string;
};

export type TestAttemptHistory = {
  id: string;
  assignedQuizId: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  trainerId: string;
  testId: string;
  quizName: string;
  quizType: TestType;
  employeeNo: string;
  employeeName: string;
  assignDate: string;
  validFrom: string;
  validTill: string;
  submitStatus: SubmitStatus;
  attemptDate: string;
  attemptNo: number;
  checkStatus: CheckStatus;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
};

export const SUBMIT_STATUS_LABEL: Record<SubmitStatus, string> = {
  submitted: "Submitted",
  "not-submitted": "Not Submitted",
};

export const CHECK_STATUS_LABEL: Record<CheckStatus, string> = {
  checked: "Checked",
  unchecked: "Unchecked",
};
