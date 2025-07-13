import DeckPanel from "@/components/deck/DeckPanel";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

export default function Dashboard() {
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid
            size={6}
            sx={{
              height: 200,
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              bgcolor: "#fff",
              borderColor: "divider",
            }}
          ></Grid>
          <Grid
            size={6}
            sx={{
              height: 200,
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              bgcolor: "#fff",
              borderColor: "divider",
            }}
          ></Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h5">デッキ一覧</Typography>
          <Button variant="contained">デッキ作成</Button>
        </Box>
        <Grid container spacing={2}>
          <DeckPanel />
          <DeckPanel />
          <DeckPanel />
          <DeckPanel />
        </Grid>
      </Box>
    </Box>
  );
}
