---
id: teams-api
title: Teams API
sidebar_label: Teams API
sidebar_position: 13
---

# Teams API

The Teams API manages teams and their membership. Teams provide an organizational grouping for people working on projects.

## Data model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `team_01`) |
| `name` | `string` | Team name |
| `description` | `string` | Team purpose / charter |
| `members` | `array` | List of team members |
| `members[].username` | `string` | Member's username |
| `members[].role` | `string` | Role within the team (e.g. `lead`, `engineer`, `designer`) |
| `createdAt` | `string` | ISO 8601 creation timestamp |

## Endpoints

### List teams

```
GET /api/teams
```

Returns all teams in summary form. The `members` array is replaced with a `memberCount` integer to keep the response compact.

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "team_01",
      "name": "Platform Engineering",
      "description": "Owns infrastructure, CI/CD, and developer experience.",
      "createdAt": "2025-06-01T08:00:00Z",
      "memberCount": 3
    }
  ],
  "count": 3
}
```

### Get team

```
GET /api/teams/:id
```

Returns the full team object including the `members` array.

**Response:** `200 OK`

```json
{
  "data": {
    "id": "team_01",
    "name": "Platform Engineering",
    "description": "Owns infrastructure, CI/CD, and developer experience.",
    "members": [
      { "username": "charlie", "role": "lead" },
      { "username": "bob", "role": "engineer" },
      { "username": "eve", "role": "engineer" }
    ],
    "createdAt": "2025-06-01T08:00:00Z"
  }
}
```

**Error:** `404 Not Found` if the team does not exist.

### Create team

```
POST /api/teams
```

**Request body:**

```json
{
  "name": "QA Team",
  "description": "Quality assurance and test automation",
  "members": [
    { "username": "frank", "role": "lead" },
    { "username": "grace", "role": "engineer" }
  ]
}
```

| Field | Required | Default |
|---|---|---|
| `name` | yes | — |
| `description` | no | `""` |
| `members` | no | `[]` |

**Response:** `201 Created` with the created team object.
