# Notes Frontend

Minimalistic, light-themed Next.js app for managing notes with CRUD.

## Features
- Sidebar with searchable note list
- Main editor for viewing/editing selected note
- Create, update, delete notes
- REST API integration

## Environment Variables
Create a `.env.local` with:
- NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

The app expects the backend to provide these REST endpoints:
- GET    /api/notes
- POST   /api/notes
- GET    /api/notes/:id
- PUT    /api/notes/:id
- DELETE /api/notes/:id

## Development
- npm install
- npm run dev
Open http://localhost:3000

## Notes
- The favicon file is a placeholder text due to environment restrictions; replace `public/favicon.ico` with a real icon for production.
