import { hash } from "bcryptjs";
import { createSession } from "@/lib/auth";
import { apiError, isUniqueConstraint, validationError } from "@/lib/api-response";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations";

// Creates an account and immediately starts the browser session.
// The Register form should call this endpoint, then navigate to /notes on success.
export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);

  try {
    const { password, ...profile } = parsed.data;
    const user = await db.user.create({
      data: { ...profile, passwordHash: await hash(password, 12) },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    await createSession(user.id);
    return Response.json({ data: { user } }, { status: 201 });
  } catch (error) {
    if (isUniqueConstraint(error)) return apiError("An account with this email already exists", 409);
    return apiError("Unable to create account", 500);
  }
}
