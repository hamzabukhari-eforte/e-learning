import type { FeedbackStatus } from "@/data/feedback/types";
import type { QuizAssignType } from "@/data/exams/types";
import type { MonthMetrics, ProgressMonth } from "@/data/reports/employee-progress-types";

export type ReportCardProfile = {
  employeeId: string;
  name: string;
  gender: string;
  employeeNo: string;
  email: string;
  phone: string;
};

export type ReportCardFeedback = {
  id: string;
  feedback: string;
  status: FeedbackStatus;
  assignDate: string;
};

export type ReportCardImprovementPlan = {
  id: string;
  subTrainingName: string;
  message: string;
  sendDate: string;
  endDate: string;
  status: "pending" | "in-progress" | "completed";
};

export type ReportCardAssessment = {
  id: string;
  trainingName: string;
  subTrainingName: string;
  testName: string;
  testType: QuizAssignType;
  validFrom: string;
  validTill: string;
  totalQuestions: number;
  totalWrongQuestions: number;
  attemptNo: number;
  score: number;
  totalMarks: number;
  attemptDate: string;
};

export type ReportCardProgressRow = {
  id: string;
  subTrainingName: string;
  employeeName: string;
  employeeNo: string;
  months: Record<string, MonthMetrics>;
};

export type EmployeeReportCard = {
  profile: ReportCardProfile;
  feedback: ReportCardFeedback[];
  improvementPlans: ReportCardImprovementPlan[];
  assessments: ReportCardAssessment[];
  progress: ReportCardProgressRow[];
  progressMonths: ProgressMonth[];
};

export const IMPROVEMENT_PLAN_STATUS_LABEL: Record<
  ReportCardImprovementPlan["status"],
  string
> = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};
