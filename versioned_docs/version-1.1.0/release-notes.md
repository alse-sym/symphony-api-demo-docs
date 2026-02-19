---
id: release-notes
title: Release Notes
sidebar_label: Release Notes
sidebar_position: 16
---

# Release Notes

This page tracks changes across Symphony API releases. Release notes are generated automatically by the [Release Notes Automation](https://github.com/alse-sym/symphony-api-demo/actions) workflow using gh-aw and Claude.

---

## v.1.1.3

## Highlights

This release adds four powerful new API resources to Symphony, expanding project management capabilities with webhooks, time tracking, comments, and milestone management.

## Breaking Changes

None

## Enhancements

### Webhooks API ([#11](https://github.com/alse-sym/symphony-api-demo/pull/11))
- Added `/api/webhooks` resource for registering event callbacks
- Supports 12 event types plus wildcard (`*`) subscriptions: `project.created`, `project.updated`, `project.deleted`, `task.created`, `task.updated`, `task.deleted`, `comment.created`, `comment.updated`, `comment.deleted`, `milestone.reached`, `sprint.started`, `sprint.completed`
- Auto-generated secrets with secure redaction in all read responses
- Filter webhooks by `active` status and `event` type
- Event validation ensures only supported events can be registered

### Time Entries API ([#8](https://github.com/alse-sym/symphony-api-demo/pull/8))
- Added `/api/time-entries` resource for tracking hours worked on tasks
- Filter entries by `taskId`, `username`, and `date`
- Full CRUD operations with automatic ID generation
- Preserves immutable fields (`id`, `taskId`, `createdAt`) during updates

### Comments API ([#4](https://github.com/alse-sym/symphony-api-demo/pull/4))
- Added `/api/comments` resource with polymorphic attachment support
- Comments can attach to either tasks or projects via `targetType`/`targetId` pattern
- Filter by `targetType`, `targetId`, and `author`
- Full CRUD operations with proper field preservation

### Milestones API ([#1](https://github.com/alse-sym/symphony-api-demo/pull/1))
- Added `/api/milestones` resource for tracking project milestones
- Three status states: `pending`, `in_progress`, `reached`
- Auto-timestamps `reachedAt` when status changes to `reached`
- Filter by `projectId` and `status`
- Full CRUD operations with optional due dates

## Fixes

None

## Upgrade Notes

This release is fully backward compatible. All new APIs follow consistent patterns:

- Standard CRUD endpoints (GET, POST, PATCH, DELETE)
- Consistent error handling with `NOT_FOUND` for unknown IDs
- Automatic ID generation for new resources
- ISO 8601 timestamps for all date fields

### New Endpoints Summary

| Resource | Base Path | Key Features |
|----------|-----------|--------------|
| Webhooks | `/api/webhooks` | Event subscriptions, secret management |
| Time Entries | `/api/time-entries` | Task time tracking, date filtering |
| Comments | `/api/comments` | Polymorphic attachments (tasks/projects) |
| Milestones | `/api/milestones` | Status tracking, auto-timestamping |

All endpoints include comprehensive seed data for testing and development.

---

## v1.1.4

## Highlights

This release expands the Symphony API with five new resource endpoints, adding comprehensive project management capabilities including milestone tracking, collaboration features, time logging, webhook integrations, and audit trails.

## Breaking Changes

None

## Enhancements

### New API Resources

- **Milestones API** ([#1](https://github.com/alse-sym/symphony-api-demo/pull/1)) - Track project milestones with full CRUD operations
  - Filter by project ID and status (`pending`, `in_progress`, `reached`)
  - Auto-timestamp when milestones are reached
  - 5 endpoints: list, create, get by ID, update, delete

- **Comments API** ([#4](https://github.com/alse-sym/symphony-api-demo/pull/4)) - Add threaded comments to tasks and projects
  - Polymorphic target system supports both tasks and projects
  - Filter by target type, target ID, and author
  - Full CRUD with 5 endpoints

- **Time Entries API** ([#8](https://github.com/alse-sym/symphony-api-demo/pull/8)) - Log and track hours worked on tasks
  - Filter by task ID, username, and date
  - Track descriptions and hours with decimal precision
  - Full CRUD operations

- **Webhooks API** ([#11](https://github.com/alse-sym/symphony-api-demo/pull/11)) - Register callback URLs for event notifications
  - Support for 12 event types plus wildcard (`*`) subscriptions
  - Auto-generated secrets with security-first design (redacted in read responses)
  - Active/inactive toggling for webhook management
  - Event validation against whitelist

- **Activity Log API** ([#12](https://github.com/alse-sym/symphony-api-demo/pull/12)) - Immutable audit trail of all API actions
  - Append-only design (no update or delete operations)
  - Rich filtering by action, actor, resource type, resource ID, and time range
  - Results sorted newest-first with optional limit for pagination
  - Comprehensive metadata tracking for audit compliance

## Fixes

None

## Upgrade Notes

All new endpoints are available immediately at their respective `/api/*` paths. No migration or configuration changes required. The Activity Log API is designed as an append-only audit trail and should be integrated into your logging workflow if compliance tracking is needed.

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
