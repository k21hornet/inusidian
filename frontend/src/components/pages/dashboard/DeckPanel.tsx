import { Box, Grid, Typography } from "@mui/material";
import { DeckPanelProps } from "./typs";
import { PrimaryButton } from "@/components/ui/button/primary-button";
import Link from "next/link";

export default function DeckPanel({ deck }: DeckPanelProps) {
  return (
    <Grid
      size={{ xs: 12, sm: 6, md: 4 }}
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

      <PrimaryButton component={Link} href={`/deck/${deck.id}`}>
        勉強する
      </PrimaryButton>
    </Grid>
  );
}
