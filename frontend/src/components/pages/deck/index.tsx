import { Box, Typography } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import DeckTab from "@/components/pages/deck/DeckTab";
import { DeckPageProps } from "./type";

export default function DeckPage({ deck }: DeckPageProps) {
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {deck.deckName}
        </Typography>

        <Box
          sx={{
            display: { sx: "block", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <StyleIcon sx={{ fontSize: "16px", mr: 1 }} />
            <Typography>{deck.deckDescription}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <InfoOutlineIcon sx={{ fontSize: "16px" }} />
            <Typography>{deck.cards.length}枚のカードを作成済み</Typography>
          </Box>
        </Box>
      </Box>

      <DeckTab deck={deck} />
    </>
  );
}
