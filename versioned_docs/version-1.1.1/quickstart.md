---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
sidebar_position: 4
---

# Quickstart

This guide walks you through your first API calls in under five minutes. Make sure you have the server running (`npm start`) before proceeding.

## 1. Check the health endpoint

```bash
curl http://localhost:3000/api/health
```

```json
{
  "status": "ok",
  "timestamp": "2026-02-18T12:00:00.000Z"
}
```

## 2. List all projects

```bash
curl http://localhost:3000/api/projects
```

The response includes five seed projects:

```json
{
  "data": [
    {
      "id": "proj_01",
      "name": "Website Redesign",
      "status": "active",
      "teamId": "team_01"
    }
  ],
  "count": 5
}
```

## 3. Create a new task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "proj_01",
    "title": "Add dark mode support",
    "priority": "medium",
    "assignee": "alice"
  }'
```

```json
{
  "data": {
    "id": "task_a1b2c3d4",
    "projectId": "proj_01",
    "title": "Add dark mode support",
    "status": "todo",
    "priority": "medium",
    "assignee": "alice",
    "createdAt": "2026-02-18T12:01:00.000Z",
    "updatedAt": "2026-02-18T12:01:00.000Z"
  }
}
```

## 4. Filter tasks by assignee

```bash
curl "http://localhost:3000/api/tasks?assignee=alice"
```

Returns only tasks assigned to `alice`.

## 5. Update a task status

```bash
curl -X PATCH http://localhost:3000/api/tasks/task_01 \
  -H "Content-Type: application/json" \
  -d '{"status": "in_progress"}'
```

```json
{
  "data": {
    "id": "task_01",
    "status": "in_progress",
    "updatedAt": "2026-02-18T12:02:00.000Z"
  }
}
```

## 6. Get a team with its members

```bash
curl http://localhost:3000/api/teams/team_01
```

```json
{
  "data": {
    "id": "team_01",
    "name": "Platform Engineering",
    "members": [
      { "username": "charlie", "role": "lead" },
      { "username": "bob", "role": "engineer" },
      { "username": "eve", "role": "engineer" }
    ]
  }
}
```

## Next steps

- Read the full [API Overview](./api-overview.md) for conventions and patterns.
- Explore the [Projects API](./projects-api.md), [Tasks API](./tasks-api.md), and [Teams API](./teams-api.md) reference pages.
