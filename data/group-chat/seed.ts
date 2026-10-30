import type { GroupChat } from "@/data/group-chat/types";

export const GROUP_CHAT_SEED: GroupChat[] = [
  {
    id: "gc1",
    title: "Safety Orientation Follow-up",
    description: "Group discussion for Workplace Hazards learners.",
    departmentId: "1",
    departmentName: "Human Resources",
    endAt: "2026-06-30T18:00:00.000Z",
    sentAt: "2026-05-10T11:00:00.000Z",
    members: [
      { id: "EMP-001", employeeNo: "1001", name: "Ahmed Khan" },
    ],
    messages: [
      {
        id: "m1",
        sender: "trainer",
        senderName: "Trainer",
        text: "Welcome to the Safety Orientation follow-up group.",
        sentAt: "2026-05-10T11:05:00.000Z",
      },
      {
        id: "m2",
        sender: "learner",
        senderName: "Ahmed Khan",
        text: "Thank you. I have a question about PPE storage.",
        sentAt: "2026-05-10T11:20:00.000Z",
      },
      {
        id: "m3",
        sender: "trainer",
        senderName: "Trainer",
        text: "Please share the scenario and we will walk through it.",
        sentAt: "2026-05-10T11:25:00.000Z",
      },
    ],
  },
  {
    id: "gc2",
    title: "IT Training Support",
    description: "Support channel for Information Technology trainees.",
    departmentId: "2",
    departmentName: "Information Technology",
    endAt: "2026-07-15T17:00:00.000Z",
    sentAt: "2026-06-01T09:30:00.000Z",
    members: [
      { id: "EMP-002", employeeNo: "1002", name: "Sara Ali" },
    ],
    messages: [
      {
        id: "m4",
        sender: "trainer",
        senderName: "Trainer",
        text: "This group is for training questions and reminders.",
        sentAt: "2026-06-01T09:35:00.000Z",
      },
    ],
  },
];
