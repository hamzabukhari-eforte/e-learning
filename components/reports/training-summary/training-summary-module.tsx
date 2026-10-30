"use client";

import { useCallback, useState } from "react";
import { AssignTrainingFeedbackModal } from "@/components/reports/training-summary/assign-training-feedback-modal";
import { MaterialAttemptTimingModal } from "@/components/reports/training-summary/material-attempt-timing-modal";
import { TrainingMaterialAttemptModal } from "@/components/reports/training-summary/training-material-attempt-modal";
import { TrainingSummaryTable } from "@/components/reports/training-summary/training-summary-table";
import { ViewAttemptDetailModal } from "@/components/reports/training-summary/view-attempt-detail-modal";
import { ViewContentModal } from "@/components/reports/training-summary/view-content-modal";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { listTrainingSummary } from "@/data/reports/training-summary";
import type {
  MaterialAttemptRow,
  TrainingAttemptEmployee,
  TrainingSummaryRow,
} from "@/data/reports/training-summary-types";

type ContentModalState = {
  title: string;
  slides: TrainingSummaryRow["content"];
} | null;

type AttemptModalState = {
  mode: "assigned" | "attempted";
  averageTimeSpent: string;
  rows: TrainingAttemptEmployee[];
} | null;

type MaterialModalState = {
  employeeName: string;
  materials: MaterialAttemptRow[];
} | null;

type TimingModalState = {
  materialName: string;
  timings: MaterialAttemptRow["timings"];
} | null;

type FeedbackModalState = {
  employeeName: string;
} | null;

export function TrainingSummaryModule() {
  const [contentModal, setContentModal] = useState<ContentModalState>(null);
  const [attemptModal, setAttemptModal] = useState<AttemptModalState>(null);
  const [materialModal, setMaterialModal] = useState<MaterialModalState>(null);
  const [timingModal, setTimingModal] = useState<TimingModalState>(null);
  const [feedbackModal, setFeedbackModal] = useState<FeedbackModalState>(null);

  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listTrainingSummary(params),
    [],
  );
  const list = usePagedList<TrainingSummaryRow>(listFn);

  return (
    <>
      <ModulePage
        title="Training Summary"
        entityLabel="Training"
        sectionLabel="Reports"
        table={
          <TrainingSummaryTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            getExportRows={() =>
              listTrainingSummary({
                search: list.search,
                page: 1,
                pageSize: 10000,
              }).then((result) => result.items)
            }
            onViewContent={(row) =>
              setContentModal({
                title: `View Content — ${row.subTrainingName}`,
                slides: row.content,
              })
            }
            onViewAssigned={(row) =>
              setAttemptModal({
                mode: "assigned",
                averageTimeSpent: row.averageTimeSpent,
                rows: row.assignedAttempts,
              })
            }
            onViewAttempted={(row) =>
              setAttemptModal({
                mode: "attempted",
                averageTimeSpent: row.averageTimeSpent,
                rows: row.attemptedAttempts,
              })
            }
          />
        }
      />
      <ViewContentModal
        open={Boolean(contentModal)}
        title={contentModal?.title ?? "View Content"}
        slides={contentModal?.slides ?? []}
        onClose={() => setContentModal(null)}
      />
      <ViewAttemptDetailModal
        open={Boolean(attemptModal)}
        mode={attemptModal?.mode ?? "assigned"}
        averageTimeSpent={attemptModal?.averageTimeSpent ?? "00:00:00"}
        rows={attemptModal?.rows ?? []}
        onClose={() => {
          setAttemptModal(null);
          setMaterialModal(null);
          setTimingModal(null);
          setFeedbackModal(null);
        }}
        onViewAttemptDetail={(row) =>
          setMaterialModal({
            employeeName: row.name,
            materials: row.materials,
          })
        }
        onAssignFeedback={(row) =>
          setFeedbackModal({ employeeName: row.name })
        }
      />
      <TrainingMaterialAttemptModal
        open={Boolean(materialModal)}
        employeeName={materialModal?.employeeName ?? ""}
        materials={materialModal?.materials ?? []}
        onClose={() => {
          setMaterialModal(null);
          setTimingModal(null);
        }}
        onViewMaterialAttempts={(material) =>
          setTimingModal({
            materialName: material.name,
            timings: material.timings,
          })
        }
      />
      <MaterialAttemptTimingModal
        open={Boolean(timingModal)}
        materialName={timingModal?.materialName ?? ""}
        timings={timingModal?.timings ?? []}
        onClose={() => setTimingModal(null)}
      />
      <AssignTrainingFeedbackModal
        open={Boolean(feedbackModal)}
        employeeName={feedbackModal?.employeeName ?? ""}
        onClose={() => setFeedbackModal(null)}
        onAssign={() => {
          /* local UI feedback only until API is wired */
        }}
      />
    </>
  );
}
