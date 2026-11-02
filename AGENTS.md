<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in each app's `node_modules/next/dist/docs/` (e.g. `apps/client/node_modules/next/dist/docs/` or the hoisted root `node_modules/next/dist/docs/`) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Monorepo

- `apps/client` — tenant e-learning (`admin` | `trainer` | `employee`)
- `apps/admin` — super-admin console (separate auth/session/deploy)
