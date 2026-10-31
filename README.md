# Production Upgrade

Express API + React (Vite) client with CI/CD, automated tests, Sentry, Pino logging, UptimeRobot monitoring and a staging flow. See `STAGING.md` for setup steps.

## Run locally
```bash
npm install && cp .env.example .env   # set JWT_SECRET
npm run dev                            # API on :5000
cd client && npm install && npm run dev
```

## Scripts
`npm run lint` | `npm test` | `npm run test:coverage` | `npm start`

## Structure
- `app.js` Express app (exported for tests) / `server.js` entry point (imports `instrument.js` first)
- `lib/logger.js` Pino logger, `middleware/requestLogger.js` per-request logging
- `lib/validators.js` pure helpers, `lib/store.js` in-memory data layer (swap for Prisma)
- `tests/unit`, `tests/api`, `tests/integration` (22 tests)
- `client/` React app with `Sentry.ErrorBoundary`

## Endpoints
`GET /api/health`, `POST /api/auth/register`, `POST /api/auth/login`, `GET|POST /api/payments` (Bearer token)
