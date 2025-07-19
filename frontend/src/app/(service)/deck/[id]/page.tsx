import DeckTab from "@/components/deck/DeckTab";
import { getDeck } from "@/lib/Deck";
import { Box, Typography } from "@mui/material";
import React from "react";

type Params = {
  params: Promise<{ id: number }>;
};

export default async function DeckPage({ params }: Params) {
  const { id } = await params;
  const deck = await getDeck(id);

  if (!deck) return;

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          {deck.deckName}
        </Typography>
        <Typography>{deck.deckDescription}</Typography>
      </Box>

      <DeckTab deck={deck} />
    </>
  );
}
