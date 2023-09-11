"use client";

import dayjs from "dayjs";
import axios from "axios";
import { createContext, useMemo, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import DTRPicker from "./DTRPicker";
import TitleInput from "./TitleInput";
import PriorityPicker from "./PriorityPicker";
import { useTodoContext } from "@/contexts/TodoContext";

export const FormContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "changed_title": {
      return {
        ...state,
        title: action.nextTitle,
      };
    }
    case "changed_priority": {
      return {
        ...state,
        priority: action.nextPriority,
      };
    }
    case "changed_dtr": {
      return {
        ...state,
        date: action.nextDate,
        reminder: action.nextReminder,
      };
    }
    case "commited_form": {
      return {
        title: "",
        priority: 0,
        date: null,
        reminder: null,
      };
    }
  }
}

export default function TodoForm() {
  const { todos, setTodos } = useTodoContext();
  const [formData, dispatch] = useReducer(reducer, {
    title: "",
    priority: 0,
    date: null,
    reminder: null,
  });

  const initialDTR = useMemo(
    () => ({
      date: formData.date,
      reminder: formData.reminder,
    }),
    [formData.date, formData.reminder]
  );

  async function handleKeyDown(ev) {
    if (ev.key === "Enter" && formData.title !== "") {
      ev.preventDefault();

      const { data } = await axios.post("/api/todo", {
        usrEmail: "admin",
        timestamp: dayjs().locale("zh-cn"),
        ...formData,
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
          <TitleInput initialTitle={formData.title} />
        </div>
        <hr />
        <div className="flex items-center h-8">
          <ul className="flex gap-x-3">
            <li>
              <PriorityPicker initialPriority={formData.priority} />
            </li>
            <li>
              <DTRPicker initialDTR={initialDTR} />
            </li>
          </ul>
        </div>
      </div>
    </FormContext.Provider>
  );
}
