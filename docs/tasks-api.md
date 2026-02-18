---
id: tasks-api
title: Tasks API
sidebar_label: Tasks API
sidebar_position: 12
---

# Tasks API

The Tasks API manages individual work items within a project.

## Data model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `task_01`) |
| `projectId` | `string` | Parent project ID |
| `title` | `string` | Short task title |
| `description` | `string` | Longer description |
| `status` | `string` | One of `todo`, `in_progress`, `done` |
| `priority` | `string` | One of `low`, `medium`, `high` |
| `assignee` | `string \| null` | Username of the assigned person |
| `createdAt` | `string` | ISO 8601 creation timestamp |
| `updatedAt` | `string` | ISO 8601 last-update timestamp |

## Endpoints

### List tasks

```
GET /api/tasks
```

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `projectId` | `string` | Filter by parent project |
| `assignee` | `string` | Filter by assigned user |
| `status` | `string` | Filter by task status |

All filters are optional and can be combined.

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "task_01",
      "projectId": "proj_01",
      "title": "Create wireframes for landing page",
      "status": "done",
      "priority": "high",
      "assignee": "alice",
      "createdAt": "2025-11-05T10:00:00Z",
      "updatedAt": "2025-11-20T15:00:00Z"
    }
  ],
  "count": 10
}
```

### Get task

```
GET /api/tasks/:id
```

**Response:** `200 OK` with the full task object.

**Error:** `404 Not Found` if the task does not exist.

### Create task

```
POST /api/tasks
```

**Request body:**

```json
{
  "projectId": "proj_01",
  "title": "Implement dark mode",
  "description": "Add CSS custom properties for dark theme",
  "priority": "medium",
  "assignee": "bob"
}
```

| Field | Required | Default |
|---|---|---|
| `projectId` | yes | — |
| `title` | yes | — |
| `description` | no | `""` |
| `status` | no | `todo` |
| `priority` | no | `medium` |
| `assignee` | no | `null` |

**Response:** `201 Created`

### Update task (partial)

```
PATCH /api/tasks/:id
```

Only the provided fields are updated. The `id`, `projectId`, and `createdAt` fields are preserved.

```json
{
  "status": "in_progress",
  "assignee": "charlie"
}
```

**Response:** `200 OK` with the updated task.

**Error:** `404 Not Found` if the task does not exist.

### Delete task

```
DELETE /api/tasks/:id
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "task_01",
    "deleted": true
  }
}
```

**Error:** `404 Not Found` if the task does not exist.
