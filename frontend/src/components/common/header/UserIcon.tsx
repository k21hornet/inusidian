"use client";

import { Box } from "@mui/material";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export const UserIcon = () => {
  const router = useRouter();

  return (
    <Box className={styles["user-icon"]}>
      <NotificationsNoneIcon sx={{ fontSize: 32 }} />
      <Box
        component="img"
        src="/user-icon.svg"
        alt="logo"
        className={styles["user-icon__img"]}
        onClick={() => {
          router.push("/auth/logout");
        }}
      />
    </Box>
  );
};
