import { Deck } from "@/type";
import { Box, Typography } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  deckButtonsRightSx,
  deckButtonsSx,
  deckInfoIconSx,
  deckInfoSx,
  deckPageDetailsSx,
  deckPageHeaderSx,
  deckPageSx,
  deckStyleIconSx,
} from "./styles";
import { Button } from "@/components/ui/Button";
import CardList from "@/components/base/Card/CardList";
import Link from "next/link";

type Props = {
  deck: Deck;
};

export const DeckPage = ({ deck }: Props) => {
  return (
    <>
      <Box sx={deckPageSx}>
        <Typography variant="h5" sx={deckPageHeaderSx}>
          {deck.deckName}
        </Typography>

        <Box sx={deckPageDetailsSx}>
          <Box sx={deckInfoSx}>
            <StyleIcon sx={deckStyleIconSx} />
            <Typography>{deck.deckDescription}</Typography>
          </Box>
          <Box sx={deckInfoSx}>
            <InfoOutlineIcon sx={deckInfoIconSx} />
            <Typography>{deck.cards.length}枚のカードを作成済み</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={deckButtonsSx}>
        <Box sx={{ width: { xs: "100%", md: "auto" } }}>
          <Button
            component={Link}
            href={`/decks/${deck.id}/review`}
            variant="contained"
            buttonDesign="secondary"
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            復習する
          </Button>
        </Box>

        <Box sx={deckButtonsRightSx}>
          <Button
            component={Link}
            href={`/decks/${deck.id}/cards/create`}
            variant="outlined"
            buttonDesign="secondary"
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            カード作成
          </Button>
          <Button
            component={Link}
            href={`/decks/${deck.id}/settings`}
            variant="outlined"
            buttonDesign="secondary"
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            デッキ設定
          </Button>
        </Box>
      </Box>

      <CardList deck={deck} />
    </>
  );
};
