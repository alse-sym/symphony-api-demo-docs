---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 3
---

# Installation

## Clone the repository

```bash
git clone https://github.com/alse-sym/symphony-api-demo.git
cd symphony-api-demo
```

## Install dependencies

```bash
npm install
```

This installs Express, CORS middleware, and the UUID library. There are no native modules or build steps.

## Start the server

```bash
npm start
```

The server starts on port `3000` by default. You should see:

```
Symphony API listening on http://localhost:3000
```

### Custom port

Set the `PORT` environment variable to use a different port:

```bash
PORT=8080 npm start
```

### Development mode

Node.js 22+ includes a built-in watch mode. During development, use:

```bash
npm run dev
```

The server restarts automatically when you save a file in `src/`.

## Verify the installation

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2026-02-18T12:00:00.000Z"
}
```

## Project layout

```
symphony-api-demo/
  src/
    index.js              Express entry point
    routes/
      projects.js         /api/projects endpoints
      tasks.js            /api/tasks endpoints
      teams.js            /api/teams endpoints
    data/
      projects.json       Seed data — 5 projects
      tasks.json          Seed data — 10 tasks
      teams.json          Seed data — 3 teams
    middleware/
      error-handler.js    Centralized error responses
  package.json
  README.md
```
