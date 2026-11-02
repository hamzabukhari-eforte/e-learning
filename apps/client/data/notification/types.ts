export type NotificationReceiverType = "all-employees" | "trainer";

export type AppNotification = {
  id: string;
  departmentId: string;
  departmentName: string;
  receiverType: NotificationReceiverType;
  text: string;
  createdAt: string;
};

export type NotificationInput = {
  departmentId: string;
  receiverType: NotificationReceiverType | "";
  text: string;
};

export const RECEIVER_TYPE_LABEL: Record<NotificationReceiverType, string> = {
  "all-employees": "Send to All Employees",
  trainer: "Send to Trainer",
};
