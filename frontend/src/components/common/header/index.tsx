import { Box, Typography } from "@mui/material";
import styles from "./index.module.scss";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserIcon } from "./UserIcon";
import { SPMenu } from "./SPMenu";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <Box
        component="header"
        className={styles["header"]}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Box className={styles["header__content"]}>
          <Box className={styles["header__left"]}>
            <Typography>
              <Link
                href="/dashboard"
                className={styles["header__gradientText"]}
              >
                INUSIDIAN
              </Link>
            </Typography>
          </Box>

          <Box component="nav" className={styles["header__nav"]}>
            <Box className={styles["header__nav-item"]}>
              <Typography>
                <Link className={styles["header__nav-link"]} href="/dashboard">
                  Home
                </Link>
              </Typography>
            </Box>
            <Box className={styles["header__nav-item"]}>
              <Typography>
                <Link className={styles["header__nav-link"]} href="/decks">
                  Decks
                </Link>
              </Typography>
              <ExpandMoreIcon />
            </Box>
            <Box className={styles["header__nav-item"]}>
              <Typography>
                <Link
                  className={styles["header__nav-link"]}
                  href="/review-list"
                >
                  Review
                </Link>
              </Typography>
              <ExpandMoreIcon />
            </Box>
            <Box className={styles["header__nav-item"]}>
              <Typography>
                <Link className={styles["header__nav-link"]} href="/about">
                  About
                </Link>
              </Typography>
            </Box>
          </Box>

          <UserIcon />
        </Box>
      </Box>

      <Box
        component="header"
        className={styles["header"]}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <Box className={styles["header__content"]}>
          <Box className={styles["header__sp"]}>
            <SPMenu />
            <Link href="/dashboard" className={styles["header__gradientText"]}>
              INUSIDIAN
            </Link>
          </Box>

          <UserIcon />
        </Box>
      </Box>
    </>
  );
};
