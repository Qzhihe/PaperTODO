"use client";

import { useContext, useEffect, useState, memo } from "react";

import { FormContext } from "./TodoForm";

const TitleInput = ({ initialTitle }) => {
  const dispatch = useContext(FormContext),
    [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    console.log("TitleInput 渲染");
  });

  function handleChange(ev) {
    setTitle(ev.target.value);
    dispatch({ type: "changed_title", nextTitle: ev.target.value });
  }

  return (
    <input
      className="w-full leading-6 outline-none placeholder:text-orange-500 focus:placeholder:text-black"
      placeholder="添加任务"
      value={title}
      onChange={handleChange}
    />
  );
};

export default memo(TitleInput);
