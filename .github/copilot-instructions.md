# Copilot instructions

Project-wide guidance for AI coding agents working in this repository.

## Git: never commit or push on your own

Committing and pushing are **explicit, user-initiated actions**. Do not run them
unless the user has clearly asked for that specific action in the current
request.

- **Do not `git commit`** unless the user explicitly asks you to commit (e.g.
  "commit this", "create a commit"). Finishing a change is **not** implicit
  consent to commit.
- **Do not `git push`** unless the user explicitly asks you to push (e.g.
  "push", "open a PR"). Creating a commit is **not** implicit consent to push.
- **Do not** create tags, force-push, rebase, reset, amend, or otherwise rewrite
  history unless explicitly asked.
- If you believe a commit or push is the right next step, **stop and ask first**,
  then wait for explicit approval.
- "Commit" and "push" are separate approvals. Being asked to commit does not
  authorize a push, and vice versa. Ask for each unless the user requested both.

Making edits, running builds/tests/linters, and other local, non-destructive
work does **not** require this approval — only the git operations above do.

## General expectations

- Keep changes surgical and scoped to the request.
- Run the relevant checks before claiming success: `npm run lint`,
  `npm run type-check`, `npm test`, and `npm run build`.
- Do not commit the built bundle (`dist/`); it is produced by CI and released as
  a GitHub release asset.
