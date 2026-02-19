---
id: sprints-api
title: Sprints API
sidebar_label: Sprints API
sidebar_position: 13
---

# Sprints API

The Sprints API manages time-boxed iterations within projects. Each sprint groups tasks together with a defined goal, start date, and end date.

## Data model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `sprint_01`) |
| `projectId` | `string` | Parent project ID |
| `name` | `string` | Sprint name |
| `goal` | `string` | Sprint goal or objective |
| `status` | `string` | One of `planned`, `active`, `completed` |
| `startDate` | `string \| null` | ISO 8601 date (YYYY-MM-DD) |
| `endDate` | `string \| null` | ISO 8601 date (YYYY-MM-DD) |
| `taskIds` | `string[]` | Array of task IDs assigned to this sprint |
| `createdAt` | `string` | ISO 8601 creation timestamp |
| `updatedAt` | `string` | ISO 8601 last-update timestamp |

## Endpoints

### List sprints

````
GET /api/sprints
````

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `projectId` | `string` | Filter by parent project |
| `status` | `string` | Filter by sprint status |

All filters are optional and can be combined.

**Response:** `200 OK`

````json
{
  "data": [
    {
      "id": "sprint_02",
      "projectId": "proj_01",
      "name": "Sprint 2 — Core UI",
      "goal": "Build responsive navigation and landing page components.",
      "status": "active",
      "startDate": "2025-12-01",
      "endDate": "2026-01-26",
      "taskIds": ["task_02", "task_03"],
      "createdAt": "2025-11-18T09:00:00Z",
      "updatedAt": "2026-01-10T11:30:00Z"
    }
  ],
  "count": 5
}
````

### Get sprint

````
GET /api/sprints/:id
````

**Response:** `200 OK` with the full sprint object.

**Error:** `404 Not Found` if the sprint does not exist.

### Create sprint

````
POST /api/sprints
````

**Request body:**

````json
{
  "projectId": "proj_01",
  "name": "Sprint 3 — Backend APIs",
  "goal": "Implement REST endpoints for user management",
  "status": "planned",
  "startDate": "2026-02-01",
  "endDate": "2026-02-15",
  "taskIds": []
}
````

| Field | Required | Default |
|---|---|---|
| `projectId` | yes | — |
| `name` | yes | — |
| `goal` | no | `""` |
| `status` | no | `"planned"` |
| `startDate` | no | `null` |
| `endDate` | no | `null` |
| `taskIds` | no | `[]` |

**Response:** `201 Created` with the new sprint object. The `id`, `createdAt`, and `updatedAt` fields are generated automatically.

### Update sprint (partial)

````
PATCH /api/sprints/:id
````

Only the provided fields are updated. The `id`, `projectId`, and `createdAt` fields are preserved.

````json
{
  "status": "active",
  "startDate": "2026-02-03"
}
````

**Response:** `200 OK` with the updated sprint.

**Error:** `404 Not Found` if the sprint does not exist.

### Add task to sprint

````
POST /api/sprints/:id/tasks
````

Adds a task to the sprint's `taskIds` array. This operation is idempotent—adding the same task multiple times will not create duplicates.

**Request body:**

````json
{
  "taskId": "task_05"
}
````

**Response:** `200 OK` with the updated sprint object.

**Error:** `404 Not Found` if the sprint does not exist.

### Remove task from sprint

````
DELETE /api/sprints/:id/tasks/:taskId
````

Removes the specified task from the sprint's `taskIds` array.

**Response:** `200 OK` with the updated sprint object.

**Error:** `404 Not Found` if the sprint does not exist.

### Delete sprint

````
DELETE /api/sprints/:id
````

**Response:** `200 OK`

````json
{
  "data": {
    "id": "sprint_03",
    "deleted": true
  }
}
````

**Error:** `404 Not Found` if the sprint does not exist.
