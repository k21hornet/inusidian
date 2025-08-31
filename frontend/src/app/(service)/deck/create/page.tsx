import CreateDeckForm from "@/components/deck/CreateDeckForm";
import ImportDeckForm from "@/components/deck/ImportDeckForm";
import { Typography } from "@mui/material";
import React from "react";

export default function CreateDeckPage() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        デッキ新規作成
      </Typography>

      <ImportDeckForm />
      <CreateDeckForm />
    </>
  );
}
