"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const SPMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button type="button" className="cursor-pointer">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[200px]">
        <SheetHeader>
          <SheetTitle>メニュー</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Link
            href="/home"
            className="no-underline text-inherit text-base font-bold"
            onClick={() => setOpen(false)}
          >
            ホーム
          </Link>
          <div className="border-t border-border" />
          <Link
            href="/decks"
            className="no-underline text-inherit text-base font-bold"
            onClick={() => setOpen(false)}
          >
            デッキ一覧
          </Link>
          <div className="border-t border-border" />
          <Link
            href="/statistics"
            className="no-underline text-inherit text-base font-bold"
            onClick={() => setOpen(false)}
          >
            統計
          </Link>
          <div className="border-t border-border" />
          <Link
            href="/learning-goals"
            className="no-underline text-inherit text-base font-bold"
            onClick={() => setOpen(false)}
          >
            学習目標
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
