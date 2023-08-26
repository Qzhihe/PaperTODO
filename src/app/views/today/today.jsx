import dayjs from "dayjs";
import styled from "styled-components";
import TodoList from "../components/TodoList";
import { StoreContext } from "../store/store";
import { sendRequest } from "../utils/request";
import DTRPicker from "../components/DTRPicker";
import { getCalendarDate } from "../utils/date";
import { getPriorityProp } from "../utils/priority";
import { useState, Fragment, useContext } from "react";
import PriorityPicker from "../components/PriorityPicker";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { addTodo, deleteTodo, updateTodo } from "../api/todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Card,
  Slide,
  Dialog,
  Button,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  TextareaAutosize,
} from "@mui/material";
import {
  faPlus,
  faFlag,
  faTrashCan,
  faCircleNotch,
  faCircleCheck,
  faChevronDown,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

dayjs.extend(localizedFormat);

const defaultNextTodo = {
  title: "",
  date: null,
  alarm: null,
  priority: 0,
  isDone: false,
  category: null,
  description: "",
};

const TodayPage = (props) => {
  const { store, setStore } = useContext(StoreContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [cpltIcon, setCpltIcon] = useState(faCircleNotch);
  const [nextTodo, setNextTodo] = useState(defaultNextTodo);
  const [selectedTodo, setSelectedTodo] = useState(defaultNextTodo);
  const [priorityPickerHandler, setPriorityPickerHandler] = useState(null);
  const [dtrPickerHandler, setDTRPickerHandler] = useState(null);

  const todoList = store.todoList;
  const doneList = todoList.filter((item) => item.isDone);
  const undoneList = todoList.filter((item) => !item.isDone);

  function handleTitleChange(ev) {
    setNextTodo({ ...nextTodo, title: ev.target.value });
  }

  // PriorityPicker
  function handlePriorityPickerOpen(state, setter) {
    return (ev) => {
      setPriorityPickerHandler({
        state: { ...state },
        setter,
        anchor: ev.target,
      });
    };
  }

  function handlePriorityPickerShut() {
    setPriorityPickerHandler(null);
  }

  function handlePriorityChange(priority) {
    const { state, setter } = priorityPickerHandler;

    setter({ ...state, priority });
  }

  // DTRPicker
  function handleDTRPickerOpen(state, setter) {
    return (ev) => {
      setDTRPickerHandler({
        state: { ...state },
        setter,
        anchor: ev.target,
      });
    };
  }

  function handleDTRPickerClose(oldValue) {
    const { setter } = dtrPickerHandler;

    setter({ ...oldValue });
    setDTRPickerHandler(null);
  }

  function handleDTRPickerCommit() {
    setDTRPickerHandler(null);
  }

  function handleDateTimeChange(newValue) {
    const { state, setter } = dtrPickerHandler,
      { date, alarm } = newValue;

    setter({ ...state, date, alarm });
    setDTRPickerHandler({
      ...dtrPickerHandler,
      state: { ...state, date, alarm },
    });
  }

  function handleReminderChange(newValue) {
    const { state, setter } = dtrPickerHandler,
      alarm = newValue;

    setter({ ...state, alarm });
    setDTRPickerHandler({
      ...dtrPickerHandler,
      state: { ...state, alarm },
    });
  }

  function handleDTRPickerReset() {
    const { state, setter } = dtrPickerHandler;

    setter({ ...state, date: null, alarm: null });
    setDTRPickerHandler({
      ...dtrPickerHandler,
      state: { ...state, date: null, alarm: null },
    });
  }

  async function handleInputEnter(ev) {
    if (ev.key === "Enter" && nextTodo.title) {
      try {
        const result = await addTodo(nextTodo);

        const currentList = [{ ...nextTodo, id: result.data }, ...todoList];
        setStore((prev) => ({ ...prev, todoList: currentList }));

        setNextTodo(defaultNextTodo);
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function handleCplt(todo) {
    const { date, id, ...others } = todo;
    const payload = {
      ...others,
      scheId: id,
      sTime: date && date.toJSON(),
    };
    try {
      const data = await sendRequest({
        method: "PUT",
        url: "/schedule",
        data: payload,
      });
      if (data.code === 20000) {
        const updatedTodoList = todoList.reduce((prev, cur) => {
          if (cur.id === todo.id) {
            prev.push(todo);
          } else {
            prev.push(cur);
          }
          return prev;
        }, []);
        setStore((prev) => ({ ...prev, todoList: updatedTodoList }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleSelectTodo(todo) {
    setShowDetail(true);
    setCpltIcon(todo.isDone ? faCircleCheck : faCircleNotch);
    setSelectedTodo(todo);
  }

  function handleDetialTitleChange(event) {
    let newTitle = event.target.value;
    if (newTitle.length > 15) {
      return;
    }
    setSelectedTodo({ ...selectedTodo, title: newTitle });
  }

  function handleDetailDescChange(event) {
    let newDesc = event.target.value;
    if (newDesc.length > 250) {
      return;
    }
    setSelectedTodo({ ...selectedTodo, description: newDesc });
  }

  function handleDetailCplt() {
    setSelectedTodo({ ...selectedTodo, isDone: !selectedTodo.isDone });
    setCpltIcon(cpltIcon === faCircleCheck ? faCircleNotch : faCircleCheck);
  }

  function makeConfirm() {
    setOpenDialog(true);
  }

  async function handleDetialDelete() {
    try {
      const result = await deleteTodo(selectedTodo);

      if (result) {
        const deletedTodoList = todoList.filter(
          (item) => item.id !== selectedTodo.id
        );

        setStore((prev) => ({ ...prev, todoList: deletedTodoList }));

        setShowDetail(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit() {
    try {
      if (!selectedTodo.title) {
        return;
      }
      const result = await updateTodo(selectedTodo);

      if (result) {
        const updatedTodoList = todoList.reduce((prev, cur) => {
          cur.id === selectedTodo.id ? prev.push(selectedTodo) : prev.push(cur);
          return prev;
        }, []);

        setStore((prev) => ({ ...prev, todoList: updatedTodoList }));

        setShowDetail(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleCancel() {
    setShowDetail(false);
  }

  return (
    <Fragment>
      <Box
        id="container"
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          overflow: "hidden",
          "@media (max-width: 900px)": {
            gridArea: "2 / 2 / 2 / 2",
          },
        }}
      >
        <Box
          id="todolistcontainer"
          sx={{
            display: "flex",
            flexGrow: 1,
            flexFlow: "column nowrap",
            gap: "1.25rem",
            padding: "1rem 2rem",
          }}
        >
          <Card
            id="info"
            sx={{
              display: "flex",
              flexShrink: "0",
              flexFlow: "column nowrap",
              padding: "8px",
              boxShadow: "none",
              backgroundColor: "rgb(245, 245, 245)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexFlow: "row nowrap",
                alignItems: "center",
                gap: "0 0.5rem",
              }}
            >
              <Box>
                <FontAwesomeIcon icon={faSun} size="xl" />
              </Box>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  userSelect: "none",
                }}
              >
                我的一天
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: "100",
                userSelect: "none",
              }}
            >
              {dayjs().locale("zh-cn").format("YYYY 年 M 月 D 日 dddd")}
            </Typography>
          </Card>

          <Card
            sx={{
              flexShrink: "0",
              padding: "0 1.25rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "3.5rem",
              }}
            >
              <Box>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ color: "rgb(255, 128, 0)" }}
                />
              </Box>
              <Input
                name="title"
                value={nextTodo.title}
                onKeyDown={handleInputEnter}
                onChange={handleTitleChange}
                placeholder="添加任务"
              />
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Box component="ul" sx={{ display: "flex", gap: "0 0.75rem" }}>
                <Box component="li" sx={{ display: "block" }}>
                  <Tooltip
                    title={
                      getPriorityProp(nextTodo.priority, "title") ??
                      "设置优先级"
                    }
                  >
                    <IconButton
                      onClick={handlePriorityPickerOpen(nextTodo, setNextTodo)}
                    >
                      <FontAwesomeIcon
                        size="2xs"
                        icon={faFlag}
                        color={`rgb(${getPriorityProp(
                          nextTodo.priority,
                          "color"
                        )})`}
                        style={{
                          pointerEvents: "none",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box component="li" sx={{ display: "block" }}>
                  <Tooltip title={getCalendarDate(nextTodo.date) ?? "设置时间"}>
                    <IconButton
                      onClick={handleDTRPickerOpen(nextTodo, setNextTodo)}
                    >
                      <FontAwesomeIcon
                        size="2xs"
                        icon={faCalendarDays}
                        color={nextTodo.date ? "rgb(255, 128, 0)" : "#a2a2a2"}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Card>

          <Box
            sx={{
              display: "flex",
              flexFlow: "column nowrap",
              gap: "1rem",
              overflow: "auto",
            }}
          >
            <Catalog title="未完成" count={undoneList.length} />
            <TodoList
              data={undoneList}
              onHandleSelectTodo={handleSelectTodo}
              onHandleCplt={handleCplt}
            />

            <Catalog title="已完成" count={doneList.length} />
            <TodoList
              data={doneList}
              onHandleSelectTodo={handleSelectTodo}
              onHandleCplt={handleCplt}
            />
          </Box>
        </Box>

        {showDetail && (
          <Slide direction="left" in>
            <Card
              id="detialcontainer"
              className="flex flex-col"
              sx={{
                width: "30%",
                height: "100%",
                padding: "1rem",
                backgroundColor: "rgb(255, 255, 255)",
              }}
            >
              <Box
                id="detial"
                sx={{
                  width: "100%",
                  height: "4rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <Tooltip
                  title={
                    selectedTodo && selectedTodo.isDone ? "已完成" : "未完成"
                  }
                >
                  <IconButton onClick={handleDetailCplt}>
                    <FontAwesomeIcon
                      size="sm"
                      icon={selectedTodo.isDone ? faCircleCheck : faCircleNotch}
                      color={
                        selectedTodo ? "rgb(255, 128, 0)" : "rgb(162, 162, 162)"
                      }
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={selectedTodo && getCalendarDate(selectedTodo.date)}
                >
                  <IconButton
                    onClick={handleDTRPickerOpen(selectedTodo, setSelectedTodo)}
                  >
                    <FontAwesomeIcon
                      size="sm"
                      icon={faCalendarDays}
                      color={
                        selectedTodo && selectedTodo.date
                          ? getCalendarDate(selectedTodo.date) === "过期"
                            ? "rgb(224, 49, 48)"
                            : "rgb(71, 114, 249)"
                          : "rgb(162, 162, 162)"
                      }
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    selectedTodo &&
                    getPriorityProp(selectedTodo.priority, "title")
                  }
                >
                  <IconButton
                    onClick={handlePriorityPickerOpen(
                      selectedTodo,
                      setSelectedTodo
                    )}
                  >
                    <FontAwesomeIcon
                      size="sm"
                      icon={faFlag}
                      color={
                        selectedTodo
                          ? `rgb(${getPriorityProp(
                              selectedTodo.priority,
                              "color"
                            )})`
                          : "rgb(162, 162, 162)"
                      }
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title={selectedTodo && "删除"}>
                  <IconButton onClick={makeConfirm}>
                    <FontAwesomeIcon
                      size="sm"
                      icon={faTrashCan}
                      color={selectedTodo ? "gray" : "rgb(162, 162, 162)"}
                    />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box
                id="title"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  height: "4rem",
                }}
              >
                <Input
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                  value={selectedTodo && selectedTodo.title}
                  onChange={handleDetialTitleChange}
                />
              </Box>

              <Box
                id="description"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  gap: "10px",
                  width: "100%",
                  maxHeight: "60%",
                }}
              >
                <TextareaAutosize
                  maxRows="17"
                  style={{
                    width: "100%",
                    fontSize: "0.875rem",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    padding: "12px",
                    borderRadius: "12px 12px 0 12px",
                    color: "#24292f",
                    background: "#fff",
                    border: "1px solid #d0d7de",
                    boxShadow: "0px 2px 2px #f6f8fa",

                    "&:hover": {
                      borderColor: "#3399FF",
                    },

                    "&:focus": {
                      borderColor: "#3399FF",
                      boxShadow: "0 0 0 3px #b6daff",
                    },

                    "&:focusVisible": {
                      outline: "0",
                    },
                  }}
                  value={selectedTodo ? selectedTodo.description : ""}
                  onChange={handleDetailDescChange}
                />
              </Box>

              <Typography
                component="p"
                style={{
                  fontSize: "5px",
                  display: "inline-block",
                  textAlign: "right",
                }}
              >
                {selectedTodo.description.length}/250
              </Typography>

              <Box
                id="submitbtn"
                sx={{
                  marginTop: "10px",
                  width: "100%",
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={handleCancel}
                  sx={{
                    width: "40%",
                    color: "black",
                  }}
                >
                  取消
                </Button>

                <Button
                  onClick={handleSubmit}
                  sx={{
                    width: "40%",
                    color: "black",
                  }}
                >
                  保存
                </Button>
              </Box>
            </Card>
          </Slide>
        )}
      </Box>

      {priorityPickerHandler && (
        <PriorityPicker
          anchorEl={priorityPickerHandler.anchor}
          open={!!priorityPickerHandler}
          value={priorityPickerHandler.state}
          onClick={handlePriorityPickerShut}
          onClose={handlePriorityPickerShut}
          onPriorityChange={handlePriorityChange}
        />
      )}

      {dtrPickerHandler && (
        <DTRPicker
          anchorEl={dtrPickerHandler.anchor}
          open={!!dtrPickerHandler}
          value={dtrPickerHandler.state}
          onClose={handleDTRPickerClose}
          onReset={handleDTRPickerReset}
          onCommit={handleDTRPickerCommit}
          onDateTimeChange={handleDateTimeChange}
          onReminderChange={handleReminderChange}
        />
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>确定要删除该日程吗？</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            取消
          </Button>
          <Button
            onClick={() => {
              setOpenDialog(false);
              handleDetialDelete();
            }}
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default TodayPage;

const Catalog = (props) => {
  const { title, count } = props;
  return (
    <Fragment>
      <Card
        sx={{
          display: "flex",
          boxShadow: "none",
          backgroundColor: "rgb(245, 245, 245)",
          overflow: "visible",
        }}
      >
        <Box
          onClick={() => {}}
          sx={{
            display: "grid",
            gridTemplate: "1fr / auto auto auto",
            columnGap: "12px",
            width: "fit-content",
            userSelect: "none",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faChevronDown} size="lg" />
          <Typography>{title}</Typography>
          <Typography>{count}</Typography>
        </Box>
      </Card>
    </Fragment>
  );
};

const Input = styled.input`
  width: 100%;

  margin-left: 16px;

  border: none;
  outline: none;

  font-size: 1rem;
  line-height: 1.5rem;

  ::placeholder {
    color: rgb(255, 128, 0);
  }

  :focus::placeholder {
    color: rgb(0, 0, 0);
  }
`;
