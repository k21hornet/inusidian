"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { userIconImgSx, userIconSx } from "./styles";

export const UserIcon = () => {
  const router = useRouter();

  return (
    <Box sx={userIconSx}>
      <NotificationsNoneIcon sx={{ fontSize: 32 }} />
      <Box
        component="img"
        src="/user-icon.svg"
        alt="logo"
        sx={userIconImgSx}
        onClick={() => {
          router.push("/auth/logout");
        }}
      />
    </Box>
  );
};
