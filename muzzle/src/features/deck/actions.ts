"use server";

import { Deck, IODeckData, PostDeckFormData } from "./types";
import { fetcherOld } from "@/util/fetcherOld";

// デッキを作成
export async function postDeck(
  data: PostDeckFormData,
): Promise<Deck | undefined> {
  return await fetcherOld.post(`/decks/create`, data);
}

// デッキを更新
export async function putDeck(
  data: PostDeckFormData,
): Promise<Deck | undefined> {
  return await fetcherOld.put(`/decks/update`, data);
}

// デッキを削除
export async function deleteDeck(id: number): Promise<undefined> {
  return await fetcherOld.delete(`/decks/${id}`);
}

// デッキをエクスポート
export async function exportDeck(id: number) {
  return await fetcherOld.get(`/decks/${id}/export`);
}

// デッキをインポート
export async function importDeck(data: IODeckData) {
  return await fetcherOld.post(`/decks/import`, data);
}
