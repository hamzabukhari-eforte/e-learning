# E-Learning Monorepo

pnpm workspace with two independently deployable Next.js apps.

| App | Package | Port | Purpose |
|-----|---------|------|---------|
| **Client** | `@e-learning/client` | 3000 | Tenant app (`admin` \| `trainer` \| `employee`) |
| **Admin** | `@e-learning/admin` | 3001 | Super-admin console (separate login) |

```
apps/
  client/   # existing product
  admin/    # dashboard, manage domain, user management
```

## Prerequisites

- Node.js (see `.nvmrc`)
- [pnpm](https://pnpm.io) 9+

```bash
corepack enable
corepack prepare pnpm@9.15.0 --activate
```

## Setup

```bash
pnpm install
```

## Develop

```bash
pnpm dev              # both apps
pnpm dev:client       # http://localhost:3000
pnpm dev:admin        # http://localhost:3001
```

## Build / deploy separately

```bash
pnpm build:client
pnpm build:admin
```

Point each host project at `apps/client` or `apps/admin` (same git repo, different root directories / build filters).

## Super Admin (admin app)

Mock login accepts any non-empty user ID + password. Session key: `elearning.admin.session` (separate from the client app).

Screens:

- **Dashboard** — domain / user overview
- **Manage Domain** — create / edit / delete client domains
- **Manage Users** — create admin, trainer, and employee users
