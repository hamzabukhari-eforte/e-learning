"use client";

import { AddCommentModal } from "@/components/assign-feedback/add-comment-modal";
import { AssignFeedbackForm } from "@/components/assign-feedback/assign-feedback-form";
import { AssignFeedbackTable } from "@/components/assign-feedback/assign-feedback-table";
import { useAssignFeedback } from "@/components/assign-feedback/use-assign-feedback";
import { ViewCommentsModal } from "@/components/assign-feedback/view-comments-modal";
import { ModulePage } from "@/components/system-setup/module-page";

export function AssignFeedbackModule() {
  const {
    values,
    setValues,
    trainings,
    subTrainings,
    assignedTrainings,
    employees,
    pending,
    commentPending,
    error,
    list,
    addTarget,
    setAddTarget,
    viewTarget,
    setViewTarget,
    handleSubmit,
    handleSaveComment,
    getExportRows,
  } = useAssignFeedback();

  return (
    <>
      <ModulePage
        title="Assign Feedback"
        entityLabel="Feedback"
        sectionLabel="Feedback"
        formTitle="Assign Feedback"
        form={
          <AssignFeedbackForm
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
          <AssignFeedbackTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onAddComments={setAddTarget}
            onViewComments={setViewTarget}
            getExportRows={getExportRows}
          />
        }
      />
      <AddCommentModal
        open={Boolean(addTarget)}
        feedback={addTarget}
        pending={commentPending}
        onClose={() => setAddTarget(null)}
        onSave={handleSaveComment}
      />
      <ViewCommentsModal
        open={Boolean(viewTarget)}
        feedback={viewTarget}
        onClose={() => setViewTarget(null)}
      />
    </>
  );
}
