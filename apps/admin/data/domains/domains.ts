import { DOMAIN_SEED } from "@/data/domains/seed";
import type {
  ClientDomain,
  DomainInput,
  PaginatedResult,
} from "@/data/domains/types";

let domains: ClientDomain[] = [...DOMAIN_SEED];
let seq = DOMAIN_SEED.length + 1;

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}

function matches(item: ClientDomain, search: string) {
  const q = search.trim().toLowerCase();
  if (!q) return true;
  return [item.name, item.status].join(" ").toLowerCase().includes(q);
}

function paginate(
  items: ClientDomain[],
  page: number,
  pageSize: number,
): PaginatedResult<ClientDomain> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    rows: items.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    total,
    totalPages,
  };
}

export async function listDomains(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<ClientDomain>> {
  await delay();
  const filtered = domains.filter((item) => matches(item, params?.search ?? ""));
  return paginate(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createDomain(
  input: DomainInput,
): Promise<{ ok: true; item: ClientDomain } | { ok: false; message: string }> {
  await delay();
  const name = input.name.trim();
  if (!name) {
    return { ok: false, message: "Domain name is required." };
  }
  if (domains.some((d) => d.name.toLowerCase() === name.toLowerCase())) {
    return { ok: false, message: "This domain is already registered." };
  }
  const item: ClientDomain = {
    id: `DOM-${String(seq++).padStart(3, "0")}`,
    name,
    status: input.status,
    createdAt: new Date().toISOString(),
  };
  domains = [item, ...domains];
  return { ok: true, item };
}

export async function updateDomain(
  id: string,
  input: DomainInput,
): Promise<{ ok: true; item: ClientDomain } | { ok: false; message: string }> {
  await delay();
  const index = domains.findIndex((d) => d.id === id);
  if (index < 0) return { ok: false, message: "Domain not found." };
  const name = input.name.trim();
  if (!name) {
    return { ok: false, message: "Domain name is required." };
  }
  if (
    domains.some(
      (d) => d.name.toLowerCase() === name.toLowerCase() && d.id !== id,
    )
  ) {
    return { ok: false, message: "This domain is already registered." };
  }
  const item: ClientDomain = {
    ...domains[index],
    name,
    status: input.status,
  };
  domains = domains.map((d) => (d.id === id ? item : d));
  return { ok: true, item };
}

export async function deleteDomain(
  id: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  await delay();
  if (!domains.some((d) => d.id === id)) {
    return { ok: false, message: "Domain not found." };
  }
  domains = domains.filter((d) => d.id !== id);
  return { ok: true };
}
