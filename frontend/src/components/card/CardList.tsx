import { Card } from "@/type/Card";
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
  cards: Card[];
};

export default function CardList({ cards }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{cards[0].cardValues[0].fieldName}</TableCell>
            <TableCell>{cards[0].cardValues[1].fieldName}</TableCell>
            <TableCell>作成日</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((card) => (
            <TableRow key={card.id}>
              <TableCell>{card.cardValues[0].content}</TableCell>
              <TableCell>{card.cardValues[1].content}</TableCell>
              <TableCell>{card.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
