import { compare } from "bcryptjs";
import { apiError, validationError } from "@/lib/api-response";
import { createSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations";

// Verifies credentials and sets the HTTP-only session cookie.
// The Login form should call this endpoint, then load the notes workspace.
export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await compare(parsed.data.password, user.passwordHash))) {
    return apiError("Invalid email or password", 401);
  }

  await createSession(user.id);
  return Response.json({ data: { user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt } } });
}
