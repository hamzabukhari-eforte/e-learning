import type { DesignationBinding } from "@/data/assign-training/binding-types";

let bindings: DesignationBinding[] = [
  {
    departmentId: "1",
    designationId: "1",
    subTrainingIds: ["s1", "s2", "s6"],
  },
];

function keyOf(departmentId: string, designationId: string) {
  return `${departmentId}:${designationId}`;
}

export async function getBoundSubTrainingIds(
  departmentId: string,
  designationId: string,
): Promise<string[]> {
  await delay();
  return (
    bindings.find(
      (item) =>
        item.departmentId === departmentId &&
        item.designationId === designationId,
    )?.subTrainingIds ?? []
  );
}

export async function bindTrainings(
  departmentId: string,
  designationId: string,
  subTrainingIds: string[],
): Promise<DesignationBinding | null> {
  await delay();
  if (!departmentId || !designationId || subTrainingIds.length === 0) return null;
  const next: DesignationBinding = {
    departmentId,
    designationId,
    subTrainingIds: [...new Set(subTrainingIds)],
  };
  const index = bindings.findIndex(
    (item) => keyOf(item.departmentId, item.designationId) === keyOf(departmentId, designationId),
  );
  if (index < 0) bindings = [next, ...bindings];
  else bindings[index] = next;
  return next;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
