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
import { convertDate } from "@/util/convertDate";
import { useRouter } from "next/navigation";

export default function CardList({ deck }: { deck: Deck }) {
  const router = useRouter();
  const handleOpen = (cardId: number) => {
    router.push(`/decks/${deck.id}/cards/${cardId}`);
  };

  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          overflowY: "auto", // 縦方向のスクロールを有効化
        }}
      >
        <Table aria-label="simple table">
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
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                連続正解数
              </TableCell>
              <TableCell>復習間隔</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                次回
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                作成日
              </TableCell>
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
                  onClick={() => handleOpen(card.id)}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {card.cardValues[0].content}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {card.successCount}回
                  </TableCell>
                  <TableCell>{card.reviewInterval}日</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {convertDate(card.nextReviewDate)}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {convertDate(card.createdAt)}
                  </TableCell>
                  <TableCell sx={{ color: "primary.main" }}>詳細</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

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
