---
id: index
title: Symphony API Documentation
sidebar_label: Home
slug: /
sidebar_position: 1
---

# Symphony API Documentation

Symphony is a project management REST API built with Node.js and Express. It provides endpoints for managing projects, tasks, and teams with an in-memory data store designed for demos and prototyping.

## What is Symphony API?

Symphony exposes a clean JSON API for common project management operations — creating projects, assigning tasks, organizing teams — without requiring a database. All data lives in memory and resets on restart, making it ideal for testing automation pipelines and front-end prototypes.

**Key characteristics:**

- **RESTful** — standard HTTP methods and status codes; predictable URL patterns
- **Zero dependencies on infrastructure** — no database, no message queue, no external services
- **Mocked seed data** — ships with realistic projects, tasks, and teams out of the box
- **Automation-ready** — paired with gh-aw workflows for automated docs sync and release notes

## Quick navigation

| Section | Description |
|---|---|
| [Getting Started](./getting-started.md) | Docs structure, versioning, and automation overview |
| [Installation](./installation.md) | Clone, install, and run the API server |
| [Quickstart](./quickstart.md) | Make your first API call in under 5 minutes |

## Where to go next

- New to Symphony? Start with [Getting Started](./getting-started.md).
- Ready to install? Jump to [Installation](./installation.md).
- Already running? Try the [Quickstart](./quickstart.md).
