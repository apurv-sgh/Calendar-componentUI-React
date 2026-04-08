# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### 3D Interactive Calendar (`artifacts/calendar-3d`)
- **Type**: React + Vite web app
- **Preview path**: `/`
- **Tech**: React Three Fiber, Three.js, Drei, Zustand, Framer Motion, Tailwind CSS
- **Features**:
  - 3D animated background scene (floating rings, particles) via Three.js/R3F
  - Wall calendar aesthetic with hero image per month, spiral binding, blue chevron design
  - Month-to-month navigation with flip animation
  - Date range selector (click start → click end, visual highlight states)
  - Integrated notes system (per-day, per-range, per-month) with localStorage persistence
  - Selection info badge (days count, date range label)
  - Month quick-nav bar + year navigation
  - Light/dark theme toggle
  - Hover tilt effect on calendar card (CSS perspective)
  - Responsive layout (stacked on mobile, side-by-side on desktop)
  - WebGL with CSS fallback for environments without GPU support

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
