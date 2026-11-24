# Expected result and implementation order

This is a one-week individual frontend exercise. The final submission deadline is **Tuesday, September 1, 2026**. Each developer must implement and submit their own solution on a separate branch.

Use this document as the working checklist. Complete each stage in order because later stages depend on the earlier foundation.

## Stage 0 — Repository and environment

**Goal:** Prove the supplied foundation runs before changing frontend code.

1. Accept access to the company repository with your approved GitHub account.
2. Clone the repository.
3. Create `submission/firstname-lastname` from the latest `main`.
4. Install dependencies and copy `.env.example` to `.env`.
5. Start PostgreSQL, generate Prisma Client, migrate, and seed.
6. Run the starter and the supplied API test.
7. Open a draft pull request into `main`. Do not merge it.

**Complete when:** the start page loads, `npm run test:api` passes, and the draft pull request exists.

## Stage 1 — Authentication chassis

**Goal:** Build reusable Register and Login screens before connecting requests.

Create:

- `src/app/(auth)/layout.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/app/(auth)/login/page.tsx`
- `src/components/auth/auth-layout.tsx`
- `src/components/auth/auth-form.tsx`
- `src/components/auth/password-input.tsx`

Use `Card`, `Label`, `Input`, `Button`, and `Alert`. The password field must support show/hide without replacing the supplied `Input` and `Button` primitives.

**Complete when:** both screens share the same layout/form structure, work with a keyboard, and adapt to 375px width.

## Stage 2 — Authentication integration

**Goal:** Connect the authentication screens to the real API.

1. Register with `POST /api/auth/register`.
2. Login with `POST /api/auth/login`.
3. Restore the user with `GET /api/auth/me`.
4. Logout with `POST /api/auth/logout`.
5. Navigate successful Register/Login to `/notes`.
6. Return signed-out users to `/login`.
7. Show validation, invalid-credential, server, and pending states.

**Complete when:** registration, login, refresh persistence, protected routing, and logout all work without storing credentials or tokens in browser storage.

## Stage 3 — Responsive application shell

**Goal:** Create one reusable layout for all authenticated content.

Create:

- `src/components/layout/app-shell.tsx`
- `src/components/layout/desktop-sidebar.tsx`
- `src/components/layout/mobile-navigation.tsx`
- `src/components/layout/account-menu.tsx`

Desktop uses a persistent sidebar. Mobile uses a menu `Button` and `Sheet`. The account menu uses `Avatar` and `DropdownMenu` and contains Logout.

**Complete when:** the shell works at 375×812, 768×1024, and 1440×900 without horizontal overflow.

## Stage 4 — Notes loading, error, and empty states

**Goal:** Connect `GET /api/notes` before building note actions.

Create reusable `LoadingState`, `ErrorState`, and `EmptyState` components. Compose the empty state from the supplied `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, and `EmptyContent` primitives. Use note-shaped `Skeleton` cards while loading, a working Retry `Button` after failure, and a create action in the empty state.

**Complete when:** the notes page clearly renders exactly one of loading, error, empty, or populated content.

## Stage 5 — Populated notes view

**Goal:** Render API data through reusable components.

Create:

- `notes-workspace.tsx`
- `notes-header.tsx`
- `notes-grid.tsx`
- `note-card.tsx`

Every card uses `Card` and receives typed note data through props. Edit and Delete actions belong in a `DropdownMenu`. Long content must not break the layout.

**Complete when:** seeded and newly fetched notes display newest update first across all required viewports.

## Stage 6 — Create and edit

**Goal:** Use one form for both note mutations.

Create `note-editor.tsx` and `note-form.tsx`. Connect create to `POST /api/notes` and edit to `PATCH /api/notes/:id`. Keep input visible after a failed request, prevent duplicate submission, and update the displayed list without reloading the browser.

**Complete when:** create and edit work, validation is visible, the editor closes only after success, and `Sonner` confirms success.

## Stage 7 — Delete confirmation

**Goal:** Make destructive behavior deliberate and recoverable until confirmed.

Create `delete-note-dialog.tsx` with `AlertDialog`. Do not use `window.confirm`. Connect confirmation to `DELETE /api/notes/:id`. Keep the dialog open and display an error if deletion fails.

**Complete when:** Cancel changes nothing, Confirm removes only the selected note, and removing the last note displays the empty state.

## Stage 8 — Responsive and accessibility pass

**Goal:** Finish behavior that is easy to miss during desktop implementation.

- Verify all three required viewports.
- Check keyboard navigation and visible focus.
- Confirm every input has a label.
- Confirm dialogs and sheets manage focus.
- Use 44px minimum touch targets on mobile.
- Check long titles, long content, empty content, and API errors.
- Confirm no raw replacement was created for a supplied shadCN component.

**Complete when:** the complete user journey works using mouse, keyboard, and mobile-sized layout.

## Stage 9 — Final verification and submission

Run:

```bash
npm run lint
npm run build
npm run test:api
```

Push the final commit, update the draft pull request description, and mark the pull request ready for review. That ready-for-review action represents the final submission. Do not merge the pull request.

The assessed version is the latest commit pushed before the Tuesday deadline. Later changes remain visible in Git history and are not part of the original assessment unless a reviewer explicitly requests them. A hosted preview is optional; the reviewer can run each branch locally with the supplied Docker PostgreSQL database.

## Required review attributes

Use the exported values in `src/lib/test-ids.ts` on the matching visible elements. These stable attributes let reviewers locate important parts of independently implemented interfaces without requiring identical internal markup.

| Attribute value | Required target |
| --- | --- |
| `register-form` | Register form |
| `login-form` | Login form |
| `auth-error` | Authentication/API error alert |
| `app-shell` | Authenticated application shell |
| `mobile-navigation-trigger` | Button that opens mobile navigation |
| `logout-action` | Logout action |
| `notes-loading` | Notes loading state |
| `notes-error` | Notes error state |
| `notes-empty` | Notes empty state |
| `notes-grid` | Populated notes container |
| `new-note-action` | Primary create-note action |
| `note-card` | Each note card |
| `note-form` | Shared create/edit form |
| `note-submit` | Note form submit action |
| `delete-note-dialog` | Delete confirmation content |
| `delete-note-confirm` | Destructive confirmation action |

Example:

```tsx
import { TEST_IDS } from "@/lib/test-ids";

<Button data-testid={TEST_IDS.newNoteAction}>New note</Button>
```

Attributes help automated review locate elements, but they do not replace accessible roles, names, labels, or correct behavior.

## Final result

The finished application should look recognizably consistent with the supplied reference images while remaining the developer's own implementation. Review is based on layout hierarchy, component selection, responsive behavior, complete states, accessibility, and working API integration—not fragile pixel-for-pixel matching.
