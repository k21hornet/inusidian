"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import {
  deckListHeaderSx,
  deckListSx,
  deckListTitleSx,
  deckTableIconBoxSx,
  deckTableIconSx,
  deckTableInfoSx,
} from "./styles";
import { useRouter } from "next/navigation";
import StyleIcon from "@mui/icons-material/Style";

import { ReviewTableProps } from "./type";
import { Button } from "@/components/ui/button";

export const ReviewTable = ({ decks }: ReviewTableProps) => {
  const router = useRouter();

  if (decks.length > 0) {
    return (
      <Box sx={deckListSx}>
        <Box sx={deckListHeaderSx}>
          <Typography sx={deckListTitleSx}>復習デッキ一覧</Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>デッキ</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                今日の復習カード数
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
                onClick={() => router.push(`/decks/${deck.id}/review`)}
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
                  <Button variant="outlined" buttonDesign="secondary">
                    復習
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  } else {
    return null;
  }
};
