import type { Note } from "@/types/api";

import { NotesHeader } from "@/components/notes/notes-header";
import { NotesGrid } from "@/components/notes/notes-grid";

type NotesWorkspaceProps = {
  notes: Note[];
  onCreate: () => void;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
};

export function NotesWorkspace({
  notes,
  onCreate,
  onEdit,
  onDelete,
}: NotesWorkspaceProps) {
  return (
    <main className="min-w-0 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">
        <NotesHeader onCreate={onCreate} />

        <NotesGrid
          notes={notes}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </main>
  );
}