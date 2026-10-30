import type { QuizAssignType } from "@/data/exams/types";

export type PendingResultEmployee = {
  id: string;
  name: string;
};

export type PendingResultAttempt = {
  id: string;
  employeeId: string;
  employeeName: string;
  attemptNo: number;
};

export type PendingResultRow = {
  id: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  quizId: string;
  quizName: string;
  quizType: QuizAssignType;
  assignedAt: string;
  assignedEmployees: PendingResultEmployee[];
  attemptedEmployees: PendingResultEmployee[];
  pendingEmployees: PendingResultEmployee[];
  attempts: PendingResultAttempt[];
};

export type PendingResultFilter = {
  dateFrom: string;
  dateTo: string;
  trainingId: string;
  subTrainingId: string;
  quizId: string;
};
