---
id: release-notes
title: Release Notes
sidebar_label: Release Notes
sidebar_position: 16
---

# Release Notes

This page tracks changes across Symphony API releases. Release notes are generated automatically by the [Release Notes Automation](https://github.com/alse-sym/symphony-api-demo/actions) workflow using gh-aw and Claude.

---

## v1.1.2

# Release v1.1.2

## Highlights

This release introduces three new REST API resources that significantly expand the Symphony API's project management capabilities:

- **Time Entries**: Track hours worked on tasks with filtering by task, user, and date
- **Comments**: Add threaded discussions to tasks and projects with polymorphic associations
- **Milestones**: Define and track project milestones with status progression

## Breaking Changes

None

## Enhancements

### Time Entries API ([#8](https://github.com/alse-sym/symphony-api-demo/pull/8))

New `/api/time-entries` resource for logging work hours against tasks:

- **Endpoints**: Full CRUD operations (GET, POST, PATCH, DELETE)
- **Filtering**: Query by `taskId`, `username`, or `date`
- **Data Model**: Tracks hours, description, date, and auto-generated timestamps
- **Seed Data**: 7 sample entries across existing tasks

### Comments API ([#4](https://github.com/alse-sym/symphony-api-demo/pull/4))

New `/api/comments` resource with polymorphic attachment pattern:

- **Endpoints**: Full CRUD operations (GET, POST, PATCH, DELETE)
- **Polymorphic Design**: Attach comments to tasks or projects via `targetType`/`targetId`
- **Filtering**: Query by `targetType`, `targetId`, or `author`
- **Seed Data**: 6 realistic comments across tasks and projects

### Milestones API ([#1](https://github.com/alse-sym/symphony-api-demo/pull/1))

New `/api/milestones` resource for tracking project milestones:

- **Endpoints**: Full CRUD operations (GET, POST, PATCH, DELETE)
- **Status Tracking**: Progress through `pending`, `in_progress`, and `reached` states
- **Auto-Timestamp**: `reachedAt` field automatically set when milestone reaches completion
- **Filtering**: Query by `projectId` and `status`
- **Seed Data**: 5 milestones across existing projects

## Fixes

No bug fixes in this release.

## Upgrade Notes

This release is fully backward compatible. All new endpoints are additive and do not modify existing API behavior. No migration steps required.

---

## v1.1.1

## Highlights

This release extends the Symphony API with two new resource modules for enhanced project management capabilities:

- **Milestones API**: Track project milestones with status progression and automatic timestamp management
- **Comments API**: Add threaded discussions to tasks and projects with flexible attachment patterns

## Breaking Changes

None

## Enhancements

### Milestones Resource ([#1](https://github.com/alse-sym/symphony-api-demo/pull/1))

Added `/api/milestones` endpoint with full CRUD operations:

- **List milestones** (`GET /api/milestones`) with filtering by `projectId` and `status`
- **Create milestone** (`POST /api/milestones`)
- **Get milestone** (`GET /api/milestones/:id`)
- **Update milestone** (`PATCH /api/milestones/:id`)
- **Delete milestone** (`DELETE /api/milestones/:id`)

**Data model** includes: `id`, `projectId`, `title`, `description`, `status` (pending/in_progress/reached), `dueDate`, `reachedAt`, `createdAt`

**Notable behavior**: When a milestone's status is updated to `reached`, the `reachedAt` timestamp is automatically set if not already present.

Includes 5 seed milestones across existing projects.

### Comments Resource ([#4](https://github.com/alse-sym/symphony-api-demo/pull/4))

Added `/api/comments` endpoint with full CRUD operations:

- **List comments** (`GET /api/comments`) with filtering by `targetType`, `targetId`, and `author`
- **Get comment** (`GET /api/comments/:id`)
- **Create comment** (`POST /api/comments`)
- **Update comment** (`PATCH /api/comments/:id`)
- **Delete comment** (`DELETE /api/comments/:id`)

**Polymorphic attachment**: Comments use `targetType`/`targetId` pattern to attach to either tasks or projects.

Includes 6 seed comments referencing existing tasks and projects.

## Fixes

None

## Upgrade Notes

No migration required. Both new endpoints are additive and do not affect existing API behavior.

---

## v1.1.0

## Highlights

This is the initial release of Symphony API Demo, featuring a fully functional Express.js REST API with automated CI/CD workflows.

## Breaking Changes

None

## Enhancements

- **New REST API**: Express.js API server with endpoints for projects, tasks, and teams ([d5597dd](https://github.com/alse-sym/symphony-api-demo/commit/d5597dd8a288b36541ec7d7b4813e3407a30bbfc))
- **Automated Release Workflow**: Added gh-aw workflow compilation and automation ([c31c4bb](https://github.com/alse-sym/symphony-api-demo/commit/c31c4bb99058c4029e28a93caa15d1d290350d35))

## Fixes

- Fixed repository dispatch client_payload formatting to use `-F` flag for proper JSON handling ([fdd1b92](https://github.com/alse-sym/symphony-api-demo/commit/fdd1b92b1481de70524a7410eacfc62713c0141c))
- Added missing `pull-requests:read` permission to release-notes workflow ([f44c69f](https://github.com/alse-sym/symphony-api-demo/commit/f44c69f8dbe6e4bc87b594b880ce9a9c332aacb8))

## Upgrade Notes

This is the first release. No upgrade steps required.

---

Generated with gh-aw release notes automation

---

## v1.0.0

**Initial release**

### Highlights

- Express-based REST API with 13 endpoints for projects, tasks, and teams.
- In-memory data store with pre-populated seed data.
- CORS enabled by default.
- Centralized JSON error handling.

### Breaking Changes

None (initial release).

### Enhancements

- `GET /api/projects` supports `?status=` filtering.
- `GET /api/tasks` supports `?projectId=`, `?assignee=`, and `?status=` filtering.
- `GET /api/teams` returns a compact summary with `memberCount`; full members available via `GET /api/teams/:id`.

### Fixes

None (initial release).

### Upgrade Notes

No prior version to upgrade from.
