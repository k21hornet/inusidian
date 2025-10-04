import Link from "next/link";
import DeckPanel from "./DeckPanel";
import { Box, Grid, Typography } from "@mui/material";
import { PrimaryButton } from "@/components/ui/button";
import { DashboardPageProps } from "./typs";
import styles from "./index.module.scss";

export default function DashboardPage({ decks }: DashboardPageProps) {
  return (
    <>
      <Box className={styles["dashboard-page"]}>
        <Box className={styles["dashboard-page__header"]}>
          <Typography variant="h5">デッキ一覧</Typography>
          <PrimaryButton component={Link} href="/deck/create">
            デッキ作成
          </PrimaryButton>
        </Box>
        <Grid container spacing={2}>
          {decks.map((deck) => (
            <DeckPanel key={deck.id} deck={deck} />
          ))}
        </Grid>
      </Box>
    </>
  );
}
