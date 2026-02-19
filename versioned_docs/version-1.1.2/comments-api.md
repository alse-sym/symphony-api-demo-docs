---
id: comments-api
title: Comments API
sidebar_label: Comments API
sidebar_position: 13
---

# Comments API

The Comments API manages discussion threads on tasks and projects. Comments use a polymorphic attachment pattern where each comment targets either a task or a project.

## Data model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `cmt_01`) |
| `targetType` | `string` | Either `task` or `project` |
| `targetId` | `string` | ID of the task or project being commented on |
| `author` | `string` | Username of the comment author |
| `body` | `string` | Comment text content |
| `createdAt` | `string` | ISO 8601 creation timestamp |
| `updatedAt` | `string` | ISO 8601 last-update timestamp |

## Endpoints

### List comments

```
GET /api/comments
```

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `targetType` | `string` | Filter by target type (`task` or `project`) |
| `targetId` | `string` | Filter by specific target ID |
| `author` | `string` | Filter by comment author |

All filters are optional and can be combined.

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "cmt_01",
      "targetType": "task",
      "targetId": "task_02",
      "author": "alice",
      "body": "The hamburger menu animation feels sluggish on older devices.",
      "createdAt": "2026-01-12T09:15:00Z",
      "updatedAt": "2026-01-12T09:15:00Z"
    }
  ],
  "count": 1
}
```

### Get comment

```
GET /api/comments/:id
```

**Response:** `200 OK` with the full comment object.

**Error:** `404 Not Found` if the comment does not exist.

### Create comment

```
POST /api/comments
```

**Request body:**

```json
{
  "targetType": "task",
  "targetId": "task_02",
  "author": "alice",
  "body": "This looks good to me!"
}
```

| Field | Required | Default |
|---|---|---|
| `targetType` | yes | — |
| `targetId` | yes | — |
| `author` | yes | — |
| `body` | no | `""` |

**Response:** `201 Created` with the new comment including auto-generated `id`, `createdAt`, and `updatedAt` fields.

### Update comment (partial)

```
PATCH /api/comments/:id
```

Only the provided fields are updated. The `id`, `targetType`, `targetId`, `author`, and `createdAt` fields are immutable and will be preserved even if included in the request.

```json
{
  "body": "Updated comment text"
}
```

**Response:** `200 OK` with the updated comment.

**Error:** `404 Not Found` if the comment does not exist.

### Delete comment

```
DELETE /api/comments/:id
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "cmt_01",
    "deleted": true
  }
}
```

**Error:** `404 Not Found` if the comment does not exist.
