import { ZodError } from "zod";

// All route handlers return the same error envelope so frontend error handling
// can remain shared instead of checking a different shape for every endpoint.
export function apiError(message: string, status: number, details?: unknown) {
  return Response.json({ error: { message, ...(details ? { details } : {}) } }, { status });
}

// Field errors are keyed by input name for direct use beside form controls.
export function validationError(error: ZodError) {
  return apiError("Validation failed", 422, error.flatten().fieldErrors);
}

// Prisma uses P2002 for unique-field conflicts such as an existing email.
export function isUniqueConstraint(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}
