"use client";

import { Deck } from "@/features/deck/types";
import { convertDate } from "@/util/convertDate";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CardList({ deck }: { deck: Deck }) {
  const router = useRouter();
  const handleOpen = (cardId: number) => {
    router.push(`/decks/${deck.id}/cards/${cardId}`);
  };

  return (
    <div className="overflow-y-auto">
      <Table className="w-full table-fixed">
        <TableHeader className="sticky top-0 z-1 border-b">
          <TableRow>
            <TableHead className="w-[80%] sm:w-auto">
              {deck.cardFields[0].fieldName}
            </TableHead>
            <TableHead className="hidden sm:table-cell">連続正解数</TableHead>
            <TableHead className="w-[20%] sm:w-auto">復習間隔</TableHead>
            <TableHead className="hidden sm:table-cell">次回</TableHead>
            <TableHead className="hidden sm:table-cell">作成日</TableHead>
            <TableHead className="hidden sm:table-cell"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deck.cards.map((card) => (
            <TableRow
              key={card.id}
              className="cursor-pointer hover:bg-[#eee]"
              onClick={() => handleOpen(card.id)}
            >
              <TableCell className="max-w-0 truncate font-bold">
                {card.cardValues[0].content}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {card.successCount}回
              </TableCell>
              <TableCell className="text-right sm:text-left">
                {card.reviewInterval}日
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {convertDate(card.nextReviewDate)}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {convertDate(card.createdAt)}
              </TableCell>
              <TableCell className="text-primary hidden sm:table-cell">
                詳細
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
