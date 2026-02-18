---
id: projects-api
title: Projects API
sidebar_label: Projects API
sidebar_position: 11
---

# Projects API

The Projects API manages the lifecycle of projects — the top-level organizational unit in Symphony.

## Data model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `proj_01`) |
| `name` | `string` | Project name |
| `description` | `string` | Longer description |
| `status` | `string` | One of `planned`, `active`, `completed` |
| `teamId` | `string \| null` | Associated team ID |
| `createdAt` | `string` | ISO 8601 creation timestamp |
| `updatedAt` | `string` | ISO 8601 last-update timestamp |

## Endpoints

### List projects

```
GET /api/projects
```

**Query parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `status` | `string` | — | Filter by status |

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "proj_01",
      "name": "Website Redesign",
      "description": "Redesign the company marketing site...",
      "status": "active",
      "teamId": "team_01",
      "createdAt": "2025-11-01T09:00:00Z",
      "updatedAt": "2026-01-15T14:30:00Z"
    }
  ],
  "count": 5
}
```

### Get project

```
GET /api/projects/:id
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "proj_01",
    "name": "Website Redesign",
    "description": "Redesign the company marketing site...",
    "status": "active",
    "teamId": "team_01",
    "createdAt": "2025-11-01T09:00:00Z",
    "updatedAt": "2026-01-15T14:30:00Z"
  }
}
```

**Error:** `404 Not Found` if the project does not exist.

### Create project

```
POST /api/projects
```

**Request body:**

```json
{
  "name": "New Project",
  "description": "Project description",
  "status": "planned",
  "teamId": "team_01"
}
```

| Field | Required | Default |
|---|---|---|
| `name` | yes | — |
| `description` | no | — |
| `status` | no | `planned` |
| `teamId` | no | `null` |

**Response:** `201 Created`

### Update project

```
PUT /api/projects/:id
```

Replaces the project fields with the provided body. The `id` and `createdAt` fields are preserved.

**Request body:**

```json
{
  "name": "Updated Name",
  "status": "completed"
}
```

**Response:** `200 OK` with the updated project.

**Error:** `404 Not Found` if the project does not exist.

### Delete project

```
DELETE /api/projects/:id
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "proj_01",
    "deleted": true
  }
}
```

**Error:** `404 Not Found` if the project does not exist.
