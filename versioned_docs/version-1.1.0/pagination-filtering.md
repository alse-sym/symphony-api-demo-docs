---
id: pagination-filtering
title: Pagination & Filtering
sidebar_label: Pagination & Filtering
sidebar_position: 10
---

# Pagination & Filtering

The Symphony API supports query-parameter-based filtering on list endpoints. This page describes the available filters for each resource.

## Response shape for collections

All list endpoints return the same envelope:

```json
{
  "data": [ ... ],
  "count": 5
}
```

`count` reflects the number of items in `data` after filtering.

## Projects

### `GET /api/projects`

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Filter by project status: `planned`, `active`, or `completed` |

**Examples:**

```bash
# All active projects
curl "http://localhost:3000/api/projects?status=active"

# All completed projects
curl "http://localhost:3000/api/projects?status=completed"
```

## Tasks

### `GET /api/tasks`

| Parameter | Type | Description |
|---|---|---|
| `projectId` | `string` | Filter tasks belonging to a specific project |
| `assignee` | `string` | Filter tasks by assignee username |
| `status` | `string` | Filter by task status: `todo`, `in_progress`, or `done` |

Filters can be combined:

```bash
# All in-progress tasks for proj_01
curl "http://localhost:3000/api/tasks?projectId=proj_01&status=in_progress"

# All tasks assigned to alice
curl "http://localhost:3000/api/tasks?assignee=alice"
```

## Teams

### `GET /api/teams`

The teams list endpoint does not currently support query filters. It always returns all teams in summary form (without the full `members` array). To see members, fetch an individual team with `GET /api/teams/:id`.

## Pagination

The current version of Symphony API does not implement offset/limit pagination. All matching records are returned in a single response. For production use, you would add `offset` and `limit` query parameters and slice the data array accordingly:

```bash
# Future pagination pattern
curl "http://localhost:3000/api/tasks?offset=0&limit=20"
```
