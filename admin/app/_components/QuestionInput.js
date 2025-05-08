"use client";

import { OctagonAlert } from "lucide-react";

export default function QuestionInput({
  question,
  index,
  onQuestionChange,
  onRequiredChange,
  onDelete,
  disabled,
  errors,
}) {
  return (
    <div className="question-item mb-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <label htmlFor={`question-${index}`} className="block font-medium">
          Question {index + 1}
        </label>
        <button
          type="button"
          onClick={() => onDelete(index)}
          disabled={disabled}
          className="text-red-500 hover:text-red-700 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      <input
        id={`question-${index}`}
        type="text"
        value={question.question}
        onChange={(e) => onQuestionChange(index, e.target.value)}
        disabled={disabled}
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter the question"
      />

      {errors?.[index]?.question && (
        <div className="flex items-center text-red-500 text-sm mb-2">
          <OctagonAlert size={15} className="mr-1" />
          {errors[index].question.message}
        </div>
      )}

      <div className="flex items-center">
        <label className="mr-4">
          <input
            type="radio"
            checked={question.required}
            onChange={() => onRequiredChange(index, true)}
            disabled={disabled}
            className="mr-2"
          />
          Required
        </label>
        <label>
          <input
            type="radio"
            checked={!question.required}
            onChange={() => onRequiredChange(index, false)}
            disabled={disabled}
            className="mr-2"
          />
          Optional
        </label>
      </div>
    </div>
  );
}
