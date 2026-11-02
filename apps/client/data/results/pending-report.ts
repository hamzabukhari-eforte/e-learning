import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import { PENDING_RESULT_SEED } from "@/data/results/pending-report-seed";
import type {
  PendingResultFilter,
  PendingResultRow,
} from "@/data/results/types";
import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";

export type { PendingResultFilter, PendingResultRow };

const rows: PendingResultRow[] = [...PENDING_RESULT_SEED];

export async function listPendingResults(params: {
  filter: PendingResultFilter;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<PendingResultRow>> {
  await delay();
  const search = params.search ?? "";
  const { filter } = params;
  const from = filter.dateFrom ? new Date(filter.dateFrom).getTime() : null;
  const to = filter.dateTo ? new Date(filter.dateTo).getTime() : null;

  const filtered = rows.filter((item) => {
    if (filter.trainingId && item.trainingId !== filter.trainingId) return false;
    if (filter.subTrainingId && item.subTrainingId !== filter.subTrainingId) {
      return false;
    }
    if (filter.quizId && item.quizId !== filter.quizId) return false;
    if (from !== null && to !== null) {
      const assigned = new Date(item.assignedAt).getTime();
      if (assigned < from || assigned > to) return false;
    }
    return matchesSearch(
      `${item.trainingName} ${item.subTrainingName} ${item.quizName} ${QUIZ_ASSIGN_TYPE_LABEL[item.quizType]}`,
      search,
    );
  });

  return paginateItems(filtered, params.page ?? 1, params.pageSize ?? 10);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
