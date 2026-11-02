"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { LiveAssessmentsTable } from "@/components/reports/live-assessments/live-assessments-table";
import { ViewScoreModal } from "@/components/reports/live-assessments/view-score-modal";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { listLiveAssessments } from "@/data/reports/live-assessments";
import type { LiveAssessment } from "@/data/reports/live-assessment-types";

export function LiveAssessmentsModule() {
  const [scoreTarget, setScoreTarget] = useState<LiveAssessment | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listLiveAssessments(params),
    [],
  );
  const list = usePagedList<LiveAssessment>(listFn);

  return (
    <>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <p className="text-sm text-[#FFA901]">Report</p>
          <h1 className="text-2xl font-bold text-black">Live Assessments View</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Only Assessments Whose Validity Have Not Expired Are Shown Below.
          </p>
        </div>
        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <LiveAssessmentsTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onViewScore={setScoreTarget}
          />
        </section>
      </motion.div>
      <ViewScoreModal
        open={Boolean(scoreTarget)}
        assessment={scoreTarget}
        onClose={() => setScoreTarget(null)}
      />
    </>
  );
}
