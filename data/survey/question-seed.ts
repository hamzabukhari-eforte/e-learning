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
  {
    id: "4",
    type: "mcq",
    question: "When should PPE be worn on site?",
    options: ["Only during audits", "Whenever required by the task", "Never"],
    createdBy: "Hassan Raza",
  },
  {
    id: "5",
    type: "mcq",
    question: "Where is the nearest emergency exit in your area?",
    options: ["I know its location", "I am not sure", "There is none"],
    createdBy: "Admin User",
  },
  {
    id: "6",
    type: "mcq",
    question: "Who is responsible for reporting a workplace hazard?",
    options: ["Only supervisors", "Every employee", "Security staff"],
    createdBy: "Fatima Noor",
  },
  {
    id: "7",
    type: "text",
    question: "Share any additional comments about this training session.",
    options: [],
    createdBy: "Omar Siddiqui",
  },
  {
    id: "8",
    type: "text",
    question: "What support do you need from your trainer going forward?",
    options: [],
    createdBy: "Ayesha Malik",
  },
];
