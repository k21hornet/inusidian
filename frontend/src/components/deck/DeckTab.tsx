"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeckTabPanel from "./DeckTabPanel";
import { useSearchParams } from "next/navigation";
import CardList from "../card/CardList";

import { Deck } from "@/type/Deck";
import CreateCardForm from "../card/CreateCardForm";

type Props = {
  deck: Deck;
};

export default function DeckTab({ deck }: Props) {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(0);

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
        <CardList deck={deck} />
      </DeckTabPanel>
      <DeckTabPanel value={value} index={1}>
        復習
      </DeckTabPanel>
      <DeckTabPanel value={value} index={2}>
        <CreateCardForm deck={deck} />
      </DeckTabPanel>
      <DeckTabPanel value={value} index={3}>
        設定
      </DeckTabPanel>
    </Box>
  );
}
