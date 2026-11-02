import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import { LIVE_ASSESSMENT_SEED } from "@/data/reports/live-assessment-seed";
import type { LiveAssessment } from "@/data/reports/live-assessment-types";
import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";

export type { LiveAssessment };

const records = [...LIVE_ASSESSMENT_SEED];

export async function listLiveAssessments(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<LiveAssessment>> {
  await delay();
  const now = Date.now();
  const search = params?.search ?? "";
  const live = records.filter((item) => new Date(item.validTo).getTime() >= now);
  const filtered = live.filter(
    (item) =>
      matchesSearch(item.assignedQuizId, search) ||
      matchesSearch(item.quizName, search) ||
      matchesSearch(QUIZ_ASSIGN_TYPE_LABEL[item.quizType], search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
