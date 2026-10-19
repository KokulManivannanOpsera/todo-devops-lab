# Learning log — Todo DevOps Lab

For each step: **pain → what → how here → what breaks if removed**.

---

## Step 0 — Todo app (no DevOps yet)

**Pain:** You need something real to deploy later. Empty theory does not stick.

**What:** React UI + Node API via **Next.js** (one process). Todos in `data/todos.json`.

**How here:**
- Browser loads React page
- Client calls `/api/todos` (GET/POST/PATCH/DELETE)
- Node (Next.js) reads/writes the JSON file
- `GET /api/health` → `{"status":"ok"}` for later CI and deploy checks

**What breaks if removed:** Nothing to ship. Every later tool needs this app as the thing it wraps.

**Prove aloud:** Draw browser → Next.js (React + API) → file store. Name the three write actions.


---

## Step 1 — Git branch + PR habit

**Pain:** Everyone (or future-you) pushes straight to `main`. One bad change breaks the only copy. No review, no discussion, hard to undo.

**What:**
- **Git** — history of every change on your machine
- **Branch** — a parallel line of work so `main` stays stable
- **Pull Request (PR)** — ask to merge the branch into `main` after review

**How here:**
1. This folder is its own Git repo (`labs/todo-devops`) — parent DeployOS may be separate
2. First commit on `main` = Step 0 app (known-good baseline)
3. Branch `docs/step-1-git-pr-habit` adds this lesson + `GIT_PR.md`
4. GitHub PR shows the diff; merge when it looks right

**What breaks if removed:** You lose safe collaboration and a clear “what changed” trail before Docker/CI/deploy.

**Prove aloud:** Why not commit only on `main`? What does a PR protect?

**See also:** [GIT_PR.md](./GIT_PR.md)




## Step 2 — Dockerfile

**Pain:** “Works on my machine.” Other laptops/servers may have the wrong Node version or missing `node_modules`.

**What:**
- **Dockerfile** — recipe to build an **image** (Node + Next.js build + app)
- **Image** — frozen blueprint
- **Container** — running instance of that image
- **Port map** (`-p 8090:8090`) — your browser → host port → container port
- **Volume** (`-v …:/app/data`) — keep `todos.json` when the container is deleted
- **Multi-stage build** — deps → build → small runner with `output: "standalone"`

**How here:**
```bash
docker build -t todo-lab:0.2 .
docker run --rm -p 8090:8090 -v todo-lab-data:/app/data todo-lab:0.2
```
Open http://localhost:8090 — same UI, inside a container.  
`HOSTNAME=0.0.0.0` + `PORT=8090` so Docker port publish works.

**What breaks if removed:** You’re back to “install Node + npm install by hand” on every machine and in the cloud.

**Prove aloud:** Image vs container? Why map ports? Why a volume for `data/`?


## Step 3 — docker compose

_Not done yet._

## Step 4 — GitHub Actions CI

_Not done yet._

## Step 5 — Deploy (Railway / Render)

_Not done yet._

## Step 6 — Env + secrets

_Not done yet._

## Step 7 — Postgres

_Not done yet._

## Step 8 — Logs + simple metrics

_Not done yet._

## Step 9 — CD pipeline

_Not done yet._
