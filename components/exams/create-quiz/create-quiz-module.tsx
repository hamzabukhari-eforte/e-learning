"use client";

import { CreateQuizForm } from "@/components/exams/create-quiz/create-quiz-form";
import { CreateQuizTable } from "@/components/exams/create-quiz/create-quiz-table";
import { useCreateQuiz } from "@/components/exams/create-quiz/use-create-quiz";
import { ModulePage } from "@/components/system-setup/module-page";

export function CreateQuizModule() {
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
    dialog,
  } = useCreateQuiz();

  return (
    <>
      <ModulePage
        title="Create Quiz"
        entityLabel="Quiz"
        sectionLabel="Exams/Assignments"
        isEditing={Boolean(editingId)}
        form={
          <CreateQuizForm
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
          <CreateQuizTable
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
