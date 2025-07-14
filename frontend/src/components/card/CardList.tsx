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
import React from "react";

type Props = {
  deck: Deck;
};

export default function CardList({ deck }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{deck.cardFields[0].fieldName}</TableCell>
            <TableCell>ステータス</TableCell>
            <TableCell>次回</TableCell>
            <TableCell>作成日</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deck.cards.map((card) => (
            <TableRow key={card.id}>
              <TableCell>{card.cardValues[0].content}</TableCell>
              <TableCell>覚えた</TableCell>
              <TableCell>4日後</TableCell>
              <TableCell>{card.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
