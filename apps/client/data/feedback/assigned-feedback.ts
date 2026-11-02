import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { getPublishedTraining } from "@/data/training/published-trainings";
import { ASSIGNED_FEEDBACK_SEED } from "@/data/feedback/feedback-seed";
import {
  feedbackStatusLabel,
  type AssignedFeedback,
  type AssignFeedbackInput,
  type FeedbackComment,
  type FeedbackStatus,
} from "@/data/feedback/types";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { toIso } from "@/lib/datetime";

export type { AssignedFeedback, AssignFeedbackInput };

let feedbacks: AssignedFeedback[] = [...ASSIGNED_FEEDBACK_SEED];

export async function listAssignedFeedback(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<AssignedFeedback>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = feedbacks.filter((item) =>
    matchesSearch(
      `${item.trainingName} ${item.subTrainingName} ${item.employeeName} ${feedbackStatusLabel(item.status)}`,
      search,
    ),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function assignFeedback(
  input: AssignFeedbackInput,
): Promise<AssignedFeedback | null> {
  await delay();
  const item = await toFeedback(input);
  if (!item) return null;
  feedbacks = [item, ...feedbacks];
  return item;
}

export async function addFeedbackComment(
  feedbackId: string,
  comment: string,
  commentedBy: string,
): Promise<AssignedFeedback | null> {
  await delay();
  const index = feedbacks.findIndex((item) => item.id === feedbackId);
  if (index < 0 || !comment.trim()) return null;
  const entry: FeedbackComment = {
    id: `c${Date.now()}`,
    comment: comment.trim(),
    commentedBy,
    commentedAt: toIso(new Date()),
  };
  feedbacks[index] = {
    ...feedbacks[index],
    comments: [entry, ...feedbacks[index].comments],
  };
  return feedbacks[index];
}

async function toFeedback(
  input: AssignFeedbackInput,
): Promise<AssignedFeedback | null> {
  if (
    !input.trainingId ||
    !input.subTrainingId ||
    !input.dateFrom ||
    !input.dateTo ||
    !input.assignedTrainingId ||
    !input.employeeId ||
    !input.status ||
    !input.details.trim()
  ) {
    return null;
  }

  const [published, employees] = await Promise.all([
    getPublishedTraining(input.assignedTrainingId),
    listEmployeesForTrainer(),
  ]);
  if (!published) return null;

  const employee = employees.find((item) => item.id === input.employeeId);
  if (!employee) return null;

  return {
    id: `fb${Date.now()}`,
    trainingId: published.trainingId,
    trainingName: published.trainingName,
    subTrainingId: published.subTrainingId,
    subTrainingName: published.subTrainingName,
    assignedTrainingId: published.id,
    startDate: published.validityFrom,
    endDate: published.validityTo,
    employeeId: input.employeeId,
    employeeName: employee.label,
    status: input.status as FeedbackStatus,
    details: input.details.trim(),
    assignedAt: toIso(new Date()),
    comments: [],
  };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
