import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { listSubTrainings } from "@/data/system-setup/sub-trainings";
import { listTrainings } from "@/data/system-setup/trainings";
import { EXAM_QUIZ_SEED } from "@/data/exams/quiz-seed";
import type { ExamQuiz, ExamQuizInput } from "@/data/exams/types";

export type { ExamQuiz, ExamQuizInput };

let quizzes: ExamQuiz[] = [...EXAM_QUIZ_SEED];

export async function listExamQuizzes(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<ExamQuiz>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = quizzes.filter((item) =>
    matchesSearch(
      `${item.name} ${item.trainingName} ${item.subTrainingName} ${item.createdBy}`,
      search,
    ),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function listExamQuizOptions(params?: {
  trainingId?: string;
  subTrainingId?: string;
}) {
  const result = await listExamQuizzes({ page: 1, pageSize: 1000 });
  return result.items
    .filter((item) => {
      if (params?.trainingId && item.trainingId !== params.trainingId) return false;
      if (params?.subTrainingId && item.subTrainingId !== params.subTrainingId) {
        return false;
      }
      return true;
    })
    .map((item) => ({ id: item.id, label: item.name }));
}

export async function createExamQuiz(
  input: ExamQuizInput,
  createdBy: string,
): Promise<ExamQuiz | null> {
  await delay();
  const quiz = await toQuiz(String(Date.now()), input, createdBy, today());
  if (!quiz) return null;
  quizzes = [quiz, ...quizzes];
  return quiz;
}

export async function updateExamQuiz(
  id: string,
  input: ExamQuizInput,
): Promise<ExamQuiz | null> {
  await delay();
  const index = quizzes.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const next = await toQuiz(
    id,
    input,
    quizzes[index].createdBy,
    quizzes[index].createdDate,
  );
  if (!next) return null;
  quizzes[index] = next;
  return quizzes[index];
}

export async function deleteExamQuiz(id: string): Promise<boolean> {
  await delay();
  const before = quizzes.length;
  quizzes = quizzes.filter((item) => item.id !== id);
  return quizzes.length < before;
}

async function toQuiz(
  id: string,
  input: ExamQuizInput,
  createdBy: string,
  createdDate: string,
): Promise<ExamQuiz | null> {
  const limit = Number(input.questionLimit);
  if (
    !input.trainingId ||
    !input.subTrainingId ||
    !input.questionType ||
    !limit ||
    limit < 1
  ) {
    return null;
  }

  const [trainings, subTrainings] = await Promise.all([
    listTrainings({ page: 1, pageSize: 1000 }),
    listSubTrainings({ page: 1, pageSize: 1000, trainingId: input.trainingId }),
  ]);
  const trainingName =
    trainings.items.find((item) => item.id === input.trainingId)?.name ?? "";
  const subTrainingName =
    subTrainings.items.find((item) => item.id === input.subTrainingId)?.name ??
    "";

  return {
    id,
    trainingId: input.trainingId,
    trainingName,
    subTrainingId: input.subTrainingId,
    subTrainingName,
    name: `${subTrainingName} Quiz`,
    questionLimit: limit,
    questionType: input.questionType,
    createdBy,
    createdDate,
  };
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
