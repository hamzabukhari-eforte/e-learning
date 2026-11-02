import type {
  ChartSlice,
  DashboardOverview,
  TrendPoint,
} from "@/data/dashboard/types";
import { listDomains } from "@/data/domains/domains";
import { listUsers } from "@/data/users/users";
import {
  PLATFORM_USER_ROLE_LABEL,
  type PlatformUserRole,
} from "@/data/users/types";

const COLORS = {
  blue: "#042954",
  lightBlue: "#7EB8DA",
  yellow: "#FFA901",
  green: "#8FBF7F",
  gray: "#555555",
  red: "#E57373",
};

/** Mock cumulative growth for charts until analytics API exists. */
const ACTIVITY_TREND: TrendPoint[] = [
  { month: "May", domains: 1, users: 1 },
  { month: "Jun", domains: 1, users: 2 },
  { month: "Jul", domains: 2, users: 2 },
  { month: "Aug", domains: 2, users: 3 },
  { month: "Sep", domains: 3, users: 3 },
  { month: "Oct", domains: 3, users: 3 },
];

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const [domains, users] = await Promise.all([
    listDomains({ pageSize: 100 }),
    listUsers({ pageSize: 100 }),
  ]);

  const activeDomains = domains.rows.filter((d) => d.status === "active").length;
  const inactiveDomains = domains.rows.filter(
    (d) => d.status === "inactive",
  ).length;
  const activeUsers = users.rows.filter((u) => u.status === "active").length;
  const inactiveUsers = users.rows.filter((u) => u.status === "inactive").length;

  const roles: PlatformUserRole[] = ["admin", "trainer", "employee"];
  const roleCounts: Record<PlatformUserRole, number> = {
    admin: 0,
    trainer: 0,
    employee: 0,
  };
  for (const user of users.rows) {
    roleCounts[user.role] += 1;
  }

  const roleColors: Record<PlatformUserRole, string> = {
    admin: COLORS.blue,
    trainer: COLORS.yellow,
    employee: COLORS.lightBlue,
  };

  const usersByRole: ChartSlice[] = roles.map((role) => ({
    name: PLATFORM_USER_ROLE_LABEL[role],
    value: roleCounts[role],
    color: roleColors[role],
  }));

  return {
    kpis: {
      totalDomains: domains.total,
      activeDomains,
      totalUsers: users.total,
      activeUsers,
    },
    domainsByStatus: [
      { name: "Active", value: activeDomains, color: "#0E7490" },
      { name: "Inactive", value: inactiveDomains, color: "#CBD5E1" },
    ],
    usersByRole,
    usersByStatus: [
      { name: "Active", value: activeUsers, color: COLORS.blue },
      { name: "Inactive", value: inactiveUsers, color: COLORS.red },
    ],
    activityTrend: ACTIVITY_TREND,
    recentDomains: domains.rows.slice(0, 5).map((d) => ({
      id: d.id,
      name: d.name,
      status: d.status,
    })),
    recentUsers: users.rows.slice(0, 5).map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
    })),
  };
}
