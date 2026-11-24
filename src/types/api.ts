// Shared frontend representations of the safe JSON returned by route handlers.
// User intentionally excludes passwordHash, and dates arrive as ISO strings.
export type User = { id: string; name: string; email: string; createdAt: string };
export type Note = { id: string; title: string; content: string; userId: string; createdAt: string; updatedAt: string };

// Use these response wrappers as the generic type passed to api<T>().
export type UserResponse = { data: { user: User } };
export type NotesResponse = { data: { notes: Note[] } };
export type NoteResponse = { data: { note: Note } };
