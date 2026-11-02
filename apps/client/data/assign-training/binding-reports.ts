import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import type { BindingReportRow } from "@/data/assign-training/binding-types";
import { getBindingsSnapshot } from "@/data/assign-training/designation-bindings";
import { listDepartmentOptions } from "@/data/system-setup/departments";
import { listDesignationOptions } from "@/data/system-setup/designations";
import { listSubTrainings } from "@/data/system-setup/sub-trainings";

export async function listBindingReports(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<BindingReportRow>> {
  await delay();
  const [departments, designations, subTrainings, bindings] = await Promise.all([
    listDepartmentOptions(),
    listDesignationOptions(),
    listSubTrainings({ page: 1, pageSize: 1000 }),
    getBindingsSnapshot(),
  ]);
  const deptName = new Map(departments.map((item) => [item.id, item.label]));
  const desigName = new Map(designations.map((item) => [item.id, item.label]));
  const subById = new Map(subTrainings.items.map((item) => [item.id, item]));

  const rows: BindingReportRow[] = [];
  for (const binding of bindings) {
    const byTraining = new Map<string, BindingReportRow>();
    for (const subId of binding.subTrainingIds) {
      const sub = subById.get(subId);
      if (!sub) continue;
      const existing = byTraining.get(sub.trainingId);
      if (existing) {
        existing.subTrainings.push({ id: sub.id, name: sub.name });
        continue;
      }
      byTraining.set(sub.trainingId, {
        id: `${binding.departmentId}-${binding.designationId}-${sub.trainingId}`,
        departmentId: binding.departmentId,
        departmentName: deptName.get(binding.departmentId) ?? "Unknown",
        designationId: binding.designationId,
        designationName: desigName.get(binding.designationId) ?? "Unknown",
        trainingId: sub.trainingId,
        trainingName: sub.trainingName,
        subTrainings: [{ id: sub.id, name: sub.name }],
      });
    }
    rows.push(...byTraining.values());
  }

  const search = params?.search ?? "";
  const filtered = rows.filter(
    (item) =>
      matchesSearch(item.departmentName, search) ||
      matchesSearch(item.designationName, search) ||
      matchesSearch(item.trainingName, search) ||
      item.subTrainings.some((sub) => matchesSearch(sub.name, search)),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
