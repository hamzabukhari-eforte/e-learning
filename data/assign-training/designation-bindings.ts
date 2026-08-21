import type { DesignationBinding } from "@/data/assign-training/binding-types";

export type { DesignationBinding };

let bindings: DesignationBinding[] = [
  {
    departmentId: "1",
    designationId: "1",
    subTrainingIds: ["s1", "s2", "s6"],
  },
  {
    departmentId: "2",
    designationId: "2",
    subTrainingIds: ["s4", "s5", "s10"],
  },
  {
    departmentId: "5",
    designationId: "5",
    subTrainingIds: ["s12", "s13"],
  },
];

function keyOf(departmentId: string, designationId: string) {
  return `${departmentId}:${designationId}`;
}

export async function getBindingsSnapshot(): Promise<DesignationBinding[]> {
  await delay();
  return bindings.map((item) => ({
    ...item,
    subTrainingIds: [...item.subTrainingIds],
  }));
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
    (item) =>
      keyOf(item.departmentId, item.designationId) ===
      keyOf(departmentId, designationId),
  );
  if (index < 0) bindings = [next, ...bindings];
  else bindings[index] = next;
  return next;
}

export async function unbindSubTrainings(
  departmentId: string,
  designationId: string,
  subTrainingIds: string[],
): Promise<boolean> {
  await delay();
  if (!departmentId || !designationId || subTrainingIds.length === 0) return false;
  const index = bindings.findIndex(
    (item) =>
      keyOf(item.departmentId, item.designationId) ===
      keyOf(departmentId, designationId),
  );
  if (index < 0) return false;
  const remove = new Set(subTrainingIds);
  const nextIds = bindings[index].subTrainingIds.filter((id) => !remove.has(id));
  if (nextIds.length === 0) {
    bindings = bindings.filter((_, i) => i !== index);
  } else {
    bindings[index] = { ...bindings[index], subTrainingIds: nextIds };
  }
  return true;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
