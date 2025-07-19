"use client";

import { Box, Button, Card, Link, TextField, Typography } from "@mui/material";

export default function SignUpPage() {
  return (
    <Card
      sx={{
        width: 360,
        mb: 12,
        p: 4,
        textAlign: "center",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5">アカウント新規登録</Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        <TextField label="ユーザー名" fullWidth />
        <TextField label="メールアドレス" fullWidth />
        <TextField label="パスワード" fullWidth />
        <Button variant="contained" fullWidth>
          登録する
        </Button>
      </Box>

      <Typography sx={{ mt: 2 }}>
        <Link href="/signin" variant="body2">
          ログインはこちら
        </Link>
      </Typography>
    </Card>
  );
}
