import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography variant="h3">
        <Link href="/auth/login">INUSIDIAN</Link>
      </Typography>
      <Typography variant="h3">へようこそ</Typography>
    </Box>
  );
}
