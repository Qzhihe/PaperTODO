"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleNotch, faBell } from "@fortawesome/free-solid-svg-icons";

import { Tooltip } from "@mui/material";

import { useTodoContext } from "@/contexts/TodoContext";
import { getPriorityTooltip } from "@/lib/priorityUtils";

export default function TodoList() {
  const { todos } = useTodoContext();

  useEffect(() => {
    console.log("TodoList 渲染", todos);
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
  const { id, title, priority, date, reminder } = initialTodo;

  function getPriorityClassName() {
    switch (priority) {
      case 1: {
        return "text-blue-500 bg-blue-500/20";
      }
      case 2: {
        return "text-yellow-500 bg-yellow-500/20";
      }
      case 3: {
        return "text-red-500 bg-red-500/20";
      }
    }
  }

  return (
    <li className="card mb-2">
      <Link
        className="flex shrink-0 items-center gap-x-4 w-full h-14 px-5 cursor-pointer select-none"
        href={`/views/today/${id}`}
      >
        <FontAwesomeIcon
          className="w-5 h-5 text-orange-500"
          icon={faCircleNotch}
        />

        <div className="flex flex-col justify-center h-full">
          <p className="text-sm">{title}</p>
          <ul>
            <li className="flex gap-x-1 items-center">
              <p className="text-xs text-zinc-500">任务</p>
              {!!priority && (
                <p className={`px-1 rounded text-xs ${getPriorityClassName()}`}>
                  {getPriorityTooltip(priority)}
                </p>
              )}
              {!!date && (
                <p className="text-xs text-zinc-500">
                  {dayjs(date).format("MM月DD日HH:mm")}
                </p>
              )}
              {!!reminder && (
                <Tooltip
                  title={`提前${dayjs(date).diff(reminder, "minute")}分钟`}
                >
                  <FontAwesomeIcon
                    className="w-3 h-3 text-orange-500"
                    icon={faBell}
                  />
                </Tooltip>
              )}
            </li>
          </ul>
        </div>
      </Link>
    </li>
  );
};
