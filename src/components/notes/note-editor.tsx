"use client";

import { FilePlus2 } from "lucide-react";
import type { Note } from "@/types/api";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { NoteForm } from "@/components/notes/note-form";

type NoteEditorProps = {
  open: boolean;
  mode: "create" | "edit";
  note?: Note | null;
  isSubmitting: boolean;
  error?: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { title: string; content: string }) => void;
};

export function NoteEditor({
  open,
  mode,
  note,
  isSubmitting,
  error,
  onOpenChange,
  onSubmit,
}: NoteEditorProps) {
  const isCreate = mode === "create";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="
          w-full
          border-l
          border-[#dfe4ec]
          bg-white
          p-0
          shadow-[-8px_0_30px_rgba(20,33,61,0.08)]
          sm:max-w-[460px]
        "
      >
        {/* Header */}
        <SheetHeader
          className="
            border-b
            border-[#e5e8ee]
            px-6
            py-5
            text-left
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                size-10
                shrink-0
                items-center
                justify-center
                rounded-[8px]
                bg-[#eef0ff]
                text-[#4963e7]
              "
            >
              <FilePlus2
                className="size-[18px]"
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <SheetTitle
                className="
                  text-[19px]
                  font-bold
                  leading-[1.25]
                  tracking-[-0.02em]
                  text-[#14213d]
                "
              >
                {isCreate ? "Create note" : "Edit note"}
              </SheetTitle>

              <SheetDescription
                className="
                  mt-1.5
                  text-[13px]
                  font-normal
                  leading-[1.5]
                  text-[#778299]
                "
              >
                {isCreate
                  ? "Capture an idea, thought, or reminder."
                  : "Update the title or content of your note."}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Form */}
        <div className="overflow-y-auto px-6 py-6">
          <NoteForm
          key={`${mode}-${note?.id ?? "new"}`}
          mode={mode}
          note={note}
          isSubmitting={isSubmitting}
          error={error}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
/>
        </div>
      </SheetContent>
    </Sheet>
  );
}

