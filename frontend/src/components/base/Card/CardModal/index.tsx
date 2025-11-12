import { deleteCard, updateCard } from "@/actions/card";
import { Card } from "@/type/index";
import { PostCardFormData } from "@/type/request";
import { Box, Modal, TextField } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function CardModal({
  open,
  handleClose,
  card,
}: {
  open: boolean;
  handleClose: () => void;
  card: Card | undefined;
}) {
  const [formData, setFormData] = useState<PostCardFormData>({
    cardId: 0,
    deckId: 0,
    values: [],
  });

  // cardプロパティが変更されたときにformDataを更新
  useEffect(() => {
    if (card) {
      setFormData({
        cardId: card.id,
        deckId: card.deckId,
        values: card.cardValues.map((value) => ({
          fieldId: value.field.id,
          content: value.content,
        })),
      });
    }
  }, [card]);

  const handleFieldChange = (index: number, value: string) => {
    const newValues = [...formData.values]; // 現在の値をコピー
    newValues[index] = { ...newValues[index], content: value }; // 該当フィールドのみ更新
    setFormData((prev) => ({
      ...prev,
      values: newValues,
    }));
  };

  // カード編集
  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();

    const data = await updateCard(formData);
    if (data) {
      handleClose();
    }
  };

  // カード削除
  const handleDelete = async (id: number) => {
    const confirm = window.confirm("本当に削除しますか？");
    if (!confirm) return;
    await deleteCard(id);
    handleClose();
  };

  if (card === undefined) return;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", md: 800 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {card.cardValues.map((value, idx) => (
              <TextField
                key={value.id}
                type="text"
                label={value.field.fieldName}
                fullWidth
                value={formData.values[idx]?.content}
                onChange={(e) => handleFieldChange(idx, e.target.value)}
              />
            ))}

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                buttonDesign="secondary"
                onClick={() => handleDelete(card.id)}
              >
                削除
              </Button>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  buttonDesign="secondary"
                  variant="outlined"
                  onClick={handleClose}
                >
                  戻る
                </Button>
                <Button buttonDesign="secondary" type="submit">
                  保存
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
