"use server";

import { Card, PostCardFormData } from "./types";
import { fetcherOld } from "@/util/fetcherOld";

// カードを作成
export async function postCard(
  data: PostCardFormData,
): Promise<Card | undefined> {
  return await fetcherOld.post(`/cards/create`, data);
}

// カードを更新
export async function updateCard(
  data: PostCardFormData,
): Promise<Card | undefined> {
  return await fetcherOld.put(`/cards/update`, data);
}

// カードを削除
export async function deleteCard(id: number): Promise<undefined> {
  return await fetcherOld.delete(`/cards/${id}`);
}
