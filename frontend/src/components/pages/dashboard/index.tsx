import { Box, Typography } from "@mui/material";
import { DashboardPageProps } from "./typs";
import { DeckTable } from "@/components/base/DeckTable";

import {
  dashboardPageSx,
  dashboardReportSx,
  dashboardReportBoxSx,
  dashboardReportBoxOverlaySx,
  dashboardReportBoxImgSx,
} from "./styles";

export default function DashboardPage({ decks }: DashboardPageProps) {
  return (
    <Box sx={dashboardPageSx}>
      <DeckTable decks={decks} />

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
