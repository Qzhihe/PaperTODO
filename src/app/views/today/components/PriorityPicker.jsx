"use client";

import { IconButton, Tooltip, Menu } from "@mui/material";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
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

  function handleSelect(priority) {
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

      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}
        MenuListProps={{
          disablePadding: true,
          sx: {
            padding: "1rem",
          },
        }}
      >
        <li className="flex flex-col gap-y-2">
          <p className="text-sm text-zinc-400">优先级</p>
          <ul className="flex gap-x-1">
            {[3, 2, 1, 0].map((item) => {
              const tooltip = getPriorityTitle(item, "zh"),
                titleEn = getPriorityTitle(item, "en"),
                isActive = item === priority;

              return (
                <Fragment key={item}>
                  <Tooltip arrow title={`${tooltip}优先级`}>
                    <li
                      className={`priority_item hover:bg-zinc-100 ${
                        isActive ? "priority_item-active" : ""
                      }`}
                      onClick={() => handleSelect(item)}
                    >
                      <FontAwesomeIcon
                        className={`absolute w-4 h-4 priority-${titleEn}`}
                        icon={faFlag}
                      />
                    </li>
                  </Tooltip>
                </Fragment>
              );
            })}
          </ul>
        </li>
      </Menu>
    </Fragment>
  );
};

export default memo(PriorityPicker);
