"use client";

import { motion } from "framer-motion";
import {
  FaUserCheck,
  FaUserSlash,
  FaChalkboardUser,
  FaUserXmark,
} from "react-icons/fa6";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { GenderPieChart } from "@/components/dashboard/gender-pie-chart";
import { DashboardBarChart } from "@/components/dashboard/dashboard-bar-chart";
import type { DashboardOverview } from "@/data/dashboard/types";

type DashboardHomeProps = {
  name?: string;
  overview: DashboardOverview;
};

export function DashboardHome({ name, overview }: DashboardHomeProps) {
  const { kpis } = overview;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <p className="text-sm text-[#FFA901]">Overview</p>
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600">
          {name
            ? `Welcome back, ${name}.`
            : "Key metrics across registration, training, and surveys."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Registered Employees"
          value={kpis.registeredEmployees}
          accent="#042954"
          icon={FaUserCheck}
        />
        <KpiCard
          label="Total Unregistered Employees"
          value={kpis.unregisteredEmployees}
          accent="#E57373"
          icon={FaUserSlash}
        />
        <KpiCard
          label="Total Registered Trainers"
          value={kpis.registeredTrainers}
          accent="#FFA901"
          icon={FaChalkboardUser}
        />
        <KpiCard
          label="Total Unregistered Trainers"
          value={kpis.unregisteredTrainers}
          accent="#555555"
          icon={FaUserXmark}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GenderPieChart data={overview.gender} />
        <DashboardBarChart
          title="Employees by Department"
          data={overview.departments}
        />
        <DashboardBarChart title="Trainer Type" data={overview.trainerTypes} />
        <DashboardBarChart
          title="Training Status"
          data={overview.trainingStatus}
        />
        <DashboardBarChart
          title="Survey Assigned vs Attempted"
          data={overview.surveyAttempts}
        />
        <DashboardBarChart
          title="Test Submit Status"
          data={overview.testSubmitStatus}
        />
      </div>
    </motion.div>
  );
}
