"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { Box, Divider, Drawer } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { spMenuLinkSx, spMenuSx } from "./styles";

export const SPMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <MenuIcon onClick={toggleDrawer(true)} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={spMenuSx}>
          <Link style={spMenuLinkSx} href="/home">
            ホーム
          </Link>
          <Divider />
          <Link style={spMenuLinkSx} href="/decks">
            デッキ一覧
          </Link>
          <Divider />
          <Link style={spMenuLinkSx} href="/statistics">
            統計
          </Link>
          <Divider />
          <Link style={spMenuLinkSx} href="/learning-goals">
            学習目標
          </Link>
        </Box>
      </Drawer>
    </>
  );
};
