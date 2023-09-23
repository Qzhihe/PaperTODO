import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// import { useServerSession } from "@/lib/auth";

export async function GET(request) {
  const { searchParams } = new URL(request.url),
    todoId = searchParams.get("id");

  // const session = await useServerSesasion();

  try {
    const { todos } = await db.user.findUnique({
      where: {
        // id: session?.user?.id,
        id: '650aa4d60aeca5f817eda41d',
      },
      include: {
        todos: {
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    });

    if (!todoId) {
      return NextResponse.json(todos, { status: 200 });
    }

    return NextResponse.json(
      todos.filter((todo) => todo.id === todoId),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();

    let start = performance.now();
    // 极其耗时
    const result = await db.todo.create({
      data: {
        ...payload,
      },
    });
    let end = performance.now();

    console.log("添加TODO耗时为: ", ((end - start) / 1000).toFixed(3), "s");

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
