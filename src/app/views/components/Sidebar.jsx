import fs from "fs";
import path from "path";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidebarItem from './UI/SidebarItem'

export default function Sidebar() {
  const viewsPath = path.join(process.cwd(), "src/app/views");
  const viewsDir = fs.readdirSync(viewsPath);

  const routesUnderViews = viewsDir.reduce((prev, cur) => {
    if (/\.jsx$/.test(cur) || /components/.test(cur)) {
      return prev;
    }

    prev.push({
      label: cur,
      href: `/views/${cur}`,
    });
    
    return prev;
  }, []);

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
