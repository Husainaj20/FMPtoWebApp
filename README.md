# Gov App v3

This repository contains a modernized prototype of a government project management dashboard. It now includes a minimal backend to support future API endpoints while keeping the current static frontend intact.

## Project structure

- `index.html` – Main page markup that assembles the layout and content.
- `styles.css` – Styling for layout, typography, and responsive behavior.
- `script.js` – JavaScript that powers interactions and data handling.
- `server/index.js` – Express server with a health check and placeholder API route.
- `.env.example` – Example environment variables for local development.

## Quick start (local dev)

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file based on `.env.example`

```bash
cp .env.example .env
# Optionally update PORT and CORS_ORIGIN values
```

3. Start both frontend and backend in parallel

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Health check: http://localhost:4000/health

You can also run them separately:

```bash
npm run start:frontend
npm run start:server
```

## Deployment notes

- The backend expects environment variables (`PORT`, `CORS_ORIGIN`).
- For production, use `npm start` to run `server/index.js` with Node.

## Contributing

Pull requests are welcome. Keep changes focused on improving clarity, reliability, or enabling backend integration.
