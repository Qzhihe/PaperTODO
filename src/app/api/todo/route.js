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
        todos: {
          orderBy: {
            timestamp: "desc",
          },
        },
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

export async function POST(request) {
  try {
    const payload = await request.json();

    const result = await db.todo.create({
      data: {
        ...payload,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
