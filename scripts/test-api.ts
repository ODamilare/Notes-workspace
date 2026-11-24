import assert from "node:assert/strict";

const baseUrl = process.env.APP_URL ?? "http://localhost:3000";
let cookie = "";

// Node's fetch does not keep browser cookies automatically. This helper captures
// the session cookie so the script exercises the same authenticated flow as the UI.
async function request(path: string, init: RequestInit = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}), ...init.headers },
  });
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) cookie = setCookie.split(";", 1)[0];
  const body = response.status === 204 ? null : await response.json();
  return { response, body };
}

// This smoke test covers every route plus important contract boundaries:
// validation, signed-out access, invalid credentials, and cross-user isolation.
async function main() {
  const runId = Date.now();
  const ownerEmail = `api-owner-${runId}@notes.local`;
  const otherEmail = `api-other-${runId}@notes.local`;

  let result = await request("/api/notes");
  assert.equal(result.response.status, 401, "Notes must reject signed-out requests");

  result = await request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name: "API Owner", email: ownerEmail, password: "TestPassword123!" }),
  });
  assert.equal(result.response.status, 201, JSON.stringify(result.body));

  result = await request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name: "API Owner", email: ownerEmail, password: "TestPassword123!" }),
  });
  assert.equal(result.response.status, 409, "Duplicate registration must be rejected");

  result = await request("/api/auth/me");
  assert.equal(result.response.status, 200, JSON.stringify(result.body));

  result = await request("/api/notes", {
    method: "POST",
    body: JSON.stringify({ title: "Created by API test", content: "Initial content" }),
  });
  assert.equal(result.response.status, 201, JSON.stringify(result.body));
  const noteId = (result.body as { data: { note: { id: string } } }).data.note.id;

  result = await request("/api/notes");
  assert.equal(result.response.status, 200, JSON.stringify(result.body));
  assert.equal((result.body as { data: { notes: unknown[] } }).data.notes.length, 1);

  result = await request(`/api/notes/${noteId}`);
  assert.equal(result.response.status, 200, JSON.stringify(result.body));

  result = await request("/api/notes", {
    method: "POST",
    body: JSON.stringify({ title: "", content: "Invalid note" }),
  });
  assert.equal(result.response.status, 422, "Invalid note data must be rejected");

  result = await request("/api/auth/logout", { method: "POST" });
  assert.equal(result.response.status, 204, JSON.stringify(result.body));
  cookie = "";

  result = await request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name: "Other User", email: otherEmail, password: "TestPassword123!" }),
  });
  assert.equal(result.response.status, 201, JSON.stringify(result.body));

  result = await request(`/api/notes/${noteId}`);
  assert.equal(result.response.status, 404, "A user must not read another user's note");

  result = await request(`/api/notes/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify({ title: "Unauthorized update", content: "Must not be saved" }),
  });
  assert.equal(result.response.status, 404, "A user must not update another user's note");

  result = await request(`/api/notes/${noteId}`, { method: "DELETE" });
  assert.equal(result.response.status, 404, "A user must not delete another user's note");

  result = await request("/api/auth/logout", { method: "POST" });
  assert.equal(result.response.status, 204, JSON.stringify(result.body));
  cookie = "";

  result = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: ownerEmail, password: "wrong-password" }),
  });
  assert.equal(result.response.status, 401, "Invalid credentials must be rejected");

  result = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: ownerEmail, password: "TestPassword123!" }),
  });
  assert.equal(result.response.status, 200, JSON.stringify(result.body));

  result = await request(`/api/notes/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify({ title: "Updated by API test", content: "Updated content" }),
  });
  assert.equal(result.response.status, 200, JSON.stringify(result.body));

  result = await request(`/api/notes/${noteId}`, { method: "DELETE" });
  assert.equal(result.response.status, 204, JSON.stringify(result.body));

  result = await request("/api/auth/logout", { method: "POST" });
  assert.equal(result.response.status, 204, JSON.stringify(result.body));
  cookie = "";

  result = await request("/api/auth/me");
  assert.equal(result.response.status, 401, "Logged-out session must not resolve a user");

  console.log("API test passed: auth, validation, owner isolation, full notes CRUD, and logout");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
