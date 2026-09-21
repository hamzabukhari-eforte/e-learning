"use client";

import { ExamQuestionForm } from "@/components/exams/create-questions/exam-question-form";
import { ExamQuestionTable } from "@/components/exams/create-questions/exam-question-table";
import { useExamQuestions } from "@/components/exams/create-questions/use-exam-questions";
import { ModulePage } from "@/components/system-setup/module-page";

export function ExamQuestionsModule() {
  const {
    values,
    setValues,
    editingId,
    pending,
    error,
    list,
    trainings,
    subTrainings,
    handleSubmit,
    resetForm,
    handleEdit,
    handleDelete,
    getExportRows,
    formKey,
    dialog,
  } = useExamQuestions();

  return (
    <>
      <ModulePage
        title="Create Questions"
        entityLabel="Question"
        sectionLabel="Exams/Assignments"
        isEditing={Boolean(editingId)}
        form={
          <ExamQuestionForm
            key={`${formKey}-${editingId ?? "new"}`}
            values={values}
            trainings={trainings}
            subTrainings={subTrainings}
            onChange={setValues}
            isEditing={Boolean(editingId)}
            pending={pending}
            error={error}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        }
        table={
          <ExamQuestionTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            getExportRows={getExportRows}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        }
      />
      {dialog}
    </>
  );
}
