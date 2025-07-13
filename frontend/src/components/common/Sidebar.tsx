"use client";

import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StyleIcon from "@mui/icons-material/Style";

export default function Sidebar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: 240,
        height: "100vh",
        bgcolor: "#f5f6fa",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <BeachAccessIcon />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
          >
            INUSIDIAN
          </Typography>
        </Box>

        <Box>
          <List
            component="nav"
            subheader={
              <ListSubheader component="div" sx={{ bgcolor: "#f5f6fa" }}>
                今日のタスク(1)
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "14px" }}>
                サンプルデッキ１
              </ListItemText>
            </ListItemButton>
          </List>
          <List
            component="nav"
            subheader={
              <ListSubheader component="div" sx={{ bgcolor: "#f5f6fa" }}>
                デッキ一覧(2)
              </ListSubheader>
            }
          >
            <Button variant="contained" fullWidth>
              デッキ作成
            </Button>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <StyleIcon />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "14px" }}>
                サンプルデッキ１
              </ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <StyleIcon />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "14px" }}>
                サンプルデッキ２
              </ListItemText>
            </ListItemButton>
          </List>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <AccountCircleIcon sx={{ width: 36, height: 36, mr: 1 }} />
          <Box>
            <Typography>Smith01</Typography>
            <Typography sx={{ fontSize: 13 }}>01@smith.com</Typography>
          </Box>
        </Box>
        <MoreVertIcon />
      </Box>
    </Box>
  );
}
