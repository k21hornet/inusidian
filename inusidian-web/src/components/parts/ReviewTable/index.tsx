"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

import { ReviewTableProps } from "./type";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ReviewTable = ({ decks }: ReviewTableProps) => {
  const router = useRouter();

  if (decks.length > 0) {
    return (
      <div className="mb-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-2xl bg-white">
        <div className="flex justify-between items-center p-4">
          <h2 className="font-bold">復習デッキ一覧</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>デッキ</TableHead>
              <TableHead className="hidden sm:table-cell"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {decks?.map((deck) => (
              <TableRow
                key={deck.id}
                className="cursor-pointer hover:bg-[#f1f2f3]"
                onClick={() => router.push(`/decks/${deck.id}/review`)}
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
                <TableCell className="hidden sm:table-cell">
                  <Button variant="outlined" buttonDesign="secondary">
                    復習
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    return null;
  }
};
