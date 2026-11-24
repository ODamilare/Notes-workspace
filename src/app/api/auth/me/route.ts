import { apiError } from "@/lib/api-response";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";

// Resolves the signed-in user from the session cookie.
// Call this when the app starts and before rendering authenticated layouts.
export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return apiError("Authentication required", 401);
  const user = await db.user.findUnique({ where: { id: userId }, select: { id: true, name: true, email: true, createdAt: true } });
  if (!user) return apiError("Authentication required", 401);
  return Response.json({ data: { user } });
}
