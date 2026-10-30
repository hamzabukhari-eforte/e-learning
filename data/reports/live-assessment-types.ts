import type { QuizAssignType } from "@/data/exams/types";

export type LiveAssessmentScore = {
  id: string;
  employeeNo: string;
  employeeName: string;
  score: number;
  totalMarks: number;
};

export type LiveAssessment = {
  id: string;
  assignedQuizId: string;
  quizName: string;
  quizType: QuizAssignType;
  assignedAt: string;
  validFrom: string;
  validTo: string;
  scores: LiveAssessmentScore[];
};
