import { Box, Typography } from "@mui/material";
import React from "react";

export default function Congratulations() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h3">Congratulations!</Typography>
      <Typography sx={{ color: "text.secondary" }}>
        今日の課題は全て達成しました！
      </Typography>
    </Box>
  );
}
