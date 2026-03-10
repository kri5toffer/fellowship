# Lyra — Airtable Clone

An Airtable-style spreadsheet app built with the T3 stack. Uses the EAV (Entity-Attribute-Value) pattern so users can create tables, columns, and rows dynamically without database migrations.

## Tech Stack

- **Next.js 15** — App Router with Turbopack
- **tRPC** — End-to-end typesafe API
- **Prisma** — ORM with SQLite (dev) 
- **TanStack Table** — Headless table with sorting
- **Tailwind CSS v4** — Styling
- **TypeScript** — Full type safety across frontend and backend

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create the database and run migrations
npx prisma migrate dev

# 3. Seed with demo data (cycling teams, riders, race results)
npx prisma db seed

# 4. Start the dev server
npm run dev
```

Open http://localhost:3000 to see the app.

## Common Commands

### Running the App

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start the Next.js dev server (frontend + backend) |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |

### Database (Prisma)

These are the commands you'll use most often when working with the schema.

| Command | What it does |
|---------|-------------|
| `npx prisma studio` | Open the visual database browser at http://localhost:5555 |
| `npx prisma migrate dev` | Apply pending migrations to your dev database |
| `npx prisma migrate dev --name describe_change` | Create a new migration from schema changes |
| `npx prisma db seed` | Run the seed script to populate demo data |
| `npx prisma generate` | Regenerate the Prisma Client (auto-runs after migrate) |
| `npx prisma migrate reset` | Drop the database, re-run all migrations, and re-seed |
| `npx prisma db push` | Push schema changes directly (no migration file, good for prototyping) |
| `npx prisma validate` | Check if schema.prisma has syntax errors |
| `npx prisma format` | Auto-format schema.prisma |

### Code Quality

| Command | What it does |
|---------|-------------|
| `npm run check` | Run linter + type checker |
| `npm run lint` | Run ESLint only |
| `npm run typecheck` | Run TypeScript type checker only |
| `npm run format:write` | Auto-format all files with Prettier |

## Workflow: Changing the Schema

Every time you modify `prisma/schema.prisma`, follow these steps:

```bash
# Step 1: Edit prisma/schema.prisma (add/rename/remove models or fields)

# Step 2: Create a migration (give it a descriptive name)
npx prisma migrate dev --name add_rider_nationality

# Step 3: If you changed field names used in code, update these files:
#   - prisma/seed.ts              (seed data)
#   - src/server/api/routers/     (tRPC queries/mutations)
#   - src/app/_components/        (React components)

# Step 4: Re-seed if your seed script changed
npx prisma db seed

# Step 5: Verify everything works
npm run check
```

### Quick Reference: migrate dev vs db push

- `npx prisma migrate dev` — Creates a migration SQL file, applies it, regenerates client. **Use this** for changes you want to keep track of.
- `npx prisma db push` — Applies schema changes directly without creating a migration file. Good for rapid prototyping, but no migration history.
- `npx prisma migrate reset` — Nuclear option. Drops the entire database, re-runs all migrations from scratch, and re-seeds. Use when migrations get messy.

## Project Structure

```
prisma/
  schema.prisma          # Database models (Table, Column, Row, Cell)
  seed.ts                # Seed script with cycling team demo data
  migrations/            # Auto-generated SQL migration files

src/
  server/
    db.ts                # Prisma client singleton
    api/
      trpc.ts            # tRPC setup (context, middleware, procedures)
      root.ts            # Combines all routers into one API
      routers/
        table.ts         # CRUD endpoints for tables, columns, rows, cells

  app/
    page.tsx             # Main page (header + tabs)
    layout.tsx           # Root layout (providers, fonts)
    _components/
      table-tabs.tsx     # Tab bar for switching tables
      table-grid.tsx     # TanStack Table grid with editable cells
      filter-bar.tsx     # Filter UI with per-column conditions

  trpc/
    react.tsx            # tRPC React client (used in components)
    server.ts            # tRPC server caller (used in server components)

  styles/
    globals.css          # Tailwind config + Airtable color tokens
```

## Data Model (EAV Pattern)

```
Table (tbl_riders, tbl_teams, ...)
  ├── Column (col_rider_name, col_rider_age, ...)  ← defines column name + type
  ├── Row (row_pogacar, row_vingegaard, ...)        ← a record slot
  │     └── Cell (cel_row_pogacar_name = "Tadej")   ← actual data value
```

Columns are created dynamically by users at runtime — no migrations needed. The `Cell` model stores every value as a string; the `Column.fieldType` tells the app how to render and validate it.
