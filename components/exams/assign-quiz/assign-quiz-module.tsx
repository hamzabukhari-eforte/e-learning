"use client";

import { AssignQuizForm } from "@/components/exams/assign-quiz/assign-quiz-form";
import { AssignQuizTable } from "@/components/exams/assign-quiz/assign-quiz-table";
import { useAssignQuiz } from "@/components/exams/assign-quiz/use-assign-quiz";
import { ModulePage } from "@/components/system-setup/module-page";

export function AssignQuizModule() {
  const {
    values,
    setValues,
    trainings,
    subTrainings,
    employees,
    quizzes,
    pending,
    error,
    list,
    handleSubmit,
    getExportRows,
  } = useAssignQuiz();

  return (
    <ModulePage
      title="Assign Quiz"
      entityLabel="Assigned Quiz"
      sectionLabel="Exams/Assignments"
      formTitle="Assign Quiz"
      form={
        <AssignQuizForm
          values={values}
          trainings={trainings}
          subTrainings={subTrainings}
          employees={employees}
          quizzes={quizzes}
          pending={pending}
          error={error}
          onChange={setValues}
          onSubmit={handleSubmit}
        />
      }
      table={
        <AssignQuizTable
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
        />
      }
    />
  );
}
