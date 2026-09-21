import type { QuestionType } from "@/data/survey/types";

export type ExamQuestion = {
  id: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  type: QuestionType;
  question: string;
  options: string[];
  fileName?: string;
  createdBy: string;
};

export type ExamQuestionInput = {
  trainingId: string;
  subTrainingId: string;
  type: QuestionType | "";
  question: string;
  options: string[];
  fileName?: string;
};

export type ExamQuiz = {
  id: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  name: string;
  questionLimit: number;
  questionType: QuestionType;
  createdBy: string;
  createdDate: string;
};

export type ExamQuizInput = {
  trainingId: string;
  subTrainingId: string;
  questionLimit: string;
  questionType: QuestionType | "";
};

export type QuizAssignType = "pre-test" | "post-test";

export const QUIZ_ASSIGN_TYPE_LABEL: Record<QuizAssignType, string> = {
  "pre-test": "Pre Test",
  "post-test": "Post Test",
};

export type AssignedQuiz = {
  id: string;
  assignedQuizId: string;
  dateFrom: string;
  dateTo: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  employeeIds: string[];
  employeeNames: string[];
  quizId: string;
  quizName: string;
  quizType: QuizAssignType;
  validFrom: string;
  validTo: string;
  emailSubject: string;
  emailContent: string;
  assignedAt: string;
};

export type AssignQuizInput = {
  dateFrom: string;
  dateTo: string;
  trainingId: string;
  subTrainingId: string;
  employeeIds: string[];
  quizId: string;
  quizType: QuizAssignType | "";
  validFrom: string;
  validTo: string;
  emailSubject: string;
  emailContent: string;
};

export type PersonalizedAssessment = {
  id: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  assignedTrainingId: string;
  testName: string;
  testType: QuizAssignType;
  validFrom: string;
  validTo: string;
  totalQuestions: number;
  totalWrongQuestions: number;
  attemptNo: number;
  employeeId: string;
  employeeName: string;
  dateFrom: string;
  dateTo: string;
};

export type PersonalizedAssessmentInput = {
  trainingId: string;
  subTrainingId: string;
  dateFrom: string;
  dateTo: string;
  assignedTrainingId: string;
  employeeId: string;
};
