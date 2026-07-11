# express-101

A minimal **API-only** Express.js application in the *-101 family. It mirrors the JSON API contract of [laravel-101](https://github.com/example/laravel-101) with JWT auth, SQLite persistence, and Vitest feature tests — but **no server-rendered shop UI**.

## API-only by design

Other *-101 projects (Laravel, FrameworkX, Orchestr) include a `/shop` browser UI with session auth and HTML templates. **express-101 deliberately omits that layer.**

Express has no built-in templating or session story comparable to Laravel Blade. Rather than bolt on EJS/Pug and duplicate the shop frontend, this project focuses on what Express does well: a lean JSON REST API. Use any client (curl, Postman, SPA, mobile app) against the same endpoints as laravel-101.

## What's included

- Express.js REST API on port **8007**
- SQLite via **better-sqlite3**
- JWT authentication (`jsonwebtoken` + `bcryptjs`)
- Services: `UserService`, `CategoryService`, `ItemService`
- Domain exceptions with `{ detail, code }` error responses
- Pagination: `{ items, total, skip, limit }` plus item filters
- **19 Vitest feature tests** (all laravel-101 Feature tests except ShopTest)
- Dockerfile, docker-compose, GitHub Actions CI, Makefile

## Quick start

```bash
npm install
cp .env.example .env

# Start the API (port 8007)
make serve
# or: npm run serve

# Run tests
npm run test:run
```

Open **http://127.0.0.1:8007** — you should see:

```json
{"message":"Hello from express-101"}
```

## API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | — | Hello message |
| GET | `/health` | — | Health check |
| POST | `/auth/register` | — | Register user |
| POST | `/auth/login` | — | Login (form or JSON) |
| GET | `/auth/me` | JWT | Current user |
| GET | `/categories` | — | List categories |
| GET | `/categories/:id` | — | Show category |
| POST/PATCH/DELETE | `/categories` | JWT | Manage categories |
| GET | `/items` | — | List items (paginated, filterable) |
| GET | `/items/stats/summary` | — | Item statistics |
| GET | `/items/:id` | — | Show item |
| POST/PATCH/DELETE | `/items` | JWT | Manage items |

Write operations require `Authorization: Bearer <token>`.

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `X_LISTEN` or `PORT` | `8007` | Listen port (or `host:port` for `X_LISTEN`) |
| `APP_HOST` | `127.0.0.1` | Bind address |
| `DB_DATABASE` | `database/database.sqlite` | SQLite file path |
| `JWT_SECRET` | `change-me-in-production` | JWT signing secret |

## Project structure

```
express-101/
├── src/server.js          # Entry point
├── bootstrap/app.js       # Express app factory
├── routes/api.js          # Route definitions
├── app/
│   ├── Controllers/
│   ├── Services/
│   ├── Support/
│   └── Exceptions/
├── middleware/
├── database/schema.sql
└── tests/Feature/         # Vitest API tests
```

## Docker

```bash
docker compose up --build
```

The API listens on **http://localhost:8007**.

## Tests

19 feature tests cover health, auth, categories, and items — ported from laravel-101's PHPUnit suite (excluding ShopTest):

```bash
make test
```

## *-101 Family

### API backends

| Repo | Port | Type | Stack |
|------|------|------|-------|
| [fastAPI-101](https://github.com/iammikek/fastAPI-101) | 8000 | API-only | FastAPI, SQLAlchemy |
| [django-101](https://github.com/iammikek/django-101) | 8001 | Monolith | Django + DRF + shop |
| [symfony-101](https://github.com/iammikek/symfony-101) | 8002 | Monolith | Symfony + shop |
| [laravel-101](https://github.com/iammikek/laravel-101) | 8003 | Monolith | Laravel + shop |
| [framework-x-101](https://github.com/iammikek/framework-x-101) | 8004 | Monolith | Framework X + shop |
| [orchestr-101](https://github.com/iammikek/orchestr-101) | 8005 | Monolith | Orchestr + shop |
| [nest-101](https://github.com/iammikek/nest-101) | 8006 | API-only | NestJS, TypeScript |
| [**express-101**](https://github.com/iammikek/express-101) | **8007** | API-only | Express, Vitest |
| [go-101](https://github.com/iammikek/go-101) | 8000* | API-only | Gin, GORM |
| [fortran-101](https://github.com/iammikek/fortran-101) | 8008 | API-only | Fortran, fpm |
| [java-101](https://github.com/iammikek/java-101) | 8009 | API-only | Spring Boot, JPA, Flyway |

\* go-101 also uses port 8000 — run one backend at a time, or change port in config.

### Other clients

| Repo | Platform | Stack |
|------|----------|-------|
| [flutter-101](https://github.com/iammikek/flutter-101) | Mobile / desktop | Flutter (iOS, macOS, Android) |
| [react-101](https://github.com/iammikek/react-101) | Web browser | React 19, Vite, Vitest |
| [vue-101](https://github.com/iammikek/vue-101) | Web browser | Vue 3, Vite, Pinia |

### Suggested pairing

- **Compare Node APIs:** [nest-101](https://github.com/iammikek/nest-101) (8006) vs express-101 (8007)
- **Reference monolith:** [laravel-101](https://github.com/iammikek/laravel-101) for the API contract + Blade shop
- **Pair with a client:** [react-101](https://github.com/iammikek/react-101), [vue-101](https://github.com/iammikek/vue-101), or [flutter-101](https://github.com/iammikek/flutter-101)

Catalogue: [automica.io/learning-101](https://automica.io/learning-101.html)
