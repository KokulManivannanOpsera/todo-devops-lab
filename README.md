# Todo DevOps Lab

Tiny todo app used to learn DevOps **one tool at a time**.

**Stack:** React + Node via **Next.js** (UI + API in one process).  
**Now:** Step 2 — run with Docker. Still no CI/cloud yet.

**Big picture:** open [`devops-flow.html`](./devops-flow.html) in a browser — tool groups + end-to-end flow diagram.

## Run locally

```bash
cd labs/todo-devops
npm install
npm run dev
```

Open [http://localhost:8090](http://localhost:8090).

- UI: add / toggle / delete todos
- Health: [http://localhost:8090/api/health](http://localhost:8090/api/health)

(Uses **8090** so it does not clash with HelixOps `8000`/`3000` or Docker’s common `8080`.)

## Tests

With the app running on 8090:

```bash
npm test
```

## Learning ladder

See [LEARNING.md](./LEARNING.md). Rule: finish the current step and explain it aloud before adding the next tool.

| Step | Tool | Status |
|------|------|--------|
| 0 | Todo app | Done |
| 1 | Git branch + PR habit | Done — see [GIT_PR.md](./GIT_PR.md) |
| 2 | Dockerfile | Current — see below |
| 3 | docker compose | Next |
| 4 | GitHub Actions CI | Later |
| 5 | Deploy (Railway/Render) | Later |
| 6 | Env + secrets | Later |
| 7 | Postgres | Later |
| 8 | Logs + metrics | Later |
| 9 | CD pipeline | Later |

## Stack

- **React** UI (`src/components/TodoApp.tsx`)
- **Node** server via Next.js App Router + API routes
- File store: `data/todos.json` (Postgres comes in Step 7)

## Run with Docker (Step 2)

```bash
cd labs/todo-devops
docker build -t todo-lab:0.2 .
docker run --rm -p 8090:8090 -v todo-lab-data:/app/data todo-lab:0.2
```

Open [http://localhost:8090](http://localhost:8090).

- `-p 8090:8090` maps host → container port
- `-v todo-lab-data:/app/data` keeps todos when you stop the container
