import { clearSession } from "@/lib/auth";

// Ends the current browser session. The account menu should call this before
// clearing frontend user data and navigating back to /login.
export async function POST() {
  await clearSession();
  return new Response(null, { status: 204 });
}
