"use client";

import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { IconButton, Tooltip, Popover } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, memo, useState, useEffect, useContext } from "react";

import { FormContext } from "./TodoForm";
import { getPriorityTitle, getPriorityTooltip } from "@/lib/priorityUtils";

const PriorityPicker = ({ initialPriority }) => {
  const dispatch = useContext(FormContext),
    [anchor, setAnchor] = useState(null),
    [priority, setPriority] = useState(initialPriority);

  const tooltip = getPriorityTooltip(priority),
    titleEn = getPriorityTitle(priority, "en");

  useEffect(() => {
    setPriority(initialPriority);
  }, [initialPriority]);

  useEffect(() => {
    console.log("PriorityPicker 渲染");
  });

  function handleOpen(ev) {
    setAnchor(ev.target);
  }

  function handleClose() {
    setAnchor(null);
  }

  function handleChange(priority) {
    setPriority(priority);
    dispatch({ type: "changed_priority", nextPriority: priority });
    handleClose();
  }

  return (
    <Fragment>
      <Tooltip title={tooltip}>
        <IconButton onClick={handleOpen}>
          <FontAwesomeIcon
            className={`w-4 h-4 priority-${titleEn}`}
            icon={faFlag}
          />
        </IconButton>
      </Tooltip>

      <Popover
        anchorEl={anchor}
        open={!!anchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{ paper: { sx: { padding: "1rem" } } }}
        onClose={handleClose}
      >
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-zinc-400">优先级</p>
          <ul className="flex gap-x-1">
            {[3, 2, 1, 0].map((item) => {
              const tooltip = getPriorityTitle(item, "zh"),
                isActive = item === priority;

              const iconClassName = `priority-${getPriorityTitle(item, "en")}`;

              return (
                <Fragment key={item}>
                  <Tooltip arrow title={`${tooltip}优先级`}>
                    <li
                      className={`priority_item hover:bg-zinc-100 ${
                        isActive ? "priority_item-active" : ""
                      }`}
                      onClick={() => handleChange(item)}
                    >
                      <FontAwesomeIcon
                        className={`absolute w-4 h-4 ${iconClassName}`}
                        icon={faFlag}
                      />
                    </li>
                  </Tooltip>
                </Fragment>
              );
            })}
          </ul>
        </div>
      </Popover>
    </Fragment>
  );
};

export default memo(PriorityPicker);
