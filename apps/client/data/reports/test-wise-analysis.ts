import { TEST_WISE_ANALYSIS_SEED } from "@/data/reports/test-wise-analysis-seed";
import type {
  TestWiseAssessment,
  TestWiseSubTraining,
  TestWiseTraining,
} from "@/data/reports/test-wise-analysis-types";
import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";

export type { TestWiseAssessment, TestWiseSubTraining, TestWiseTraining };

const trainings = [...TEST_WISE_ANALYSIS_SEED];

export async function listTestWiseTrainings(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<TestWiseTraining>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = trainings.filter((item) =>
    matchesSearch(item.name, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function getTestWiseTraining(trainingId: string) {
  await delay();
  return trainings.find((item) => item.id === trainingId) ?? null;
}

export async function listTestWiseSubTrainings(params: {
  trainingId: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<TestWiseSubTraining>> {
  await delay();
  const training = trainings.find((item) => item.id === params.trainingId);
  const items = training?.subTrainings ?? [];
  const search = params.search ?? "";
  const filtered = items.filter((item) => matchesSearch(item.name, search));
  return paginateItems(filtered, params.page ?? 1, params.pageSize ?? 10);
}

export async function listTestWiseAssessments(params: {
  trainingId: string;
  subTrainingId: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<TestWiseAssessment>> {
  await delay();
  const training = trainings.find((item) => item.id === params.trainingId);
  const sub = training?.subTrainings.find(
    (item) => item.id === params.subTrainingId,
  );
  const items = sub?.assessments ?? [];
  const search = params.search ?? "";
  const filtered = items.filter(
    (item) =>
      matchesSearch(item.testName, search) ||
      matchesSearch(item.testType, search) ||
      matchesSearch(String(item.averageScore), search),
  );
  return paginateItems(filtered, params.page ?? 1, params.pageSize ?? 10);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 120));
}
