"use client";

import { exportDeck, putDeck } from "@/app/actions/deck";
import { PrimaryButton } from "@/components/ui/button/primary-button";
import { Deck } from "@/type";
import { Alert, Box, Snackbar, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";

type Props = {
  deck: Deck;
  onDeckUpdated: () => void;
};

export default function EditDeckForm({ deck, onDeckUpdated }: Props) {
  const [open, setOpen] = useState(false); // Snackbarの開閉状態
  const [formData, setFormData] = useState({
    deckId: deck.id,
    deckName: deck.deckName,
    deckDescription: deck.deckDescription,
    cardFields: deck.cardFields.map((field) => ({
      fieldId: field.id,
      fieldName: field.fieldName,
      fieldType: field.fieldType,
    })),
  });

  // 通常のフィールドの変更処理
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // cardFieldsの特定のインデックスの値変更処理
  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...formData.cardFields]; // 現在の値をコピー
    newFields[index] = { ...newFields[index], fieldName: value }; // 該当フィールドのみ更新
    setFormData((prev) => ({
      ...prev,
      cardFields: newFields,
    }));
  };

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();

    const data = await putDeck(formData);
    if (data) {
      // コールバック実行
      onDeckUpdated();
      setOpen(true);
    }
  };

  // デッキをエクスポート
  const handleExport = async () => {
    const data = await exportDeck(deck.id);

    // JSONファイルとしてダウンロード
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${deck.deckName}-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <>
      <PrimaryButton onClick={handleExport}>デッキをエクスポート</PrimaryButton>

      <Box component={"form"} onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          デッキ基本情報
        </Typography>
        <TextField
          label="デッキ名"
          type="text"
          name="deckName"
          value={formData.deckName}
          onChange={handleChange}
          required
        />
        <TextField
          label="デッキ説明文"
          fullWidth
          type="text"
          name="deckDescription"
          value={formData.deckDescription}
          onChange={handleChange}
          required
        />

        <Typography variant="h6" gutterBottom>
          カードのフィールドを設定
        </Typography>

        {formData.cardFields.map((field, index) => (
          <Box key={index}>
            <TextField
              label={field.fieldType === "primary" || "front" ? "表" : "裏"}
              type="text"
              value={field.fieldName}
              onChange={(e) => handleFieldChange(index, e.target.value)}
              required
            />
          </Box>
        ))}

        <PrimaryButton type="submit">更新</PrimaryButton>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          デッキを更新しました
        </Alert>
      </Snackbar>
    </>
  );
}
