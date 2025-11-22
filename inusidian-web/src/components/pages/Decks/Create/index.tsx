"use client";

import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/Heading";
import { importDeck } from "@/actions/deck";
import { postDeck } from "@/actions/deck";
import { Box, Divider, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  cardContentSx,
  deckDescriptionInputSx,
  deckNameInputSx,
  dividerSx,
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
    frontFields: [{ fieldName: "", fieldType: "front" }],
    backFields: [{ fieldName: "", fieldType: "back" }],
  });

  // 通常のフィールドの変更処理
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 表のフィールド変更処理
  const handleFrontFieldChange = (index: number, value: string) => {
    const newFields = [...formData.frontFields];
    newFields[index] = { ...newFields[index], fieldName: value };
    setFormData((prev) => ({
      ...prev,
      frontFields: newFields,
    }));
  };

  // 裏のフィールド変更処理
  const handleBackFieldChange = (index: number, value: string) => {
    const newFields = [...formData.backFields];
    newFields[index] = { ...newFields[index], fieldName: value };
    setFormData((prev) => ({
      ...prev,
      backFields: newFields,
    }));
  };

  // 表のフィールド追加
  const handleAddFrontField = () => {
    setFormData((prev) => ({
      ...prev,
      frontFields: [...prev.frontFields, { fieldName: "", fieldType: "front" }],
    }));
  };

  // 裏のフィールド追加
  const handleAddBackField = () => {
    setFormData((prev) => ({
      ...prev,
      backFields: [...prev.backFields, { fieldName: "", fieldType: "back" }],
    }));
  };

  // 表のフィールド削除
  const handleDeleteFrontField = (index: number) => {
    const newFields = [...formData.frontFields];
    newFields.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      frontFields: newFields,
    }));
  };

  // 裏のフィールド削除
  const handleDeleteBackField = (index: number) => {
    const newFields = [...formData.backFields];
    newFields.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      backFields: newFields,
    }));
  };

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();

    // 表と裏のフィールドを結合
    const cardFields = [...formData.frontFields, ...formData.backFields];

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
              sx={deckNameInputSx}
            />
            <FormInput
              label="デッキ説明文*"
              type="text"
              name="deckDescription"
              value={formData.deckDescription}
              onChange={handleChange}
              required
              placeholder="デッキ説明文を入力"
              sx={deckDescriptionInputSx}
            />
          </Box>

          <Heading variant="h4" sx={{ mb: 2 }}>
            フィールドを設定
          </Heading>

          <Box sx={formFieldContainerSx}>
            {/* 表のフィールド */}
            <Box>
              <Box sx={formFieldSx}>
                <FormInput
                  label="フィールド表1*"
                  type="text"
                  name={`frontField_0`}
                  value={formData.frontFields[0].fieldName}
                  onChange={(e) => handleFrontFieldChange(0, e.target.value)}
                  required
                  placeholder="例：単語"
                  sx={{ width: 225 }}
                />
                <AddCircleIcon
                  sx={formFieldAddIconSx}
                  onClick={handleAddFrontField}
                />
              </Box>

              {formData.frontFields.slice(1).map((field, index) => (
                <Box key={index + 1} sx={formFieldSx}>
                  <FormInput
                    label={`フィールド表${index + 2}*`}
                    type="text"
                    name={`frontField_${index + 1}`}
                    value={field.fieldName}
                    onChange={(e) =>
                      handleFrontFieldChange(index + 1, e.target.value)
                    }
                    required
                    placeholder="例：単語"
                    sx={{ width: 225 }}
                  />
                  <ClearIcon
                    sx={formFieldAddIconSx}
                    onClick={() => handleDeleteFrontField(index + 1)}
                  />
                </Box>
              ))}
            </Box>

            <Divider sx={dividerSx} />

            {/* 裏のフィールド */}
            <Box>
              <Box sx={formFieldSx}>
                <FormInput
                  label="フィールド裏1*"
                  type="text"
                  name={`backField_0`}
                  value={formData.backFields[0].fieldName}
                  onChange={(e) => handleBackFieldChange(0, e.target.value)}
                  required
                  placeholder="例：意味"
                  sx={{ width: 225 }}
                />
                <AddCircleIcon
                  sx={formFieldAddIconSx}
                  onClick={handleAddBackField}
                />
              </Box>

              {formData.backFields.slice(1).map((field, index) => (
                <Box key={index + 1} sx={formFieldSx}>
                  <FormInput
                    label={`フィールド裏${index + 2}*`}
                    type="text"
                    name={`backField_${index + 1}`}
                    value={field.fieldName}
                    onChange={(e) =>
                      handleBackFieldChange(index + 1, e.target.value)
                    }
                    required
                    placeholder="例：意味"
                    sx={{ width: 225 }}
                  />
                  <ClearIcon
                    sx={formFieldAddIconSx}
                    onClick={() => handleDeleteBackField(index + 1)}
                  />
                </Box>
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
