import type { PlatformUser } from "@/data/users/types";

export const USER_SEED: PlatformUser[] = [
  {
    id: "USR-001",
    name: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    loginId: "ahmed.khan",
    role: "admin",
    status: "active",
    createdAt: "2025-10-01T08:00:00.000Z",
  },
  {
    id: "USR-002",
    name: "Sara Malik",
    email: "sara.malik@example.com",
    loginId: "sara.malik",
    role: "trainer",
    status: "active",
    createdAt: "2026-02-14T10:00:00.000Z",
  },
  {
    id: "USR-003",
    name: "Bilal Hussain",
    email: "bilal.hussain@example.com",
    loginId: "bilal.hussain",
    role: "employee",
    status: "inactive",
    createdAt: "2026-04-01T12:00:00.000Z",
  },
];
