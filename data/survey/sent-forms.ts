import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { SENT_FORM_SEED } from "@/data/survey/sent-form-seed";
import type { SendFormInput, SentForm } from "@/data/survey/types";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { getAllForms } from "@/data/survey/forms";

export type { SendFormInput, SentForm };

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
    matchesSearch(
      `${item.id} ${item.formName} ${item.formType} ${item.employeeName}`,
      search,
    ),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function sendForm(input: SendFormInput): Promise<SentForm | null> {
  await delay();
  if (!input.employeeId || !input.formId || !input.formType) return null;
  if (!input.validFrom || !input.validTo) return null;
  if (new Date(input.validTo) <= new Date(input.validFrom)) return null;
  const [employees, forms] = await Promise.all([
    listEmployeesForTrainer(),
    getAllForms(),
  ]);
  const employee = employees.find((item) => item.id === input.employeeId);
  const form = forms.find((item) => item.id === input.formId);
  if (!employee || !form) return null;
  const sent: SentForm = {
    id: `SF-${nextId}`,
    employeeId: employee.id,
    employeeName: employee.label,
    formId: form.id,
    formName: form.name,
    formType: input.formType,
    assignedAt: new Date().toISOString(),
    validFrom: input.validFrom,
    validTo: input.validTo,
  };
  nextId += 1;
  sentForms = [sent, ...sentForms];
  return sent;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
