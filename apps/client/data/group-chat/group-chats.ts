import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { listDepartmentOptions } from "@/data/system-setup/departments";
import { listEmployeeOptionsByDepartment } from "@/data/registration/employees";
import { GROUP_CHAT_SEED } from "@/data/group-chat/seed";
import type {
  GroupChat,
  GroupChatInput,
  GroupChatMessage,
} from "@/data/group-chat/types";
import { toIso } from "@/lib/datetime";

export type { GroupChat, GroupChatInput };

let chats: GroupChat[] = [...GROUP_CHAT_SEED];

export async function listGroupChats(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<GroupChat>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = chats.filter(
    (item) =>
      matchesSearch(item.title, search) ||
      matchesSearch(item.description, search) ||
      matchesSearch(item.departmentName, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createGroupChat(
  input: GroupChatInput,
): Promise<GroupChat | null> {
  await delay();
  const item = await toChat(String(Date.now()), input, toIso(new Date()), []);
  if (!item) return null;
  chats = [item, ...chats];
  return item;
}

export async function updateGroupChat(
  id: string,
  input: GroupChatInput,
): Promise<GroupChat | null> {
  await delay();
  const index = chats.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const next = await toChat(
    id,
    input,
    chats[index].sentAt,
    chats[index].messages,
  );
  if (!next) return null;
  chats[index] = next;
  return chats[index];
}

export async function sendGroupChatMessage(
  chatId: string,
  text: string,
  senderName: string,
): Promise<GroupChat | null> {
  await delay();
  const index = chats.findIndex((item) => item.id === chatId);
  if (index < 0 || !text.trim()) return null;
  const message: GroupChatMessage = {
    id: `m${Date.now()}`,
    sender: "trainer",
    senderName,
    text: text.trim(),
    sentAt: toIso(new Date()),
  };
  chats[index] = {
    ...chats[index],
    messages: [...chats[index].messages, message],
  };
  return chats[index];
}

async function toChat(
  id: string,
  input: GroupChatInput,
  sentAt: string,
  messages: GroupChatMessage[],
): Promise<GroupChat | null> {
  if (
    !input.endAt ||
    !input.title.trim() ||
    !input.description.trim() ||
    !input.departmentId ||
    !input.employeeIds.length
  ) {
    return null;
  }

  const [departments, employees] = await Promise.all([
    listDepartmentOptions(),
    listEmployeeOptionsByDepartment(input.departmentId),
  ]);
  const department = departments.find((item) => item.id === input.departmentId);
  if (!department) return null;

  const members = employees
    .filter((item) => input.employeeIds.includes(item.id))
    .map((item) => ({
      id: item.id,
      employeeNo: item.employeeNo,
      name: item.name,
    }));

  if (!members.length) return null;

  return {
    id,
    title: input.title.trim(),
    description: input.description.trim(),
    departmentId: input.departmentId,
    departmentName: department.label,
    endAt: input.endAt,
    sentAt,
    members,
    messages,
  };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
