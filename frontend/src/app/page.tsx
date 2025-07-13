import Sidebar from "@/components/common/Sidebar";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Typography variant="h3">Hello World</Typography>
    </Box>
  );
}
