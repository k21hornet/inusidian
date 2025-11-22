import { Box } from "@mui/material";
import { DecksPageProps } from "./typs";
import { DeckTable } from "@/components/base/DeckTable";
import { decksPageSx } from "./styles";

export const DecksPage = ({ decks }: DecksPageProps) => {
  return (
    <Box sx={decksPageSx}>
      <DeckTable decks={decks} />
    </Box>
  );
};
