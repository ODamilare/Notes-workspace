import type { Note } from "@/types/api";

import { NoteCard } from "@/components/notes/note-card";

type NotesGridProps = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
};

export function NotesGrid({
  notes,
  onEdit,
  onDelete,
}: NotesGridProps) {
  return (
    <div
      data-testid="notes-grid"
      className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}