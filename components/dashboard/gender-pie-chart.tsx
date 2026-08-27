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

type GenderPieChartProps = {
  data: ChartSlice[];
};

export function GenderPieChart({ data }: GenderPieChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <ChartCard title="Gender Distribution">
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
            paddingAngle={3}
            stroke="#fff"
            strokeWidth={2}
          >
            {data.map((slice) => (
              <Cell key={slice.name} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip
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
