import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

export type Todo = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
};

type Store = { nextId: number; todos: Todo[] };

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "todos.json");

function emptyStore(): Store {
  return { nextId: 1, todos: [] };
}

function readStore(): Store {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  if (!existsSync(dbPath)) {
    const store = emptyStore();
    writeFileSync(dbPath, JSON.stringify(store, null, 2));
    return store;
  }
  return JSON.parse(readFileSync(dbPath, "utf8")) as Store;
}

function writeStore(store: Store) {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  writeFileSync(dbPath, JSON.stringify(store, null, 2));
}

export function listTodos(): Todo[] {
  return readStore().todos.slice().sort((a, b) => b.id - a.id);
}

export function addTodo(title: string): Todo {
  const store = readStore();
  const todo: Todo = {
    id: store.nextId++,
    title: title.trim(),
    done: false,
    createdAt: new Date().toISOString(),
  };
  store.todos.push(todo);
  writeStore(store);
  return todo;
}

export function toggleTodo(id: number): Todo | null {
  const store = readStore();
  const todo = store.todos.find((t) => t.id === id);
  if (!todo) return null;
  todo.done = !todo.done;
  writeStore(store);
  return todo;
}

export function deleteTodo(id: number): boolean {
  const store = readStore();
  const before = store.todos.length;
  store.todos = store.todos.filter((t) => t.id !== id);
  if (store.todos.length === before) return false;
  writeStore(store);
  return true;
}
