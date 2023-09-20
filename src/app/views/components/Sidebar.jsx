import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidebarItem from "./UI/SidebarItem";

export default function Sidebar() {
  const routesUnderViews = [
    {
      label: "我的一天",
      href: "/views/today",
    },
    {
      label: "四象限",
      href: "/views/four-quadrant",
    },
  ];

  return (
    <aside className="flex flex-col min-w-[10rem] h-full bg-white shadow-[1px_0_8px_0_rgba(0,0,0,0.1)]">
      <div className="flex items-end w-full h-16 px-3">
        {false && (
          <IconButton>
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        )}
      </div>

      <ul>
        {routesUnderViews.map((route, idx) => (
          <SidebarItem data={route} key={idx} />
        ))}
      </ul>
    </aside>
  );
}
