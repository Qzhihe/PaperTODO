"use client";

import { useEffect, useState } from "react";

const TitleInput = (props) => {
  const { initialTitle, onTitleChange, onCommit } = props;

  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    console.log("TitleInput");
  });

  function handleChange(ev) {
    setTitle(ev.target.value);
    onTitleChange(ev.target.value);
  }

  function handleKeyDown(ev) {
    if (ev.key === "Enter") {
      setTitle("");

      onCommit();
    }
  }

  return (
    <input
      className="w-full leading-6 outline-none placeholder:text-orange-500 focus:placeholder:text-black"
      placeholder="添加任务"
      value={title}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
};

export default TitleInput;
