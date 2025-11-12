"use server";

import { Deck } from "@/type";
import { IODeckData, PostDeckFormData } from "@/type/request";
import { deleteApi, getApi, postApi, putApi } from "@/util/fetcher";

// デッキを作成
export async function postDeck(
  data: PostDeckFormData
): Promise<Deck | undefined> {
  try {
    return await postApi(`/decks/create`, data);
  } catch {
    return undefined;
  }
}

// デッキを更新
export async function putDeck(
  data: PostDeckFormData
): Promise<Deck | undefined> {
  try {
    return await putApi(`/decks/update`, data);
  } catch {
    return undefined;
  }
}

// デッキを削除
export async function deleteDeck(id: number): Promise<undefined> {
  try {
    return await deleteApi(`/decks/${id}`);
  } catch {
    return undefined;
  }
}

// デッキをエクスポート
export async function exportDeck(id: number) {
  try {
    return await getApi(`/decks/${id}/export`);
  } catch {
    return undefined;
  }
}

// デッキをインポート
export async function importDeck(data: IODeckData) {
  try {
    return await postApi(`/decks/import`, data);
  } catch {
    return undefined;
  }
}
