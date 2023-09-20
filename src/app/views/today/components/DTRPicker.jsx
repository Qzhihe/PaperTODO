"use client";

import "dayjs/locale/zh-cn";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useContext, useState, useRef, useEffect, Fragment, memo } from "react";

import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import {
  Menu,
  Select,
  Button,
  Tooltip,
  MenuItem,
  IconButton,
} from "@mui/material";

import { FormContext } from "./TodoForm";

const DTRPicker = ({ initialDTR }) => {
  const dispatch = useContext(FormContext),
    snapshot = useRef(initialDTR),
    [anchor, setAnchor] = useState(null),
    [dtr, setDTR] = useState(initialDTR),
    [advance, setAdvance] = useState("");

  const { date, reminder } = dtr;

  useEffect(() => {
    if (date && reminder) {
      setAdvance(date.diff(reminder, "minute").toString());
    } else {
      setAdvance("");
    }
  }, [date, reminder]);

  useEffect(() => {
    console.log("DTRPicker 渲染");
  });

  function handleOpen(ev) {
    setAnchor(ev.target);
  }

  function handleClose() {
    setAnchor(null);
    setDTR(initialDTR);
  }

  function handleCommit() {
    setAnchor(null);
    setDTR(null);
    setAdvance("");
    dispatch({ type: "changed_dtr", nextDate: date, nextReminder: reminder });
  }

  function handleReset() {
    setDTR({ date: null, reminder: null });
  }

  function handleDateTimeChange(newValue) {
    const nextDate = newValue.locale("zh-cn"),
      nextReminder = reminder
        ? nextDate.subtract(parseInt(advance), "minute").locale("zh-cn")
        : null;

    setDTR({ ...dtr, date: nextDate, reminder: nextReminder });
  }

  function handleReminderChange(ev) {
    if (date) {
      const nextReminder = date
        .subtract(parseInt(ev.target.value), "minute")
        .locale("zh-cn");

      setDTR({ ...dtr, reminder: nextReminder });
      setAdvance(ev.target.value);
    }
  }

  return (
    <Fragment>
      <Tooltip title={`${date ? date.format("MM月DD日HH:mm") : "设置时间"}`}>
        <IconButton onClick={handleOpen}>
          <FontAwesomeIcon
            className={`w-4 h-4 ${date ? "text-orange-500" : ""}`}
            icon={faCalendarDays}
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
            display: "flex",
            flexFlow: "column nowrap",
            gap: "1rem",
            padding: "1rem",
          },
        }}
      >
        <li>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              disablePast
              value={date}
              ampm={false}
              label="设置时间"
              format="YYYY-MM-DD HH:mm"
              onChange={handleDateTimeChange}
            />
          </LocalizationProvider>
        </li>
        <p className="text-sm text-zinc-400">设置提醒</p>
        <Select displayEmpty value={advance} onChange={handleReminderChange}>
          <MenuItem value="" sx={{ fontSize: "0.75rem" }}>
            无
          </MenuItem>
          <MenuItem value="0" sx={{ fontSize: "0.75rem" }}>
            准时
          </MenuItem>
          <MenuItem value="5" sx={{ fontSize: "0.75rem" }}>
            提前 5 分钟
          </MenuItem>
          <MenuItem value="30" sx={{ fontSize: "0.75rem" }}>
            提前 30 分钟
          </MenuItem>
        </Select>

        <div className="flex justify-around">
          <Button onClick={handleReset}>重置</Button>
          <Button onClick={handleCommit}>确认</Button>
        </div>
      </Menu>
    </Fragment>
  );
};

export default memo(DTRPicker);
