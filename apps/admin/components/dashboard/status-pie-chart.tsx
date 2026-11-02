"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartCard } from "@/components/dashboard/chart-card";
import type { ChartSlice } from "@/data/dashboard/types";

type StatusPieChartProps = {
  title: string;
  subtitle?: string;
  data: ChartSlice[];
};

export function StatusPieChart({ title, subtitle, data }: StatusPieChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="46%"
            innerRadius={58}
            outerRadius={88}
            paddingAngle={4}
            stroke="#fff"
            strokeWidth={3}
          >
            {data.map((slice) => (
              <Cell key={slice.name} fill={slice.color} stroke={slice.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e4e4e7",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
            formatter={(value) => {
              const count = Number(value);
              const pct = total ? ((count / total) * 100).toFixed(0) : "0";
              return [`${count} (${pct}%)`, "Count"];
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => {
              const slice = data.find((item) => item.name === value);
              const pct =
                total && slice
                  ? ((slice.value / total) * 100).toFixed(0)
                  : "0";
              return `${value} — ${pct}%`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
