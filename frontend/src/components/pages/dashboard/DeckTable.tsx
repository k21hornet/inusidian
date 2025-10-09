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
import StyleIcon from "@mui/icons-material/Style";
import { deckTableIconBoxSx, deckTableIconSx, deckTableInfoSx } from "./styles";
import { Button } from "@/components/ui/button";

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
              <Box sx={deckTableInfoSx}>
                <Box sx={deckTableIconBoxSx}>
                  <StyleIcon sx={deckTableIconSx} />
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
              <Button variant="outlined" buttonDesign="secondary">
                詳細
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
