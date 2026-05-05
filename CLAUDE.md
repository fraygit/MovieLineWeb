# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                          # Dev server at http://localhost:4200/ (hot reload)
npm run build                      # Production build
npm run watch                      # Continuous dev build (no server)
npm test                           # Unit tests via Karma/Jasmine
npm run serve:ssr:movie-line-web   # SSR server at port 4000 (requires build first)
```

No linting configuration is set up yet. TypeScript strict mode provides static analysis.

## Architecture

**Angular 20 standalone app with SSR.** No NgModules — everything uses standalone components and the new inject-based API.

### Entry points

| File | Purpose |
|---|---|
| `src/main.ts` | Client bootstrap |
| `src/main.server.ts` | Server bootstrap |
| `src/server.ts` | Express server (serves built assets + SSR via `@angular/ssr`) |

### App config split

- `src/app/app.config.ts` — client config (hydration with event replay, zone.js coalescing)
- `src/app/app.config.server.ts` — server config (merges client config + server providers)

### Routing

- `src/app/app.routes.ts` — client routes (currently empty)
- `src/app/app.routes.server.ts` — SSR routes (prerender `**`)

### SSR behavior

The Express server in `src/server.ts` serves static files from `dist/movie-line-web/browser/` with a 1-year cache, and falls through to Angular SSR for all other requests. The SSR port defaults to `4000` but respects the `PORT` env var.

### Styling

SCSS throughout. Global styles in `src/styles.scss`; component-level styles as `.scss` files alongside each component.
