"use client";

import { Box, Button, Card, Link, TextField, Typography } from "@mui/material";

export default function SignInPage() {
  return (
    <Card
      sx={{
        width: 360,
        mb: 16,
        p: 4,
        textAlign: "center",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5">ログイン</Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        <TextField label="メールアドレス" fullWidth />
        <TextField label="パスワード" fullWidth />
        <Typography sx={{ textAlign: "right" }}>
          <Link href="#" variant="body2">
            パスワードをお忘れの方はこちら
          </Link>
        </Typography>
        <Button variant="contained" fullWidth>
          ログインする
        </Button>
      </Box>

      <Typography sx={{ mt: 2 }}>
        <Link href="/signup" variant="body2">
          アカウントの新規登録はこちら
        </Link>
      </Typography>
    </Card>
  );
}
