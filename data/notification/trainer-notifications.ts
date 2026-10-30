import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { listSubTrainings } from "@/data/system-setup/sub-trainings";
import { listTrainings } from "@/data/system-setup/trainings";
import type {
  TrainerNotification,
  TrainerNotificationInput,
} from "@/data/notification/trainer-types";
import { toEndOfDayIso, toIso, toStartOfDayIso } from "@/lib/datetime";

export type { TrainerNotification, TrainerNotificationInput };

let notifications: TrainerNotification[] = [
  {
    id: "tn1",
    trainingId: "1",
    trainingName: "Safety Orientation",
    subTrainingId: "s1",
    subTrainingName: "Workplace Hazards",
    dateFrom: "2026-05-01T00:00:00.000Z",
    dateTo: "2026-05-31T23:59:59.999Z",
    text: "Please complete Workplace Hazards material before the assessment window closes.",
    createdAt: "2026-05-08T10:30:00.000Z",
  },
  {
    id: "tn2",
    trainingId: "2",
    trainingName: "Fire Fighting",
    subTrainingId: "s4",
    subTrainingName: "Extinguisher Types",
    dateFrom: "2026-06-01T00:00:00.000Z",
    dateTo: "2026-06-30T23:59:59.999Z",
    text: "Reminder: Extinguisher Types quiz opens next week. Review your study material.",
    createdAt: "2026-06-02T14:15:00.000Z",
  },
];

export async function listTrainerNotifications(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<TrainerNotification>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = notifications.filter(
    (item) =>
      matchesSearch(item.text, search) ||
      matchesSearch(item.trainingName, search) ||
      matchesSearch(item.subTrainingName, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createTrainerNotification(
  input: TrainerNotificationInput,
): Promise<TrainerNotification | null> {
  await delay();
  const item = await toNotification(String(Date.now()), input, toIso(new Date()));
  if (!item) return null;
  notifications = [item, ...notifications];
  return item;
}

export async function updateTrainerNotification(
  id: string,
  input: TrainerNotificationInput,
): Promise<TrainerNotification | null> {
  await delay();
  const index = notifications.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const next = await toNotification(id, input, notifications[index].createdAt);
  if (!next) return null;
  notifications[index] = next;
  return notifications[index];
}

export async function deleteTrainerNotification(id: string): Promise<boolean> {
  await delay();
  const before = notifications.length;
  notifications = notifications.filter((item) => item.id !== id);
  return notifications.length < before;
}

async function toNotification(
  id: string,
  input: TrainerNotificationInput,
  createdAt: string,
): Promise<TrainerNotification | null> {
  const text = input.text.trim();
  if (
    !input.dateFrom ||
    !input.dateTo ||
    !input.trainingId ||
    !input.subTrainingId ||
    !text ||
    text.length > 1000
  ) {
    return null;
  }

  const [trainings, subTrainings] = await Promise.all([
    listTrainings({ page: 1, pageSize: 1000 }),
    listSubTrainings({ page: 1, pageSize: 1000, trainingId: input.trainingId }),
  ]);

  return {
    id,
    trainingId: input.trainingId,
    trainingName:
      trainings.items.find((item) => item.id === input.trainingId)?.name ?? "",
    subTrainingId: input.subTrainingId,
    subTrainingName:
      subTrainings.items.find((item) => item.id === input.subTrainingId)?.name ??
      "",
    dateFrom: toStartOfDayIso(new Date(input.dateFrom)),
    dateTo: toEndOfDayIso(new Date(input.dateTo)),
    text,
    createdAt,
  };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
