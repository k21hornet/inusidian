"use client";

import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/Heading";
import { importDeck, postDeck } from "@/features/deck";
import { Box, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  cardContentSx,
  formBaseInfoSx,
  formDescriptionSx,
  formFieldAddIconSx,
  formFieldContainerSx,
  formFieldSx,
  formSubmitButtonSx,
} from "./styles";
import { FormInput } from "@/components/ui/FormInput";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";

export default function CreateDeckPage() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

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

      // 基本的なバリデーション
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
    <>
      <Heading variant="h1" sx={{ mb: 1 }}>
        デッキ新規作成
      </Heading>

      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", md: "flex-end" },
        }}
      >
        <Box
          component={"form"}
          onSubmit={(e) => e.preventDefault()}
          sx={{ mb: 2 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileImport}
            style={{ display: "none" }}
            accept=".json,.csv" // ファイル形式を制限
          />
          <Button
            buttonDesign="secondary"
            variant="contained"
            onClick={handleButtonClick}
          >
            デッキをインポート
          </Button>
        </Box>
      </Box>

      {/* <CreateDeckForm /> */}
      <Box sx={cardContentSx}>
        <Heading variant="h2" sx={{ mb: 2 }}>
          デッキを作成
        </Heading>
        <Typography sx={formDescriptionSx}>
          デッキを手動で作成する場合はこちらから作成してください。
        </Typography>

        <Box component={"form"} onSubmit={handleSubmit}>
          <Box sx={formBaseInfoSx}>
            <FormInput
              label="デッキ名*"
              type="text"
              name="deckName"
              value={formData.deckName}
              onChange={handleChange}
              required
              placeholder="デッキ名を入力"
              sx={{ width: 225 }}
            />
            <FormInput
              label="デッキ説明文*"
              type="text"
              name="deckDescription"
              value={formData.deckDescription}
              onChange={handleChange}
              required
              placeholder="デッキ説明文を入力"
              sx={{ flex: 1 }}
            />
          </Box>

          <Heading variant="h4" sx={{ mb: 2 }}>
            フィールドを設定
          </Heading>

          <Box sx={formFieldContainerSx}>
            <Box>
              <Box sx={formFieldSx}>
                <FormInput
                  label="フィールド表1*"
                  type="text"
                  name={formData.cardFields[0].fieldName}
                  value={formData.cardFields[0].fieldName}
                  onChange={(e) => handleFieldChange(0, e.target.value)}
                  required
                  placeholder="例：単語"
                  sx={{ width: 225 }}
                />
                <AddCircleIcon
                  sx={formFieldAddIconSx}
                  onClick={() => handleAddField("front")}
                />
              </Box>

              {formData.cardFields.map((field, index) => (
                <div key={index}>
                  {field.fieldType === "front" && (
                    <Box key={index} sx={formFieldSx}>
                      <FormInput
                        label={`フィールド表${index + 1}*`}
                        type="text"
                        name={field.fieldName}
                        value={field.fieldName}
                        onChange={(e) =>
                          handleFieldChange(index, e.target.value)
                        }
                        required
                        placeholder="例：単語"
                        sx={{ width: 225 }}
                      />
                      <ClearIcon
                        sx={formFieldAddIconSx}
                        onClick={() => handleDeleteField(index)}
                      />
                    </Box>
                  )}
                </div>
              ))}
            </Box>

            <Box>
              <Box sx={formFieldSx}>
                <FormInput
                  label="フィールド裏1*"
                  type="text"
                  name={formData.cardFields[0].fieldName}
                  value={formData.cardFields[0].fieldName}
                  onChange={(e) => handleFieldChange(0, e.target.value)}
                  required
                  placeholder="例：単語"
                  sx={{ width: 225 }}
                />
                <AddCircleIcon
                  sx={formFieldAddIconSx}
                  onClick={() => handleAddField("back")}
                />
              </Box>

              {formData.cardFields.map((field, index) => (
                <div key={index}>
                  {field.fieldType === "back" && (
                    <Box key={index} sx={formFieldSx}>
                      <FormInput
                        label={`フィールド裏${index + 1}*`}
                        type="text"
                        name={field.fieldName}
                        value={field.fieldName}
                        onChange={(e) =>
                          handleFieldChange(index, e.target.value)
                        }
                        required
                        placeholder="例：単語"
                        sx={{ width: 225 }}
                      />
                      <ClearIcon
                        sx={formFieldAddIconSx}
                        onClick={() => handleDeleteField(index)}
                      />
                    </Box>
                  )}
                </div>
              ))}
            </Box>
          </Box>

          <Box sx={formSubmitButtonSx}>
            <Button buttonDesign="secondary" type="submit">
              デッキを作成
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
