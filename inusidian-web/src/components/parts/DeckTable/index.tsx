"use client";

import React from "react";
import { convertDate } from "@/util/convertDate";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Deck } from "@/type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DeckTableProps = {
  decks: Deck[];
};

export const DeckTable = ({ decks }: DeckTableProps) => {
  const router = useRouter();

  return (
    <div className="mb-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-2xl bg-white">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold">デッキ一覧</h2>
        <Button component={Link} href="/decks/create" buttonDesign="secondary">
          デッキ作成
        </Button>
      </div>
      {decks.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>デッキ</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead className="hidden md:table-cell">枚数</TableHead>
              <TableHead className="hidden md:table-cell">作成日</TableHead>
              <TableHead className="hidden sm:table-cell"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {decks?.map((deck) => (
              <TableRow
                key={deck.id}
                className="cursor-pointer hover:bg-[#f1f2f3]"
                onClick={() => router.push(`/decks/${deck.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center w-9 h-9 bg-gradient-to-br from-[#00e5ff] to-[#2962ff] rounded-lg">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold">{deck.deckName}</div>
                      <div>{deck.deckDescription}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {deck.dueCardCount && deck.dueCardCount > 0
                    ? "残り" + deck.dueCardCount + "枚"
                    : "復習済み"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {deck.cardCount || 0}枚
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {convertDate(deck.createdAt)}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Button variant="outlined" buttonDesign="secondary">
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full flex flex-col justify-center gap-2 py-4 items-center text-center text-[#888]">
          <img
            src="/empty-deck.png"
            alt="デッキがありません"
            className="w-[140px] md:w-[195px]"
          />
          <p className="font-bold text-[#9E9E9E]">
            デッキを作成して学習を始めましょう！
          </p>
        </div>
      )}
    </div>
  );
};
