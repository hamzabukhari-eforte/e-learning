import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { TEST_HISTORY_SEED } from "@/data/reports/test-history-seed";
import {
  CHECK_STATUS_LABEL,
  SUBMIT_STATUS_LABEL,
  TEST_TYPE_LABEL,
  type TestAttemptHistory,
  type TestHistoryFilter,
} from "@/data/reports/types";
import type { SelectOption } from "@/data/registration/types";

export type { TestAttemptHistory };

const records = [...TEST_HISTORY_SEED];

export async function listTestOptions(subTrainingId?: string): Promise<SelectOption[]> {
  await delay();
  const unique = new Map<string, string>();
  for (const item of records) {
    if (subTrainingId && item.subTrainingId !== subTrainingId) continue;
    unique.set(item.testId, item.quizName);
  }
  return [...unique.entries()].map(([id, label]) => ({ id, label }));
}

export async function listTestAttemptHistory(params?: {
  filter?: Partial<TestHistoryFilter>;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<TestAttemptHistory>> {
  await delay();
  const filter = params?.filter ?? {};
  const search = params?.search ?? "";
  const filtered = records.filter((item) => matchesRow(item, filter, search));
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

function matchesRow(
  item: TestAttemptHistory,
  filter: Partial<TestHistoryFilter>,
  search: string,
) {
  if (filter.trainingId && item.trainingId !== filter.trainingId) return false;
  if (filter.subTrainingId && item.subTrainingId !== filter.subTrainingId) return false;
  if (filter.trainerId && item.trainerId !== filter.trainerId) return false;
  if (filter.testId && item.testId !== filter.testId) return false;
  if (filter.dateFrom && new Date(item.validTill).getTime() < new Date(filter.dateFrom).getTime())
    return false;
  if (filter.dateTo && new Date(item.validFrom).getTime() > new Date(filter.dateTo).getTime())
    return false;
  return (
    matchesSearch(item.assignedQuizId, search) ||
    matchesSearch(item.trainingName, search) ||
    matchesSearch(item.subTrainingName, search) ||
    matchesSearch(item.quizName, search) ||
    matchesSearch(TEST_TYPE_LABEL[item.quizType], search) ||
    matchesSearch(item.employeeNo, search) ||
    matchesSearch(item.employeeName, search) ||
    matchesSearch(SUBMIT_STATUS_LABEL[item.submitStatus], search) ||
    matchesSearch(CHECK_STATUS_LABEL[item.checkStatus], search) ||
    matchesSearch(item.grade, search)
  );
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
