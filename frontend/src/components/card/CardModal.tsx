import { deleteCard } from "@/lib/Card";
import { Card } from "@/type/Card";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";

export default function CardModal({
  open,
  handleClose,
  card,
}: {
  open: boolean;
  handleClose: () => void;
  card: Card | undefined;
}) {
  // カード削除
  const handleDelete = async (id: number) => {
    const confirm = window.confirm("本当に削除しますか？");
    if (!confirm) return;
    await deleteCard(id);
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
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box component={"form"}>
            {card.cardValues.map((value, idx) => (
              <TextField
                key={value.id}
                type="text"
                label={value.fieldName}
                fullWidth
                value={value.content}
                required
              />
            ))}

            <Box>
              <Button variant="contained" type="submit">
                保存
              </Button>
              <Button variant="contained" onClick={() => handleDelete(card.id)}>
                削除
              </Button>
              <Button variant="contained" onClick={handleClose}>
                戻る
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
