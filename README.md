# Prisma Template

A RESTful API template built with **Express**, **Prisma ORM**, and **PostgreSQL**, written in TypeScript. Includes Swagger documentation out of the box.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **ORM:** Prisma 7
- **Database:** PostgreSQL
- **Language:** TypeScript
- **API Docs:** Swagger UI (`swagger-jsdoc` + `swagger-ui-express`)

## Project Structure

```
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Migration history
├── generated/
│   └── prisma/              # Auto-generated Prisma client
├── src/
│   ├── index.ts             # App entry point
│   ├── swagger.ts           # Swagger/OpenAPI configuration
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── routes/
│   │   └── user.route.ts
│   └── services/
│       └── user.service.ts
└── lib/
    └── prisma.ts            # Prisma client singleton
```

## Database Schema

| Model      | Description                          |
|------------|--------------------------------------|
| `User`     | App user with optional name and role |
| `Post`     | Blog post authored by a user         |
| `Profile`  | One-to-one profile linked to a user  |
| `Category` | Tag/category for posts               |

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
PORT=3000
```

### 3. Run migrations

```bash
npx prisma migrate dev
```

### 4. Start the development server

```bash
npm run dev
```

The server will start on [http://localhost:3000](http://localhost:3000).

## API Documentation

Interactive Swagger UI is available at:

```
http://localhost:3000/api-docs
```

## API Endpoints

### Users

| Method | Endpoint               | Description           |
|--------|------------------------|-----------------------|
| POST   | `/api/users`           | Create a new user     |
| GET    | `/api/users`           | Retrieve all users    |
| GET    | `/api/users/:email`    | Get a user by email   |

### Request & Response Examples

**POST `/api/users`**

Request body:
```json
{
  "email": "alice@example.com",
  "name": "Alice"
}
```

Response `201`:
```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "role": "USER"
}
```

**GET `/api/users/alice@example.com`**

Response `200`:
```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "role": "USER"
}
```

Response `404`:
```json
{
  "error": "User not found"
}
```

## Scripts

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start server in watch mode (tsx)   |
| `npm run script`| Run `script.ts` directly           |

## License

ISC
