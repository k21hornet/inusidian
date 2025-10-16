"use client";

import CardModal from "@/components/base/Card/CardModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/type";
import { Box, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export const CardPage = ({
  card,
  nextCardId,
  prevCardId,
}: {
  card: Card;
  nextCardId: number;
  prevCardId: number;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        {/* カード表面 */}
        {card.cardValues
          .filter((value) => value.field.fieldType !== "back") // 表のカードのみ取得
          .map((value, idx) => (
            <Typography
              key={idx}
              sx={{ mb: 2, fontSize: 20, textAlign: "center" }}
            >
              {value.content}
            </Typography>
          ))}
      </Box>

      <Divider />

      <Box>
        {/* カード裏面 */}
        {card.cardValues
          .filter((value) => value.field.fieldType === "back") // 裏のカードのみ取得
          .map((value, idx) => (
            <Typography
              key={idx}
              sx={{ mb: 2, fontSize: 20, textAlign: "center" }}
            >
              {value.content}
            </Typography>
          ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, gap: 2 }}>
        <Button
          component={Link}
          href={`/decks/${card.deckId}`}
          buttonDesign="secondary"
          variant="outlined"
        >
          デッキに戻る
        </Button>
        <Button buttonDesign="secondary" onClick={() => handleOpen()}>
          編集
        </Button>
      </Box>

      <CardModal open={open} handleClose={handleClose} card={card} />

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        {prevCardId !== -999 && (
          <Button
            component={Link}
            href={`/decks/${card.deckId}/cards/${prevCardId}`}
            buttonDesign="secondary"
            variant="outlined"
          >
            前のカード
          </Button>
        )}
        {nextCardId !== -999 && (
          <Button
            component={Link}
            href={`/decks/${card.deckId}/cards/${nextCardId}`}
            buttonDesign="secondary"
            variant="outlined"
          >
            次のカード
          </Button>
        )}
      </Box>
    </>
  );
};
