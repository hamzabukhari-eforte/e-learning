import type { QuizAssignType } from "@/data/exams/types";

export type TestWiseAttemptDetail = {
  id: string;
  employeeNo: string;
  employeeName: string;
  attemptNo: number;
  attemptDate: string;
  score: number;
  totalMarks: number;
  status: "submitted" | "not-submitted";
};

export type TestWiseAssessment = {
  id: string;
  testName: string;
  testType: QuizAssignType;
  validFrom: string;
  validTill: string;
  assignedDate: string;
  totalAssignedEmployees: number;
  totalAttemptedEmployees: number;
  averageScore: number;
  attempts: TestWiseAttemptDetail[];
};

export type TestWiseSubTraining = {
  id: string;
  name: string;
  assessments: TestWiseAssessment[];
};

export type TestWiseTraining = {
  id: string;
  name: string;
  subTrainings: TestWiseSubTraining[];
};
