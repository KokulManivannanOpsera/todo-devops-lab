import { NextResponse } from "next/server";
import { addTodo, listTodos } from "@/lib/db";

export function GET() {
  return NextResponse.json(listTodos());
}

export async function POST(request: Request) {
  const body = (await request.json()) as { title?: string };
  const title = body.title?.trim() ?? "";
  if (!title) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }
  return NextResponse.json(addTodo(title), { status: 201 });
}
