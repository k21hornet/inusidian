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
          <Link style={spMenuLinkSx} href="/dashboard">
            Home
          </Link>
          <Divider />
          <Link style={spMenuLinkSx} href="/decks">
            Decks
          </Link>
          <Divider />
          <Link style={spMenuLinkSx} href="/reviews">
            Review
          </Link>
          <Divider />
          <Link style={spMenuLinkSx} href="/about">
            About
          </Link>
        </Box>
      </Drawer>
    </>
  );
};
