import { Box, Button, Grid, Typography } from "@mui/material";

export default function DeckPanel() {
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

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" fullWidth>
          詳細
        </Button>
        <Button variant="contained" fullWidth>
          復習
        </Button>
      </Box>
    </Grid>
  );
}
