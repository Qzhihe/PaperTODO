"use client";

import { useEffect } from "react";

const TodoDetail = (props) => {
  const { initialTodo } = props;

  useEffect(() => {
    console.log("TodoDetail 渲染，你没用这个");
  });

  return (
    <div>
      <h1>{initialTodo.title}</h1>
    </div>
  );
};

export default TodoDetail;
