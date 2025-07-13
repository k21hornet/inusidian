import Appbar from "@/components/common/Appbar";
import Sidebar from "@/components/common/Sidebar";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box>
        <Appbar />
        <Typography variant="h3">Hello World</Typography>
      </Box>
    </Box>
  );
}
