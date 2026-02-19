---
id: activity-log-api
title: Activity Log API
sidebar_label: Activity Log API
sidebar_position: 17
---

# Activity Log API

The Activity Log API provides an **append-only audit trail** of all actions across the Symphony system. It records events like task creation, milestone completion, project updates, and webhook registration, enabling compliance, debugging, and analytics use cases.

## Design principles

- **Append-only**: No update (PATCH/PUT) or delete operations — audit logs are immutable once created.
- **Newest first**: All list responses are sorted by `timestamp` in descending order.
- **Rich filtering**: Query by action type, actor, resource type, resource ID, and time ranges.
- **Pagination support**: Use `?limit=` to control result size while maintaining access to the full count via the `total` field.

## Data model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `act_a1b2c3d4`) |
| `action` | `string` | Structured action type (e.g. `task.status_changed`, `milestone.reached`) |
| `actor` | `string` | Username or system identifier that performed the action |
| `resourceType` | `string` | Type of resource affected (e.g. `task`, `project`, `milestone`) |
| `resourceId` | `string` | ID of the affected resource (e.g. `task_01`) |
| `summary` | `string` | Human-readable description of the action |
| `metadata` | `object` | Additional context (e.g. `{"from": "todo", "to": "done"}`) |
| `timestamp` | `string` | ISO 8601 timestamp when the action occurred |

### Common action types

| Action | Example resource types | Description |
|---|---|---|
| `*.created` | `task`, `project`, `comment`, `webhook` | Resource created |
| `*.updated` | `project`, `task` | Resource modified |
| `*.deleted` | `task`, `comment` | Resource removed |
| `*.status_changed` | `task` | Status transition |
| `*.assigned` | `task` | Assignment changed |
| `milestone.reached` | `milestone` | Milestone marked as complete |
| `sprint.started` | `sprint` | Sprint initiated |
| `sprint.completed` | `sprint` | Sprint finished |

The `metadata` field captures action-specific details. For example:
- `task.status_changed` includes `{"from": "todo", "to": "done"}`
- `webhook.created` includes `{"events": ["task.created", "task.updated"]}`
- `milestone.reached` includes `{"projectId": "proj_01"}`

## Endpoints

### List activity log entries

```
GET /api/activity-log
```

Returns activities sorted newest-first.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `action` | `string` | Filter to specific action type (e.g. `milestone.reached`) |
| `actor` | `string` | Filter by username/actor (e.g. `alice`) |
| `resourceType` | `string` | Filter by resource type (e.g. `task`, `project`) |
| `resourceId` | `string` | Filter by specific resource ID (e.g. `task_01`) |
| `since` | `string` | ISO 8601 timestamp — only include activities at or after this time |
| `until` | `string` | ISO 8601 timestamp — only include activities at or before this time |
| `limit` | `number` | Maximum number of results to return |

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "act_09",
      "action": "task.deleted",
      "actor": "charlie",
      "resourceType": "task",
      "resourceId": "task_99",
      "summary": "charlie deleted a deprecated task",
      "metadata": {},
      "timestamp": "2026-02-15T11:00:00Z"
    },
    {
      "id": "act_05",
      "action": "project.updated",
      "actor": "bob",
      "resourceType": "project",
      "resourceId": "proj_04",
      "summary": "bob updated project \"Data Pipeline Overhaul\"",
      "metadata": { "fields": ["description"] },
      "timestamp": "2026-02-10T09:20:00Z"
    }
  ],
  "count": 2,
  "total": 10
}
```

- `count`: Number of entries in this response (respects `limit`)
- `total`: Total number of matching entries before `limit` applied

### Get single activity entry

```
GET /api/activity-log/:id
```

**Response:** `200 OK` with the activity object.

**Error:** `404 Not Found` with error code `NOT_FOUND` if the entry does not exist.

### Create activity entry

```
POST /api/activity-log
```

Records a new activity. The `id` is auto-generated and `timestamp` is set to the current server time.

**Request body:**

```json
{
  "action": "task.status_changed",
  "actor": "alice",
  "resourceType": "task",
  "resourceId": "task_01",
  "summary": "alice changed task status from todo to done",
  "metadata": { "from": "todo", "to": "done" }
}
```

| Field | Required | Default |
|---|---|---|
| `action` | yes | — |
| `actor` | yes | — |
| `resourceType` | yes | — |
| `resourceId` | yes | — |
| `summary` | no | `""` |
| `metadata` | no | `{}` |

**Response:** `201 Created`

```json
{
  "data": {
    "id": "act_a1b2c3d4",
    "action": "task.status_changed",
    "actor": "alice",
    "resourceType": "task",
    "resourceId": "task_01",
    "summary": "alice changed task status from todo to done",
    "metadata": { "from": "todo", "to": "done" },
    "timestamp": "2026-02-19T10:15:32Z"
  }
}
```

**Note:** There is no update (PATCH/PUT) or delete operation for activity log entries. Once created, they are immutable.

## Examples

### List all activities (newest first)

```bash
curl http://localhost:3000/api/activity-log
```

### Filter by actor

```bash
curl "http://localhost:3000/api/activity-log?actor=alice"
```

Returns all activities performed by user `alice`.

### Filter by action type

```bash
curl "http://localhost:3000/api/activity-log?action=milestone.reached"
```

Returns only milestone completion events.

### Filter by resource

```bash
curl "http://localhost:3000/api/activity-log?resourceType=task&resourceId=task_01"
```

Returns all activities related to task `task_01`.

### Time range query

```bash
curl "http://localhost:3000/api/activity-log?since=2026-01-01T00:00:00Z&until=2026-01-31T23:59:59Z"
```

Returns activities that occurred in January 2026.

### Limit results

```bash
curl "http://localhost:3000/api/activity-log?limit=5"
```

Returns the 5 most recent activities. The `total` field in the response shows how many activities exist in total.

### Create an activity log entry

```bash
curl -X POST http://localhost:3000/api/activity-log \
  -H "Content-Type: application/json" \
  -d '{
    "action": "project.created",
    "actor": "alice",
    "resourceType": "project",
    "resourceId": "proj_10",
    "summary": "alice created project \"Mobile App Redesign\"",
    "metadata": { "template": "agile" }
  }'
```

## Use cases

### Compliance and audit trails

Query all actions within a specific time period for compliance reporting:

```bash
curl "http://localhost:3000/api/activity-log?since=2026-01-01T00:00:00Z&until=2026-03-31T23:59:59Z"
```

### User activity tracking

Monitor all actions by a specific user:

```bash
curl "http://localhost:3000/api/activity-log?actor=alice"
```

### Resource history

View the complete history of a specific resource:

```bash
curl "http://localhost:3000/api/activity-log?resourceType=task&resourceId=task_01"
```

### Event-driven integrations

After performing an action through the API (e.g. creating a task), log it to the activity trail:

```bash
# 1. Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "New feature", "status": "todo"}'

# 2. Log the activity
curl -X POST http://localhost:3000/api/activity-log \
  -H "Content-Type: application/json" \
  -d '{
    "action": "task.created",
    "actor": "alice",
    "resourceType": "task",
    "resourceId": "task_15",
    "summary": "alice created task \"New feature\""
  }'
```
