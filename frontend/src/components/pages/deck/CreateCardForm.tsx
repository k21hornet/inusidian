"use client";

import { postCard } from "@/app/actions/card";
import { PrimaryButton } from "@/components/ui/button";
import { Deck } from "@/type/index";
import { PostCardFormData } from "@/type/request";
import { Alert, Box, Snackbar, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

type Props = {
  deck: Deck;
  onCardCreated?: () => void; // カード作成後のコールバック
};

export default function CreateCardForm({ deck, onCardCreated }: Props) {
  const [open, setOpen] = useState(false); // Snackbarの開閉状態

  // 各カード属性ごとにfieldIdとcontentを持つ
  const [formData, setFormData] = useState<PostCardFormData>({
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
      // フォームをリセット
      setFormData({
        deckId: deck.id,
        values: deck.cardFields.map((field) => ({
          fieldId: field.id,
          content: "",
        })),
      });

      // カード作成後のコールバックを実行
      if (onCardCreated) {
        onCardCreated();
      }
      setOpen(true);
    }
  };

  return (
    <>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {deck.cardFields.map((field, idx) => (
          <TextField
            key={field.id}
            type="text"
            label={field.fieldName}
            fullWidth
            value={formData.values[idx].content}
            onChange={(e) => handleFieldChange(idx, e.target.value)}
          />
        ))}

        <Box>
          <PrimaryButton type="submit">カードを作成</PrimaryButton>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          カードを作成しました
        </Alert>
      </Snackbar>
    </>
  );
}
