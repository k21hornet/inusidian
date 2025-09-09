import { Typography } from "@mui/material";
import ImportDeckForm from "./ImportDeckForm";
import CreateDeckForm from "./CreateDeckForm";

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
