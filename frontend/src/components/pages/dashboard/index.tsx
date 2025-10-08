import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { PrimaryButton } from "@/components/ui/button/primary-button";
import { DashboardPageProps } from "./typs";
import styles from "./index.module.scss";
import { DeckTable } from "./DeckTable";

export default function DashboardPage({ decks }: DashboardPageProps) {
  return (
    <Box className={styles["dashboard-page"]}>
      <Box className={styles["deck-list"]}>
        <Box className={styles["deck-list__header"]}>
          <Typography className={styles["deck-list__title"]}>
            デッキ一覧
          </Typography>
          <PrimaryButton component={Link} href="/deck/create">
            デッキ作成
          </PrimaryButton>
        </Box>
        {decks.length > 0 ? (
          <DeckTable decks={decks} />
        ) : (
          <Box className={styles["deck-list__empty"]}>
            デッキを作成しましょう！
          </Box>
        )}
      </Box>

      <Box
        className={styles["dashboard-report"]}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          marginBottom: "24px",
        }}
      >
        <Box className={styles["dashboard-report__box"]}>
          <img src="/sample1.png" alt="report" />
          <Typography className={styles["dashboard-report__overlay"]}>
            Comming soon...
          </Typography>
        </Box>
        <Box className={styles["dashboard-report__box"]}>
          <img src="/sample2.png" alt="report" />
          <Typography className={styles["dashboard-report__overlay"]}>
            Comming soon...
          </Typography>
        </Box>
        <Box className={styles["dashboard-report__box"]}>
          <img src="/sample3.png" alt="report" />
          <Typography className={styles["dashboard-report__overlay"]}>
            Comming soon...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
