"use client";

import { Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

export default function SidebarItem({ data }) {
  const { label, href } = data;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className={`flex h-12 ${pathname === href ? "route-active" : ""}`}>
      <Button className="w-full" onClick={() => router.replace(href)}>
        <p>{label}</p>
      </Button>
    </li>
  );
}
