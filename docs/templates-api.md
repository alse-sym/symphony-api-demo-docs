---
id: templates-api
title: Templates API
sidebar_label: Templates API
sidebar_position: 17
---

# Templates API

The Templates API provides reusable project blueprints that contain pre-defined task lists and milestones. Templates allow teams to standardize workflows across similar projects and quickly bootstrap new work with proven structures.

## Data model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `tmpl_a1b2c3d4`) |
| `name` | `string` | Template name |
| `description` | `string` | Brief description of the template's purpose |
| `category` | `string` | Template category (e.g. `web`, `mobile`, `data`, `infra`, `general`) |
| `tasks` | `object[]` | Array of pre-defined tasks |
| `milestones` | `object[]` | Array of pre-defined milestones |
| `createdAt` | `string` | ISO 8601 creation timestamp |
| `updatedAt` | `string` | ISO 8601 last-update timestamp |

### Task object structure

Each task in the `tasks` array contains:

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Task title |
| `priority` | `string` | Priority level (`high`, `medium`, `low`) |
| `description` | `string` | Detailed task description |

### Milestone object structure

Each milestone in the `milestones` array contains:

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Milestone title |
| `status` | `string` | Status (`pending`, `active`, `completed`) |

### Categories

Templates are organized by category:

| Category | Description |
|---|---|
| `web` | Web application projects |
| `mobile` | Mobile application projects |
| `data` | Data pipeline and ETL projects |
| `infra` | Infrastructure and migration projects |
| `general` | General-purpose templates |

## Endpoints

### List templates

````
GET /api/templates
````

