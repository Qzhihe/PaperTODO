"use client";

import { signOut } from "next-auth/react";
import { Fragment, useState } from "react";

import { Avatar as MuiAvatar, Popover, Button } from "@mui/material";

export default function Avatar({ className = "", src = "" }) {
  const [anchor, setAnchor] = useState(null);

  function handleContextMenu(ev) {
    ev.preventDefault();

    setAnchor(ev.target);
  }

  return (
    <Fragment>
      <MuiAvatar
        className={className}
        src={src}
        onContextMenu={handleContextMenu}
      />
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="flex flex-col w-max">
          <Button
            onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
          >
            退出登录
          </Button>
        </div>
      </Popover>
    </Fragment>
  );
}
