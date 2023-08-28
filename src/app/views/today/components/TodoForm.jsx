"use client";

import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import TitleInput from "./TitleInput";
import PriorityPicker from "./PriorityPicker";

export default function TodoForm() {
  const [formData, setFormData] = useState({ title: "", priority: 0 });

  function handleTitleChange(val) {
    setFormData({ ...formData, title: val });
  }

  function handleCommit() {
    console.log(formData);
  }

  return (
    <div className="card flex flex-col shrink-0 px-5">
      <div className="flex items-center gap-x-2 w-full h-14">
        <FontAwesomeIcon className="w-5 h-5 text-orange-500" icon={faPlus} />
        <TitleInput
          initialTitle={formData.title}
          onTitleChange={handleTitleChange}
          onCommit={handleCommit}
        />
      </div>
      <hr />
      <div className="flex items-center h-8">
        <ul className="flex gap-x-3">
          <li>
            <PriorityPicker initialPriority={formData.priority} />
          </li>
          <li>
            <Tooltip title={"设置时间"}>
              <IconButton>
                <FontAwesomeIcon className="w-4 h-4" icon={faCalendarDays} />
              </IconButton>
            </Tooltip>
          </li>
        </ul>
      </div>
    </div>
  );
}
