"use client";

import { Deck } from "@/type/index";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  deck: Deck;
};

export default function DeckPanel({ deck }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/deck/${deck.id}`);
  };

  return (
    <Grid
      size={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 160,
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        bgcolor: "#fff",
        borderColor: "divider",
      }}
    >
      <Box>
        <Typography gutterBottom sx={{ fontWeight: "bold" }}>
          {deck.deckName}
        </Typography>
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {deck.deckDescription}
        </Typography>
      </Box>

      <Button variant="contained" fullWidth onClick={handleClick}>
        勉強する
      </Button>
    </Grid>
  );
}
