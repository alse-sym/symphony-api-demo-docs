---
id: modules-overview
title: Modules Overview
sidebar_label: Modules Overview
sidebar_position: 6
---

# Modules Overview

The Symphony API is organized into three functional modules, each encapsulated in its own route file. This page provides a summary of each module and its responsibilities.

## Projects module

**File:** `src/routes/projects.js`

Manages the lifecycle of projects — the top-level organizational unit in Symphony.

| Capability | Endpoint |
|---|---|
| List projects (with optional status filter) | `GET /api/projects` |
| Create a project | `POST /api/projects` |
| Retrieve a single project | `GET /api/projects/:id` |
| Replace a project | `PUT /api/projects/:id` |
| Delete a project | `DELETE /api/projects/:id` |

A project has a `status` field that can be `planned`, `active`, or `completed`. Projects may reference a `teamId` to associate them with a team.

## Tasks module

**File:** `src/routes/tasks.js`

Manages individual work items within a project.

| Capability | Endpoint |
|---|---|
| List tasks (filterable by `projectId`, `assignee`, `status`) | `GET /api/tasks` |
| Create a task | `POST /api/tasks` |
| Retrieve a single task | `GET /api/tasks/:id` |
| Partially update a task | `PATCH /api/tasks/:id` |
| Delete a task | `DELETE /api/tasks/:id` |

Tasks carry a `priority` (`low`, `medium`, `high`) and a `status` (`todo`, `in_progress`, `done`). Each task belongs to exactly one project via `projectId`.

## Teams module

**File:** `src/routes/teams.js`

Manages teams and their membership.

| Capability | Endpoint |
|---|---|
| List teams (summary without member details) | `GET /api/teams` |
| Create a team | `POST /api/teams` |
| Retrieve a team with full member list | `GET /api/teams/:id` |

Each team contains a `members` array. Each member has a `username` and a `role` (e.g. `lead`, `engineer`, `designer`).

## Seed data

The API ships with pre-populated data files in `src/data/`:

| File | Records | Description |
|---|---|---|
| `projects.json` | 5 | Mix of planned, active, and completed projects |
| `tasks.json` | 10 | Tasks across all projects in various statuses |
| `teams.json` | 3 | Teams with 2–3 members each |

Seed data is loaded once at server startup. Any mutations made through the API persist only until the server is restarted.
