import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: 6 }}>
      <Typography sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}>
        <Link href="/auth/login">INUSIDIAN</Link>
      </Typography>
      <Typography sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}>
        へようこそ
      </Typography>
    </Box>
  );
}
