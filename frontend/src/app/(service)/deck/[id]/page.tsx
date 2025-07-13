import DeckTab from "@/components/deck/DeckTab";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function DeckPage() {
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          デッキ名
        </Typography>
        <Typography>デッキ説明文デッキ説明文デッキ説明文</Typography>
      </Box>

      <DeckTab />
    </>
  );
}
