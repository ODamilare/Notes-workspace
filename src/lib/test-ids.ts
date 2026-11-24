// Stable review hooks for the required frontend states and actions.
// Use these values with data-testid; do not rename them in an individual submission.
export const TEST_IDS = {
  registerForm: "register-form",
  loginForm: "login-form",
  authError: "auth-error",
  appShell: "app-shell",
  mobileNavigationTrigger: "mobile-navigation-trigger",
  logoutAction: "logout-action",
  notesLoading: "notes-loading",
  notesError: "notes-error",
  notesEmpty: "notes-empty",
  notesGrid: "notes-grid",
  newNoteAction: "new-note-action",
  noteCard: "note-card",
  noteForm: "note-form",
  noteSubmit: "note-submit",
  deleteNoteDialog: "delete-note-dialog",
  deleteNoteConfirm: "delete-note-confirm",
} as const;
