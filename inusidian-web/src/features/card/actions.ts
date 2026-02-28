"use server";

import { Card, PostCardFormData } from "./types";
import { fetcher } from "@/util/fetcher";

// カードを作成
export async function postCard(
  data: PostCardFormData,
): Promise<Card | undefined> {
  return await fetcher.post(`/cards/create`, data);
}

// カードを更新
export async function updateCard(
  data: PostCardFormData,
): Promise<Card | undefined> {
  return await fetcher.put(`/cards/update`, data);
}

// カードを削除
export async function deleteCard(id: number): Promise<undefined> {
  return await fetcher.delete(`/cards/${id}`);
}
