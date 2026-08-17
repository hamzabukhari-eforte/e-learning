import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { FORM_SEED } from "@/data/survey/form-seed";
import type { SurveyForm, SurveyFormInput } from "@/data/survey/types";

export type { SurveyForm, SurveyFormInput };

let forms: SurveyForm[] = [...FORM_SEED];

export async function listForms(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<SurveyForm>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = forms.filter((item) =>
    matchesSearch(`${item.name} ${item.createdBy}`, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function getAllForms(): Promise<SurveyForm[]> {
  const result = await listForms({ page: 1, pageSize: 1000 });
  return result.items;
}

export async function createForm(
  input: SurveyFormInput,
  createdBy: string,
): Promise<SurveyForm | null> {
  await delay();
  const form = toForm(String(Date.now()), input, createdBy, today());
  if (!form) return null;
  forms = [form, ...forms];
  return form;
}

export async function updateForm(
  id: string,
  input: SurveyFormInput,
): Promise<SurveyForm | null> {
  await delay();
  const index = forms.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const next = toForm(id, input, forms[index].createdBy, forms[index].createdDate);
  if (!next) return null;
  forms[index] = next;
  return forms[index];
}

export async function deleteForm(id: string): Promise<boolean> {
  await delay();
  const before = forms.length;
  forms = forms.filter((item) => item.id !== id);
  return forms.length < before;
}

function toForm(
  id: string,
  input: SurveyFormInput,
  createdBy: string,
  createdDate: string,
): SurveyForm | null {
  const limit = Number(input.questionLimit);
  if (!input.name.trim() || !input.questionType || limit < 1) return null;
  if (!input.questions.length || input.questions.length > limit) return null;
  return {
    id,
    name: input.name.trim(),
    questionLimit: limit,
    questionType: input.questionType,
    questions: [...input.questions].sort((a, b) => a.sequence - b.sequence),
    createdBy,
    createdDate,
  };
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
