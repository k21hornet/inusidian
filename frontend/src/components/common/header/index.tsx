import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserIcon } from "./UserIcon";
import { SPMenu } from "./SPMenu";
import {
  headerSx,
  headerContentSx,
  headerLeftSx,
  gradientTextSx,
  navSx,
  navItemSx,
  navLinkSx,
  rightSx,
  headerSpSx,
  headerSpWrapperSx,
} from "./styles";

export const Header = () => {
  return (
    <>
      {/* Desktop */}
      <Box component="header" sx={headerSx}>
        <Box sx={headerContentSx}>
          <Box sx={headerLeftSx}>
            <Typography>
              <Link href="/dashboard" style={{ textDecoration: "none" }}>
                <Box component="span" sx={gradientTextSx}>
                  INUSIDIAN
                </Box>
              </Link>
            </Typography>
          </Box>

          <Box component="nav" sx={navSx}>
            <Box sx={navItemSx}>
              <Typography>
                <Link href="/dashboard" style={navLinkSx}>
                  Home
                </Link>
              </Typography>
            </Box>

            <Box sx={navItemSx}>
              <Typography>
                <Link href="/decks" style={navLinkSx}>
                  Decks
                </Link>
              </Typography>
              <ExpandMoreIcon />
            </Box>

            <Box sx={navItemSx}>
              <Typography>
                <Link href="/review-list" style={navLinkSx}>
                  Review
                </Link>
              </Typography>
              <ExpandMoreIcon />
            </Box>

            <Box sx={navItemSx}>
              <Typography>
                <Link href="/about" style={navLinkSx}>
                  About
                </Link>
              </Typography>
            </Box>
          </Box>

          <Box sx={rightSx}>
            <UserIcon />
          </Box>
        </Box>
      </Box>

      {/* Mobile */}
      <Box component="header" sx={headerSpWrapperSx}>
        <Box sx={headerContentSx}>
          <Box sx={headerSpSx}>
            <SPMenu />
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <Box component="span" sx={gradientTextSx}>
                INUSIDIAN
              </Box>
            </Link>
          </Box>

          <Box sx={rightSx}>
            <UserIcon />
          </Box>
        </Box>
      </Box>
    </>
  );
};
