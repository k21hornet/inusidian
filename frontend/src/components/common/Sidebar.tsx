import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import StyleIcon from "@mui/icons-material/Style";
import { getAllDecks } from "@/app/actions/deck-actions";
import Link from "next/link";
import SidebarUser from "./SidebarUser";
import { getLoginEmail } from "@/app/actions/user-actions";

export default async function Sidebar() {
  const decks = await getAllDecks();
  const loginEmail = await getLoginEmail();

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
        <Box
          component={Link}
          href={`/dashboard`}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            cursor: "pointer",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <BeachAccessIcon />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            INUSIDIAN
          </Typography>
        </Box>

        <Box>
          <List
            component="nav"
            subheader={
              <ListSubheader component="div" sx={{ bgcolor: "#f5f6fa" }}>
                デッキ一覧({decks?.length})
              </ListSubheader>
            }
          >
            {decks?.map((deck) => (
              <Link
                key={deck.id}
                href={`/deck/${deck.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <StyleIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ fontSize: "14px" }}>
                    {deck.deckName}
                  </ListItemText>
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Box>
      </Box>

      <SidebarUser loginEmail={loginEmail} />
    </Box>
  );
}
