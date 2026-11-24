import { apiError, validationError } from "@/lib/api-response";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { noteSchema } from "@/lib/validations";

// Returns the signed-in user's notes, newest update first.
// Use this request to populate the notes page and decide between list and empty states.
export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return apiError("Authentication required", 401);
  const notes = await db.note.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  return Response.json({ data: { notes } });
}

// Creates a note owned by the signed-in user.
// The create mode of NoteForm should send its validated title and content here.
export async function POST(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) return apiError("Authentication required", 401);
  const parsed = noteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);
  const note = await db.note.create({ data: { ...parsed.data, userId } });
  return Response.json({ data: { note } }, { status: 201 });
}
