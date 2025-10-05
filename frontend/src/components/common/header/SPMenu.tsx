"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { Box, Divider, Drawer } from "@mui/material";
import { useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";

export const SPMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <MenuIcon onClick={toggleDrawer(true)} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box className={styles["sp-menu"]}>
          <Link className={styles["sp-menu__link"]} href="/dashboard">
            Home
          </Link>
          <Divider />
          <Link className={styles["sp-menu__link"]} href="/decks">
            Decks
          </Link>
          <Divider />
          <Link className={styles["sp-menu__link"]} href="/review-list">
            Review
          </Link>
          <Divider />
          <Link className={styles["sp-menu__link"]} href="/about">
            About
          </Link>
        </Box>
      </Drawer>
    </>
  );
};
