"use client";

import { Deck } from "@/type/index";
import React from "react";
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
      <Table>
        <TableHeader className="bg-white sticky top-0 z-[1] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          <TableRow>
            <TableHead>{deck.cardFields[0].fieldName}</TableHead>
            <TableHead className="hidden sm:table-cell">連続正解数</TableHead>
            <TableHead>復習間隔</TableHead>
            <TableHead className="hidden sm:table-cell">次回</TableHead>
            <TableHead className="hidden sm:table-cell">作成日</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deck.cards
            .slice() // 配列をコピー
            .reverse() // 最新のカードを上に表示する
            .map((card) => (
              <TableRow
                key={card.id}
                className="cursor-pointer hover:bg-[#eee]"
                onClick={() => handleOpen(card.id)}
              >
                <TableCell className="font-bold">
                  {card.cardValues[0].content}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {card.successCount}回
                </TableCell>
                <TableCell>{card.reviewInterval}日</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {convertDate(card.nextReviewDate)}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {convertDate(card.createdAt)}
                </TableCell>
                <TableCell className="text-primary">詳細</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
