"use client";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import { useTodoContext } from "@/contexts/TodoContext";

export default function TodoList() {
  const { todos } = useTodoContext();

  useEffect(() => {
    console.log(todos);
  });

  return (
    <ul className="flex flex-col">
      {todos.map((item) => (
        <TodoItem key={item.id} initialTodo={item} />
      ))}
    </ul>
  );
}

const TodoItem = ({ initialTodo }) => {
  return (
    <li className="card flex shrink-0 items-center gap-x-4 h-14 px-5 mb-2 cursor-pointer select-none">
      <FontAwesomeIcon
        className="w-5 h-5 text-orange-500"
        icon={faCircleNotch}
      />

      <div>
        <p className="">{initialTodo.title}</p>
        <ul className="flex gap-x-2">
          <li>
            <p className="text-xs opacity-80">任务</p>
          </li>
        </ul>
      </div>
    </li>
  );
};
