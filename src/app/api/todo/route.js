import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const todoId = searchParams.get("id");

  try {
    let { todos } = await db.user.findUnique({
      where: {
        email: "admin",
      },
      include: {
        todos: true,
      },
    });

    if (todoId !== "") {
      todos = todos.filter((todo) => todo.id === todoId);
    }

    return NextResponse.json(todos, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
