import type { SurveyForm } from "@/data/survey/types";

export const FORM_SEED: SurveyForm[] = [
  {
    id: "1",
    name: "Workplace Safety Survey",
    questionLimit: 3,
    questionType: "mcq",
    questions: [
      {
        questionId: "1",
        sequence: 1,
        question: "What is the primary goal of workplace safety training?",
      },
      {
        questionId: "3",
        sequence: 2,
        question: "How often should fire drills be conducted?",
      },
      {
        questionId: "4",
        sequence: 3,
        question: "When should PPE be worn on site?",
      },
    ],
    createdBy: "Admin User",
    createdDate: "2026-08-10",
  },
  {
    id: "2",
    name: "Training Feedback Form",
    questionLimit: 2,
    questionType: "text",
    questions: [
      {
        questionId: "2",
        sequence: 1,
        question:
          "Describe one improvement you would make to the current training program.",
      },
      {
        questionId: "7",
        sequence: 2,
        question: "Share any additional comments about this training session.",
      },
    ],
    createdBy: "Ahmed Khan",
    createdDate: "2026-08-12",
  },
];
