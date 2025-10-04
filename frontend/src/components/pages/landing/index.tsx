import { Box, Typography } from "@mui/material";
import styles from "./index.module.scss";
import Link from "next/link";
import { SecondaryButton } from "@/components/ui/button/secondary-button";

export const LandingPage = () => {
  return (
    <Box className={styles["landing-page"]}>
      <Box className={styles["landing-page__header"]}>
        <Typography className={styles["landing-page__title"]}>
          Unleash your learning potential <br /> with{" "}
          <span className={styles["landing-page__title-highlight"]}>
            INUSIDIAN
          </span>
        </Typography>
      </Box>

      <Box className={styles["landing-page__description"]}>
        <Typography>
          INUSIDIANは擬似的な間隔反復システム（SRS）を採用した単語カードアプリです。
          <br />
          忘却曲線の原理を活用してユーザーが効率的に語彙を学習できるよう支援します。
        </Typography>
      </Box>

      <Box className={styles["landing-page__buttons"]}>
        <SecondaryButton
          className={styles["landing-page__button"]}
          variant="contained"
          component={Link}
          href="/auth/login?screen_hint=signup"
        >
          新規登録
        </SecondaryButton>
        <SecondaryButton
          className={styles["landing-page__button"]}
          variant="outlined"
          component={Link}
          href="/auth/login"
        >
          ログイン
        </SecondaryButton>
      </Box>
    </Box>
  );
};
