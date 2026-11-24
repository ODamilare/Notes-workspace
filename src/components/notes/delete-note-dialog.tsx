"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import type { Note } from "@/types/api";
import { api } from "@/lib/api/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteNoteDialogProps = {
  note: Note | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: (noteId: string) => void;
};

export function DeleteNoteDialog({
  note,
  open,
  onOpenChange,
  onDeleted,
}: DeleteNoteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!note) return;

    setIsDeleting(true);
    setError("");

    try {
  await api(`/api/notes/${note.id}`, {
    method: "DELETE",
  });

  toast.success("Note deleted", {
    description: "The note has been moved to trash.",
  });

      onDeleted(note.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete note:", error);

      setError(
        error instanceof Error
          ? error.message
          : "We couldn't delete this note. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  function handleOpenChange(value: boolean) {
    if (isDeleting) return;

    if (!value) {
      setError("");
    }

    onOpenChange(value);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent
        className="
          max-w-[400px]
          rounded-[10px]
          border-[#dfe4ec]
          bg-white
          p-0
          shadow-[0_12px_40px_rgba(20,33,61,0.12)]
        "
      >
        <AlertDialogHeader
          className="
            flex
            flex-col
            items-start
            gap-4
            p-6
            text-left
          "
        >
          <AlertDialogMedia
            className="
              mb-0
              size-10
              rounded-lg
              bg-[#fff1f1]
              text-[#dc4b4b]
            "
          >
            <Trash2 className="size-[18px]" />
          </AlertDialogMedia>

          <div className="space-y-1.5">
            <AlertDialogTitle
              className="
                text-[16px]
                font-semibold
                tracking-[-0.01em]
                text-[#14213d]
              "
            >
              Delete this note?
            </AlertDialogTitle>

            <AlertDialogDescription
              className="
                text-[13px]
                leading-5
                text-[#7a8497]
                truncate
              "
            >
              This will permanently delete{" "}
              <span className="font-semibold text-[#14213d]">
                {note?.title || "this note"}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        {error && (
          <div
            className="
              mx-6
              rounded-lg
              border
              border-[#f3cccc]
              bg-[#fff5f5]
              px-3
              py-2.5
              text-[12px]
              leading-5
              text-[#c43d3d]
            "
          >
            {error}
          </div>
        )}

        <AlertDialogFooter
          className="
            mx-0
            mb-0
            flex
            flex-row
            justify-end
            gap-2
            rounded-b-[10px]
            border-t
            border-[#e8ebf0]
            bg-[#fafbfc]
            px-6
            py-4
          "
        >
          <AlertDialogCancel
            disabled={isDeleting}
            className="
              h-9
              rounded-[6px]
              border-[#d6dce6]
              bg-white
              px-4
              text-[12px]
              font-medium
              text-[#536078]
              shadow-none
              hover:bg-[#f5f6f8]
              hover:text-[#14213d]
            "
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            className="
              h-9
              rounded-[6px]
              bg-[#dc4b4b]
              px-4
              text-[12px]
              font-semibold
              text-white
              shadow-none
              hover:bg-[#c93f3f]
            "
          >
            {isDeleting ? "Deleting..." : "Delete note"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}