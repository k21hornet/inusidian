"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeckTabPanel from "./DeckTabPanel";
import { useRouter, useSearchParams } from "next/navigation";
import CardList from "./CardList";
import { deleteDeck, getDeck } from "@/features/deck";

import { Deck } from "@/type/index";
import CreateCardForm from "./CreateCardForm";
import ReviewCards from "./ReviewCards";
import EditDeckForm from "./EditDeckForm";
import { PrimaryButton } from "@/components/ui/Button/primary-button";

type Props = {
  deck: Deck;
};

export default function DeckTab({ deck: initialDeck }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(0);
  const [deck, setDeck] = useState<Deck>(initialDeck);

  // デッキ情報を再取得する関数
  const refreshDeck = async () => {
    const updatedDeck = await getDeck(deck.id);
    if (updatedDeck) {
      setDeck(updatedDeck);
    }
  };

  useEffect(() => {
    // URLのクエリパラメータに'review'が含まれていれば復習タブ（index: 1）を選択
    const reviewParam = searchParams.get("review");
    if (reviewParam !== null) {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [searchParams]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // デッキ削除
  const handleDelete = async (id: number) => {
    const confirm = window.confirm("本当に削除しますか？");
    if (!confirm) return;
    await deleteDeck(id);
    router.push("/dashboard");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="カード一覧" />
          <Tab label="復習" />
          <Tab label="カード作成" />
          <Tab label="設定" />
        </Tabs>
      </Box>
      <DeckTabPanel value={value} index={0}>
        <CardList deck={deck} onCardUpdated={refreshDeck} />
      </DeckTabPanel>
      <DeckTabPanel value={value} index={1}>
        <ReviewCards deckId={deck.id} onReviewCompleted={refreshDeck} />
      </DeckTabPanel>
      <DeckTabPanel value={value} index={2}>
        <CreateCardForm deck={deck} onCardCreated={refreshDeck} />
      </DeckTabPanel>
      <DeckTabPanel value={value} index={3}>
        <EditDeckForm deck={deck} onDeckUpdated={refreshDeck} />
        <PrimaryButton onClick={() => handleDelete(deck.id)}>
          デッキ削除
        </PrimaryButton>
      </DeckTabPanel>
    </Box>
  );
}
