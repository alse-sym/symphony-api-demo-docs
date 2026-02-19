---
id: notifications-api
title: Notifications API
sidebar_label: Notifications API
sidebar_position: 14
---

# Notifications API

The Notifications API provides a per-user notification feed for tracking activity across projects, tasks, milestones, and comments. Notifications are user-scoped and support filtering by read status and event type.

## Data model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `notif_01`) |
| `username` | `string` | Username of the notification recipient |
| `type` | `string` | Event type: `task_assigned`, `comment_added`, `milestone_reached`, or `project_updated` |
| `message` | `string` | Human-readable notification text |
| `resourceType` | `string` | Type of the related resource (`task`, `project`, `milestone`, `comment`) |
| `resourceId` | `string` | ID of the related resource |
| `read` | `boolean` | Whether the notification has been read |
| `createdAt` | `string` | ISO 8601 creation timestamp |

## Endpoints

### List notifications

```
GET /api/notifications
```

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `username` | `string` | Filter by notification recipient |
| `type` | `string` | Filter by event type |
| `read` | `boolean` | Filter by read status (`true` or `false`) |

All filters are optional and can be combined.

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "notif_01",
      "username": "bob",
      "type": "task_assigned",
      "message": "You were assigned to \"Implement responsive navigation\".",
      "resourceType": "task",
      "resourceId": "task_02",
      "read": false,
      "createdAt": "2025-12-01T09:05:00Z"
    }
  ],
  "count": 1
}
```

### Get notification

```
GET /api/notifications/:id
```

**Response:** `200 OK` with the full notification object.

**Error:** `404 Not Found` if the notification does not exist.

### Create notification

```
POST /api/notifications
```

**Request body:**

```json
{
  "username": "alice",
  "type": "comment_added",
  "message": "New comment on your task",
  "resourceType": "task",
  "resourceId": "task_05"
}
```

| Field | Required | Default |
|---|---|---|
| `username` | yes | — |
| `type` | yes | — |
| `message` | yes | — |
| `resourceType` | no | `null` |
| `resourceId` | no | `null` |

**Response:** `201 Created` with the new notification including auto-generated `id`, `read` (always `false`), and `createdAt` fields.

### Mark notification as read

```
PATCH /api/notifications/:id/read
```

Sets the `read` field to `true` for a single notification.

**Response:** `200 OK` with the updated notification.

**Error:** `404 Not Found` if the notification does not exist.

### Mark all notifications as read

```
PATCH /api/notifications/read-all
```

Marks all notifications as read. Optionally filter by user.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `username` | `string` | Mark only this user's notifications as read |

**Response:** `200 OK`

```json
{
  "data": {
    "markedRead": 3
  }
}
```

The `markedRead` count reflects how many notifications changed from unread to read.

### Delete notification

```
DELETE /api/notifications/:id
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "notif_01",
    "deleted": true
  }
}
```

**Error:** `404 Not Found` if the notification does not exist.
