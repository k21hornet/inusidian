import { Box } from "@mui/material";
import styles from "./index.module.scss";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserIcon } from "./UserIcon";

export const Header = () => {
  return (
    <Box component="header" className={styles["header"]}>
      <Box className={styles["header__left"]}>
        <Link href="/dashboard" className={styles["header__gradientText"]}>
          INUSIDIAN
        </Link>
      </Box>

      <Box component="nav" className={styles["header__nav"]}>
        <Box className={styles["header__nav-item"]}>
          <Link className={styles["header__nav-link"]} href="/dashboard">
            Home
          </Link>
        </Box>
        <Box className={styles["header__nav-item"]}>
          <Link className={styles["header__nav-link"]} href="/decks">
            Decks
          </Link>
          <ExpandMoreIcon />
        </Box>
        <Box className={styles["header__nav-item"]}>
          <Link className={styles["header__nav-link"]} href="/review-list">
            Review
          </Link>
          <ExpandMoreIcon />
        </Box>
        <Box className={styles["header__nav-item"]}>
          <Link className={styles["header__nav-link"]} href="/about">
            About
          </Link>
        </Box>
      </Box>

      <UserIcon />
    </Box>
  );
};
