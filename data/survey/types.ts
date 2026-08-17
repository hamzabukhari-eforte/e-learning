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

export type FormQuestion = {
  questionId: string;
  sequence: number;
  question: string;
};

export type SurveyForm = {
  id: string;
  name: string;
  questionLimit: number;
  questionType: QuestionType;
  questions: FormQuestion[];
  createdBy: string;
  createdDate: string;
};

export type SurveyFormInput = {
  name: string;
  questionLimit: string;
  questionType: QuestionType | "";
  questions: FormQuestion[];
};

export type SentFormType = "survey" | "interview";

export const SENT_FORM_TYPE_LABEL: Record<SentFormType, string> = {
  survey: "Survey Form",
  interview: "Interview Form",
};

export type SentForm = {
  id: string;
  employeeIds: string[];
  employeeNames: string[];
  formId: string;
  formName: string;
  formType: SentFormType;
  assignedAt: string;
  validFrom: string;
  validTo: string;
  attemptedCount: number;
};

export type SendFormInput = {
  employeeIds: string[];
  formId: string;
  formType: SentFormType | "";
  validFrom: string;
  validTo: string;
};

export type SurveyResult = {
  id: string;
  formName: string;
  formType: SentFormType;
  assignedAt: string;
  validFrom: string;
  validTo: string;
  assignedCount: number;
  attemptedCount: number;
};

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
