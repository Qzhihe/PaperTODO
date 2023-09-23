"use client";

import "dayjs/locale/zh-cn";
import { zhCN } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState, memo, useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateTimePicker } from "@mui/x-date-pickers";
import { Tooltip, IconButton, Popover, Button } from "@mui/material";

import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { todoBuffer } from "@/lib/Todo";
import { FormContext } from "./TodoForm";

const DatePicker = ({ originReminder, initialDate }) => {
  const dispatch = useContext(FormContext);

  const [anchor, setAnchor] = useState(null);

  const iconClassName = !initialDate ? "" : "text-orange-500";

  function handleOpen(ev) {
    setAnchor(ev.target);
    // 将初始数据存入 buffer
    todoBuffer.store({ initialDate, originReminder });
  }

  function handleClose() {
    setAnchor(null);
    todoBuffer.move();
  }

  function handleChange(newValue) {
    dispatch({ type: "changed_date", nextDate: newValue });
  }

  function handleReset() {
    dispatch({ type: "changed_date", nextDate: null });
  }

  function handleCancel() {
    dispatch({
      type: "changed_date",
      nextDate: todoBuffer.current.initialDate,
      originReminder: todoBuffer.current.originReminder,
    });
    handleClose();
  }

  useEffect(() => {
    console.log("DatePicker 渲染");
  });

  return (
    <Fragment>
      <Tooltip title="设置时间">
        <IconButton onClick={handleOpen}>
          <FontAwesomeIcon
            className={`w-4 h-4 ${iconClassName}`}
            icon={faCalendarDays}
          />
        </IconButton>
      </Tooltip>

      <Popover
        anchorEl={anchor}
        open={!!anchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{ paper: { sx: { padding: "1rem" } } }}
        onClose={handleCancel}
      >
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-zinc-400">日期&时间</p>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="zh-cn"
            localeText={
              zhCN.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <DateTimePicker
              disablePast
              value={initialDate}
              format="YYYY-MM-DD HH:mm"
              onChange={handleChange}
            />
          </LocalizationProvider>

          <div className="flex justify-around">
            <Button onClick={handleReset}>重置</Button>
            <Button onClick={handleClose}>确认</Button>
          </div>
        </div>
      </Popover>
    </Fragment>
  );
};

export default memo(DatePicker);
