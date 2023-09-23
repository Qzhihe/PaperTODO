"use client";

import { Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

export default function SidebarItem({ data }) {
  const { label, href } = data;

  const router = useRouter();
  const pathname = usePathname();

  function handleRouteChange() {
    router.replace(href);
  }

  return (
    <li
      className={`flex h-12 ${pathname.startsWith(href) ? "route-active" : ""}`}
    >
      <Button
        onClick={handleRouteChange}
        sx={{
          display: "flex",
          justifyContent: "start",
          width: "100%",
          borderRadius: "none",
          color: "black",
          ":hover": {
            backgroundColor: "#f973161a",
          },
        }}
      >
        <p>{label}</p>
      </Button>
    </li>
  );
}
