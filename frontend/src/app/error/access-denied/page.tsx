"use client";

import { Button } from "@/components/ui/Button";
import { Box, Typography } from "@mui/material";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 2,
        p: 2,
      }}
    >
      <Typography sx={{ fontSize: { xs: 24, md: 34 } }}>
        アクセス権限がありません
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        申し訳ございません。アクセス権限がないためサービスを利用できません。
      </Typography>
      <Button
        buttonDesign="secondary"
        onClick={() => (window.location.href = "/auth/logout")}
      >
        ログアウトしてホームに戻る
      </Button>
    </Box>
  );
}
