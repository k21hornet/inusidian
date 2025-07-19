import DeckTab from "@/components/deck/DeckTab";
import { getDeck } from "@/features/Deck";
import { Box, Typography } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <StyleIcon sx={{ fontSize: "24px", mr: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {deck.deckName}
          </Typography>
        </Box>
        <Typography sx={{ color: "text.secondary" }}>
          {deck.deckDescription}
        </Typography>
      </Box>

      <DeckTab deck={deck} />
    </>
  );
}
