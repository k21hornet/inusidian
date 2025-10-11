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
import { convertDate } from "@/util/convertDate";
import {
  deckListEmptySx,
  deckListHeaderSx,
  deckListSx,
  deckListTitleSx,
  deckTableIconBoxSx,
  deckTableIconSx,
  deckTableInfoSx,
} from "./styles";
import { useRouter } from "next/navigation";
import StyleIcon from "@mui/icons-material/Style";

import { Button } from "@/components/ui/Button";
import { DeckTableProps } from "./type";
import Link from "next/link";

export const DeckTable = ({ decks }: DeckTableProps) => {
  const router = useRouter();

  return (
    <Box sx={deckListSx}>
      <Box sx={deckListHeaderSx}>
        <Typography sx={deckListTitleSx}>デッキ一覧</Typography>
        <Button component={Link} href="/decks/create" buttonDesign="secondary">
          デッキ作成
        </Button>
      </Box>
      {decks.length > 0 ? (
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
                onClick={() => router.push(`/decks/${deck.id}`)}
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
      ) : (
        <Box sx={deckListEmptySx}>デッキを作成しましょう！</Box>
      )}
    </Box>
  );
};
