import type { LoginRole } from "@/data/auth";

export type NavIconKey =
  | "dashboard"
  | "setup"
  | "survey"
  | "registration"
  | "assign"
  | "management"
  | "reports"
  | "notifications"
  | "training"
  | "profile";

export type NavChild = {
  id: string;
  label: string;
  href: string;
};

export type NavItem = {
  id: string;
  label: string;
  icon: NavIconKey;
  href?: string;
  children?: NavChild[];
};

const ADMIN_NAV: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    href: "/dashboard",
  },
  {
    id: "system-setup",
    label: "System Setup",
    icon: "setup",
    children: [
      { id: "define-country", label: "Define Country", href: "/dashboard/system-setup/define-country" },
      { id: "define-city", label: "Define City", href: "/dashboard/system-setup/define-city" },
      { id: "define-department", label: "Define Department", href: "/dashboard/system-setup/define-department" },
      { id: "define-designation", label: "Define Designation", href: "/dashboard/system-setup/define-designation" },
      { id: "define-training", label: "Define Training", href: "/dashboard/system-setup/define-training" },
    ],
  },
  {
    id: "survey",
    label: "Survey",
    icon: "survey",
    children: [
      { id: "create-questions", label: "Create Questions", href: "/dashboard/survey/create-questions" },
      { id: "create-form", label: "Create Form", href: "/dashboard/survey/create-form" },
      { id: "send-form", label: "Send Form", href: "/dashboard/survey/send-form" },
      { id: "survey-results", label: "Survey Results", href: "/dashboard/survey/results" },
      { id: "survey-dashboard", label: "Survey Dashboard", href: "/dashboard/survey/dashboard" },
    ],
  },
  {
    id: "registration",
    label: "Registration",
    icon: "registration",
    children: [
      { id: "employee-registration", label: "Employee Registration", href: "/dashboard/registration/employee" },
      { id: "add-trainer", label: "Add Trainer", href: "/dashboard/registration/trainer" },
    ],
  },
  {
    id: "assign-training",
    label: "Assign Training",
    icon: "assign",
    children: [
      { id: "assign-to-trainer", label: "Assign Training To Trainer", href: "/dashboard/assign-training/trainer" },
      { id: "training-designation", label: "Training & Designation Binding", href: "/dashboard/assign-training/designation-binding" },
      { id: "popup-setup", label: "Add Popup Setup", href: "/dashboard/assign-training/popup-setup" },
    ],
  },
  {
    id: "system-management",
    label: "System Management",
    icon: "management",
    children: [
      { id: "edit-training", label: "Edit Training Details", href: "/dashboard/system-management/edit-training" },
      { id: "edit-employee", label: "Edit Employee Details", href: "/dashboard/system-management/edit-employee" },
      { id: "edit-assigned-trainer", label: "Edit Assigned Trainer", href: "/dashboard/system-management/edit-assigned-trainer" },
      { id: "edit-training-dept", label: "Edit Training / Department Binding Report", href: "/dashboard/system-management/edit-training-department" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: "reports",
    children: [
      { id: "employee-report", label: "Employee Report", href: "/dashboard/reports/employee" },
      { id: "trainer-report", label: "Trainer Report", href: "/dashboard/reports/trainer" },
      { id: "test-summary", label: "Test Attempt Summary Report", href: "/dashboard/reports/test-summary" },
      { id: "test-detail", label: "Test Attempt Detail Report", href: "/dashboard/reports/test-detail" },
      { id: "test-history", label: "Test Attempt History Report", href: "/dashboard/reports/test-history" },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "notifications",
    href: "/dashboard/notifications",
  },
];

const TRAINER_NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "/dashboard" },
  {
    id: "training",
    label: "Training",
    icon: "training",
    children: [
      { id: "my-trainings", label: "My Trainings", href: "/dashboard/training/my-trainings" },
      { id: "assigned-employees", label: "Assigned Employees", href: "/dashboard/training/assigned-employees" },
    ],
  },
  { id: "reports", label: "Reports", icon: "reports", href: "/dashboard/reports/trainer" },
  { id: "notifications", label: "Notifications", icon: "notifications", href: "/dashboard/notifications" },
];

const EMPLOYEE_NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "/dashboard" },
  {
    id: "training",
    label: "My Training",
    icon: "training",
    children: [
      { id: "assigned", label: "Assigned Trainings", href: "/dashboard/training/assigned" },
      { id: "history", label: "Training History", href: "/dashboard/training/history" },
    ],
  },
  { id: "profile", label: "Profile", icon: "profile", href: "/dashboard/profile" },
  { id: "notifications", label: "Notifications", icon: "notifications", href: "/dashboard/notifications" },
];

/** Sidebar menus from backend (mocked by role until API is wired). */
export async function getSidebarNav(role: LoginRole): Promise<NavItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (role === "admin") return ADMIN_NAV;
  if (role === "trainer") return TRAINER_NAV;
  return EMPLOYEE_NAV;
}
