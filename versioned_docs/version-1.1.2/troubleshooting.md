---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 15
---

# Troubleshooting

Common issues and their solutions when running the Symphony API Demo.

## Server won't start

### `Error: Cannot find module 'express'`

Dependencies are not installed. Run:

```bash
npm install
```

### `Error: listen EADDRINUSE: address already in use :::3000`

Another process is using port 3000. Either stop the other process or start Symphony on a different port:

```bash
PORT=3001 npm start
```

To find what is using port 3000:

```bash
lsof -i :3000
```

## Endpoints return unexpected data

### Data was modified but reverted after restart

This is expected behavior. The API uses in-memory data loaded from JSON seed files. All mutations are lost when the server restarts. If you need persistence, connect a database.

### Filter query parameters are ignored

Make sure you are spelling the parameter names exactly as documented:

- `/api/projects?status=active` (not `?state=active`)
- `/api/tasks?projectId=proj_01` (not `?project_id=proj_01`)
- `/api/tasks?assignee=alice` (not `?assigned_to=alice`)

## CORS errors in the browser

The API enables CORS for all origins by default. If you still see CORS errors:

1. Verify the server is running and reachable.
2. Check that your request URL matches the server's host and port exactly.
3. If you have added custom CORS configuration, ensure the frontend's origin is allowed.

## JSON body not parsed

Make sure your request includes the `Content-Type: application/json` header:

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'
```

Without the header, Express will not parse the body and `req.body` will be `undefined`.

## gh-aw workflow issues

### Docs sync workflow did not trigger

The PR Documentation Sync workflow triggers on `pull_request` events for the `develop` and `main` branches. Verify:

1. The PR targets `develop` or `main`.
2. The PR event type is `opened`, `reopened`, `synchronize`, or `ready_for_review`.
3. The `ANTHROPIC_API_KEY` and `CROSS_REPO_PAT` secrets are configured.

### Release notes not generated

The Release Notes Automation workflow triggers on `release.published`. Verify:

1. You published a release (not just a tag).
2. The `ANTHROPIC_API_KEY` secret is set.
3. Check the Actions tab for workflow run logs.

### Lock files out of date

After editing a `.md` workflow file's frontmatter, re-compile:

```bash
gh aw compile .github/workflows/docs-sync-to-symphony-docs.md
gh aw compile .github/workflows/release-notes-from-gh-aw.md
```

Commit both the `.md` and `.lock.yml` files.
