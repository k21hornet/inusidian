"use client";

import { importDeck } from "@/app/actions/deck-actions";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ImportDeckForm() {
  const router = useRouter();

  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importData = JSON.parse(text);

      // 基本的なバリデーション
      if (!importData.deckInfo || !importData.cards) {
        throw new Error("無効なファイル形式です");
      }

      const data = await importDeck(importData);
      if (data) {
        router.push(`/deck/${data.id}`);
      }
    } catch (error) {
      console.error("インポートエラー:", error);
    }
  };

  return (
    <Box component={"form"} onSubmit={(e) => e.preventDefault()}>
      <input type="file" onChange={handleFileImport} />
    </Box>
  );
}
