"use client";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, Fragment, memo, useContext } from "react";

import {
  Select,
  Button,
  Tooltip,
  Popover,
  MenuItem,
  IconButton,
} from "@mui/material";

import { faClock } from "@fortawesome/free-solid-svg-icons";

import { todoBuffer } from "@/lib/Todo";
import { FormContext } from "./TodoForm";

const ReminderPicker = ({ originDate, initialReminder }) => {
  const dispatch = useContext(FormContext);

  const [anchor, setAnchor] = useState(null);

  const advanceTime =
    !!originDate && !!initialReminder
      ? dayjs(originDate).diff(initialReminder, "minute")
      : "";

  const iconClassName = !initialReminder ? "" : "text-orange-500";

  function handleOpen(ev) {
    setAnchor(ev.target);
    todoBuffer.store(initialReminder);
  }

  function handleClose() {
    setAnchor(null);
    todoBuffer.move();
  }

  function handleChange({ target: { value } }) {
    const nextReminder = !!value
      ? dayjs(originDate).subtract(parseInt(value), "minute")
      : null;

    dispatch({ type: "changed_reminder", nextReminder });
  }

  function handleReset() {
    dispatch({ type: "changed_reminder", nextReminder: null });
  }

  function handleCancel() {
    dispatch({ type: "changed_reminder", nextReminder: todoBuffer.current });
    handleClose();
  }

  useEffect(() => {
    console.log("ReminderPicker 渲染");
  });

  return (
    <Fragment>
      <Tooltip title="设置提醒">
        <Fragment>
          <IconButton disabled={!originDate} onClick={handleOpen}>
            <FontAwesomeIcon
              className={`w-4 h-4 ${iconClassName}`}
              icon={faClock}
            />
          </IconButton>
        </Fragment>
      </Tooltip>

      <Popover
        anchorEl={anchor}
        open={!!anchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{ paper: { sx: { padding: "1rem" } } }}
        onClose={handleCancel}
      >
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-zinc-400">设置提醒</p>
          <Select displayEmpty value={advanceTime} onChange={handleChange}>
            <MenuItem value="" sx={{ fontSize: "0.75rem" }}>
              无
            </MenuItem>
            <MenuItem
              value="0"
              disabled={dayjs(originDate).diff(dayjs(), "minute") <= 0}
              sx={{ fontSize: "0.75rem" }}
            >
              准时
            </MenuItem>
            <MenuItem
              value="5"
              disabled={dayjs(originDate).diff(dayjs(), "minute") <= 5}
              sx={{ fontSize: "0.75rem" }}
            >
              提前 5 分钟
            </MenuItem>
            <MenuItem
              value="30"
              disabled={dayjs(originDate).diff(dayjs(), "minute") <= 30}
              sx={{ fontSize: "0.75rem" }}
            >
              提前 30 分钟
            </MenuItem>
          </Select>

          <div className="flex justify-around">
            <Button onClick={handleReset}>重置</Button>
            <Button onClick={handleClose}>确认</Button>
          </div>
        </div>
      </Popover>
    </Fragment>
  );
};

export default memo(ReminderPicker);
