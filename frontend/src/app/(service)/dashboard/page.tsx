import DeckPanel from "@/components/deck/DeckPanel";
import { getAllDecks } from "@/lib/Deck";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default async function Dashboard() {
  const decks = await getAllDecks();

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
          <Button variant="contained" component={Link} href="/deck/create">
            デッキ作成
          </Button>
        </Box>
        <Grid container spacing={2}>
          {decks.map((deck) => (
            <DeckPanel key={deck.id} deck={deck} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
