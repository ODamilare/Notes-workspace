# Frontend training and submission guide

## Purpose

This exercise introduces the engineering workflow used before developers move onto Ocean Intuition client or internal projects. It evaluates how each developer understands an existing repository, converts a written specification into reusable frontend architecture, integrates APIs, uses Git professionally, and communicates progress.

The exercise is individual. Two developers may discuss general ideas and review one another's work, but they must not share a submission branch, copy completed components, or merge their implementations.

## One-week outcome

By **Tuesday, September 1, 2026**, each developer must have:

- A working local implementation.
- An individual `submission/firstname-lastname` branch in the company repository.
- A draft pull request opened early and updated throughout the week.
- A final commit pushed before the deadline.
- A pull request marked ready for review, without merging it.
- Passing lint, build, and API tests.
- A locally reproducible submission that the reviewer can run from the branch.

## Working process

### Day 1: access, setup, and plan

- Confirm Ocean Intuition email and approved GitHub identity.
- Accept repository access and clone the project.
- Create the individual submission branch.
- Run the database, starter, and API tests unchanged.
- Read `README.md` and `EXPECTED-RESULT.md` completely.
- Open a draft pull request so progress is visible.
- Implement the authentication chassis.

### Day 2: authentication and shell

- Connect Register, Login, current-user, and Logout endpoints.
- Build protected navigation behavior.
- Implement desktop and mobile application shells.

### Day 3: notes reading states

- Connect the notes list.
- Build loading, retryable error, empty, and populated states.
- Compose the empty state from the supplied shadCN `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, and `EmptyContent` components.
- Render reusable note cards.

### Day 4: mutations

- Build the shared create/edit form.
- Connect create and update requests.
- Add delete confirmation and deletion.
- Keep visible state synchronized with API results.

### Day 5: responsive and accessibility review

- Test mobile, tablet, and desktop targets.
- Check keyboard usage, focus, labels, dialogs, and long content.
- Resolve visual inconsistency and duplicated code.

### Final period: verification and submission

- Run all required commands.
- Complete the pull request description and checklist.
- Push the final assessed commit.
- Mark the pull request ready for review as the final-submission signal.
- Send the branch and pull-request links through the agreed company channel.

## Git workflow

```bash
git switch main
git pull origin main
git switch -c submission/firstname-lastname
git push -u origin submission/firstname-lastname
```

Commit meaningful milestones and push regularly. Continue updating the same branch. Never merge the other developer's submission branch and never merge the final pull request yourself.

Draft pull requests are for visibility and feedback. Marking the pull request ready for review is the final-submission signal. A hosted deployment is not required for this exercise.

## What is being evaluated

- Understanding and preserving the supplied backend contract.
- Reusable component composition using supplied shadCN components.
- Authentication and protected-route behavior.
- Accurate API integration and local state updates.
- Loading, empty, validation, server-error, pending, and success states.
- Correct use of the supplied shadCN `Empty` composition for the no-notes state.
- Responsive layout across required viewports.
- Accessibility and keyboard interaction.
- TypeScript quality, naming, organization, and dependency restraint.
- Git branch discipline and understandable commits.
- Clear communication with technical and non-technical colleagues.

## Communication with the project manager

Mr. Ini will coordinate progress and may communicate in non-technical terms. Developers must translate engineering status into user and project impact.

Use this update structure:

```text
Completed: what a user can now do
In progress: the current measurable feature
Blocked: the problem, what was tried, and support needed
Next: the next measurable feature
Deadline impact: none, at risk, or delayed
```

Meetings are Tuesday, Wednesday, and Thursday at 4:00 PM WAT. Bring exact errors, screenshots, links, or reproduction steps when requesting help.

## Review and transition to real projects

After submission, each pull request will be reviewed independently. Feedback may cover architecture, behavior, responsive design, accessibility, code quality, Git history, and communication.

The exercise is complete only after feedback has been discussed. The next stage is not an automatic merge of either training branch. A successful developer should be able to explain their decisions, respond to review comments, and demonstrate the complete user journey. Those habits then carry into actual Ocean Intuition work, where requirements, branches, reviews, deployments, and non-technical stakeholder communication follow the same general pattern.

## Reviewer process

For each developer:

1. Open their pull request without merging it.
2. Confirm the latest commit was pushed before the deadline.
3. Check out the submission branch on the reviewer computer.
4. Start the supplied Docker PostgreSQL database and run the application on `http://localhost:3000`.
5. Run lint, build, and the supplied API test.
6. Test registration, login, refresh, notes CRUD, responsive navigation, errors, and logout.
7. Compare hierarchy and states with the supplied reference images.
8. Review the commit history and changed files.
9. Record feedback separately for that developer.

The Docker PostgreSQL service is the database for development and assessment. It keeps the exercise self-contained and avoids a paid hosted database. GitHub stores each independent submission; the reviewer runs one branch at a time locally. Vercel is unnecessary unless Ocean Intuition later chooses to host the application with a compatible database.
