---
id: webhooks-api
title: Webhooks API
sidebar_label: Webhooks API
sidebar_position: 16
---

# Webhooks API

The Webhooks API allows you to register callback URLs that receive notifications when specific events occur in the Symphony system. This enables real-time integrations with external services like CI/CD pipelines, chat platforms, analytics tools, and audit systems.

## Data model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `wh_a1b2c3d4`) |
| `url` | `string` | Callback URL that receives event payloads |
| `events` | `string[]` | Array of event types this webhook subscribes to |
| `secret` | `string` | Shared secret for signing payloads (redacted in read responses) |
| `active` | `boolean` | Whether the webhook is currently enabled |
| `description` | `string` | Human-readable description of the webhook's purpose |
| `createdAt` | `string` | ISO 8601 creation timestamp |
| `updatedAt` | `string` | ISO 8601 last-update timestamp |

### Supported events

| Event | Description |
|---|---|
| `project.created` | New project created |
| `project.updated` | Project modified |
| `project.deleted` | Project deleted |
| `task.created` | New task created |
| `task.updated` | Task modified |
| `task.deleted` | Task deleted |
| `comment.created` | New comment posted |
| `comment.updated` | Comment modified |
| `comment.deleted` | Comment deleted |
| `milestone.reached` | Project milestone achieved |
| `sprint.started` | Sprint initiated |
| `sprint.completed` | Sprint finished |
| `*` | Wildcard — subscribe to all event types |

### Secret handling

For security, webhook secrets are:
- **Auto-generated** when you create a webhook (format: `whsec_<12-char-alphanumeric>`)
- **Returned once** in the POST response
- **Redacted** from all subsequent GET and PATCH responses

Store the secret securely after creation — you cannot retrieve it again through the API.

## Endpoints

### List webhooks

```
GET /api/webhooks
```

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `active` | `string` | Filter by active status (`"true"` or `"false"`) |
| `event` | `string` | Filter to webhooks subscribed to this event type (includes wildcard subscribers) |

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "wh_01",
      "url": "https://ci.example.com/hooks/symphony",
      "events": ["task.created", "task.updated"],
      "active": true,
      "description": "CI pipeline trigger on task changes",
      "createdAt": "2025-11-10T09:00:00Z",
      "updatedAt": "2025-11-10T09:00:00Z"
    }
  ],
  "count": 1
}
```

Note: The `secret` field is omitted from list responses.

### Get webhook

```
GET /api/webhooks/:id
```

**Response:** `200 OK` with the webhook object (secret redacted).

**Error:** `404 Not Found` with error code `NOT_FOUND` if the webhook does not exist.

### Create webhook

```
POST /api/webhooks
```

**Request body:**

```json
{
  "url": "https://slack.example.com/api/webhook",
  "events": ["project.updated", "milestone.reached"],
  "description": "Slack notifications for project milestones",
  "active": true
}
```

| Field | Required | Default |
|---|---|---|
| `url` | yes | — |
| `events` | no | `[]` |
| `description` | no | `""` |
| `active` | no | `true` |

**Event validation:** All event types in the `events` array must be valid (see supported events above). Invalid events return a `400 Bad Request` with error code `INVALID_EVENTS`.

**Response:** `201 Created`

```json
{
  "data": {
    "id": "wh_a1b2c3d4",
    "url": "https://slack.example.com/api/webhook",
    "events": ["project.updated", "milestone.reached"],
    "secret": "whsec_8f7e6d5c4b3a",
    "active": true,
    "description": "Slack notifications for project milestones",
    "createdAt": "2026-02-19T10:00:00Z",
    "updatedAt": "2026-02-19T10:00:00Z"
  }
}
```

**Important:** The `secret` field is only returned in this response. Store it securely.

### Update webhook

```
PATCH /api/webhooks/:id
```

Partially update a webhook. Only provided fields are updated. The `id`, `secret`, and `createdAt` fields are preserved.

**Request body example:**

```json
{
  "active": false,
  "description": "Analytics ingestion (paused for maintenance)"
}
```

**Event validation:** If you update the `events` array, all event types must be valid. Invalid events return a `400 Bad Request` with error code `INVALID_EVENTS`.

**Response:** `200 OK` with the updated webhook (secret redacted).

**Error:** `404 Not Found` with error code `NOT_FOUND` if the webhook does not exist.

### Delete webhook

```
DELETE /api/webhooks/:id
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "wh_a1b2c3d4",
    "deleted": true
  }
}
```

**Error:** `404 Not Found` with error code `NOT_FOUND` if the webhook does not exist.

## Examples

### Subscribe to all task events

```bash
curl -X POST http://localhost:3000/api/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://ci.example.com/hooks/symphony",
    "events": ["task.created", "task.updated", "task.deleted"],
    "description": "CI pipeline integration"
  }'
```

### Subscribe to all events with wildcard

```bash
curl -X POST http://localhost:3000/api/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://audit.example.com/events",
    "events": ["*"],
    "description": "Audit log — receives all events"
  }'
```

### Filter active webhooks subscribed to task creation

```bash
curl "http://localhost:3000/api/webhooks?active=true&event=task.created"
```

This returns both webhooks explicitly subscribed to `task.created` and those subscribed to `*` (wildcard).

### Pause a webhook temporarily

```bash
curl -X PATCH http://localhost:3000/api/webhooks/wh_01 \
  -H "Content-Type: application/json" \
  -d '{"active": false}'
```
