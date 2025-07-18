"use client";

import { Deck } from "@/type/Deck";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import CardModal from "./CardModal";
import { Card } from "@/type/Card";

type Props = {
  deck: Deck;
};

export default function CardList({ deck }: Props) {
  const [cardDetail, setCardDetail] = useState<Card>();
  const [open, setOpen] = useState(false);
  const handleOpen = (card: Card) => {
    setOpen(true);
    setCardDetail(card);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{deck.cardFields[0].fieldName}</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>次回</TableCell>
              <TableCell>作成日</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deck.cards.map((card) => (
              <TableRow
                key={card.id}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#eee",
                  },
                }}
                onClick={() => handleOpen(card)}
              >
                <TableCell>{card.cardValues[0].content}</TableCell>
                <TableCell>覚えた</TableCell>
                <TableCell>4日後</TableCell>
                <TableCell>{card.createdAt}</TableCell>
                <TableCell>詳細</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CardModal open={open} handleClose={handleClose} card={cardDetail} />
    </>
  );
}
