---
id: api-overview
title: API Overview
sidebar_label: API Overview
sidebar_position: 7
---

# API Overview

The Symphony API is a RESTful JSON API served over HTTP. This page describes the conventions that apply to all endpoints.

## Base URL

```
http://localhost:3000/api
```

All resource endpoints are prefixed with `/api`. The health check is available at `GET /api/health`.

## Content type

- **Requests** with a body must send `Content-Type: application/json`.
- **Responses** always return `Content-Type: application/json`.

## HTTP methods

| Method | Semantics |
|---|---|
| `GET` | Retrieve a resource or a list of resources |
| `POST` | Create a new resource |
| `PUT` | Replace a resource entirely |
| `PATCH` | Partially update a resource |
| `DELETE` | Remove a resource |

## Response envelope

### Success — single resource

```json
{
  "data": { "id": "proj_01", "name": "Website Redesign", "..." : "..." }
}
```

### Success — collection

```json
{
  "data": [ { "id": "proj_01", "..." : "..." } ],
  "count": 5
}
```

### Error

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Project proj_99 not found"
  }
}
```

## Status codes

| Code | Meaning |
|---|---|
| `200` | Successful read or update |
| `201` | Resource created |
| `404` | Resource not found |
| `500` | Unexpected server error |

## CORS

Cross-Origin Resource Sharing is enabled for all origins by default (`cors()` middleware with no restrictions). In a production deployment you would restrict this to your frontend's domain.

## Endpoint summary

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/projects` | List projects |
| `POST` | `/api/projects` | Create project |
| `GET` | `/api/projects/:id` | Get project |
| `PUT` | `/api/projects/:id` | Update project |
| `DELETE` | `/api/projects/:id` | Delete project |
| `GET` | `/api/tasks` | List tasks |
| `POST` | `/api/tasks` | Create task |
| `GET` | `/api/tasks/:id` | Get task |
| `PATCH` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |
| `GET` | `/api/teams` | List teams |
| `POST` | `/api/teams` | Create team |
| `GET` | `/api/teams/:id` | Get team |
| `GET` | `/api/milestones` | List milestones |
| `POST` | `/api/milestones` | Create milestone |
| `GET` | `/api/milestones/:id` | Get milestone |
| `PATCH` | `/api/milestones/:id` | Update milestone |
| `DELETE` | `/api/milestones/:id` | Delete milestone |
