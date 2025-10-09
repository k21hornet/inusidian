import { Box, Typography } from "@mui/material";
import Link from "next/link";
import {
  lpButtonsSx,
  lpButtonSx,
  lpDescriptionSx,
  lpSx,
  lpTitleHighlightSx,
  lpTitleSpSx,
  lpTitleSx,
} from "./styles";
import { Button } from "@/components/ui/button";

export const LandingPage = () => {
  return (
    <Box sx={lpSx}>
      <Typography sx={lpTitleSx}>
        Unleash your learning potential <br /> with{" "}
        <Box component="span" sx={lpTitleHighlightSx}>
          INUSIDIAN
        </Box>
      </Typography>

      <Typography sx={lpTitleSpSx}>
        Unleash your <br /> learning potential with <br />
        <Box component="span" sx={lpTitleHighlightSx}>
          INUSIDIAN
        </Box>
      </Typography>

      <Typography sx={lpDescriptionSx}>
        INUSIDIANは擬似的な間隔反復システム（SRS）を採用した単語カードアプリです。
        <br />
        忘却曲線の原理を活用して効率的に語彙を学習できるよう支援します。
      </Typography>

      <Box sx={lpButtonsSx}>
        <Button
          sx={lpButtonSx}
          variant="contained"
          component={Link}
          href="/auth/login?screen_hint=signup"
          buttonDesign="secondary"
        >
          新規登録
        </Button>
        <Button
          sx={lpButtonSx}
          variant="outlined"
          component={Link}
          href="/auth/login"
          buttonDesign="secondary"
        >
          ログイン
        </Button>
      </Box>
    </Box>
  );
};
