"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaChalkboardUser,
  FaGlobe,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa6";
import { ActivityTrendChart } from "@/components/dashboard/activity-trend-chart";
import { DashboardBarChart } from "@/components/dashboard/dashboard-bar-chart";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RecentTables } from "@/components/dashboard/recent-tables";
import { StatusPieChart } from "@/components/dashboard/status-pie-chart";
import { Button } from "@/components/ui/button";
import { getDashboardOverview } from "@/data/dashboard/overview";
import type { DashboardOverview } from "@/data/dashboard/types";

export function DashboardModule() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);

  useEffect(() => {
    void getDashboardOverview().then(setOverview);
  }, []);

  if (!overview) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500 shadow-sm">
        Loading dashboard...
      </div>
    );
  }

  const { kpis } = overview;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-[#FFA901]">Super Admin</p>
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Overview of client domains and users.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/manage-domain">Manage Domain</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/manage-users">Manage Users</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Domains"
          value={kpis.totalDomains}
          hint={`${kpis.activeDomains} active`}
          accent="#042954"
          icon={FaGlobe}
        />
        <KpiCard
          label="Active Domains"
          value={kpis.activeDomains}
          hint={`${kpis.totalDomains - kpis.activeDomains} inactive`}
          accent="#8FBF7F"
          icon={FaGlobe}
        />
        <KpiCard
          label="Total Users"
          value={kpis.totalUsers}
          hint={`${kpis.activeUsers} active`}
          accent="#FFA901"
          icon={FaUsers}
        />
        <KpiCard
          label="Active Users"
          value={kpis.activeUsers}
          hint="Admin, trainer & employee"
          accent="#7EB8DA"
          icon={FaUserCheck}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <StatusPieChart
          title="Domains by Status"
          subtitle="Active vs inactive domains"
          data={overview.domainsByStatus}
        />
        <DashboardBarChart
          title="Users by Role"
          subtitle="Admin, trainer, and employee mix"
          data={overview.usersByRole}
        />
        <DashboardBarChart
          title="Users by Status"
          subtitle="Account availability"
          data={overview.usersByStatus}
        />
      </div>

      <ActivityTrendChart data={overview.activityTrend} />

      <div className="flex items-center gap-2 text-sm text-zinc-600">
        <FaChalkboardUser className="size-4 text-[#FFA901]" aria-hidden />
        <span>Latest records across domains and users</span>
      </div>

      <RecentTables
        recentDomains={overview.recentDomains}
        recentUsers={overview.recentUsers}
      />
    </motion.div>
  );
}
