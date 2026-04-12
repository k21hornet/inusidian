"use server";

import { PostCardFormData } from "./types";
import { fetcher } from "@/util/fetcher";

// カードを作成
export async function postCard(data: PostCardFormData) {
  return await fetcher.post(`/cards/create`, data);
}

// カードを更新
export async function updateCard(data: PostCardFormData) {
  return await fetcher.put(`/cards/update`, data);
}

// カードを削除
export async function deleteCard(id: number) {
  return await fetcher.delete(`/cards/${id}`);
}
