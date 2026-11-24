export type ApiError = { error: { message: string; details?: Record<string, string[]> } };

// Use this wrapper for frontend requests so JSON headers, the session cookie,
// empty responses, and the API's shared error shape are handled consistently.
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({ error: { message: "Request failed" } }))) as ApiError;
    throw new Error(body.error.message);
  }
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}
