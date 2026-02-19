---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
sidebar_position: 2
---

# Getting Started

This page explains how the Symphony API documentation is organized, how versioning works, and how the automated documentation pipeline keeps everything in sync.

## Documentation structure

| Category | What you will find |
|---|---|
| **Start Here** | Overview, installation, and quickstart |
| **Core Concepts** | Architecture and module design |
| **API Fundamentals** | Authentication, errors, pagination |
| **API Reference** | Endpoint-by-endpoint documentation for projects, tasks, and teams |
| **Operations** | Deployment and troubleshooting guides |
| **Release Notes** | Changelog for each version |

## Versioning

This documentation site uses [Docusaurus versioned docs](https://docusaurus.io/docs/versioning). When a new release is published on the code repository, the automation pipeline snapshots the current docs into a versioned folder. You can switch between versions using the dropdown in the top-right corner of the navbar.

- `Next` always reflects the latest unreleased documentation.
- Numbered versions (e.g. `1.0.0`) are frozen snapshots that correspond to a GitHub Release.

## Automation pipeline

Documentation updates are driven by two gh-aw workflows in the [symphony-api-demo](https://github.com/alse-sym/symphony-api-demo) code repository:

1. **PR Documentation Sync** — when a pull request is opened or updated, a Claude agent reads the diff and creates a docs PR in this repository.
2. **Release Notes Automation** — when a GitHub Release is published, a Claude agent generates structured release notes and dispatches a version-cut event to this repository.

On the docs side, automation PRs are auto-merged and the site is deployed to GitHub Pages on every push to `main`.

## Prerequisites

To run the Symphony API locally you need:

- **Node.js** 20 or later
- **npm** (ships with Node.js)
- **Git**

No database or external service is required.
