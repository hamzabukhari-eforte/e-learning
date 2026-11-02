export type ChartSlice = {
  name: string;
  value: number;
  color: string;
};

export type TrendPoint = {
  month: string;
  domains: number;
  users: number;
};

export type DashboardKpis = {
  totalDomains: number;
  activeDomains: number;
  totalUsers: number;
  activeUsers: number;
};

export type DashboardOverview = {
  kpis: DashboardKpis;
  domainsByStatus: ChartSlice[];
  usersByRole: ChartSlice[];
  usersByStatus: ChartSlice[];
  activityTrend: TrendPoint[];
  recentDomains: { id: string; name: string; status: string }[];
  recentUsers: {
    id: string;
    name: string;
    email: string;
    role: string;
  }[];
};
