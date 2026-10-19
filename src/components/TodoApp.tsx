"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/todos");
    if (!res.ok) {
      setError("Failed to load todos");
      return;
    }
    setTodos(await res.json());
  }, []);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  async function onAdd(e: FormEvent) {
    e.preventDefault();
    const cleaned = title.trim();
    if (!cleaned) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: cleaned }),
    });
    if (!res.ok) {
      setError("Failed to add todo");
      return;
    }
    setTitle("");
    await load();
  }

  async function onToggle(id: number) {
    const res = await fetch(`/api/todos/${id}`, { method: "PATCH" });
    if (!res.ok) {
      setError("Failed to toggle");
      return;
    }
    await load();
  }

  async function onDelete(id: number) {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete");
      return;
    }
    await load();
  }

  return (
    <main>
      <h1>Todo DevOps Lab</h1>
      <p className="sub">React + Node (Next.js). Step 2 — also runs in Docker.</p>

      <form className="add" onSubmit={onAdd}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          maxLength={200}
          required
          autoFocus
        />
        <button className="primary" type="submit">
          Add
        </button>
      </form>

      {error && <p className="empty">{error}</p>}
      {loading ? (
        <p className="empty">Loading…</p>
      ) : todos.length === 0 ? (
        <p className="empty">No todos yet. Add one above.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : undefined}>
              <span className="title">{todo.title}</span>
              <div className="actions">
                <button className="ghost" type="button" onClick={() => onToggle(todo.id)}>
                  {todo.done ? "Undo" : "Done"}
                </button>
                <button
                  className="ghost danger"
                  type="button"
                  onClick={() => onDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer>
        Health check: <code>GET /api/health</code> →{" "}
        <a href="/api/health">/api/health</a>
      </footer>
    </main>
  );
}
