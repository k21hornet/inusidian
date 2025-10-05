import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { PrimaryButton } from "@/components/ui/button/primary-button";
import { DashboardPageProps } from "./typs";
import styles from "./index.module.scss";
import { DeckTable } from "./DeckTable";

export default function DashboardPage({ decks }: DashboardPageProps) {
  return (
    <Box className={styles["dashboard-page"]}>
      <Box
        className={styles["dashboard-report"]}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Box className={styles["dashboard-report__weekly"]}>
          Comming soon...
        </Box>
        <Box className={styles["dashboard-report__total"]}>Comming soon...</Box>
      </Box>

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
    </Box>
  );
}
