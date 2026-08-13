import type { SurveyQuestion } from "@/data/survey/types";

export const QUESTION_SEED: SurveyQuestion[] = [
  {
    id: "1",
    type: "mcq",
    question: "What is the primary goal of workplace safety training?",
    options: ["Increase overtime", "Prevent accidents", "Reduce meetings"],
    createdBy: "Admin User",
  },
  {
    id: "2",
    type: "text",
    question:
      "Describe one improvement you would make to the current training program.",
    options: [],
    fileName: "training-notes.pdf",
    createdBy: "Ahmed Khan",
  },
  {
    id: "3",
    type: "mcq",
    question: "How often should fire drills be conducted?",
    options: ["Once a year", "Twice a year", "Every month", "Never"],
    createdBy: "Sara Ali",
  },
];
