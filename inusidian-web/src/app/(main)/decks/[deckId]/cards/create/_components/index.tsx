"use client";

import { postCard } from "@/actions/card";
import { Deck } from "@/type/index";
import { PostCardFormData } from "@/type/request";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Props = {
  deck: Deck;
};

export default function CreateCardPage({ deck }: Props) {
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

      toast.success("カードを作成しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {deck.cardFields.map((field, idx) => (
        <div key={field.id} className="flex flex-col gap-1">
          <Label htmlFor={`field-${field.id}`}>{field.fieldName}</Label>
          <Input
            id={`field-${field.id}`}
            type="text"
            value={formData.values[idx].content}
            onChange={(e) => handleFieldChange(idx, e.target.value)}
            className="w-full"
          />
        </div>
      ))}

      <div>
        <Button buttonDesign="secondary" type="submit">
          カードを作成
        </Button>
      </div>
    </form>
  );
}
