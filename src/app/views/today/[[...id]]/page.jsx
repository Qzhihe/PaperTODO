import dayjs from "dayjs";
import { Fragment } from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faCircleNotch, faFlag } from "@fortawesome/free-solid-svg-icons";

import { db } from "@/lib/db";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

dayjs.extend(localizedFormat);

export default async function page({ params }) {
  let selectedTodo = null;

  if (!!params.id) {
    try {
      selectedTodo = await db.todo.findUnique({
        where: {
          id: params.id[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <main className="flex flex-grow flex-col gap-5 px-8 py-4 overflow-hidden">
        <div className="flex shrink-0 flex-col gap-y-1 p-2 bg-[#f5f5f5]">
          <div className="flex items-center gap-x-2">
            <FontAwesomeIcon className="w-6 h-6" icon={faSun} />
            <p className="text-2xl font-extrabold select-none">我的一天</p>
          </div>
          <p className="font-light select-none">
            {dayjs().locale("zh-cn").format("YYYY 年 M 月 D 日 dddd")}
          </p>
        </div>

        <TodoForm />

        <div className="flex flex-col gap-4 px-1 overflow-auto">
          <TodoList />
          {/* <Catalog title="未完成" count={undoneList.length} /> */}
        </div>
      </main>

      <div className="w-full h-full bg-white shadow-[-1px_0_8px_0_rgba(0,0,0,0.1)]">
        {!selectedTodo ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-zinc-500 select-none">点击任务以查看详情</h1>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex justify-between items-center p-4">
              <FontAwesomeIcon
                className="w-5 h-5 text-orange-500"
                icon={faCircleNotch}
              />
              <div>{dayjs(selectedTodo.date).format("MM月DD日HH:mm")}</div>
              <div>{selectedTodo.priority}</div>
            </div>
            <hr />
            <div className="p-4">
              <h1 className="text-lg font-medium">{selectedTodo.title}</h1>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
