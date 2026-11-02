"use client";

import { QuestionResultChart } from "@/components/survey/dashboard/question-result-chart";
import type { SurveyDashboardReport } from "@/data/survey/dashboard-types";

type SurveyDashboardChartsProps = {
  report: SurveyDashboardReport | null;
  hasRequested: boolean;
};

export function SurveyDashboardCharts({
  report,
  hasRequested,
}: SurveyDashboardChartsProps) {
  if (!hasRequested) {
    return (
      <p className="px-4 py-10 text-center text-sm text-zinc-500">
        Select a form and assigned form, then click Show Report.
      </p>
    );
  }

  if (!report || report.questions.length === 0) {
    return (
      <p className="px-4 py-10 text-center text-sm text-zinc-500">
        No question results found for this assigned form.
      </p>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="text-base font-semibold text-black">{report.formName}</h2>
        <p className="text-sm text-zinc-500">{report.assignedLabel}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {report.questions.map((chart) => (
          <QuestionResultChart key={chart.questionId} chart={chart} />
        ))}
      </div>
    </div>
  );
}
