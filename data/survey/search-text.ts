import { SENT_FORM_TYPE_LABEL, type SentForm, type SurveyResult } from "@/data/survey/types";
import { formatDateTime, formatValidity } from "@/lib/datetime";

export function sentFormSearchText(item: SentForm) {
  return [
    item.id,
    item.formName,
    item.formType,
    SENT_FORM_TYPE_LABEL[item.formType],
    item.employeeNames.join(" "),
    formatDateTime(item.assignedAt),
    formatValidity(item.validFrom, item.validTo),
    item.assignedAt,
    item.validFrom,
    item.validTo,
    String(item.employeeIds.length),
    String(item.attemptedCount),
  ].join(" ");
}

export function surveyResultSearchText(item: SurveyResult) {
  return [
    item.formName,
    item.formType,
    SENT_FORM_TYPE_LABEL[item.formType],
    formatDateTime(item.assignedAt),
    formatValidity(item.validFrom, item.validTo),
    item.assignedAt,
    item.validFrom,
    item.validTo,
    String(item.assignedCount),
    String(item.attemptedCount),
  ].join(" ");
}
