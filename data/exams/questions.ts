import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { listSubTrainings } from "@/data/system-setup/sub-trainings";
import { listTrainings } from "@/data/system-setup/trainings";
import { EXAM_QUESTION_SEED } from "@/data/exams/question-seed";
import type { ExamQuestion, ExamQuestionInput } from "@/data/exams/types";

export type { ExamQuestion, ExamQuestionInput };

let questions: ExamQuestion[] = [...EXAM_QUESTION_SEED];

export async function listExamQuestions(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<ExamQuestion>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = questions.filter((item) =>
    matchesSearch(
      `${item.question} ${item.type} ${item.trainingName} ${item.subTrainingName} ${item.createdBy} ${item.options.join(" ")}`,
      search,
    ),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createExamQuestion(
  input: ExamQuestionInput,
  createdBy: string,
): Promise<ExamQuestion | null> {
  await delay();
  const question = await toQuestion(String(Date.now()), input, createdBy);
  if (!question) return null;
  questions = [question, ...questions];
  return question;
}

export async function updateExamQuestion(
  id: string,
  input: ExamQuestionInput,
): Promise<ExamQuestion | null> {
  await delay();
  const index = questions.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const next = await toQuestion(id, input, questions[index].createdBy);
  if (!next) return null;
  questions[index] = next;
  return questions[index];
}

export async function deleteExamQuestion(id: string): Promise<boolean> {
  await delay();
  const before = questions.length;
  questions = questions.filter((item) => item.id !== id);
  return questions.length < before;
}

async function toQuestion(
  id: string,
  input: ExamQuestionInput,
  createdBy: string,
): Promise<ExamQuestion | null> {
  if (!input.type || !input.question.trim() || !input.trainingId || !input.subTrainingId) {
    return null;
  }
  const options =
    input.type === "mcq"
      ? input.options.map((option) => option.trim()).filter(Boolean)
      : [];
  if (input.type === "mcq" && options.length < 2) return null;

  const [trainings, subTrainings] = await Promise.all([
    listTrainings({ page: 1, pageSize: 1000 }),
    listSubTrainings({ page: 1, pageSize: 1000, trainingId: input.trainingId }),
  ]);

  return {
    id,
    trainingId: input.trainingId,
    trainingName:
      trainings.items.find((item) => item.id === input.trainingId)?.name ?? "",
    subTrainingId: input.subTrainingId,
    subTrainingName:
      subTrainings.items.find((item) => item.id === input.subTrainingId)?.name ??
      "",
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
