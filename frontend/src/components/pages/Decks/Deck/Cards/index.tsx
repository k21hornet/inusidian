"use client";

import CardModal from "@/components/base/Card/CardModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/type";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  cardContentAccordionDetailsSx,
  cardContentAccordionSummaryColorSx,
  cardContentAccordionSx,
  cardContentButtonsSx,
  cardContentIconsSx,
  cardContentIconSx,
  cardContentSx,
  cardContentTextSx,
  cardPageBackSx,
  cardPageSx,
} from "./styles";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

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

  const [accordionExpanded, setAccordionExpanded] = useState(false); // アコーディオンの開閉状態

  const router = useRouter();

  return (
    <Box sx={cardPageSx}>
      <Typography
        sx={cardPageBackSx}
        onClick={() => router.push(`/decks/${card.deckId}`)}
      >
        <ArrowBackIcon />
        デッキに戻る
      </Typography>

      <Box sx={cardContentSx}>
        <Box sx={cardContentIconsSx}>
          <InfoOutlineIcon />
          <BorderColorIcon
            sx={cardContentIconSx}
            onClick={() => handleOpen()}
          />
        </Box>

        {/* カード表面 */}
        {card.cardValues
          .filter((value) => value.field.fieldType === "primary") // primaryフィールドのみ取得
          .map((value, idx) => (
            <Typography
              key={idx}
              sx={{ ...cardContentTextSx, fontSize: 18, fontWeight: "bold" }}
            >
              {value.content}
            </Typography>
          ))}

        {card.cardValues
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
            {card.cardValues
              .filter((value) => value.field.fieldType === "back") // 裏フィールドのみ取得
              .map((value, idx) => (
                <Typography key={idx} sx={cardContentTextSx}>
                  {value.content}
                </Typography>
              ))}
          </AccordionDetails>
        </Accordion>
      </Box>

      <CardModal open={open} handleClose={handleClose} card={card} />

      <Box sx={cardContentButtonsSx}>
        {prevCardId !== -999 ? (
          <Button
            component={Link}
            href={`/decks/${card.deckId}/cards/${prevCardId}`}
            buttonDesign="secondary"
            variant="outlined"
          >
            <NavigateBeforeIcon />
            前のカード
          </Button>
        ) : (
          <Box />
        )}
        {nextCardId !== -999 ? (
          <Button
            component={Link}
            href={`/decks/${card.deckId}/cards/${nextCardId}`}
            buttonDesign="secondary"
            variant="outlined"
          >
            次のカード
            <NavigateNextIcon />
          </Button>
        ) : (
          <Box />
        )}
      </Box>
    </Box>
  );
};
