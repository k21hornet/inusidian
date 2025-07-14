"use client";

import { postCard } from "@/lib/Card";
import { Deck } from "@/type/Deck";
import { Box, Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

type Props = {
  deck: Deck;
};

export default function CreateCardForm({ deck }: Props) {
  // 各カード属性ごとにfieldIdとcontentを持つ
  const [formData, setFormData] = useState({
    deckId: deck.id,
    values: deck.cardFields.map((field) => ({
      fieldId: field.id, // 各フィールドのIDをセット
      content: "",
    })),
  });

  const handleFieldChange = (index: number, value: string) => {
    const newValues = [...formData.values]; // 現在の値をコピー
    newValues[index] = { ...newValues[index], content: value }; // 該当フィールドのみ更新
    setFormData((prev) => ({
      ...prev,
      values: newValues,
    }));
  };

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();

    const data = await postCard(formData);
    if (data) {
      setFormData({
        deckId: deck.id,
        values: deck.cardFields.map((field) => ({
          fieldId: field.id, // 各フィールドのIDをセット
          content: "",
        })),
      });
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      {deck.cardFields.map((field, idx) => (
        <TextField
          key={field.id}
          type="text"
          label={field.fieldName}
          fullWidth
          value={formData.values[idx].content}
          onChange={(e) => handleFieldChange(idx, e.target.value)}
          required
        />
      ))}

      <Box>
        <Button variant="contained" type="submit">
          カードを作成
        </Button>
      </Box>
    </Box>
  );
}
