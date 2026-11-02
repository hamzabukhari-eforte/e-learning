"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/dashboard/chart-card";
import type { ChartSlice } from "@/data/dashboard/types";

type DashboardBarChartProps = {
  title: string;
  data: ChartSlice[];
};

export function DashboardBarChart({ title, data }: DashboardBarChartProps) {
  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#52525b", fontSize: 11 }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={false}
            interval={0}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#52525b", fontSize: 12 }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={false}
          />
          <Tooltip />
          <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={56}>
            {data.map((slice) => (
              <Cell key={slice.name} fill={slice.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
