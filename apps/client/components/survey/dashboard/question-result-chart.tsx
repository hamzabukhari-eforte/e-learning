"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { SurveyQuestionChart } from "@/data/survey/dashboard-types";

type QuestionResultChartProps = {
  chart: SurveyQuestionChart;
};

function PercentTick({ x, y, payload }: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) {
  return (
    <text
      x={x}
      y={(y ?? 0) + 14}
      textAnchor="middle"
      fill="#0b6bcb"
      fontSize={12}
      textDecoration="underline"
    >
      {payload?.value}
    </text>
  );
}

export function QuestionResultChart({ chart }: QuestionResultChartProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-black">
          Question# {chart.questionNumber} : {chart.question}
        </h3>
        <p className="text-xs text-zinc-500">View Department Wise . Source:</p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chart.answers}
            margin={{ top: 24, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="label"
              tick={<PercentTick />}
              axisLine={{ stroke: "#d4d4d8" }}
              tickLine={false}
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(value) => `${value}%`}
              axisLine={{ stroke: "#d4d4d8" }}
              tickLine={false}
              tick={{ fill: "#52525b", fontSize: 12 }}
              label={{
                value: "Range",
                angle: -90,
                position: "insideLeft",
                fill: "#52525b",
                fontSize: 12,
              }}
            />
            <Bar dataKey="percentage" radius={[2, 2, 0, 0]} maxBarSize={72}>
              {chart.answers.map((answer) => (
                <Cell key={answer.label} fill={answer.color} />
              ))}
              <LabelList
                dataKey="percentage"
                position="top"
                formatter={(value) => `${Number(value).toFixed(1)}%`}
                style={{
                  fill: "#0b6bcb",
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
