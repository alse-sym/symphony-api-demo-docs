---
id: authentication
title: Authentication
sidebar_label: Authentication
sidebar_position: 8
---

# Authentication

The Symphony API Demo ships **without authentication** to keep the focus on API design and automation workflows. All endpoints are publicly accessible.

## Adding authentication

If you are extending the demo for production use, here are recommended patterns for securing the API.

### Bearer token (API key)

The simplest approach: clients send a static or per-user token in the `Authorization` header.

```
Authorization: Bearer <token>
```

Implementation sketch for Express middleware:

```javascript
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      error: { code: "UNAUTHORIZED", message: "Missing or invalid token" },
    });
  }
  const token = header.slice(7);
  if (token !== process.env.API_TOKEN) {
    return res.status(403).json({
      error: { code: "FORBIDDEN", message: "Invalid token" },
    });
  }
  next();
}
```

Mount it before your route handlers:

```javascript
app.use("/api/projects", requireAuth, projectsRouter);
app.use("/api/tasks", requireAuth, tasksRouter);
app.use("/api/teams", requireAuth, teamsRouter);
```

### JWT (JSON Web Tokens)

For user-specific authentication and role-based access:

1. Issue a JWT at login (`POST /api/auth/login`).
2. Verify the JWT on every protected request.
3. Decode the payload to determine the user's permissions.

Libraries like `jsonwebtoken` integrate easily with Express.

### OAuth 2.0

For third-party integrations, consider an OAuth 2.0 flow using a provider like Auth0 or your own authorization server. The API would validate access tokens against the provider's JWKS endpoint.

## Health endpoint

The `GET /api/health` endpoint is always unauthenticated regardless of which scheme you add. Load balancers and monitoring tools need to reach it without credentials.
