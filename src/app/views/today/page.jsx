import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSun } from "@fortawesome/free-regular-svg-icons";
import {
  Box,
  Card,
  Typography,
  Divider,
  Tooltip,
  Catalog,
} from "@mui/material";
import {
  faTrashCan,
  faCircleNotch,
  faCircleCheck,
  faChevronDown,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

dayjs.extend(localizedFormat);

export default async function page() {
  return (
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
  );
}
