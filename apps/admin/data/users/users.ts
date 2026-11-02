import type { PaginatedResult } from "@/data/domains/types";
import { USER_SEED } from "@/data/users/seed";
import type { PlatformUser, PlatformUserInput } from "@/data/users/types";

let users: PlatformUser[] = [...USER_SEED];
let seq = USER_SEED.length + 1;

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}

function matches(item: PlatformUser, search: string) {
  const q = search.trim().toLowerCase();
  if (!q) return true;
  return [item.name, item.email, item.loginId, item.role, item.status]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

function paginate(
  items: PlatformUser[],
  page: number,
  pageSize: number,
): PaginatedResult<PlatformUser> {
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

export async function listUsers(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<PlatformUser>> {
  await delay();
  const filtered = users.filter((item) => matches(item, params?.search ?? ""));
  return paginate(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createUser(
  input: PlatformUserInput,
): Promise<{ ok: true; item: PlatformUser } | { ok: false; message: string }> {
  await delay();
  if (
    !input.name.trim() ||
    !input.email.trim() ||
    !input.loginId.trim()
  ) {
    return { ok: false, message: "Name, email, and login ID are required." };
  }
  const loginId = input.loginId.trim().toLowerCase();
  if (users.some((u) => u.loginId.toLowerCase() === loginId)) {
    return { ok: false, message: "Login ID is already in use." };
  }
  if (
    users.some(
      (u) => u.email.toLowerCase() === input.email.trim().toLowerCase(),
    )
  ) {
    return { ok: false, message: "Email is already in use." };
  }
  const item: PlatformUser = {
    id: `USR-${String(seq++).padStart(3, "0")}`,
    name: input.name.trim(),
    email: input.email.trim(),
    loginId,
    role: input.role,
    status: input.status,
    createdAt: new Date().toISOString(),
  };
  users = [item, ...users];
  return { ok: true, item };
}

export async function updateUser(
  id: string,
  input: PlatformUserInput,
): Promise<{ ok: true; item: PlatformUser } | { ok: false; message: string }> {
  await delay();
  const index = users.findIndex((u) => u.id === id);
  if (index < 0) return { ok: false, message: "User not found." };
  if (
    !input.name.trim() ||
    !input.email.trim() ||
    !input.loginId.trim()
  ) {
    return { ok: false, message: "Name, email, and login ID are required." };
  }
  const loginId = input.loginId.trim().toLowerCase();
  if (users.some((u) => u.loginId.toLowerCase() === loginId && u.id !== id)) {
    return { ok: false, message: "Login ID is already in use." };
  }
  if (
    users.some(
      (u) =>
        u.email.toLowerCase() === input.email.trim().toLowerCase() &&
        u.id !== id,
    )
  ) {
    return { ok: false, message: "Email is already in use." };
  }
  const item: PlatformUser = {
    ...users[index],
    name: input.name.trim(),
    email: input.email.trim(),
    loginId,
    role: input.role,
    status: input.status,
  };
  users = users.map((u) => (u.id === id ? item : u));
  return { ok: true, item };
}

export async function deleteUser(
  id: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  await delay();
  if (!users.some((u) => u.id === id)) {
    return { ok: false, message: "User not found." };
  }
  users = users.filter((u) => u.id !== id);
  return { ok: true };
}
