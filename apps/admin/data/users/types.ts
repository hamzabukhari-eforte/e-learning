export type PlatformUserRole = "admin" | "trainer" | "employee";
export type PlatformUserStatus = "active" | "inactive";

export type PlatformUser = {
  id: string;
  name: string;
  email: string;
  loginId: string;
  role: PlatformUserRole;
  status: PlatformUserStatus;
  createdAt: string;
};

export type PlatformUserInput = {
  name: string;
  email: string;
  loginId: string;
  role: PlatformUserRole;
  status: PlatformUserStatus;
};

export const PLATFORM_USER_ROLE_LABEL: Record<PlatformUserRole, string> = {
  admin: "Admin",
  trainer: "Trainer",
  employee: "Employee",
};

export const PLATFORM_USER_STATUS_LABEL: Record<PlatformUserStatus, string> = {
  active: "Active",
  inactive: "Inactive",
};
