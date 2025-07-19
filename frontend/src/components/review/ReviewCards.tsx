import React, { useEffect, useState } from "react";
import Congratulations from "./Congratulations";
import { Box, Button, Typography } from "@mui/material";
import { Card } from "@/type/index";
import { getDueCards, reviewFailure, reviewSuccess } from "@/features/Card";

export default function ReviewCards({ deckId }: { deckId: number }) {
  const [dueCards, setDueCards] = useState<Card[]>([]);
  const [dueCard, setDueCard] = useState<Card | null>();

  // ランダムで一問出題
  const setNextReviewCard = () => {
    const randomNum = Math.floor(Math.random() * dueCards.length);
    setDueCard(dueCards[randomNum]);
  };

  useEffect(() => {
    const fetchReviewCards = async () => {
      const data = await getDueCards(deckId);
      setDueCards(data);
    };
    fetchReviewCards();
  }, []);

  useEffect(() => {
    if (dueCards.length > 0) {
      setNextReviewCard();
    } else {
      setDueCard(null);
    }
  }, [dueCards]);

  // 問題正解時
  const success = async (id: number) => {
    if (!dueCard) return;
    await reviewSuccess(id);
    setDueCards(dueCards.filter((rc) => rc.id !== id)); //正解した問題を除外
  };

  // 問題不正解時
  const failure = async () => {
    if (!dueCard) return;
    await reviewFailure(dueCard.id);
    setNextReviewCard();
  };

  if (!dueCard) return <Congratulations />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {dueCard.cardValues.map((value, idx) => (
        <Typography key={idx} sx={{ mb: 2, fontSize: 20, textAlign: "center" }}>
          {value.content}
        </Typography>
      ))}

      <Box sx={{ display: "flex", marginTop: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 1,
          }}
        >
          <p>0 day</p>
          <Button onClick={failure} variant="contained">
            Again
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 1,
          }}
        >
          <p>{dueCard.successCount * 2 + 1} day</p>
          <Button onClick={() => success(dueCard.id)} variant="contained">
            Easy
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
