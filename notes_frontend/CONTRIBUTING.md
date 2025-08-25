# Contributing to Notes Frontend

## Setup
1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_BACKEND_URL`.
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

## Code Style
- TypeScript strict mode is enabled; avoid `any`.
- Keep UI modern and minimal. Use theme CSS variables from `globals.css`.

## Project Structure
- `src/app` – Next.js App Router pages
- `src/components` – UI components
- `src/lib/api.ts` – REST API client

## API Contract
The frontend expects:
- GET/POST `/api/notes`
- GET/PUT/DELETE `/api/notes/:id`

Responses should be JSON with fields: `id`, `title`, `content`, `createdAt`, `updatedAt`.

## Running Lint
- `npm run lint`

## Build
- `npm run build`
- App is configured with `output: "export"` for static export.
