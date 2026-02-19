---
id: release-notes
title: Release Notes
sidebar_label: Release Notes
sidebar_position: 16
---

# Release Notes

This page tracks changes across Symphony API releases. Release notes are generated automatically by the [Release Notes Automation](https://github.com/alse-sym/symphony-api-demo/actions) workflow using gh-aw and Claude.

## v1.0.0

**Initial release**

### Highlights

- Express-based REST API with 13 endpoints for projects, tasks, and teams.
- In-memory data store with pre-populated seed data.
- CORS enabled by default.
- Centralized JSON error handling.

### Breaking Changes

None (initial release).

### Enhancements

- `GET /api/projects` supports `?status=` filtering.
- `GET /api/tasks` supports `?projectId=`, `?assignee=`, and `?status=` filtering.
- `GET /api/teams` returns a compact summary with `memberCount`; full members available via `GET /api/teams/:id`.

### Fixes

None (initial release).

### Upgrade Notes

No prior version to upgrade from.
