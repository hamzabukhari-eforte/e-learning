import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { QUESTION_SEED } from "@/data/survey/question-seed";
import type { SurveyQuestion, SurveyQuestionInput } from "@/data/survey/types";

export type { SurveyQuestion, SurveyQuestionInput };

let questions: SurveyQuestion[] = [...QUESTION_SEED];

export async function listQuestions(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
  type?: SurveyQuestion["type"];
}): Promise<PaginatedResult<SurveyQuestion>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = questions.filter((item) => {
    if (params?.type && item.type !== params.type) return false;
    return matchesSearch(
      `${item.question} ${item.type} ${item.createdBy} ${item.options.join(" ")}`,
      search,
    );
  });
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function getQuestionsByType(
  type: SurveyQuestion["type"],
): Promise<SurveyQuestion[]> {
  const result = await listQuestions({ type, page: 1, pageSize: 1000 });
  return result.items;
}

export async function createQuestion(
  input: SurveyQuestionInput,
  createdBy: string,
): Promise<SurveyQuestion | null> {
  await delay();
  const question = toQuestion(String(Date.now()), input, createdBy);
  if (!question) return null;
  questions = [question, ...questions];
  return question;
}

export async function updateQuestion(
  id: string,
  input: SurveyQuestionInput,
): Promise<SurveyQuestion | null> {
  await delay();
  const index = questions.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const next = toQuestion(id, input, questions[index].createdBy);
  if (!next) return null;
  questions[index] = next;
  return questions[index];
}

export async function deleteQuestion(id: string): Promise<boolean> {
  await delay();
  const before = questions.length;
  questions = questions.filter((item) => item.id !== id);
  return questions.length < before;
}

function toQuestion(
  id: string,
  input: SurveyQuestionInput,
  createdBy: string,
): SurveyQuestion | null {
  if (!input.type || !input.question.trim()) return null;
  const options =
    input.type === "mcq"
      ? input.options.map((option) => option.trim()).filter(Boolean)
      : [];
  if (input.type === "mcq" && options.length < 2) return null;
  return {
    id,
    type: input.type,
    question: input.question.trim(),
    options,
    fileName: input.fileName,
    createdBy,
  };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
