"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function DeckPanel() {
  const router = useRouter();

  const handleDetailClick = () => {
    router.push(`/deck/1`);
  };

  const handleReviewClick = () => {
    router.push(`/deck/1/review`);
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
          タイトル
        </Typography>
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          デッキ説明文デッキ説明文デッキ説明文デッキデッキ説明文デッキ説明文デッキ説明文デッキ
        </Typography>
      </Box>

      <Button variant="contained" fullWidth onClick={handleDetailClick}>
        勉強する
      </Button>
    </Grid>
  );
}
