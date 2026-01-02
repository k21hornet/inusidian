"use server";

import { Deck } from "@/type";
import { IODeckData, PostDeckFormData } from "@/type/request";
import { fetcher } from "@/util/fetcher";

// デッキを作成
export async function postDeck(
  data: PostDeckFormData
): Promise<Deck | undefined> {
  return await fetcher.post(`/decks/create`, data);
}

// デッキを更新
export async function putDeck(
  data: PostDeckFormData
): Promise<Deck | undefined> {
  return await fetcher.put(`/decks/update`, data);
}

// デッキを削除
export async function deleteDeck(id: number): Promise<undefined> {
  return await fetcher.delete(`/decks/${id}`);
}

// デッキをエクスポート
export async function exportDeck(id: number) {
  return await fetcher.get(`/decks/${id}/export`);
}

// デッキをインポート
export async function importDeck(data: IODeckData) {
  return await fetcher.post(`/decks/import`, data);
}
