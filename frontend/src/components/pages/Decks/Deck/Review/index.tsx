"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Snackbar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card } from "@/type/index";
import {
  getReviewCards,
  reviewFailure,
  reviewSuccess,
} from "@/features/review";
import Congratulations from "./Congratulations";
import { Button } from "@/components/ui/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import {
  cardContentAccordionDetailsSx,
  cardContentAccordionSummaryColorSx,
  cardContentAccordionSx,
  cardContentSx,
  cardContentTextSx,
  reviewPageBackSx,
  reviewPageSx,
} from "./styles";

export default function ReviewPage({ deckId }: { deckId: number }) {
  const [dueCards, setDueCards] = useState<Card[]>([]);
  const [dueCard, setDueCard] = useState<Card | null>();
  const [accordionExpanded, setAccordionExpanded] = useState(false); // アコーディオンの開閉状態
  const [open, setOpen] = useState(false); // Snackbarの開閉状態
  const [startTime, setStartTime] = useState<Date | null>(null);

  // ランダムで一問出題
  const setNextReviewCard = () => {
    const randomNum = Math.floor(Math.random() * dueCards.length);
    setDueCard(dueCards[randomNum]);
    setStartTime(new Date()); // 出題時タイマーをセット
  };

  useEffect(() => {
    const fetchReviewCards = async () => {
      const data = await getReviewCards(deckId);
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
    if (!dueCard || !startTime) return;
    const endTime = new Date();
    const elapsedTime = (endTime.getTime() - startTime.getTime()) / 1000;
    await reviewSuccess(id, Math.round(elapsedTime));
    setDueCards(dueCards.filter((rc) => rc.id !== id)); //正解した問題を除外
    setAccordionExpanded(false);
  };

  // 問題不正解時
  const failure = async () => {
    if (!dueCard) return;
    await reviewFailure(dueCard.id);
    setNextReviewCard();
    setAccordionExpanded(false);
    setOpen(true);
  };

  const router = useRouter();

  if (!dueCard) return <Congratulations />;

  return (
    <Box sx={reviewPageSx}>
      <Typography
        sx={reviewPageBackSx}
        onClick={() => router.push(`/decks/${dueCard.deckId}`)}
      >
        <ArrowBackIcon />
        デッキに戻る
      </Typography>

      <Box sx={cardContentSx}>
        {/* カード表面 */}
        {dueCard.cardValues
          .filter((value) => value.field.fieldType === "primary") // primaryフィールドのみ取得
          .map((value, idx) => (
            <Typography
              key={idx}
              sx={{ ...cardContentTextSx, fontSize: 18, fontWeight: "bold" }}
            >
              {value.content}
            </Typography>
          ))}

        {dueCard.cardValues
          .filter((value) => value.field.fieldType === "front") // 表フィールドのみ取得
          .map((value, idx) => (
            <Typography key={idx} sx={cardContentTextSx}>
              {value.content}
            </Typography>
          ))}

        {/* カード裏面 */}
        <Accordion
          expanded={accordionExpanded}
          onChange={(_, isExpanded) => setAccordionExpanded(isExpanded)}
          slotProps={{ transition: { timeout: 0 } }} // アコーディオン開閉時文字が出ないようにする
          sx={cardContentAccordionSx}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={cardContentAccordionSummaryColorSx} />
            }
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography
              component="span"
              sx={{ ...cardContentAccordionSummaryColorSx, fontSize: 14 }}
            >
              カード裏面を表示
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={cardContentAccordionDetailsSx}>
            {dueCard.cardValues
              .filter((value) => value.field.fieldType === "back") // 裏のカードのみ取得
              .map((value, idx) => (
                <Typography key={idx} sx={cardContentTextSx}>
                  {value.content}
                </Typography>
              ))}
            {/* ボタン */}
            <Box sx={{ display: "flex", marginTop: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Typography component="span" sx={{ color: "text.secondary" }}>
                  0 day
                </Typography>
                <Button
                  buttonDesign="secondary"
                  onClick={failure}
                  sx={{ width: "100px" }}
                >
                  もう一度
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
                <Typography component="span" sx={{ color: "text.secondary" }}>
                  {dueCard.successCount * 2 + 1} day
                </Typography>
                <Button
                  buttonDesign="secondary"
                  variant="outlined"
                  onClick={() => success(dueCard.id)}
                  sx={{ width: "100px" }}
                >
                  簡単
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="error" variant="filled">
            残念！
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
