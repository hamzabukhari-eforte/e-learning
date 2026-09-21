"use client";

import { PersonalizedAssessmentForm } from "@/components/exams/personalized-assessments/personalized-assessment-form";
import { PersonalizedAssessmentTable } from "@/components/exams/personalized-assessments/personalized-assessment-table";
import { usePersonalizedAssessments } from "@/components/exams/personalized-assessments/use-personalized-assessments";
import { ModulePage } from "@/components/system-setup/module-page";

export function PersonalizedAssessmentsModule() {
  const {
    values,
    setValues,
    trainings,
    subTrainings,
    assignedTrainings,
    employees,
    pending,
    error,
    list,
    handleSubmit,
  } = usePersonalizedAssessments();

  return (
    <ModulePage
      title="Assign Personalized Assessments"
      entityLabel="Personalized Assessment"
      sectionLabel="Exams/Assignments"
      formTitle="Assign Personalized Assessment"
      form={
        <PersonalizedAssessmentForm
          values={values}
          trainings={trainings}
          subTrainings={subTrainings}
          assignedTrainings={assignedTrainings}
          employees={employees}
          pending={pending}
          error={error}
          onChange={setValues}
          onSubmit={handleSubmit}
        />
      }
      table={
        <PersonalizedAssessmentTable
          rows={list.rows}
          page={list.page}
          pageSize={list.pageSize}
          totalPages={list.totalPages}
          total={list.total}
          search={list.search}
          onSearchChange={list.updateSearch}
          onPageChange={list.setPage}
          onPageSizeChange={list.updatePageSize}
        />
      }
    />
  );
}
