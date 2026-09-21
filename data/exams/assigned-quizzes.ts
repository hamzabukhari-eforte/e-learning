import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { listSubTrainings } from "@/data/system-setup/sub-trainings";
import { listTrainings } from "@/data/system-setup/trainings";
import { listExamQuizzes } from "@/data/exams/quizzes";
import { ASSIGNED_QUIZ_SEED } from "@/data/exams/assigned-quiz-seed";
import type {
  AssignedQuiz,
  AssignQuizInput,
  QuizAssignType,
} from "@/data/exams/types";
import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { toEndOfDayIso, toIso, toStartOfDayIso } from "@/lib/datetime";

export type { AssignedQuiz, AssignQuizInput };

let assignments: AssignedQuiz[] = [...ASSIGNED_QUIZ_SEED];
let nextId = 1003;

export async function listAssignedQuizzes(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<AssignedQuiz>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = assignments.filter((item) =>
    matchesSearch(
      `${item.assignedQuizId} ${item.quizName} ${QUIZ_ASSIGN_TYPE_LABEL[item.quizType]} ${item.trainingName} ${item.subTrainingName}`,
      search,
    ),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function listAssignedTrainingOptions(params?: {
  trainingId?: string;
  subTrainingId?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  await delay();
  const from = params?.dateFrom ? new Date(params.dateFrom).getTime() : null;
  const to = params?.dateTo ? new Date(params.dateTo).getTime() : null;

  return assignments
    .filter((item) => {
      if (params?.trainingId && item.trainingId !== params.trainingId) return false;
      if (params?.subTrainingId && item.subTrainingId !== params.subTrainingId) {
        return false;
      }
      if (from !== null && to !== null) {
        const assigned = new Date(item.assignedAt).getTime();
        if (assigned < from || assigned > to) return false;
      }
      return true;
    })
    .map((item) => ({
      id: item.id,
      label: `${item.quizName} (${item.assignedQuizId})`,
    }));
}

export async function getAssignedQuiz(id: string) {
  await delay();
  return assignments.find((item) => item.id === id) ?? null;
}

export async function assignQuiz(
  input: AssignQuizInput,
): Promise<AssignedQuiz | null> {
  await delay();
  const item = await toAssignment(input);
  if (!item) return null;
  assignments = [item, ...assignments];
  return item;
}

async function toAssignment(
  input: AssignQuizInput,
): Promise<AssignedQuiz | null> {
  if (
    !input.dateFrom ||
    !input.dateTo ||
    !input.trainingId ||
    !input.subTrainingId ||
    !input.employeeIds.length ||
    !input.quizId ||
    !input.quizType ||
    !input.validFrom ||
    !input.validTo ||
    !input.emailSubject.trim() ||
    !input.emailContent.trim()
  ) {
    return null;
  }

  const [trainings, subTrainings, quizzes, employees] = await Promise.all([
    listTrainings({ page: 1, pageSize: 1000 }),
    listSubTrainings({ page: 1, pageSize: 1000, trainingId: input.trainingId }),
    listExamQuizzes({ page: 1, pageSize: 1000 }),
    listEmployeesForTrainer(),
  ]);

  const quiz = quizzes.items.find((item) => item.id === input.quizId);
  if (!quiz) return null;

  const employeeNames = employees
    .filter((item) => input.employeeIds.includes(item.id))
    .map((item) => item.label);

  const assignedQuizId = `AQ-${nextId}`;
  nextId += 1;

  return {
    id: `aq${Date.now()}`,
    assignedQuizId,
    dateFrom: toStartOfDayIso(new Date(input.dateFrom)),
    dateTo: toEndOfDayIso(new Date(input.dateTo)),
    trainingId: input.trainingId,
    trainingName:
      trainings.items.find((item) => item.id === input.trainingId)?.name ?? "",
    subTrainingId: input.subTrainingId,
    subTrainingName:
      subTrainings.items.find((item) => item.id === input.subTrainingId)?.name ??
      "",
    employeeIds: [...input.employeeIds],
    employeeNames,
    quizId: input.quizId,
    quizName: quiz.name,
    quizType: input.quizType as QuizAssignType,
    validFrom: toStartOfDayIso(new Date(input.validFrom)),
    validTo: toEndOfDayIso(new Date(input.validTo)),
    emailSubject: input.emailSubject.trim(),
    emailContent: input.emailContent.trim(),
    assignedAt: toIso(new Date()),
  };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
