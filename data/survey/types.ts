export type QuestionType = "mcq" | "text";

export type SurveyQuestion = {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  fileName?: string;
  createdBy: string;
};

export type SurveyQuestionInput = {
  type: QuestionType | "";
  question: string;
  options: string[];
  fileName?: string;
};

export const QUESTION_TYPE_LABEL: Record<QuestionType, string> = {
  mcq: "MCQ's",
  text: "Text",
};

export const EMPTY_MCQ_OPTIONS = ["", "", ""];

export function formatQuestionBody(item: {
  question: string;
  type: QuestionType | "";
  options: string[];
}) {
  if (item.type !== "mcq") return item.question;
  const lines = item.options
    .map((option) => option.trim())
    .filter(Boolean)
    .map((option, index) => `${index + 1}. ${option}`);
  return lines.length ? `${item.question}\n${lines.join("\n")}` : item.question;
}
