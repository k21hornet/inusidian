import { Box, Typography } from "@mui/material";
import { DeckTable } from "@/components/base/DeckTable";
import {
  homePageSx,
  homeReportSx,
  homeReportBoxSx,
  homeReportBoxImgSx,
  homeReportBoxOverlaySx,
} from "./styles";
import { Deck } from "@/type";

export type HomePageProps = {
  decks: Deck[];
};

export default function HomePage({ decks }: HomePageProps) {
  return (
    <Box sx={homePageSx}>
      <DeckTable decks={decks} />

      <Box sx={homeReportSx}>
        <Box sx={homeReportBoxSx}>
          <Box
            component="img"
            sx={homeReportBoxImgSx}
            src="/sample1.png"
            alt="report"
          />
          <Typography sx={homeReportBoxOverlaySx}>Comming soon...</Typography>
        </Box>
        <Box sx={homeReportBoxSx}>
          <Box
            component="img"
            sx={homeReportBoxImgSx}
            src="/sample2.png"
            alt="report"
          />
          <Typography sx={homeReportBoxOverlaySx}>Comming soon...</Typography>
        </Box>
        <Box sx={homeReportBoxSx}>
          <Box
            component="img"
            sx={homeReportBoxImgSx}
            src="/sample3.png"
            alt="report"
          />
          <Typography sx={homeReportBoxOverlaySx}>Comming soon...</Typography>
        </Box>
      </Box>
    </Box>
  );
}
