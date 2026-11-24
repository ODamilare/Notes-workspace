"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/client";
import type { Note, NotesResponse } from "@/types/api";
import { toast } from "sonner";
import { NotesSearch } from "@/components/notes/notes-search";
import { NotesHeader } from "@/components/notes/notes-header";
import { NotesGrid } from "@/components/notes/notes-grid";
import { NoteEditor } from "@/components/notes/note-editor";
import { DeleteNoteDialog } from "@/components/notes/delete-note-dialog";

import { LoadingState } from "@/components/shared/loading-state";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<"create" | "edit">("create");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorError, setEditorError] = useState("");

  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  /*
   * Load notes
   */
  const loadNotes = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await api<NotesResponse>("/api/notes");

      const sortedNotes = [...response.data.notes].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime(),
      );

      setNotes(sortedNotes);
    } catch (error) {
      console.error("Failed to load notes:", error);

      setError(
        error instanceof Error
          ? error.message
          : "We couldn't load your notes. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  /*
   * Initial notes load
   */
  useEffect(() => {
    let cancelled = false;

    async function fetchNotes() {
      setError("");

      try {
        const response = await api<NotesResponse>("/api/notes");

        if (cancelled) return;

        const sortedNotes = [...response.data.notes].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() -
            new Date(a.updatedAt).getTime(),
        );

        setNotes(sortedNotes);
      } catch (error) {
        if (cancelled) return;

        console.error("Failed to load notes:", error);

        setError(
          error instanceof Error
            ? error.message
            : "We couldn't load your notes. Please try again.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchNotes();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Search
   */
  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  /*
   * Create
   */
  function handleCreate() {
    setEditorMode("create");
    setSelectedNote(null);
    setEditorError("");
    setEditorOpen(true);
  }

  /*
   * Edit
   */
  function handleEdit(note: Note) {
    setEditorMode("edit");
    setSelectedNote(note);
    setEditorError("");
    setEditorOpen(true);
  }

  /*
   * Save note
   */
  async function handleSubmit(data: {
    title: string;
    content: string;
  }) {
    setIsSubmitting(true);
    setEditorError("");

    try {
     if (editorMode === "create") {
  await api("/api/notes", {
    method: "POST",
    body: JSON.stringify(data),
  });

  toast.success("Note created", {
    description: "Your note has been created successfully.",
  });
} else if (selectedNote) {
  await api(`/api/notes/${selectedNote.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  toast.success("Note updated", {
    description: "Your changes have been saved.",
  });
}

      setEditorOpen(false);
      setSelectedNote(null);

      await loadNotes();
    } catch (error) {
      console.error("Failed to save note:", error);

      setEditorError(
        error instanceof Error
          ? error.message
          : "We couldn't save your note. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  /*
   * Delete
   */
  function handleDelete(note: Note) {
    setNoteToDelete(note);
    setIsDeleteDialogOpen(true);
  }

  function handleDeleted(noteId: string) {
    setNotes((current) =>
      current.filter((note) => note.id !== noteId),
    );
  }

  return (
    <main className="min-w-0 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Page header */}
        <div className="mb-6">
          <NotesHeader onCreate={handleCreate} />
        </div>

        {/* Search */}
        <div className="mb-6">
          <NotesSearch
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Loading */}
        {isLoading && <LoadingState />}

        {/* Error */}
        {!isLoading && error && (
          <ErrorState
            message={error}
            onRetry={loadNotes}
          />
        )}

        {/* No notes at all */}
        {!isLoading && !error && notes.length === 0 && (
          <EmptyState onCreate={handleCreate} />
        )}

        {/* Notes */}
        {!isLoading && !error && notes.length > 0 && (
          <>
            {filteredNotes.length > 0 ? (
              <NotesGrid
                notes={filteredNotes}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-[#dfe4ec] bg-white px-6 text-center">
                <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-[#eef0ff]">
                  <span className="text-lg text-[#4963e7]">
                    ?
                  </span>
                </div>

                <h2 className="text-sm font-semibold text-[#14213d]">
                  No notes found
                </h2>

                <p className="mt-1 max-w-sm text-sm text-[#7a8497]">
                   We couldn&apos;t find any notes matching{" "}
                 <span className="font-medium text-[#536078]">
                  &quot;{searchQuery}&quot;
                  </span>
                  .
                </p>

                <Button
                type="button"
                variant="ghost"
                onClick={() => setSearchQuery("")}
                className="mt-4 h-auto p-0 text-sm font-medium text-[#4963e7] hover:bg-transparent hover:text-[#3856d2]"
                 >
             Clear search
                </Button>
              </div>
            )}
          </>
        )}

        {/* Delete dialog */}
        <DeleteNoteDialog
          note={noteToDelete}
          open={isDeleteDialogOpen}
          onOpenChange={(open) => {
            setIsDeleteDialogOpen(open);

            if (!open) {
              setNoteToDelete(null);
            }
          }}
          onDeleted={handleDeleted}
        />
      </div>

      {/* Note editor */}
      <NoteEditor
        open={editorOpen}
        mode={editorMode}
        note={selectedNote}
        isSubmitting={isSubmitting}
        error={editorError}
        onOpenChange={setEditorOpen}
        onSubmit={handleSubmit}
      />
    </main>
  );
}