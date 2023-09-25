"use client";

import dayjs from "dayjs";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const TodoDetail = ({ initialTodo }) => {
  useEffect(() => {
    console.log("TodoDetail 渲染");
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-4">
        <FontAwesomeIcon
          className="w-5 h-5 text-orange-500"
          icon={faCircleNotch}
        />
        <div>{dayjs(initialTodo.date)?.format("M月D日HH:mm")}</div>
        <div>{initialTodo.priority}</div>
      </div>
      <hr />
      <div className="p-4">
        <h1 className="text-lg font-medium">{initialTodo.title}</h1>
      </div>
    </div>
  );
};

export default TodoDetail;
