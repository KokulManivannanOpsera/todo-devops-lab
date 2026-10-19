import assert from "node:assert/strict";
import test from "node:test";

test("todo CRUD via API when server is on 8090", async (t) => {
  const health = await fetch("http://127.0.0.1:8090/api/health").catch(() => null);
  if (!health?.ok) {
    t.skip("start the app first: npm run dev  (or docker run …)");
    return;
  }

  assert.deepEqual(await health.json(), { status: "ok" });

  const created = await fetch("http://127.0.0.1:8090/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Learn Docker" }),
  });
  assert.equal(created.status, 201);
  const todo = await created.json();
  assert.equal(todo.title, "Learn Docker");

  const toggled = await fetch(`http://127.0.0.1:8090/api/todos/${todo.id}`, {
    method: "PATCH",
  });
  assert.equal(toggled.status, 200);
  assert.equal((await toggled.json()).done, true);

  const deleted = await fetch(`http://127.0.0.1:8090/api/todos/${todo.id}`, {
    method: "DELETE",
  });
  assert.equal(deleted.status, 200);
});
