---
id: milestones-api
title: Milestones API
sidebar_label: Milestones API
sidebar_position: 12
---

# Milestones API

The Milestones API manages project milestones — key checkpoints and deliverables that track progress toward project goals.

## Data model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `ms_01`) |
| `projectId` | `string` | Parent project identifier |
| `title` | `string` | Milestone name |
| `description` | `string` | Detailed description of the milestone |
| `status` | `string` | One of `pending`, `in_progress`, `reached` |
| `dueDate` | `string \| null` | ISO 8601 target date (optional) |
| `reachedAt` | `string \| null` | ISO 8601 timestamp when milestone was reached |
| `createdAt` | `string` | ISO 8601 creation timestamp |

## Endpoints

### List milestones

```
GET /api/milestones
```

**Query parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `projectId` | `string` | — | Filter by project ID |
| `status` | `string` | — | Filter by status (`pending`, `in_progress`, `reached`) |

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "ms_01",
      "projectId": "proj_01",
      "title": "Design Phase Complete",
      "description": "All wireframes and design specs approved by stakeholders.",
      "status": "reached",
      "dueDate": "2025-12-15T00:00:00Z",
      "reachedAt": "2025-12-12T16:00:00Z",
      "createdAt": "2025-11-01T09:00:00Z"
    }
  ],
  "count": 1
}
```

### Get milestone

```
GET /api/milestones/:id
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "ms_01",
    "projectId": "proj_01",
    "title": "Design Phase Complete",
    "description": "All wireframes and design specs approved by stakeholders.",
    "status": "reached",
    "dueDate": "2025-12-15T00:00:00Z",
    "reachedAt": "2025-12-12T16:00:00Z",
    "createdAt": "2025-11-01T09:00:00Z"
  }
}
```

**Error:** `404 Not Found` if the milestone does not exist.

### Create milestone

```
POST /api/milestones
```

**Request body:**

```json
{
  "projectId": "proj_01",
  "title": "Beta Launch",
  "description": "Internal beta deployed to staging environment for QA.",
  "status": "pending",
  "dueDate": "2026-03-01T00:00:00Z"
}
```

| Field | Required | Default |
|---|---|---|
| `projectId` | yes | — |
| `title` | yes | — |
| `description` | no | `""` |
| `status` | no | `pending` |
| `dueDate` | no | `null` |

**Response:** `201 Created`

The `id` is auto-generated with prefix `ms_`, `reachedAt` is initialized to `null`, and `createdAt` is set to the current timestamp.

### Update milestone

```
PATCH /api/milestones/:id
```

Partially updates the milestone with the provided fields. The `id`, `projectId`, and `createdAt` fields cannot be changed.

**Request body:**

```json
{
  "status": "reached"
}
```

**Automatic timestamp behavior:**

When a milestone's `status` is updated to `reached` and it does not already have a `reachedAt` value, the field is automatically set to the current timestamp.

**Response:** `200 OK` with the updated milestone.

**Error:** `404 Not Found` if the milestone does not exist.

### Delete milestone

```
DELETE /api/milestones/:id
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "ms_01",
    "deleted": true
  }
}
```

**Error:** `404 Not Found` if the milestone does not exist.

## Usage examples

### Tracking milestone progress

You can use the `status` field to track milestone progress through three states:

1. `pending` - Milestone defined but work not yet started
2. `in_progress` - Actively working toward the milestone
3. `reached` - Milestone achieved

When updating a milestone to `reached`, the API automatically captures the completion time:

```json
PATCH /api/milestones/ms_02
{
  "status": "reached"
}
```

Response includes the auto-populated `reachedAt` timestamp:

```json
{
  "data": {
    "id": "ms_02",
    "status": "reached",
    "reachedAt": "2026-02-19T10:30:00.000Z",
    ...
  }
}
```

### Filtering milestones

Get all pending milestones for a project:

```
GET /api/milestones?projectId=proj_01&status=pending
```

Get all overdue milestones across projects (requires client-side filtering by `dueDate`):

```
GET /api/milestones
```
