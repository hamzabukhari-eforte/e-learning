"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { AllAssessmentsTable } from "@/components/reports/test-wise-analysis/all-assessments-table";
import { AssessmentDetailsModal } from "@/components/reports/test-wise-analysis/assessment-details-modal";
import { AssignedSubTrainingsTable } from "@/components/reports/test-wise-analysis/assigned-subtrainings-table";
import { AssignedTrainingsTable } from "@/components/reports/test-wise-analysis/assigned-trainings-table";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { Button } from "@/components/ui/button";
import {
  listTestWiseAssessments,
  listTestWiseSubTrainings,
  listTestWiseTrainings,
} from "@/data/reports/test-wise-analysis";
import type {
  TestWiseAssessment,
  TestWiseSubTraining,
  TestWiseTraining,
} from "@/data/reports/test-wise-analysis-types";

type Step = "trainings" | "subTrainings" | "assessments";

const EMPTY_ASSESSMENTS = {
  items: [] as TestWiseAssessment[],
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

const EMPTY_SUBS = {
  items: [] as TestWiseSubTraining[],
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export function TestWiseAnalysisModule() {
  const [step, setStep] = useState<Step>("trainings");
  const [selectedTraining, setSelectedTraining] =
    useState<TestWiseTraining | null>(null);
  const [selectedSubTraining, setSelectedSubTraining] =
    useState<TestWiseSubTraining | null>(null);
  const [detailTarget, setDetailTarget] = useState<TestWiseAssessment | null>(
    null,
  );

  const trainingsFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listTestWiseTrainings(params),
    [],
  );
  const trainings = usePagedList<TestWiseTraining>(trainingsFn);

  const subTrainingsFn = useCallback(
    async (params: { search: string; page: number; pageSize: number }) => {
      if (!selectedTraining) return { ...EMPTY_SUBS, pageSize: params.pageSize };
      return listTestWiseSubTrainings({
        trainingId: selectedTraining.id,
        ...params,
      });
    },
    [selectedTraining],
  );
  const subTrainings = usePagedList<TestWiseSubTraining>(subTrainingsFn);

  const assessmentsFn = useCallback(
    async (params: { search: string; page: number; pageSize: number }) => {
      if (!selectedTraining || !selectedSubTraining) {
        return { ...EMPTY_ASSESSMENTS, pageSize: params.pageSize };
      }
      return listTestWiseAssessments({
        trainingId: selectedTraining.id,
        subTrainingId: selectedSubTraining.id,
        ...params,
      });
    },
    [selectedTraining, selectedSubTraining],
  );
  const assessments = usePagedList<TestWiseAssessment>(assessmentsFn);

  function openSubTrainings(row: TestWiseTraining) {
    setSelectedTraining(row);
    setSelectedSubTraining(null);
    setStep("subTrainings");
  }

  function openAssessments(row: TestWiseSubTraining) {
    setSelectedSubTraining(row);
    setStep("assessments");
  }

  function backToTrainings() {
    setStep("trainings");
    setSelectedTraining(null);
    setSelectedSubTraining(null);
  }

  function backToSubTrainings() {
    setStep("subTrainings");
    setSelectedSubTraining(null);
  }

  const heading =
    step === "trainings"
      ? "Assigned Trainings"
      : step === "subTrainings"
        ? "Assigned Sub-Training"
        : "All Assessments";

  const hint =
    step === "trainings"
      ? "(Please Select The Training Which You Wish To Analyze)."
      : step === "subTrainings"
        ? "(Please Select The Sub-Training You Wish To Analyze)."
        : selectedTraining && selectedSubTraining
          ? `${selectedTraining.name} / ${selectedSubTraining.name}`
          : null;

  return (
    <>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <p className="text-sm text-[#FFA901]">
            Dashboard &gt; Test Wise Dashboard Analysis
          </p>
          <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-[#042954]">{heading}</h1>
              {hint ? (
                <p className="mt-1 text-sm text-zinc-500">{hint}</p>
              ) : null}
              {step === "trainings" ? (
                <p className="mt-3 text-sm font-medium text-zinc-600">
                  Select Training
                </p>
              ) : null}
            </div>
            {step === "subTrainings" ? (
              <Button type="button" variant="outline" onClick={backToTrainings}>
                Back to Trainings
              </Button>
            ) : null}
            {step === "assessments" ? (
              <Button
                type="button"
                variant="outline"
                onClick={backToSubTrainings}
              >
                Back to Sub-Trainings
              </Button>
            ) : null}
          </div>
        </div>

        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          {step === "trainings" ? (
            <AssignedTrainingsTable
              rows={trainings.rows}
              page={trainings.page}
              pageSize={trainings.pageSize}
              totalPages={trainings.totalPages}
              total={trainings.total}
              search={trainings.search}
              onSearchChange={trainings.updateSearch}
              onPageChange={trainings.setPage}
              onPageSizeChange={trainings.updatePageSize}
              onViewSubTrainings={openSubTrainings}
            />
          ) : null}
          {step === "subTrainings" ? (
            <AssignedSubTrainingsTable
              rows={subTrainings.rows}
              page={subTrainings.page}
              pageSize={subTrainings.pageSize}
              totalPages={subTrainings.totalPages}
              total={subTrainings.total}
              search={subTrainings.search}
              onSearchChange={subTrainings.updateSearch}
              onPageChange={subTrainings.setPage}
              onPageSizeChange={subTrainings.updatePageSize}
              onViewAssessments={openAssessments}
            />
          ) : null}
          {step === "assessments" ? (
            <AllAssessmentsTable
              rows={assessments.rows}
              page={assessments.page}
              pageSize={assessments.pageSize}
              totalPages={assessments.totalPages}
              total={assessments.total}
              search={assessments.search}
              onSearchChange={assessments.updateSearch}
              onPageChange={assessments.setPage}
              onPageSizeChange={assessments.updatePageSize}
              getExportRows={() =>
                selectedTraining && selectedSubTraining
                  ? listTestWiseAssessments({
                      trainingId: selectedTraining.id,
                      subTrainingId: selectedSubTraining.id,
                      search: assessments.search,
                      page: 1,
                      pageSize: 10000,
                    }).then((result) => result.items)
                  : Promise.resolve([])
              }
              onViewDetails={setDetailTarget}
            />
          ) : null}
        </section>
      </motion.div>
      <AssessmentDetailsModal
        open={Boolean(detailTarget)}
        assessment={detailTarget}
        onClose={() => setDetailTarget(null)}
      />
    </>
  );
}
