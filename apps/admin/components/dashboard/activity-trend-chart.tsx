"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/dashboard/chart-card";
import type { TrendPoint } from "@/data/dashboard/types";

type ActivityTrendChartProps = {
  data: TrendPoint[];
};

const DOMAIN_COLOR = "#0E7490";
const USER_COLOR = "#F59E0B";

export function ActivityTrendChart({ data }: ActivityTrendChartProps) {
  return (
    <ChartCard
      title="Growth Trend"
      subtitle="Cumulative domains and users over recent months"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id="domainsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={DOMAIN_COLOR} stopOpacity={0.45} />
              <stop offset="95%" stopColor={DOMAIN_COLOR} stopOpacity={0.04} />
            </linearGradient>
            <linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={USER_COLOR} stopOpacity={0.35} />
              <stop offset="95%" stopColor={USER_COLOR} stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e4e4e7" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#52525b", fontSize: 12 }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#52525b", fontSize: 12 }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e4e4e7",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          />
          <Legend verticalAlign="bottom" height={32} />
          <Area
            type="monotone"
            dataKey="domains"
            name="Domains"
            stroke={DOMAIN_COLOR}
            strokeWidth={2.5}
            fill="url(#domainsFill)"
            dot={{ r: 3.5, fill: DOMAIN_COLOR, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
          <Area
            type="monotone"
            dataKey="users"
            name="Users"
            stroke={USER_COLOR}
            strokeWidth={2.5}
            fill="url(#usersFill)"
            dot={{ r: 3.5, fill: USER_COLOR, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
