import { z } from "zod";

// These schemas are the server's source of truth. Frontend validation should
// mirror the same limits for fast feedback, while still displaying API errors.
export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export const noteSchema = z.object({
  title: z.string().trim().min(1).max(120),
  content: z.string().max(10_000).default(""),
});
