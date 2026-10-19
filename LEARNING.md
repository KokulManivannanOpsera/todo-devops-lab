# Learning log — Todo DevOps Lab

For each step: **pain → what → how here → what breaks if removed**.

---

## Step 0 — Todo app (no DevOps yet)

**Pain:** You need something real to deploy later. Empty theory does not stick.

**What:** A tiny FastAPI app with an HTML UI and SQLite.

**How here:**
- Browser hits FastAPI
- Forms POST to add / toggle / delete
- Todos live in `data/todos.db`
- `GET /health` returns `{"status":"ok"}` for later CI and deploy checks

**What breaks if removed:** Nothing to ship. Every later tool needs this app as the thing it wraps.

**Prove aloud:** Draw browser → FastAPI → SQLite. Name the three write actions.

---

## Step 1 — Git branch + PR habit

_Not done yet._



## Step 2 — Dockerfile

_Not done yet._

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
