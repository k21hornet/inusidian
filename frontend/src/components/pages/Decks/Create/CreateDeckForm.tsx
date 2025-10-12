"use client";

import { postDeck } from "@/features/deck";
import { Box, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function CreateDeckForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    deckName: "",
    deckDescription: "",
    cardFields: [{ fieldName: "", fieldType: "primary" }],
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

  // cardFieldsを追加
  const handleAddField = (fieldType: "front" | "back") => {
    setFormData((prev) => ({
      ...prev,
      cardFields: [...prev.cardFields, { fieldName: "", fieldType }],
    }));
  };

  // cardFieldsを削除
  const handleDeleteField = (index: number) => {
    const newFields = [...formData.cardFields];
    newFields.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      cardFields: newFields,
    }));
  };

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();

    const data = await postDeck(formData);
    if (data) {
      router.push(`/decks/${data.id}`);
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">デッキ基本情報</Typography>
      <TextField
        label="デッキ名"
        type="text"
        name="deckName"
        value={formData.deckName}
        onChange={handleChange}
        required
        sx={{ maxWidth: 200 }}
        size="small"
        variant="standard"
      />
      <TextField
        label="デッキ説明文"
        fullWidth
        type="text"
        name="deckDescription"
        value={formData.deckDescription}
        onChange={handleChange}
        required
        size="small"
        variant="standard"
      />

      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">カードのフィールドを設定【表面】</Typography>

        <Button
          buttonDesign="secondary"
          variant="outlined"
          onClick={() => handleAddField("front")}
        >
          フィールドを追加
        </Button>
      </Box>

      <TextField
        label="例：単語"
        type="text"
        value={formData.cardFields[0].fieldName}
        onChange={(e) => handleFieldChange(0, e.target.value)}
        required
        size="small"
        variant="standard"
        sx={{ maxWidth: 300 }}
      />

      {formData.cardFields.map((field, index) => (
        <Box key={index}>
          {field.fieldType === "front" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="例：単語"
                type="text"
                value={field.fieldName}
                onChange={(e) => handleFieldChange(index, e.target.value)}
                required
                size="small"
                variant="standard"
                sx={{ flex: 1, maxWidth: 300 }}
              />
              <Button
                buttonDesign="secondary"
                variant="outlined"
                onClick={() => handleDeleteField(index)}
              >
                削除
              </Button>
            </Box>
          )}
        </Box>
      ))}

      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">カードのフィールドを設定【裏面】</Typography>

        <Button
          buttonDesign="secondary"
          variant="outlined"
          onClick={() => handleAddField("back")}
        >
          フィールドを追加
        </Button>
      </Box>

      {formData.cardFields.map((field, index) => (
        <Box key={index}>
          {field.fieldType === "back" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="例：意味"
                type="text"
                value={field.fieldName}
                onChange={(e) => handleFieldChange(index, e.target.value)}
                required
                size="small"
                variant="standard"
                sx={{ flex: 1, maxWidth: 300 }}
              />
              <Button
                buttonDesign="secondary"
                variant="outlined"
                onClick={() => handleDeleteField(index)}
              >
                削除
              </Button>
            </Box>
          )}
        </Box>
      ))}

      <Box>
        <Button buttonDesign="secondary" type="submit">
          デッキを作成
        </Button>
      </Box>
    </Box>
  );
}
