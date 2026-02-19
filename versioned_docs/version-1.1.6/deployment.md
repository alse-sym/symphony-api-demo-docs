---
id: deployment
title: Deployment
sidebar_label: Deployment
sidebar_position: 14
---

# Deployment

This guide covers how to deploy the Symphony API Demo to various environments.

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the HTTP server listens on |

## Docker

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src/ src/
EXPOSE 3000
CMD ["node", "src/index.js"]
```

Build and run:

```bash
docker build -t symphony-api .
docker run -p 3000:3000 symphony-api
```

## Railway / Render / Fly.io

All three platforms auto-detect Node.js projects. Push the repository and configure:

1. **Build command:** `npm install`
2. **Start command:** `npm start`
3. **Port:** set the `PORT` environment variable (Railway and Render do this automatically).

## GitHub Actions (CI)

A minimal CI workflow to test that the server starts:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: |
          node src/index.js &
          sleep 2
          curl -f http://localhost:3000/api/health
          kill %1
```

## Production considerations

Since the Symphony API uses in-memory data:

- **Data does not persist** across restarts. For a production version, replace the in-memory arrays with a database (PostgreSQL, SQLite, MongoDB).
- **No horizontal scaling** — each process holds its own copy of the data. Use a shared data store if you run multiple instances.
- **No rate limiting** — consider adding `express-rate-limit` for public deployments.
- **No HTTPS** — terminate TLS at a reverse proxy (nginx, Caddy) or let your hosting platform handle it.