Returns a summary view with task and milestone counts. The full `tasks` and `milestones` arrays are replaced by `taskCount` and `milestoneCount` for efficiency.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `category` | `string` | Filter by category (e.g. `web`, `mobile`) |

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "tmpl_01",
      "name": "Web App Kickstart",
      "description": "Standard template for new web application projects with design, build, and deploy phases.",
      "category": "web",
      "taskCount": 5,
      "milestoneCount": 2,
      "createdAt": "2025-10-01T08:00:00Z",
      "updatedAt": "2025-10-01T08:00:00Z"
    }
  ],
  "count": 1
}
```

### Get template

````
GET /api/templates/:id
````

Returns the full template including complete `tasks` and `milestones` arrays.

**Response:** `200 OK`

```json
{
  "data": {
    "id": "tmpl_01",
    "name": "Web App Kickstart",
    "description": "Standard template for new web application projects with design, build, and deploy phases.",
    "category": "web",
    "tasks": [
      {
        "title": "Create wireframes",
        "priority": "high",
        "description": "Design low-fidelity wireframes for core screens."
      },
      {
        "title": "Set up CI/CD pipeline",
        "priority": "medium",
        "description": "Configure automated build, test, and deploy."
      },
      {
        "title": "Build responsive layout",
        "priority": "high",
        "description": "Implement mobile-first responsive design."
      },
      {
        "title": "Write integration tests",
        "priority": "medium",
        "description": "Cover critical user flows with integration tests."
      },
      {
        "title": "Deploy to staging",
        "priority": "low",
        "description": "Push first build to staging environment."
      }
    ],
    "milestones": [
      {
        "title": "Design Phase Complete",
        "status": "pending"
      },
      {
        "title": "MVP Launch",
        "status": "pending"
      }
    ],
    "createdAt": "2025-10-01T08:00:00Z",
    "updatedAt": "2025-10-01T08:00:00Z"
  }
}
```

**Error:** `404 Not Found` with error code `NOT_FOUND` if the template does not exist.

### Create template

````
POST /api/templates
````

Create a new template with custom tasks and milestones.

**Request body:**

```json
{
  "name": "Backend Microservice",
  "description": "Template for new REST API microservices",
  "category": "web",
  "tasks": [
    {
      "title": "Define API contract",
      "priority": "high",
      "description": "Write OpenAPI specification"
    },
    {
      "title": "Implement endpoints",
      "priority": "high",
      "description": "Build REST handlers and validation"
    },
    {
      "title": "Add monitoring",
      "priority": "medium",
      "description": "Integrate with observability platform"
    }
  ],
  "milestones": [
    {
      "title": "API Complete",
      "status": "pending"
    },
    {
      "title": "Production Ready",
      "status": "pending"
    }
  ]
}
```

| Field | Required | Default |
|---|---|---|
| `name` | yes | — |
| `description` | no | `""` |
| `category` | no | `general` |
| `tasks` | no | `[]` |
| `milestones` | no | `[]` |

**Response:** `201 Created`

```json
{
  "data": {
    "id": "tmpl_a1b2c3d4",
    "name": "Backend Microservice",
    "description": "Template for new REST API microservices",
    "category": "web",
    "tasks": [
      {
        "title": "Define API contract",
        "priority": "high",
        "description": "Write OpenAPI specification"
      },
      {
        "title": "Implement endpoints",
        "priority": "high",
        "description": "Build REST handlers and validation"
      },
      {
        "title": "Add monitoring",
        "priority": "medium",
        "description": "Integrate with observability platform"
      }
    ],
    "milestones": [
      {
        "title": "API Complete",
        "status": "pending"
      },
      {
        "title": "Production Ready",
        "status": "pending"
      }
    ],
    "createdAt": "2026-02-19T10:00:00Z",
    "updatedAt": "2026-02-19T10:00:00Z"
  }
}
```

The `id` is auto-generated with the format `tmpl_<8-char-uuid>`.

### Update template

````
PATCH /api/templates/:id
````

Partially update a template. Only provided fields are updated. The `id` and `createdAt` fields are preserved.

**Request body example:**

```json
{
  "description": "Updated description for backend microservices",
  "tasks": [
    {
      "title": "Define API contract",
      "priority": "high",
      "description": "Write OpenAPI 3.1 specification"
    }
  ]
}
```

**Response:** `200 OK` with the updated template.

**Error:** `404 Not Found` with error code `NOT_FOUND` if the template does not exist.

### Delete template

````
DELETE /api/templates/:id
````

**Response:** `200 OK`

```json
{
  "data": {
    "id": "tmpl_a1b2c3d4",
    "deleted": true
  }
}
```

**Error:** `404 Not Found` with error code `NOT_FOUND` if the template does not exist.

## Examples

### List all templates

```bash
curl http://localhost:3000/api/templates
```

### Filter templates by category

```bash
curl "http://localhost:3000/api/templates?category=web"
```

This returns only templates with `"category": "web"`.

### Get a complete template with tasks and milestones

```bash
curl http://localhost:3000/api/templates/tmpl_01
```

### Create a custom template

```bash
curl -X POST http://localhost:3000/api/templates \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Data Science Project",
    "description": "Template for ML model development",
    "category": "data",
    "tasks": [
      {
        "title": "Exploratory data analysis",
        "priority": "high",
        "description": "Analyze dataset characteristics"
      },
      {
        "title": "Train baseline model",
        "priority": "high",
        "description": "Establish performance baseline"
      }
    ],
    "milestones": [
      {
        "title": "Model Training Complete",
        "status": "pending"
      }
    ]
  }'
```

### Update a template's category

```bash
curl -X PATCH http://localhost:3000/api/templates/tmpl_01 \
  -H "Content-Type: application/json" \
  -d '{"category": "infra"}'
```

### Delete a template

```bash
curl -X DELETE http://localhost:3000/api/templates/tmpl_01
```

## Usage patterns

### Using templates to bootstrap projects

When creating a new project, you can fetch a template and use its task and milestone structures:

1. `GET /api/templates?category=web` — find relevant templates
2. `GET /api/templates/:id` — retrieve full template details
3. Use the `tasks` and `milestones` arrays as blueprints for your project
4. Create actual tasks and milestones via the Tasks and Milestones APIs, adapting the template data as needed

Templates are blueprints only — they don't create resources automatically. Use them as a starting point to populate your project's actual task list and milestone roadmap.
