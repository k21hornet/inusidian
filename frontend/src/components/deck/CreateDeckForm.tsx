"use client";

import { postDeck } from "@/app/actions/deck-actions";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

export default function CreateDeckForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    deckName: "",
    deckDescription: "",
    cardFields: [
      { fieldName: "", fieldType: "primary" },
      { fieldName: "", fieldType: "front" },
      { fieldName: "", fieldType: "front" },
      { fieldName: "", fieldType: "back" },
      { fieldName: "", fieldType: "back" },
    ],
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

    const data = await postDeck(formData);
    if (data) {
      router.push(`/deck/${data.id}`);
    }
  };

  return (
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

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" gutterBottom>
          カードのフィールドを設定（表）
        </Typography>
      </Box>

      <TextField
        label="例：単語"
        type="text"
        value={formData.cardFields[0].fieldName}
        onChange={(e) => handleFieldChange(0, e.target.value)}
        required
      />
      <TextField
        label="例：発音記号"
        type="text"
        value={formData.cardFields[1].fieldName}
        onChange={(e) => handleFieldChange(1, e.target.value)}
        required
      />
      <TextField
        label="例：例文"
        type="text"
        value={formData.cardFields[2].fieldName}
        onChange={(e) => handleFieldChange(2, e.target.value)}
        required
      />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" gutterBottom>
          カードのフィールドを設定（裏）
        </Typography>
      </Box>
      <TextField
        label="例：意味"
        type="text"
        value={formData.cardFields[3].fieldName}
        onChange={(e) => handleFieldChange(3, e.target.value)}
        required
      />
      <TextField
        label="例：翻訳"
        type="text"
        value={formData.cardFields[4].fieldName}
        onChange={(e) => handleFieldChange(4, e.target.value)}
        required
      />

      <Box>
        <Button variant="contained" type="submit">
          デッキを作成
        </Button>
      </Box>
    </Box>
  );
}
