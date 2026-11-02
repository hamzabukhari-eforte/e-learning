import { TRAINING_SUMMARY_SEED } from "@/data/reports/training-summary-seed";
import {
  TRAINING_PROGRESS_STATUS_LABEL,
  type TrainingSummaryRow,
} from "@/data/reports/training-summary-types";
import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";

export type { TrainingSummaryRow };
export { TRAINING_PROGRESS_STATUS_LABEL };

const records = [...TRAINING_SUMMARY_SEED];

export async function listTrainingSummary(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<TrainingSummaryRow>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = records.filter(
    (item) =>
      matchesSearch(item.trainingName, search) ||
      matchesSearch(item.subTrainingName, search) ||
      matchesSearch(item.description, search) ||
      matchesSearch(item.publishedBy, search) ||
      matchesSearch(item.status, search) ||
      matchesSearch(TRAINING_PROGRESS_STATUS_LABEL[item.trainingStatus], search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
