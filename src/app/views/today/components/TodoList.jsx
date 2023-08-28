"use client";

import { useTodoContext } from "@/contexts/TodoContext";

export default function TodoList({ initialTodos }) {
  const { todos, setTodos } = useTodoContext();

  console.log(todos);

  return <ul>{}</ul>;
}
