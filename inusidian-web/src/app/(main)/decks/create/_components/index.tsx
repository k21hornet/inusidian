"use client";

import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { importDeck } from "@/actions/deck";
import { postDeck } from "@/actions/deck";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { useFieldArray } from "@/hooks/use-field-array";
import { FieldArraySection } from "./field-array-section";

export default function CreateDeckPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    deckName: "",
    deckDescription: "",
  });

  const frontFields = useFieldArray([{ fieldName: "", fieldType: "front" }]);
  const backFields = useFieldArray([{ fieldName: "", fieldType: "back" }]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importData = JSON.parse(text);

      if (!importData.deckInfo || !importData.cards) {
        throw new Error("無効なファイル形式です");
      }

      const data = await importDeck(importData);
      if (data) {
        router.push(`/decks/${data.id}`);
      }
    } catch (error) {
      console.error("インポートエラー:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();

    const cardFields = [...frontFields.fields, ...backFields.fields];

    const submitData = {
      deckName: formData.deckName,
      deckDescription: formData.deckDescription,
      cardFields: cardFields,
    };

    const data = await postDeck(submitData);
    if (data) {
      router.push(`/decks/${data.id}`);
    }
  };

  return (
    <>
      <Heading variant="h1" className="mb-1">
        デッキ新規作成
      </Heading>

      <div className="flex justify-start md:justify-end mb-2">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileImport}
            className="hidden"
            accept=".json,.csv"
          />
          <Button
            buttonDesign="secondary"
            variant="contained"
            onClick={handleButtonClick}
            type="button"
          >
            デッキをインポート
          </Button>
        </form>
      </div>

      <div className="mb-4 p-6 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
        <Heading variant="h2" className="mb-2">
          デッキを作成
        </Heading>
        <p className="mb-4 text-sm text-muted-foreground">
          デッキを手動で作成する場合はこちらから作成してください。
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mb-6">
            <FormInput
              label="デッキ名*"
              type="text"
              name="deckName"
              value={formData.deckName}
              onChange={handleChange}
              required
              placeholder="デッキ名を入力"
              className="w-full md:w-[300px]"
            />
            <FormInput
              label="デッキ説明文*"
              type="text"
              name="deckDescription"
              value={formData.deckDescription}
              onChange={handleChange}
              required
              placeholder="デッキ説明文を入力"
              className="w-full md:w-[300px]"
            />
          </div>

          <Heading variant="h4" className="mb-2">
            フィールドを設定
          </Heading>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <FieldArraySection
              fields={frontFields.fields}
              labelPrefix="フィールド表"
              placeholder="例：単語"
              onFieldChange={frontFields.updateField}
              onAddField={frontFields.addField}
              onRemoveField={frontFields.removeField}
            />

            <div className="border-t md:border-t-0 md:border-l border-border my-4 md:my-0" />

            <FieldArraySection
              fields={backFields.fields}
              labelPrefix="フィールド裏"
              placeholder="例：意味"
              onFieldChange={backFields.updateField}
              onAddField={backFields.addField}
              onRemoveField={backFields.removeField}
            />
          </div>

          <div className="flex justify-center">
            <Button buttonDesign="secondary" type="submit">
              デッキを作成
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
