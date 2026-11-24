
"use client";

import { AlertCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { Note } from "@/types/api";

type NoteFormProps = {
  mode: "create" | "edit";
  note?: Note | null;
  isSubmitting: boolean;
  error?: string;
  onSubmit: (data: { title: string; content: string }) => void;
  onCancel: () => void;
};

export function NoteForm({
  mode,
  note,
  isSubmitting,
  error,
  onSubmit,
  onCancel,
}: NoteFormProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [validationError, setValidationError] = useState("");



  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      setValidationError("Please enter a title.");
      return;
    }

    if (!trimmedContent) {
      setValidationError("Please enter some content.");
      return;
    }

    setValidationError("");

    onSubmit({
      title: trimmedTitle,
      content: trimmedContent,
    });
  }

  const displayError = validationError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error */}
      {displayError && (
        <div
          role="alert"
          className="
            flex
            items-start
            gap-2.5
            rounded-[7px]
            border
            border-[#fecaca]
            bg-[#fef2f2]
            px-3.5
            py-3
            text-[13px]
            font-medium
            leading-5
            text-[#b42318]
          "
        >
          <AlertCircle
            className="mt-0.5 size-4 shrink-0"
            aria-hidden="true"
          />

          <span>{displayError}</span>
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="note-title"
            className="
              text-[13px]
              font-semibold
              leading-none
              text-[#1d2b46]
            "
          >
            Title
          </Label>

          <span className="text-[11px] text-[#9aa3b3]">
            Required
          </span>
        </div>

        <Input
          id="note-title"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setValidationError("");
          }}
          placeholder="Give your note a title"
          disabled={isSubmitting}
          autoFocus
          className="
            h-[43px]
            rounded-[6px]
            border-[#d6dce6]
            bg-white
            px-3
            text-[14px]
            text-[#14213d]
            shadow-none
            transition-all
            placeholder:text-[#9aa3b3]
            hover:border-[#bfc7d5]
            focus-visible:border-[#4963e7]
            focus-visible:ring-4
            focus-visible:ring-[#4963e7]/10
          "
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="note-content"
            className="
              text-[13px]
              font-semibold
              leading-none
              text-[#1d2b46]
            "
          >
            Content
          </Label>

          <span className="text-[11px] text-[#9aa3b3]">
            Required
          </span>
        </div>

        <Textarea
          id="note-content"
          name="content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            setValidationError("");
          }}
          placeholder="Start writing your note..."
          disabled={isSubmitting}
          className="
            min-h-[250px]
            resize-none
            rounded-[7px]
            border-[#d6dce6]
            bg-white
            px-3.5
            py-3
            text-[14px]
            leading-6
            text-[#14213d]
            shadow-none
            transition-all
            placeholder:text-[#9aa3b3]
            hover:border-[#bfc7d5]
            focus-visible:border-[#4963e7]
            focus-visible:ring-4
            focus-visible:ring-[#4963e7]/10
          "
        />

        <p className="text-[11px] leading-5 text-[#9aa3b3]">
          Keep your note clear and easy to scan later.
        </p>
      </div>

      {/* Actions */}
      <div
        className="
          flex
          flex-col-reverse
          gap-2.5
          border-t
          border-[#e5e8ee]
          pt-5
          sm:flex-row
          sm:justify-end
        "
      >
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="
            h-[40px]
            w-full
            rounded-[6px]
            border-[#d1d7e2]
            bg-white
            px-5
            text-[13px]
            font-semibold
            text-[#526078]
            shadow-none
            hover:border-[#bfc7d5]
            hover:bg-[#f8f9fb]
            hover:text-[#14213d]
            sm:w-auto
          "
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="
            h-[40px]
            w-full
            rounded-[6px]
            border-0
            bg-gradient-to-br
            from-[#5069e8]
            to-[#3d55d5]
            px-5
            text-[13px]
            font-semibold
            text-white
            shadow-[0_4px_10px_rgba(73,99,231,0.20)]
            transition-all
            hover:from-[#5870ec]
            hover:to-[#4059dc]
            hover:shadow-[0_5px_14px_rgba(73,99,231,0.25)]
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:w-auto
          "
        >
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create note"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
