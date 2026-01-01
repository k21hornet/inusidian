import { deleteCard, updateCard } from "@/actions/card";
import { Card } from "@/type/index";
import { PostCardFormData } from "@/type/request";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          cardFieldId: value.field.id,
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

  if (card === undefined) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[80%] md:w-[800px] p-6">
        <DialogHeader>
          <DialogTitle>カード編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {card.cardValues.map((value, idx) => (
            <div key={value.id} className="flex flex-col gap-1">
              <Label htmlFor={`field-${value.id}`}>
                {value.field.fieldName}
              </Label>
              <Input
                id={`field-${value.id}`}
                type="text"
                value={formData.values[idx]?.content || ""}
                onChange={(e) => handleFieldChange(idx, e.target.value)}
                className="w-full"
              />
            </div>
          ))}

          <div className="flex justify-between">
            <Button
              buttonDesign="secondary"
              onClick={() => handleDelete(card.id)}
              type="button"
            >
              削除
            </Button>
            <div className="flex gap-1">
              <Button
                buttonDesign="secondary"
                variant="outlined"
                onClick={handleClose}
                type="button"
              >
                戻る
              </Button>
              <Button buttonDesign="secondary" type="submit">
                保存
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
