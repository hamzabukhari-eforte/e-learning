"use client";

import { ModulePage } from "@/components/system-setup/module-page";
import { QuestionPickerModal } from "@/components/survey/create-form/question-picker-modal";
import { SurveyFormFields } from "@/components/survey/create-form/survey-form-fields";
import { SurveyFormsTable } from "@/components/survey/create-form/survey-forms-table";
import { useSurveyForms } from "@/components/survey/create-form/use-survey-forms";

export function SurveyFormsModule() {
  const {
    values,
    setValues,
    editingId,
    pending,
    error,
    list,
    pickerOpen,
    openPicker,
    closePicker,
    handleSubmit,
    resetForm,
    handleEdit,
    handleDelete,
  } = useSurveyForms();

  return (
    <>
      <ModulePage
        title="Create Form"
        entityLabel="Form"
        sectionLabel="Survey"
        isEditing={Boolean(editingId)}
        form={
          <SurveyFormFields
            values={values}
            onChange={setValues}
            isEditing={Boolean(editingId)}
            pending={pending}
            error={error}
            onSelectQuestions={() => void openPicker()}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        }
        table={
          <SurveyFormsTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        }
      />
      {pickerOpen && values.questionType ? (
        <QuestionPickerModal
          open={pickerOpen}
          questionType={values.questionType}
          initialSelected={values.questions}
          limit={Number(values.questionLimit) || 1}
          onClose={closePicker}
          onSave={(questions) => {
            setValues({ ...values, questions });
            closePicker();
          }}
        />
      ) : null}
    </>
  );
}
