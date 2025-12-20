"use client";

import { deleteDeck, exportDeck } from "@/actions/deck";
import { putDeck } from "@/actions/deck";
import { Deck } from "@/type";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Props = {
  deck: Deck;
};

export default function DeckSettingsPage({ deck }: Props) {
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
      toast.success("デッキを更新しました");
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

  const router = useRouter();
  // デッキを削除
  const handleDelete = async () => {
    if (confirm("デッキを削除しますか？")) {
      await deleteDeck(deck.id);
      router.push("/decks");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between mb-2">
        <h3 className="text-xl font-semibold mb-2 md:mb-0">デッキ基本情報</h3>
        <Button buttonDesign="secondary" onClick={handleExport}>
          デッキをエクスポート
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="deckName">デッキ名</Label>
          <Input
            id="deckName"
            type="text"
            name="deckName"
            value={formData.deckName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="deckDescription">デッキ説明文</Label>
          <Input
            id="deckDescription"
            type="text"
            name="deckDescription"
            value={formData.deckDescription}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <h3 className="text-xl font-semibold mt-4 mb-2">カードのフィールドを設定</h3>

        {formData.cardFields.map((field, index) => (
          <div key={index} className="flex flex-col gap-1 max-w-[300px]">
            <Label htmlFor={`field-${index}`}>
              {field.fieldType === "primary" || field.fieldType === "front"
                ? "表"
                : "裏"}
            </Label>
            <Input
              id={`field-${index}`}
              type="text"
              value={field.fieldName}
              onChange={(e) => handleFieldChange(index, e.target.value)}
              required
            />
          </div>
        ))}

        <Button
          buttonDesign="secondary"
          type="submit"
          className="max-w-[300px] mt-2"
        >
          更新
        </Button>
        <Button
          buttonDesign="secondary"
          className="max-w-[300px]"
          onClick={handleDelete}
          type="button"
        >
          デッキを削除
        </Button>
      </form>
    </>
  );
}
