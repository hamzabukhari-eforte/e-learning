export type EntityStatus = "active" | "inactive";

export type Country = {
  id: string;
  name: string;
  status: EntityStatus;
};

export type City = {
  id: string;
  countryId: string;
  countryName: string;
  name: string;
  status: EntityStatus;
};

export type Department = {
  id: string;
  name: string;
  status: EntityStatus;
};

export type Designation = {
  id: string;
  name: string;
  status: EntityStatus;
};

export type Training = {
  id: string;
  trainingId: string;
  name: string;
  status: EntityStatus;
};

export type SubTraining = {
  id: string;
  trainingId: string;
  trainingName: string;
  name: string;
  description: string;
  studyMaterialName: string;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number,
): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export function matchesSearch(value: string, query: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}
