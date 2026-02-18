---
id: errors
title: Error Handling
sidebar_label: Errors
sidebar_position: 9
---

# Error Handling

All errors from the Symphony API are returned in a consistent JSON envelope. This page describes the error format, common error codes, and how the error handling middleware works.

## Error response format

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Project proj_99 not found"
  }
}
```

| Field | Type | Description |
|---|---|---|
| `error.code` | `string` | Machine-readable error code |
| `error.message` | `string` | Human-readable description |

## HTTP status codes

| Status | Code | When it occurs |
|---|---|---|
| `404` | `NOT_FOUND` | A resource with the given ID does not exist |
| `500` | `INTERNAL_ERROR` | An unexpected server-side error occurred |

## Error codes

| Code | Description |
|---|---|
| `NOT_FOUND` | The requested resource does not exist in the data store |
| `INTERNAL_ERROR` | Catch-all for unhandled exceptions |

## How it works

The API uses two middleware functions defined in `src/middleware/error-handler.js`:

### `notFound` middleware

Mounted after all route handlers. If no route matched the request, this middleware creates a `404` error and passes it to the error handler.

### `errorHandler` middleware

The final middleware in the stack. It catches any error object (thrown or forwarded via `next(err)`) and sends a structured JSON response:

- Uses `err.status` for the HTTP status (defaults to `500`).
- Uses `err.code` for the machine-readable code (defaults to `INTERNAL_ERROR`).
- Uses `err.message` for the human-readable message.

## Client-side handling

When consuming the API, check the HTTP status code first. If the status is `4xx` or `5xx`, parse the `error` object from the response body:

```javascript
const res = await fetch("http://localhost:3000/api/projects/nonexistent");
if (!res.ok) {
  const { error } = await res.json();
  console.error(`[${error.code}] ${error.message}`);
}
```
