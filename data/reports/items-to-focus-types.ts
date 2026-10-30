import type { QuestionType } from "@/data/survey/types";

export type FocusItemCategory =
  | "Safety"
  | "Compliance"
  | "Technical"
  | "Procedure"
  | "Awareness";

export type FocusItem = {
  id: string;
  trainingId: string;
  subTrainingId: string;
  assignedTrainingId: string;
  employeeId: string;
  question: string;
  questionType: QuestionType;
  category: FocusItemCategory;
};

export type ItemsToFocusFilter = {
  dateFrom: string;
  dateTo: string;
  trainingId: string;
  subTrainingId: string;
  assignedTrainingId: string;
  employeeId: string;
};
