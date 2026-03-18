# React Micro-Frontend Monorepo

A monorepo built with **NX**, **React**, and **Webpack Module Federation** supporting **dynamic remote loading**.

## Architecture

```
monorepo/
├── apps/
│   ├── shell/       # Host application — loads remotes dynamically
│   ├── remote1/     # Products Catalogue micro-frontend (port 4201)
│   └── remote2/     # Analytics Dashboard micro-frontend (port 4202)
└── libs/
    └── ui/          # Publishable shared UI component library (@monorepo/ui)
```

## Apps

| App | Port | Description |
|-----|------|-------------|
| **shell** | 4200 | Host application — dynamic module federation shell |
| **remote1** | 4201 | Products Catalogue — Home, Products list, Product detail |
| **remote2** | 4202 | Analytics Dashboard — Dashboard overview, Settings |

## UI Library (`@monorepo/ui`)

Shared component library published as an npm package.

| Component | Description |
|-----------|-------------|
| `Button` | Button with primary / secondary / danger variants |
| `Card` | Content card with title, description, body and footer slots |
| `Header` | Page header with gradient background and action slot |
| `NavLink` | Router-aware navigation link with active state |

## Getting Started

### Install dependencies

```bash
npm install
```

### Serve all apps (development)

```bash
# Serve all apps simultaneously
npx nx run-many -t serve --parallel=3

# Or serve individually
npx nx serve shell    # http://localhost:4200
npx nx serve remote1  # http://localhost:4201
npx nx serve remote2  # http://localhost:4202
```

### Dynamic Remote Loading

The shell app loads remote URLs from `apps/shell/src/assets/module-federation.manifest.json`.
Update this file to point to your deployed remote URLs:

```json
{
  "remote1": "http://localhost:4201/remoteEntry.js",
  "remote2": "http://localhost:4202/remoteEntry.js"
}
```

### Build

```bash
npx nx build shell    # Production build of shell
npx nx build remote1  # Production build of remote1
npx nx build remote2  # Production build of remote2
npx nx build ui       # Build the UI library
```

### Test

```bash
npx nx run-many -t test --parallel=3
```

### Lint

```bash
npx nx run-many -t lint --parallel=3
```

## CI/CD (GitHub Actions)

| Workflow | Trigger | Description |
|----------|---------|-------------|
| `ci.yml` | Push / PR to `main` | Lint, type-check, build, and test all projects |
| `release-shell.yml` | Tag `shell-v*` | Build and release the Shell app |
| `release-remote1.yml` | Tag `remote1-v*` | Build and release Remote App 1 |
| `release-remote2.yml` | Tag `remote2-v*` | Build and release Remote App 2 |
| `publish-ui.yml` | Tag `ui-v*` | Build and publish `@monorepo/ui` to npm |

### Releasing an app

Each application is released independently by pushing a version tag:

```bash
# Release shell app
git tag shell-v1.0.0 && git push origin shell-v1.0.0

# Release remote1
git tag remote1-v1.0.0 && git push origin remote1-v1.0.0

# Release remote2
git tag remote2-v1.0.0 && git push origin remote2-v1.0.0

# Publish UI library
git tag ui-v1.0.0 && git push origin ui-v1.0.0
```

### Required secrets

| Secret | Required for | Description |
|--------|-------------|-------------|
| `NPM_TOKEN` | `publish-ui.yml` | npm auth token for publishing `@monorepo/ui` |
