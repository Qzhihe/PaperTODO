"use client";

import { useRouter, usePathname } from "next/navigation";

import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarItem({ value: { label, href, icon } }) {
  const router = useRouter();
  const pathname = usePathname();

  function handleRouteChange() {
    router.replace(href);
  }

  return (
    <li
      className={`flex h-12 text-zinc-500 ${pathname.startsWith(href) ? "route-active" : ""}`}
    >
      <Button
        onClick={handleRouteChange}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderRadius: "none",
          color: "inherit",
          ":hover": {
            backgroundColor: "#f973161a",
          },
          "@media (min-width: 768px)": {
            justifyContent: "start"
          }
        }}
      >
        <FontAwesomeIcon className="text-inherit" size="xl" icon={icon} />
        <p className="hidden ml-2 text-black font-normal md:block">{label}</p>
      </Button>
    </li>
  );
}
