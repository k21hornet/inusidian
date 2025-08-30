"use client";

import { Deck } from "@/type/index";
import {
  Alert,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import CardModal from "./CardModal";
import { Card } from "@/type/index";
import { convertDate } from "@/util/convertDate";

export default function CardList({
  deck,
  onCardUpdated,
}: {
  deck: Deck;
  onCardUpdated: () => void;
}) {
  const [cardDetail, setCardDetail] = useState<Card>();
  const [open, setOpen] = useState(false);
  const handleOpen = (card: Card) => {
    setOpen(true);
    setCardDetail(card);
  };
  const handleClose = () => {
    setOpen(false);
    setCardDetail(undefined);
  };

  const [openUpdateSnackbar, setOpenUpdateSnackbar] = useState(false);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 580,
          overflowY: "auto", // 縦方向のスクロールを有効化
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              bgcolor: "white",
              position: "sticky",
              top: 0,
              zIndex: 1, // 他の要素より前面に表示
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TableRow>
              <TableCell>{deck.cardFields[0].fieldName}</TableCell>
              <TableCell>連続正解数</TableCell>
              <TableCell>復習間隔</TableCell>
              <TableCell>次回</TableCell>
              <TableCell>作成日</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deck.cards
              .slice() // 配列をコピー
              .reverse() // 最新のカードを上に表示する
              .map((card) => (
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
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {card.cardValues[0].content}
                  </TableCell>
                  <TableCell>{card.successCount}回</TableCell>
                  <TableCell>{card.reviewInterval}日</TableCell>
                  <TableCell>{convertDate(card.nextReviewDate)}</TableCell>
                  <TableCell>{convertDate(card.createdAt)}</TableCell>
                  <TableCell sx={{ color: "primary.main" }}>詳細</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CardModal
        open={open}
        handleClose={handleClose}
        card={cardDetail}
        onCardUpdated={onCardUpdated}
        setOpenUpdateSnackbar={setOpenUpdateSnackbar}
        setOpenDeleteSnackbar={setOpenDeleteSnackbar}
      />

      <Snackbar
        open={openUpdateSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenUpdateSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          カードを更新しました
        </Alert>
      </Snackbar>

      <Snackbar
        open={openDeleteSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenDeleteSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          カードを削除しました
        </Alert>
      </Snackbar>
    </>
  );
}
