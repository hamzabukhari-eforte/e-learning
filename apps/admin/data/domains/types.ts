export type DomainStatus = "active" | "inactive";

export type ClientDomain = {
  id: string;
  name: string;
  status: DomainStatus;
  createdAt: string;
};

export type DomainInput = {
  name: string;
  status: DomainStatus;
};

export type PaginatedResult<T> = {
  rows: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export const DOMAIN_STATUS_LABEL: Record<DomainStatus, string> = {
  active: "Active",
  inactive: "Inactive",
};
