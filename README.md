# Gov App v3

This repository contains a modernized prototype of a government project management dashboard. It now runs as a single server: Express serves the static frontend and the API from the same origin.

## Project structure

- `index.html` – Main page markup that assembles the layout and content.
- `styles.css` – Styling for layout, typography, and responsive behavior.
- `script.js` – JavaScript that powers interactions and data handling.
- `server/index.js` – Express server that serves the frontend and provides API routes.
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

3. Start the dev server (serves frontend and API on one port)

```bash
npm run predev && npm run dev
```

- App: http://localhost:4000
- API hello: http://localhost:4000/api/hello
- Health check: http://localhost:4000/health

## Deployment notes

- The server uses environment variables (`PORT`, `CORS_ORIGIN`). By default, the app is served from the same origin, so `CORS_ORIGIN` is typically not needed in development.
- For production, use `npm start` to run `server/index.js` with Node.

## Contributing

Pull requests are welcome. Keep changes focused on improving clarity, reliability, or enabling backend integration.
