import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { DashboardPageProps } from "./typs";
import { DeckTable } from "./DeckTable";
import {
  dashboardPageSx,
  deckListSx,
  deckListHeaderSx,
  deckListTitleSx,
  deckListEmptySx,
  dashboardReportSx,
  dashboardReportBoxSx,
  dashboardReportBoxOverlaySx,
  dashboardReportBoxImgSx,
} from "./styles";
import { Button } from "@/components/ui/button";

export default function DashboardPage({ decks }: DashboardPageProps) {
  return (
    <Box sx={dashboardPageSx}>
      <Box sx={deckListSx}>
        <Box sx={deckListHeaderSx}>
          <Typography sx={deckListTitleSx}>デッキ一覧</Typography>
          <Button component={Link} href="/deck/create" buttonDesign="secondary">
            デッキ作成
          </Button>
        </Box>
        {decks.length > 0 ? (
          <DeckTable decks={decks} />
        ) : (
          <Box sx={deckListEmptySx}>デッキを作成しましょう！</Box>
        )}
      </Box>

      <Box
        sx={{
          ...dashboardReportSx,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          marginBottom: "24px",
        }}
      >
        <Box sx={dashboardReportBoxSx}>
          <Box
            component="img"
            sx={dashboardReportBoxImgSx}
            src="/sample1.png"
            alt="report"
          />
          <Typography sx={dashboardReportBoxOverlaySx}>
            Comming soon...
          </Typography>
        </Box>
        <Box sx={dashboardReportBoxSx}>
          <Box
            component="img"
            sx={dashboardReportBoxImgSx}
            src="/sample2.png"
            alt="report"
          />
          <Typography sx={dashboardReportBoxOverlaySx}>
            Comming soon...
          </Typography>
        </Box>
        <Box sx={dashboardReportBoxSx}>
          <Box
            component="img"
            sx={dashboardReportBoxImgSx}
            src="/sample3.png"
            alt="report"
          />
          <Typography sx={dashboardReportBoxOverlaySx}>
            Comming soon...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
