import { Box, Typography } from "@mui/material";
import Link from "next/link";
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
  headerLinkSx,
} from "./styles";

export const Header = () => {
  return (
    <>
      {/* Desktop */}
      <Box component="header" sx={headerSx}>
        <Box sx={headerContentSx}>
          <Box sx={headerLeftSx}>
            <Typography>
              <Link href="/home" style={headerLinkSx}>
                <Box component="span" sx={gradientTextSx}>
                  INUSIDIAN
                </Box>
              </Link>
            </Typography>
          </Box>

          <Box component="nav" sx={navSx}>
            <Box sx={navItemSx}>
              <Typography>
                <Link href="/home" style={navLinkSx}>
                  ホーム
                </Link>
              </Typography>
            </Box>

            <Box sx={navItemSx}>
              <Typography>
                <Link href="/decks" style={navLinkSx}>
                  デッキ一覧
                </Link>
              </Typography>
            </Box>

            <Box sx={navItemSx}>
              <Typography>
                <Link href="/statistics" style={navLinkSx}>
                  統計
                </Link>
              </Typography>
            </Box>

            <Box sx={navItemSx}>
              <Typography>
                <Link href="/learning-goals" style={navLinkSx}>
                  学習目標
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
            <Link href="/home" style={headerLinkSx}>
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
