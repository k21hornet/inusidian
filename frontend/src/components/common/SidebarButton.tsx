"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SidebarButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push("/auth/logout");
      }}
    >
      ログアウト
    </Button>
  );
}
