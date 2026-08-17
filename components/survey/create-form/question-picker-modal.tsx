"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { QuestionPickerTable } from "@/components/survey/create-form/question-picker-table";
import { useQuestionPicker } from "@/components/survey/create-form/use-question-picker";
import type { FormQuestion, QuestionType } from "@/data/survey/types";

type QuestionPickerModalProps = {
  open: boolean;
  questionType: QuestionType;
  initialSelected: FormQuestion[];
  limit: number;
  onClose: () => void;
  onSave: (selected: FormQuestion[]) => void;
};

export function QuestionPickerModal({
  open,
  questionType,
  initialSelected,
  limit,
  onClose,
  onSave,
}: QuestionPickerModalProps) {
  const picker = useQuestionPicker(questionType, initialSelected, limit);

  return (
    <Modal open={open} title="Select Questions" onClose={onClose}>
      <div className="space-y-4">
        <QuestionPickerTable
          rows={picker.list.rows}
          selected={picker.selected}
          maxSequence={picker.maxSequence}
          page={picker.list.page}
          pageSize={picker.list.pageSize}
          totalPages={picker.list.totalPages}
          total={picker.list.total}
          search={picker.list.search}
          onSearchChange={picker.list.updateSearch}
          onPageChange={picker.list.setPage}
          onPageSizeChange={picker.list.updatePageSize}
          onToggle={picker.toggle}
          onSequenceChange={picker.setSequence}
        />
        {picker.error ? (
          <p className="text-sm text-red-600">{picker.error}</p>
        ) : null}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" className="min-w-28" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="solid"
            className="min-w-28"
            onClick={() => {
              if (picker.validateSave()) onSave(picker.selected);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
