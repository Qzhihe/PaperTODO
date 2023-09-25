import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconButton } from "@mui/material";

import { faClover, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

import SidebarItem from "./UI/SidebarItem";

export default function Sidebar() {
  const routesUnderViews = [
    {
      label: "我的一天",
      href: "/views/today",
      icon: faCalendarCheck,
    },
    {
      label: "四象限",
      href: "/views/four-quadrant",
      icon: faClover,
    },
  ];

  return (
    <aside className="hidden flex-col h-full bg-white shadow-[1px_0_8px_0_rgba(0,0,0,0.1)] sm:flex">
      <div className="flex items-end w-full h-16 px-3">
        {false && (
          <IconButton>
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        )}
      </div>

      <ul>
        {routesUnderViews.map((route, idx) => (
          <SidebarItem value={route} key={idx} />
        ))}
      </ul>
    </aside>
  );
}
