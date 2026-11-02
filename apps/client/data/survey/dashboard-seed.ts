import type { SurveyQuestionChart } from "@/data/survey/dashboard-types";

const COLORS = ["#7EB8DA", "#555555", "#8FBF7F", "#E8A838", "#8B7EC8"];

export const DASHBOARD_CHART_SEED: Record<string, SurveyQuestionChart[]> = {
  "SF-1001": [
    {
      questionNumber: 1,
      questionId: "1",
      question: "What is the primary goal of workplace safety training?",
      answers: [
        { label: "Increase overtime", percentage: 10, color: COLORS[0] },
        { label: "Prevent accidents", percentage: 70, color: COLORS[1] },
        { label: "Reduce meetings", percentage: 20, color: COLORS[2] },
      ],
    },
    {
      questionNumber: 2,
      questionId: "3",
      question: "How often should fire drills be conducted?",
      answers: [
        { label: "Once a year", percentage: 15, color: COLORS[0] },
        { label: "Twice a year", percentage: 45, color: COLORS[1] },
        { label: "Every month", percentage: 30, color: COLORS[2] },
        { label: "Never", percentage: 10, color: COLORS[3] },
      ],
    },
    {
      questionNumber: 3,
      questionId: "4",
      question: "When should PPE be worn on site?",
      answers: [
        { label: "Only during audits", percentage: 20, color: COLORS[0] },
        { label: "Whenever required by the task", percentage: 65, color: COLORS[1] },
        { label: "Never", percentage: 15, color: COLORS[2] },
      ],
    },
  ],
  "SF-1002": [
    {
      questionNumber: 1,
      questionId: "quality",
      question: "How did you find the Quality of the training?",
      answers: [
        { label: "Excellent", percentage: 20, color: COLORS[0] },
        { label: "Satisfactory", percentage: 60, color: COLORS[1] },
        { label: "Needs Improvement", percentage: 20, color: COLORS[2] },
      ],
    },
  ],
};
