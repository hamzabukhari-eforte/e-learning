"use client";

import { formatQuestionBody } from "@/data/survey/types";
import type { SurveyQuestion } from "@/data/survey/types";

export function QuestionCell({ row }: { row: SurveyQuestion }) {
  const body = formatQuestionBody(row);
  const [title, ...options] = body.split("\n");

  return (
    <div className="max-w-xl space-y-1">
      <p>{title}</p>
      {options.length > 0 ? (
        <ul className="list-inside list-disc text-xs text-zinc-600">
          {options.map((option) => (
            <li key={option}>{option.replace(/^\d+\.\s*/, "")}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
