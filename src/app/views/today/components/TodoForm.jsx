"use client";

import dayjs from "dayjs";
import axios from "axios";
import { getSession } from "next-auth/react";
import { createContext, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import TitleInput from "./TitleInput";
import DatePicker from "./DatePicker";
import { Todo, reducer } from "@/lib/Todo";
import PriorityPicker from "./PriorityPicker";
import ReminderPicker from "./ReminderPicker";
import { useTodoContext } from "@/contexts/TodoContext";

export const FormContext = createContext(null);

export default function TodoForm() {
  const { todos, setTodos } = useTodoContext();

  const [nextTodo, dispatch] = useReducer(reducer, new Todo());

  async function handleKeyDown(ev) {
    if (ev.key === "Enter" && nextTodo.title !== "") {
      ev.preventDefault();

      const session = await getSession();

      const { data } = await axios.post("/api/todo", {
        userId: session?.user?.id,
        timestamp: dayjs().locale("zh-cn"),
        ...nextTodo,
      });

      setTodos([data, ...todos]);

      dispatch({ type: "commited_form" });
    }
  }

  return (
    <FormContext.Provider value={dispatch}>
      <div
        className="card flex flex-col shrink-0 px-5"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-x-2 w-full h-14">
          <FontAwesomeIcon className="w-5 h-5 text-orange-500" icon={faPlus} />
          <TitleInput initialTitle={nextTodo.title} />
        </div>
        <hr />
        <div className="flex items-center h-8">
          <ul className="flex gap-x-3">
            <li>
              <PriorityPicker initialPriority={nextTodo.priority} />
            </li>
            <li>
              <DatePicker
                originReminder={nextTodo.reminder}
                initialDate={nextTodo.date}
              />
            </li>
            <li>
              <ReminderPicker
                originDate={nextTodo.date}
                initialReminder={nextTodo.reminder}
              />
            </li>
          </ul>
        </div>
      </div>
    </FormContext.Provider>
  );
}
