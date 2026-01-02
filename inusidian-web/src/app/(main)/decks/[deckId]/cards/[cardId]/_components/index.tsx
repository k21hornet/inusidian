"use client";

import CardModal from "@/components/parts/Card/CardModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/type";
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
        className="flex items-center gap-2 cursor-pointer w-full mb-4 text-[#9E9E9E]"
        onClick={() => router.push(`/decks/${card.deckId}`)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>デッキに戻る</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-2xl p-6 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2 self-end">
          <Info className="w-5 h-5 text-[#9E9E9E]" />
          <Edit
            className="w-5 h-5 text-[#9E9E9E] cursor-pointer"
            onClick={() => handleOpen()}
          />
        </div>

        {/* カード表面 */}
        {card.cardValues
          .filter((value) => value.field.fieldType === "primary") // primaryフィールドのみ取得
          .map((value, idx) => (
            <p key={idx} className="text-lg font-bold text-center">
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
            <AccordionTrigger className="text-[#9E9E9E] text-sm hover:no-underline">
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
      </div>

      <CardModal open={open} handleClose={handleClose} card={card} />

      <div className="flex justify-between items-center w-full max-w-2xl mt-4">
        {prevCardId !== "" ? (
          <Button
            component={Link}
            href={`/decks/${card.deckId}/cards/${prevCardId}`}
            buttonDesign="secondary"
            variant="outlined"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
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
            <ChevronRight className="w-5 h-5" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
