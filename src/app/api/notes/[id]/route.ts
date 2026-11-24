import { apiError, validationError } from "@/lib/api-response";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { noteSchema } from "@/lib/validations";

type Context = { params: Promise<{ id: string }> };

async function ownerAndId(params: Context["params"]) {
  const [userId, { id }] = await Promise.all([getSessionUserId(), params]);
  return { userId, id };
}

// Returns one owned note. A note that belongs to another user is intentionally
// reported as not found so account data cannot be discovered by guessing IDs.
export async function GET(_request: Request, { params }: Context) {
  const { userId, id } = await ownerAndId(params);
  if (!userId) return apiError("Authentication required", 401);
  const note = await db.note.findFirst({ where: { id, userId } });
  if (!note) return apiError("Note not found", 404);
  return Response.json({ data: { note } });
}

// Replaces the editable title and content of one owned note.
// The edit mode of NoteForm should call this and update the visible card on success.
export async function PATCH(request: Request, { params }: Context) {
  const { userId, id } = await ownerAndId(params);
  if (!userId) return apiError("Authentication required", 401);
  const parsed = noteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);
  const result = await db.note.updateMany({ where: { id, userId }, data: parsed.data });
  if (result.count === 0) return apiError("Note not found", 404);
  const note = await db.note.findUnique({ where: { id } });
  return Response.json({ data: { note } });
}

// Permanently removes one owned note after the user confirms an AlertDialog.
export async function DELETE(_request: Request, { params }: Context) {
  const { userId, id } = await ownerAndId(params);
  if (!userId) return apiError("Authentication required", 401);
  const result = await db.note.deleteMany({ where: { id, userId } });
  if (result.count === 0) return apiError("Note not found", 404);
  return new Response(null, { status: 204 });
}
