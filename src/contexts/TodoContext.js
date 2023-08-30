"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import Loading from "@/components/Loading";

export const TodoContext = createContext({});

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/todo", {
          params: {
            id: "",
          },
        });

        setTodos(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {todos.length > 0 ? children : <Loading />}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  return useContext(TodoContext);
}
