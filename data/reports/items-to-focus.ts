import { ITEMS_TO_FOCUS_SEED } from "@/data/reports/items-to-focus-seed";
import type {
  FocusItem,
  ItemsToFocusFilter,
} from "@/data/reports/items-to-focus-types";
import { QUESTION_TYPE_LABEL } from "@/data/survey/types";
import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";

export type { FocusItem, ItemsToFocusFilter };

const records = [...ITEMS_TO_FOCUS_SEED];

export async function listItemsToFocus(params?: {
  filter?: Partial<ItemsToFocusFilter>;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<FocusItem>> {
  await delay();
  const filter = params?.filter ?? {};
  const search = params?.search ?? "";
  const filtered = records.filter((item) => {
    if (filter.trainingId && item.trainingId !== filter.trainingId) return false;
    if (filter.subTrainingId && item.subTrainingId !== filter.subTrainingId)
      return false;
    if (
      filter.assignedTrainingId &&
      item.assignedTrainingId !== filter.assignedTrainingId
    ) {
      return false;
    }
    if (filter.employeeId && item.employeeId !== filter.employeeId) return false;
    return (
      matchesSearch(item.question, search) ||
      matchesSearch(QUESTION_TYPE_LABEL[item.questionType], search) ||
      matchesSearch(item.category, search)
    );
  });
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
