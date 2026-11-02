import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { TEST_DETAIL_SEED } from "@/data/reports/test-detail-seed";
import {
  TEST_TYPE_LABEL,
  type TestAttemptDetail,
  type TestSummaryFilter,
} from "@/data/reports/types";

export type { TestAttemptDetail };

const records = [...TEST_DETAIL_SEED];

export async function listTestAttemptDetail(params?: {
  filter?: Partial<TestSummaryFilter>;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<TestAttemptDetail>> {
  await delay();
  const filter = params?.filter ?? {};
  const search = params?.search ?? "";
  const filtered = records.filter((item) => {
    if (filter.trainingId && item.trainingId !== filter.trainingId) return false;
    if (filter.subTrainingId && item.subTrainingId !== filter.subTrainingId)
      return false;
    if (filter.trainerId && item.trainerId !== filter.trainerId) return false;
    if (filter.dateFrom) {
      const from = new Date(filter.dateFrom).getTime();
      if (new Date(item.validTill).getTime() < from) return false;
    }
    if (filter.dateTo) {
      const to = new Date(filter.dateTo).getTime();
      if (new Date(item.validFrom).getTime() > to) return false;
    }
    return (
      matchesSearch(item.trainingName, search) ||
      matchesSearch(item.subTrainingName, search) ||
      matchesSearch(item.trainerName, search) ||
      matchesSearch(item.employeeNo, search) ||
      matchesSearch(item.employeeName, search) ||
      matchesSearch(item.testName, search) ||
      matchesSearch(TEST_TYPE_LABEL[item.testType], search) ||
      matchesSearch(String(item.attemptCount), search)
    );
  });
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
