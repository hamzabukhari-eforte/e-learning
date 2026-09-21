import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import {
  getAssignedQuiz,
} from "@/data/exams/assigned-quizzes";
import { listExamQuizzes } from "@/data/exams/quizzes";
import { PERSONALIZED_ASSESSMENT_SEED } from "@/data/exams/personalized-assessment-seed";
import type {
  PersonalizedAssessment,
  PersonalizedAssessmentInput,
} from "@/data/exams/types";
import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { toEndOfDayIso, toStartOfDayIso } from "@/lib/datetime";

export type { PersonalizedAssessment, PersonalizedAssessmentInput };

let assessments: PersonalizedAssessment[] = [...PERSONALIZED_ASSESSMENT_SEED];

export async function listPersonalizedAssessments(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<PersonalizedAssessment>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = assessments.filter((item) =>
    matchesSearch(
      `${item.trainingName} ${item.subTrainingName} ${item.testName} ${QUIZ_ASSIGN_TYPE_LABEL[item.testType]} ${item.employeeName}`,
      search,
    ),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createPersonalizedAssessment(
  input: PersonalizedAssessmentInput,
): Promise<PersonalizedAssessment | null> {
  await delay();
  const item = await toAssessment(input);
  if (!item) return null;
  assessments = [item, ...assessments];
  return item;
}

async function toAssessment(
  input: PersonalizedAssessmentInput,
): Promise<PersonalizedAssessment | null> {
  if (
    !input.trainingId ||
    !input.subTrainingId ||
    !input.dateFrom ||
    !input.dateTo ||
    !input.assignedTrainingId ||
    !input.employeeId
  ) {
    return null;
  }

  const [assigned, quizzes, employees] = await Promise.all([
    getAssignedQuiz(input.assignedTrainingId),
    listExamQuizzes({ page: 1, pageSize: 1000 }),
    listEmployeesForTrainer(),
  ]);
  if (!assigned) return null;

  const quiz = quizzes.items.find((item) => item.id === assigned.quizId);
  const employee = employees.find((item) => item.id === input.employeeId);
  if (!employee) return null;

  const previousAttempts = assessments.filter(
    (item) =>
      item.assignedTrainingId === input.assignedTrainingId &&
      item.employeeId === input.employeeId,
  ).length;

  const totalQuestions = quiz?.questionLimit ?? 10;
  const totalWrongQuestions = Math.max(
    1,
    Math.min(totalQuestions, Math.ceil(totalQuestions * 0.4)),
  );

  return {
    id: `pa${Date.now()}`,
    trainingId: assigned.trainingId,
    trainingName: assigned.trainingName,
    subTrainingId: assigned.subTrainingId,
    subTrainingName: assigned.subTrainingName,
    assignedTrainingId: assigned.id,
    testName: assigned.quizName,
    testType: assigned.quizType,
    validFrom: assigned.validFrom,
    validTo: assigned.validTo,
    totalQuestions,
    totalWrongQuestions,
    attemptNo: previousAttempts + 1,
    employeeId: input.employeeId,
    employeeName: employee.label,
    dateFrom: toStartOfDayIso(new Date(input.dateFrom)),
    dateTo: toEndOfDayIso(new Date(input.dateTo)),
  };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
