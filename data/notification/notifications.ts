import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import {
  RECEIVER_TYPE_LABEL,
  type AppNotification,
  type NotificationInput,
} from "@/data/notification/types";
import { listDepartmentOptions } from "@/data/system-setup/departments";

export type { AppNotification, NotificationInput };
export { RECEIVER_TYPE_LABEL };

let notifications: AppNotification[] = [
  {
    id: "1",
    departmentId: "1",
    departmentName: "Human Resources",
    receiverType: "all-employees",
    text: "Please complete your pending compliance training by Friday.",
    createdAt: "2026-03-10T09:30:00.000Z",
  },
  {
    id: "2",
    departmentId: "2",
    departmentName: "Information Technology",
    receiverType: "trainer",
    text: "New training modules are available for assignment this week.",
    createdAt: "2026-03-12T14:15:00.000Z",
  },
];

export async function listNotifications(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<AppNotification>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = notifications.filter(
    (item) =>
      matchesSearch(item.text, search) ||
      matchesSearch(item.departmentName, search) ||
      matchesSearch(RECEIVER_TYPE_LABEL[item.receiverType], search) ||
      matchesSearch(item.createdAt, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function sendNotification(
  input: NotificationInput,
): Promise<AppNotification | null> {
  await delay();
  const text = input.text.trim();
  if (!input.departmentId || !input.receiverType || !text) return null;
  if (text.length > 1000) return null;
  const departments = await listDepartmentOptions();
  const department = departments.find((item) => item.id === input.departmentId);
  if (!department) return null;
  const record: AppNotification = {
    id: String(Date.now()),
    departmentId: input.departmentId,
    departmentName: department.label,
    receiverType: input.receiverType,
    text,
    createdAt: new Date().toISOString(),
  };
  notifications = [record, ...notifications];
  return record;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
