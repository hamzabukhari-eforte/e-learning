"use client";

import { ModulePage } from "@/components/system-setup/module-page";
import { QuestionForm } from "@/components/survey/question-form";
import { QuestionTable } from "@/components/survey/question-table";
import { useQuestionsModule } from "@/components/survey/use-questions-module";

export function QuestionsModule() {
  const {
    values,
    setValues,
    editingId,
    pending,
    error,
    list,
    handleSubmit,
    resetForm,
    handleEdit,
    handleDelete,
    getExportRows,
    formKey,
  } = useQuestionsModule();

  return (
    <ModulePage
      title="Create Questions"
      entityLabel="Question"
      sectionLabel="Survey"
      isEditing={Boolean(editingId)}
      form={
        <QuestionForm
          key={`${formKey}-${editingId ?? "new"}`}
          values={values}
          onChange={setValues}
          isEditing={Boolean(editingId)}
          pending={pending}
          error={error}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      }
      table={
        <QuestionTable
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
  );
}
