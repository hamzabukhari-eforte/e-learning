export type GroupChatMember = {
  id: string;
  employeeNo: string;
  name: string;
};

export type GroupChatSender = "trainer" | "learner";

export type GroupChatMessage = {
  id: string;
  sender: GroupChatSender;
  senderName: string;
  text: string;
  sentAt: string;
};

export type GroupChat = {
  id: string;
  title: string;
  description: string;
  departmentId: string;
  departmentName: string;
  endAt: string;
  sentAt: string;
  members: GroupChatMember[];
  messages: GroupChatMessage[];
};

export type GroupChatInput = {
  endAt: string;
  title: string;
  description: string;
  departmentId: string;
  employeeIds: string[];
};
