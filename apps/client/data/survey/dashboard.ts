import { DASHBOARD_CHART_SEED } from "@/data/survey/dashboard-seed";
import type {
  SurveyDashboardFilter,
  SurveyDashboardReport,
} from "@/data/survey/dashboard-types";
import { getAllForms } from "@/data/survey/forms";
import { listSentForms } from "@/data/survey/sent-forms";
import { formatDate } from "@/lib/datetime";
import type { SelectOption } from "@/data/registration/types";

export type { SurveyDashboardFilter, SurveyDashboardReport };
export type {
  SurveyAnswerStat,
  SurveyQuestionChart,
} from "@/data/survey/dashboard-types";

export async function listSurveyFormOptions(): Promise<SelectOption[]> {
  const forms = await getAllForms();
  return forms.map((item) => ({ id: item.id, label: item.name }));
}

export async function listAssignedFormOptions(
  formId: string,
): Promise<SelectOption[]> {
  if (!formId) return [];
  const result = await listSentForms({ page: 1, pageSize: 1000 });
  return result.items
    .filter((item) => item.formId === formId)
    .map((item) => ({
      id: item.id,
      label: `${item.id} — ${formatDate(item.assignedAt)}`,
    }));
}

export async function getSurveyDashboardReport(
  filter: SurveyDashboardFilter,
): Promise<SurveyDashboardReport | null> {
  await delay();
  if (!filter.formId || !filter.assignedFormId) return null;
  const [forms, sent] = await Promise.all([
    getAllForms(),
    listSentForms({ page: 1, pageSize: 1000 }),
  ]);
  const form = forms.find((item) => item.id === filter.formId);
  const assigned = sent.items.find((item) => item.id === filter.assignedFormId);
  if (!form || !assigned || assigned.formId !== form.id) return null;
  const questions = DASHBOARD_CHART_SEED[assigned.id] ?? [];
  return {
    formId: form.id,
    formName: form.name,
    assignedFormId: assigned.id,
    assignedLabel: `${assigned.id} — ${formatDate(assigned.assignedAt)}`,
    questions,
  };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
