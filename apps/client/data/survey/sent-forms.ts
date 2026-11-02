import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { SENT_FORM_SEED } from "@/data/survey/sent-form-seed";
import { sentFormSearchText, surveyResultSearchText } from "@/data/survey/search-text";
import type {
  SendFormInput,
  SentForm,
  SurveyResult,
} from "@/data/survey/types";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { getAllForms } from "@/data/survey/forms";

export type { SendFormInput, SentForm, SurveyResult };

let sentForms: SentForm[] = [...SENT_FORM_SEED];
let nextId = 1003;

export async function listSentForms(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<SentForm>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = sentForms.filter((item) =>
    matchesSearch(sentFormSearchText(item), search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function listSurveyResults(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<SurveyResult>> {
  await delay();
  const search = params?.search ?? "";
  const results = sentForms.map((item) => ({
    id: item.id,
    formName: item.formName,
    formType: item.formType,
    assignedAt: item.assignedAt,
    validFrom: item.validFrom,
    validTo: item.validTo,
    assignedCount: item.employeeIds.length,
    attemptedCount: item.attemptedCount,
  }));
  const filtered = results.filter((item) =>
    matchesSearch(surveyResultSearchText(item), search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function sendForm(input: SendFormInput): Promise<SentForm | null> {
  await delay();
  if (!input.employeeIds.length || !input.formId || !input.formType) return null;
  if (!input.validFrom || !input.validTo) return null;
  if (new Date(input.validTo) <= new Date(input.validFrom)) return null;
  const [employees, forms] = await Promise.all([
    listEmployeesForTrainer(),
    getAllForms(),
  ]);
  const selected = employees.filter((item) => input.employeeIds.includes(item.id));
  const form = forms.find((item) => item.id === input.formId);
  if (!selected.length || !form) return null;
  const sent: SentForm = {
    id: `SF-${nextId}`,
    employeeIds: selected.map((item) => item.id),
    employeeNames: selected.map((item) => item.label),
    formId: form.id,
    formName: form.name,
    formType: input.formType,
    assignedAt: new Date().toISOString(),
    validFrom: input.validFrom,
    validTo: input.validTo,
    attemptedCount: 0,
  };
  nextId += 1;
  sentForms = [sent, ...sentForms];
  return sent;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
