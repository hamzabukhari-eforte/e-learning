import {
  matchesSearch,
  paginateItems,
  type Designation,
  type EntityStatus,
  type PaginatedResult,
} from "@/data/system-setup/types";

let designations: Designation[] = [
  { id: "1", name: "Manager", status: "active" },
  { id: "2", name: "Supervisor", status: "active" },
  { id: "3", name: "Executive", status: "active" },
  { id: "4", name: "Officer", status: "inactive" },
  { id: "5", name: "Trainer", status: "active" },
  { id: "6", name: "Assistant", status: "active" },
];

export type DesignationInput = {
  name: string;
  status: EntityStatus;
};

export async function listDesignations(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<Designation>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = designations.filter((item) =>
    matchesSearch(item.name, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createDesignation(
  input: DesignationInput,
): Promise<Designation> {
  await delay();
  const designation: Designation = {
    id: String(Date.now()),
    name: input.name.trim(),
    status: input.status,
  };
  designations = [designation, ...designations];
  return designation;
}

export async function updateDesignation(
  id: string,
  input: DesignationInput,
): Promise<Designation | null> {
  await delay();
  const index = designations.findIndex((item) => item.id === id);
  if (index < 0) return null;
  designations[index] = {
    ...designations[index],
    name: input.name.trim(),
    status: input.status,
  };
  return designations[index];
}

export async function deleteDesignation(id: string): Promise<boolean> {
  await delay();
  const before = designations.length;
  designations = designations.filter((item) => item.id !== id);
  return designations.length < before;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
