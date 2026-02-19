---
id: architecture
title: Architecture
sidebar_label: Architecture
sidebar_position: 5
---

# Architecture

Symphony API follows a conventional layered Express architecture optimized for simplicity and demonstration purposes.

## High-level overview

```
Client (curl / browser / frontend)
  │
  ▼
┌─────────────────────────────────┐
│  Express Application            │
│  ┌───────────┐ ┌─────────────┐  │
│  │  CORS     │ │  JSON body  │  │
│  │  middleware│ │  parser     │  │
│  └───────────┘ └─────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Route handlers           │  │
│  │  /api/projects            │  │
│  │  /api/tasks               │  │
│  │  /api/teams               │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Error handler middleware │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────┐
│  In-memory data store           │
│  (loaded from JSON seed files)  │
└─────────────────────────────────┘
```

## Request lifecycle

1. An HTTP request arrives at the Express server.
2. Global middleware runs: CORS headers are set, and the JSON body (if present) is parsed.
3. The request is matched against registered route handlers (`/api/projects`, `/api/tasks`, `/api/teams`).
4. The route handler reads from or mutates the in-memory data arrays.
5. A JSON response is sent back to the client.
6. If no route matches, the `notFound` middleware generates a 404 error.
7. Any thrown or forwarded error is caught by the centralized `errorHandler` middleware, which returns a consistent JSON error envelope.

## Data model

Symphony manages three entity types:

| Entity | Key fields | Relationships |
|---|---|---|
| **Project** | `id`, `name`, `status`, `teamId` | Belongs to a Team; has many Tasks |
| **Task** | `id`, `projectId`, `title`, `status`, `priority`, `assignee` | Belongs to a Project |
| **Team** | `id`, `name`, `members[]` | Has many Projects |

All IDs are prefixed strings (e.g. `proj_01`, `task_01`, `team_01`). New records receive a UUID-based ID at creation time.

## Design decisions

- **No database** — data is held in plain JavaScript arrays cloned from JSON seed files at startup. This keeps the demo dependency-free and instantly runnable.
- **Mutable state** — POST, PUT, PATCH, and DELETE operations modify the in-memory arrays. Restarting the server resets all data to the seed values.
- **No authentication** — the API is open by default. See [Authentication](./authentication.md) for how to add token-based auth in a production deployment.
- **Centralized error handling** — all errors flow through a single Express error middleware that produces a uniform `{ error: { code, message } }` envelope.
