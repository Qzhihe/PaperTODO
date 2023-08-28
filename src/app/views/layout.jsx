import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import TodoProvider from "@/contexts/TodoContext";

export default async function Layout({ children }) {
  return (
    <TodoProvider>
      <div className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] w-full h-full shadow-none bg-[#f5f5f5]">
        <Topbar />
        <Sidebar />

        {children}
      </div>
    </TodoProvider>
  );
}
