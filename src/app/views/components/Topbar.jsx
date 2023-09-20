import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Avatar from "./UI/Avater";
import SearchInput from "./UI/SearchInput";
import { useServerSession } from "@/lib/auth";

export default async function Topbar() {
  const session = await useServerSession();

  return (
    <header className="col-span-3 flex justify-between items-center gap-4 h-12 px-5 shadow-none bg-orange-500 z-10">
      <h1 className="flex-none text-white text-2xl select-none">Paper TODO</h1>
      <div className="flex flex-1 items-center max-w-[50%] h-10 p-2 bg-white rounded">
        <FontAwesomeIcon
          className="w-6 h-6 text-orange-500 rotate-90"
          icon={faMagnifyingGlass}
        />
        <SearchInput />
      </div>
      <Avatar className="w-10 h-10" src={session?.user?.image} />
    </header>
  );
}
