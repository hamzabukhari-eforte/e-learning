import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { listSubTrainings } from "@/data/system-setup/sub-trainings";
import { listTrainings } from "@/data/system-setup/trainings";
import { IMPROVEMENT_PLAN_SEED } from "@/data/improvement-plan/seed";
import type {
  ImprovementPlan,
  ImprovementPlanInput,
} from "@/data/improvement-plan/types";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { toEndOfDayIso, toIso, toStartOfDayIso } from "@/lib/datetime";

export type { ImprovementPlan, ImprovementPlanInput };

let plans: ImprovementPlan[] = [...IMPROVEMENT_PLAN_SEED];

export async function listImprovementPlans(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<ImprovementPlan>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = plans.filter(
    (item) =>
      matchesSearch(item.trainingName, search) ||
      matchesSearch(item.subTrainingName, search) ||
      matchesSearch(item.taskMaterial, search) ||
      matchesSearch(item.employeeNames.join(" "), search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createImprovementPlan(
  input: ImprovementPlanInput,
): Promise<ImprovementPlan | null> {
  await delay();
  const item = await toPlan(String(Date.now()), input, toIso(new Date()), []);
  if (!item) return null;
  plans = [item, ...plans];
  return item;
}

export async function updateImprovementPlan(
  id: string,
  input: ImprovementPlanInput,
): Promise<ImprovementPlan | null> {
  await delay();
  const index = plans.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const next = await toPlan(
    id,
    input,
    plans[index].sentAt,
    plans[index].responses,
  );
  if (!next) return null;
  plans[index] = next;
  return plans[index];
}

async function toPlan(
  id: string,
  input: ImprovementPlanInput,
  sentAt: string,
  responses: ImprovementPlan["responses"],
): Promise<ImprovementPlan | null> {
  if (
    !input.dateFrom ||
    !input.dateTo ||
    !input.trainingId ||
    !input.subTrainingId ||
    !input.employeeIds.length ||
    !input.targetCompletionDate ||
    !input.taskMaterial.trim()
  ) {
    return null;
  }

  const [trainings, subTrainings, employees] = await Promise.all([
    listTrainings({ page: 1, pageSize: 1000 }),
    listSubTrainings({ page: 1, pageSize: 1000, trainingId: input.trainingId }),
    listEmployeesForTrainer(),
  ]);

  const employeeNames = employees
    .filter((item) => input.employeeIds.includes(item.id))
    .map((item) => item.label);

  return {
    id,
    trainingId: input.trainingId,
    trainingName:
      trainings.items.find((item) => item.id === input.trainingId)?.name ?? "",
    subTrainingId: input.subTrainingId,
    subTrainingName:
      subTrainings.items.find((item) => item.id === input.subTrainingId)?.name ??
      "",
    dateFrom: toStartOfDayIso(new Date(input.dateFrom)),
    dateTo: toEndOfDayIso(new Date(input.dateTo)),
    employeeIds: [...input.employeeIds],
    employeeNames,
    targetCompletionDate: toStartOfDayIso(new Date(input.targetCompletionDate)),
    taskMaterial: input.taskMaterial.trim(),
    sentAt,
    responses,
  };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
