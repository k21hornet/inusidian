"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { convertDate } from "@/util/convertDate";
import { DeckTableProps } from "./typs";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import StyleIcon from "@mui/icons-material/Style";
import { SecondaryButton } from "@/components/ui/button/secondary-button";

export const DeckTable = ({ decks }: DeckTableProps) => {
  const router = useRouter();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>デッキ</TableCell>
          <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
            カード数
          </TableCell>
          <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
            作成日
          </TableCell>
          <TableCell
            sx={{ display: { xs: "none", sm: "table-cell" } }}
          ></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {decks?.map((deck) => (
          <TableRow
            key={deck.id}
            sx={{
              cursor: "pointer",
              "&:hover": {
                bgcolor: "#f1f2f3",
              },
            }}
            onClick={() => router.push(`/deck/${deck.id}`)}
          >
            <TableCell>
              <Box className={styles["deck-table__deck-info"]}>
                <Box className={styles["deck-table__icon-box"]}>
                  <StyleIcon className={styles["deck-table__icon"]} />
                </Box>
                <Box>
                  <Box sx={{ fontWeight: "bold" }}>{deck.deckName}</Box>
                  <Box>{deck.deckDescription}</Box>
                </Box>
              </Box>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              0
            </TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              {convertDate(deck.createdAt)}
            </TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              <SecondaryButton variant="outlined">詳細</SecondaryButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
