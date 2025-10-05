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
} from "@/app/actions/review";
import Congratulations from "./Congratulations";
import { PrimaryButton } from "@/components/ui/button/primary-button";

export default function ReviewCards({
  deckId,
  onReviewCompleted,
}: {
  deckId: number;
  onReviewCompleted: () => void;
}) {
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
    onReviewCompleted(); // 復習完了後のコールバック
  };

  // 問題不正解時
  const failure = async () => {
    if (!dueCard) return;
    await reviewFailure(dueCard.id);
    setNextReviewCard();
    setAccordionExpanded(false);
    setOpen(true);
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
      {/* カード表面 */}
      {dueCard.cardValues
        .filter((value) => value.field.fieldType !== "back") // 表のカードのみ取得
        .map((value, idx) => (
          <Typography
            key={idx}
            sx={{ mb: 2, fontSize: 20, textAlign: "center" }}
          >
            {value.content}
          </Typography>
        ))}

      {/* カード裏面 */}
      <Accordion
        expanded={accordionExpanded}
        onChange={(_, isExpanded) => setAccordionExpanded(isExpanded)}
        slotProps={{ transition: { timeout: 0 } }} // アコーディオン開閉時文字が出ないようにする
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          border: "none",
          borderTop: "1px solid #e0e0e0",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" sx={{ color: "text.secondary" }}>
            カード裏面を表示
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {dueCard.cardValues
            .filter((value) => value.field.fieldType === "back") // 裏のカードのみ取得
            .map((value, idx) => (
              <Typography
                key={idx}
                sx={{ mb: 2, fontSize: 20, textAlign: "center" }}
              >
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
              <PrimaryButton onClick={failure}>Again</PrimaryButton>
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
              <PrimaryButton onClick={() => success(dueCard.id)}>
                Easy
              </PrimaryButton>
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
          ドンマイ！
        </Alert>
      </Snackbar>
    </Box>
  );
}
