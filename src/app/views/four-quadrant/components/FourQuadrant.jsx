"use client";

import { useTodoContext } from "@/contexts/TodoContext";
import { getPriorityMark, getPriorityTitle } from "@/lib/priorityUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Card } from "@mui/material";
import { Fragment } from "react";
import TodoList from "../../today/components/TodoList";

export default function FourQuadrant() {
    const { todos } = useTodoContext();
    const getTodosByPriority = (priority) => {
        if (todos.length === 0) {
            return [];
        }
        return todos.filter(
            (item) => !item.isDone && item.priority === priority
        );
    };
    return (
        <Fragment>
            <div className="grid grid-rows-2 grid-cols-2 place-items-center gap-4 p-6 overflow-hidden h-full">
                <Quadrant priority={3} data={getTodosByPriority(3)}></Quadrant>
                <Quadrant priority={2} data={getTodosByPriority(2)}></Quadrant>
                <Quadrant priority={1} data={getTodosByPriority(1)}></Quadrant>
                <Quadrant priority={0} data={getTodosByPriority(0)}></Quadrant>
            </div>
        </Fragment>
    );
}

const Quadrant = (props) => {
    const { priority, data } = props;
    // const { todos } = useTodoContext();
    const title = getPriorityMark(priority);
    const titleEn = getPriorityTitle(priority, "en");
    return (
        <Fragment>
            <Card className="flexm w-full h-full">
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
                        />
                    </div>
                    <div className="flex flex-col h-full overflow-auto">
                        {data.length === 0 ? (
                            <p className="m-auto text-zinc-400">没有任务</p>
                        ) : (
                            <TodoList data={data} />
                        )}
                    </div>
                </div>
            </Card>
        </Fragment>
    );
};
