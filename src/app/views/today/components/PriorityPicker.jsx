"use client";

import { IconButton, Tooltip, Menu } from "@mui/material";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { Fragment, memo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getPriorityTitle, getPriorityTooltip } from "@/lib/priorityUtils";

const PriorityPicker = () => {
  const [anchor, setAnchor] = useState(null);
  const [priority, setPriority] = useState(0);

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
    handleClose();
  }

  return (
    <Fragment>
      <Tooltip title={getPriorityTooltip(priority)}>
        <IconButton onClick={handleOpen}>
          <FontAwesomeIcon
            className={`w-4 h-4 priority-${getPriorityTitle(priority, "en")}`}
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
            {[3, 2, 1, 0].map((item) => (
              <PriorityItem
                key={item}
                priority={item}
                active={item === priority}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        </li>
      </Menu>
    </Fragment>
  );
};

export default memo(PriorityPicker);

function PriorityItem(props) {
  const { priority, onSelect, active } = props;

  function handleClick() {
    onSelect(props.priority);
  }

  return (
    <Tooltip arrow title={getPriorityTitle(priority)}>
      <li
        className={`priority_item ${
          active ? "priority_item-active" : ""
        } hover:bg-zinc-100`}
        onClick={handleClick}
      >
        <FontAwesomeIcon
          className={`absolute w-4 h-4 priority-${getPriorityTitle(
            priority,
            "en"
          )}`}
          icon={faFlag}
        />
      </li>
    </Tooltip>
  );
}
