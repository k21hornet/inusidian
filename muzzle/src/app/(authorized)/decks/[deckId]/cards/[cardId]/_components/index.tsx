"use client";

import CardModal from "@/features/card/components/CardModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/features/card/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { Card as CardUi } from "@/components/ui/card";

export const CardPage = ({
  card,
  nextCardId,
  prevCardId,
}: {
  card: Card;
  nextCardId: string;
  prevCardId: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [accordionValue, setAccordionValue] = useState<string>("");

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="mb-4 flex w-full cursor-pointer items-center gap-2 text-[#9E9E9E]"
        onClick={() => router.push(`/decks/${card.deckId}`)}
      >
        <ArrowLeft className="h-5 w-5" />
        <span>デッキに戻る</span>
      </div>

      <CardUi className="flex w-full max-w-2xl flex-col items-center justify-center gap-4 p-6">
        <div className="flex items-center gap-2 self-end">
          <Info className="h-5 w-5 text-[#9E9E9E]" />
          <Edit
            className="h-5 w-5 cursor-pointer text-[#9E9E9E]"
            onClick={() => handleOpen()}
          />
        </div>

        {/* カード表面 */}
        {card.cardValues
          .filter((value) => value.field.fieldType === "primary") // primaryフィールドのみ取得
          .map((value, idx) => (
            <p key={idx} className="text-center text-lg font-bold">
              {value.content}
            </p>
          ))}

        {card.cardValues
          .filter((value) => value.field.fieldType === "front") // 表フィールドのみ取得
          .map((value, idx) => (
            <p key={idx} className="text-center">
              {value.content}
            </p>
          ))}

        {/* カード裏面 */}
        <Accordion
          type="single"
          collapsible
          value={accordionValue}
          onValueChange={setAccordionValue}
          className="w-full"
        >
          <AccordionItem value="back" className="border-none">
            <AccordionTrigger className="text-sm text-[#9E9E9E] hover:no-underline">
              カード裏面を表示
            </AccordionTrigger>
            <AccordionContent className="pt-0">
              {card.cardValues
                .filter((value) => value.field.fieldType === "back") // 裏フィールドのみ取得
                .map((value, idx) => (
                  <p key={idx} className="text-center">
                    {value.content}
                  </p>
                ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardUi>

      <CardModal open={open} handleClose={handleClose} card={card} />

      <div className="mt-4 flex w-full max-w-2xl items-center justify-between">
        {prevCardId !== "" ? (
          <Button
            component={Link}
            href={`/decks/${card.deckId}/cards/${prevCardId}`}
            buttonDesign="secondary"
            variant="outlined"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            前のカード
          </Button>
        ) : (
          <div />
        )}
        {nextCardId !== "" ? (
          <Button
            component={Link}
            href={`/decks/${card.deckId}/cards/${nextCardId}`}
            buttonDesign="secondary"
            variant="outlined"
            className="flex items-center gap-2"
          >
            次のカード
            <ChevronRight className="h-5 w-5" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
