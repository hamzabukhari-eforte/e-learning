export type NavIconKey = "dashboard" | "domain" | "users";

export type NavItem = {
  id: string;
  label: string;
  icon: NavIconKey;
  href: string;
};

export const SUPER_ADMIN_NAV: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    href: "/dashboard",
  },
  {
    id: "manage-domain",
    label: "Manage Domain",
    icon: "domain",
    href: "/dashboard/manage-domain",
  },
  {
    id: "manage-users",
    label: "Manage Users",
    icon: "users",
    href: "/dashboard/manage-users",
  },
];

export async function getSidebarNav(): Promise<NavItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return SUPER_ADMIN_NAV;
}
