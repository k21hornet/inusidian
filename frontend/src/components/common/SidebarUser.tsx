"use client";

import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";

export default function SidebarUser() {
  const router = useRouter();

  return (
    <Box
      onClick={() => {
        router.push("/auth/logout");
      }}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <AccountCircleIcon sx={{ width: 36, height: 36, mr: 1 }} />
        <Box>
          <Typography>Smith01</Typography>
          <Typography sx={{ fontSize: 13 }}>01@smith.com</Typography>
        </Box>
      </Box>
      <MoreVertIcon />
    </Box>
  );
}
