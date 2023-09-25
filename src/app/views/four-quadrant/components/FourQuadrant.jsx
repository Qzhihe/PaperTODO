"use client";

import { useTodoContext } from "@/contexts/TodoContext";
import { getPriorityMark, getPriorityTitle } from "@/lib/priorityUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Fragment, useReducer } from "react";
import TodoList from "../../today/components/TodoList";
import { reducer, Todo } from "@/lib/Todo";
import { useState } from "react";
import TitleInput from "../../today/components/TitleInput";
import PriorityPicker from "../../today/components/PriorityPicker";
import DatePicker from "../../today/components/DatePicker";
import ReminderPicker from "../../today/components/ReminderPicker";
import { getSession } from "next-auth/react";
import axios from "axios";
import dayjs from "dayjs";

import { FormContext } from "../../today/components/TodoForm";

export default function FourQuadrant() {
    return (
        <Fragment>
            <div className="md:grid md:grid-rows-2 md:grid-cols-2 place-items-center gap-4 p-6 overflow-hidden h-full grid grid-rows-4 grid-cols-1">
                <Quadrant priority={3}></Quadrant>
                <Quadrant priority={2}></Quadrant>
                <Quadrant priority={1}></Quadrant>
                <Quadrant priority={0}></Quadrant>
            </div>
        </Fragment>
    );
}

const Quadrant = (props) => {
    const { priority } = props;
    const { todos, setTodos } = useTodoContext();
    const [newTodo, dispatch] = useReducer(reducer, new Todo());
    const [open, setOpen] = useState(false);
    const getTodosByPriority = (priority) => {
        if (todos.length === 0) {
            return [];
        }
        return todos.filter(
            (item) => !item.isDone && item.priority === priority
        );
    };
    const title = getPriorityMark(priority),
        titleEn = getPriorityTitle(priority, "en"),
        data = getTodosByPriority(priority);
    const handleAdd = () => {
        console.log(priority);
        dispatch({ type: "changed_priority", nextPriority: priority });
        setOpen(true);
    };
    const handleDialogClose = () => {
        dispatch({ type: "commited_form" });
        setOpen(false);
    };
    const handleDialogConfirm = async (ev) => {
        ev.preventDefault();

        const session = await getSession();
        const { data } = await axios.post("/api/todo", {
            userId: session?.user?.id,
            timestamp: dayjs().locale("zh-cn"),
            ...newTodo,
        });
        setTodos([data, ...todos]);

        dispatch({ type: "commited_form" });
        setOpen(false);
    };
    return (
        <Fragment>
            <Card className="flex w-full h-full">
                <div className="flex flex-col gap-4 w-full p-4 bg-[#fafafa]">
                    <div className="flex items-center gap-4 h-5">
                        <FontAwesomeIcon
                            icon={faFlag}
                            className={`w-4 h-4 priority-${titleEn}`}
                        />
                        <p className={`text-priority-${priority} grow`}>
                            {title}
                        </p>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className={`text-priority-${priority} cursor-pointer shrink`}
                            size="lg"
                            onClick={handleAdd}
                        />
                    </div>
                    <div className="flex flex-col h-full overflow-auto">
                        {data.length === 0 ? (
                            <p className="m-auto text-zinc-400">没有任务</p>
                        ) : (
                            <TodoList filters={{ priority, isDone: false }} />
                        )}
                    </div>
                </div>
            </Card>

            <FormContext.Provider value={dispatch}>
                <Dialog open={open} onClose={handleDialogClose}>
                    <DialogTitle>新日程</DialogTitle>
                    <DialogContent>
                        <TitleInput initialTitle={newTodo.title} />
                        <hr />
                        <div className="flex items-center h-8">
                            <ul className="flex gap-x-3">
                                <li>
                                    <PriorityPicker
                                        initialPriority={newTodo.priority}
                                    />
                                </li>
                                <li>
                                    <DatePicker
                                        originReminder={newTodo.reminder}
                                        initialDate={newTodo.date}
                                    />
                                </li>
                                <li>
                                    <ReminderPicker
                                        originDate={newTodo.date}
                                        initialReminder={newTodo.reminder}
                                    />
                                </li>
                            </ul>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>取消</Button>
                        <Button onClick={handleDialogConfirm}>确认</Button>
                    </DialogActions>
                </Dialog>
            </FormContext.Provider>
        </Fragment>
    );
};
