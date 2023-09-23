"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleNotch, faBell } from "@fortawesome/free-solid-svg-icons";

import { Tooltip } from "@mui/material";

import { useTodoContext } from "@/contexts/TodoContext";
import { getPriorityClassName, getPriorityTooltip } from "@/lib/priorityUtils";
import axios from "axios";

export default function TodoList({ filter = {} }) {
    const { todos, setTodos } = useTodoContext();

    useEffect(() => {
        console.log("TodoList 渲染", todos);
    }, [todos]);

    function handleClick(updateTodo) {
        console.log("??", updateTodo);
        const updatedTodos = todos.map((item) => {
            if (updateTodo.id === item.id) {
                return updateTodo;
            } else {
                return item;
            }
        });
        console.log(updatedTodos);
        setTodos(...updatedTodos);
    }

    return (
        <ul className="flex flex-col">
            {todos
                .filter((item) => {
                    for (let key in filter) {
                        if (item[key] !== filter[key]) {
                            return false;
                        }
                    }

                    return true;
                })
                .map((item) => (
                    <TodoItem
                        key={item.id}
                        initialTodo={item}
                        onHandleClick={handleClick}
                    />
                ))}
        </ul>
    );
}

const TodoItem = ({ initialTodo, onHandleClick }) => {
    const { id, isDone, title, priority, date, reminder } = initialTodo;
    const priorityClassName = getPriorityClassName(priority);

    async function handleCplt(event) {
        event.preventDefault();
        console.log("完成，这里你可以看点击的效果，");
        try {
            const { data, status } = await axios.put("/api/todo", {
                id: id,
                isDone: isDone,
            });
            if (status === 200) {
                console.log(data);
                onHandleClick(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <li className="card mb-2 hover:drop-shadow">
            <Link
                className="flex shrink-0 items-center gap-x-4 w-full h-14 px-5 cursor-pointer select-none"
                href={`/views/today/${id}`}
            >
                <FontAwesomeIcon
                    className="w-5 h-5 text-orange-500"
                    icon={faCircleNotch}
                    onClick={handleCplt}
                />

                <div className="flex flex-col justify-center h-full">
                    <p className="text-sm">{title}</p>
                    <ul>
                        <li className="flex gap-x-1 items-center">
                            <p className="text-xs text-zinc-500">任务</p>
                            {!!priority && (
                                <p
                                    className={`px-1 rounded text-xs ${priorityClassName}`}
                                >
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
                                    title={`提前${dayjs(date).diff(
                                        reminder,
                                        "minute"
                                    )}分钟`}
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
