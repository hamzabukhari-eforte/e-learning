import {
  paginateItems,
  type EntityStatus,
  type PaginatedResult,
} from "@/data/system-setup/types";

export type PopupSetup = {
  id: string;
  minutes: number;
  seconds: number;
  status: EntityStatus;
};

export type PopupSetupInput = {
  minutes: string;
  seconds: string;
  status: EntityStatus;
};

let records: PopupSetup[] = [
  { id: "1", minutes: 5, seconds: 30, status: "active" },
  { id: "2", minutes: 10, seconds: 15, status: "inactive" },
];

export async function listPopupSetups(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<PopupSetup>> {
  await delay();
  const search = (params?.search ?? "").trim().toLowerCase();
  const filtered = search
    ? records.filter(
        (item) =>
          String(item.minutes).includes(search) ||
          String(item.seconds).includes(search) ||
          item.status.includes(search),
      )
    : records;
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createPopupSetup(
  input: PopupSetupInput,
): Promise<PopupSetup | null> {
  await delay();
  const parsed = parse(input);
  if (!parsed) return null;
  const record: PopupSetup = { id: String(Date.now()), ...parsed };
  records = [record, ...records];
  return record;
}

export async function updatePopupSetup(
  id: string,
  input: PopupSetupInput,
): Promise<PopupSetup | null> {
  await delay();
  const parsed = parse(input);
  if (!parsed) return null;
  const index = records.findIndex((item) => item.id === id);
  if (index < 0) return null;
  records[index] = { ...records[index], ...parsed };
  return records[index];
}

export async function deletePopupSetup(id: string): Promise<boolean> {
  await delay();
  const before = records.length;
  records = records.filter((item) => item.id !== id);
  return records.length < before;
}

function parse(input: PopupSetupInput) {
  const minutes = Number(input.minutes);
  const seconds = Number(input.seconds);
  if (
    !Number.isInteger(minutes) ||
    minutes < 0 ||
    minutes > 99 ||
    !Number.isInteger(seconds) ||
    seconds < 0 ||
    seconds > 99
  )
    return null;
  return { minutes, seconds, status: input.status };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
