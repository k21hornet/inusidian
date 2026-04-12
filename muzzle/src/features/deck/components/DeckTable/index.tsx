"use client";

import { convertDate } from "@/util/convertDate";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Deck } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export type DeckTableProps = {
  decks: Deck[];
};

export const DeckTable = ({ decks }: DeckTableProps) => {
  const router = useRouter();

  return (
    <Card className="mb-6 gap-0 py-0">
      <div className="flex items-center justify-between p-4">
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
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#00e5ff] to-[#2962ff]">
                      <BookOpen className="h-6 w-6 text-white" />
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
        <div className="flex w-full flex-col items-center justify-center gap-2 py-4 text-center text-[#888]">
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
    </Card>
  );
};
