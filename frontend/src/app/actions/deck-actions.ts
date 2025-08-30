"use server";

import { Deck } from "@/type";
import { PostDeckFormData } from "@/type/request";
import { getAccessToken } from "@/util/auth";
import { deleteApi, getApi, postApi, putApi } from "@/util/fetcher";

// ユーザーのデッキ一覧を取得
export async function getAllDecks(): Promise<Deck[]> {
  try {
    const accessToken = await getAccessToken();
    return await getApi(`/decks`, accessToken);
  } catch {
    return [];
  }
}

// デッキを取得
export async function getDeck(id: number): Promise<Deck | undefined> {
  try {
    const accessToken = await getAccessToken();
    return await getApi(`/decks/${id}`, accessToken);
  } catch {
    return undefined;
  }
}

// デッキを作成
export async function postDeck(
  data: PostDeckFormData
): Promise<Deck | undefined> {
  try {
    const accessToken = await getAccessToken();
    return await postApi(`/decks/create`, data, accessToken);
  } catch {
    return undefined;
  }
}

// デッキを更新
export async function putDeck(
  data: PostDeckFormData
): Promise<Deck | undefined> {
  try {
    const accessToken = await getAccessToken();
    console.log(data);
    return await putApi(`/decks/update`, data, accessToken);
  } catch {
    return undefined;
  }
}

// デッキを削除
export async function deleteDeck(id: number): Promise<undefined> {
  try {
    const accessToken = await getAccessToken();
    return await deleteApi(`/decks/${id}`, accessToken);
  } catch {
    return undefined;
  }
}

// デッキをエクスポート
export async function exportDeck(id: number) {
  try {
    const accessToken = await getAccessToken();
    return await getApi(`/decks/${id}/export`, accessToken);
  } catch {
    return undefined;
  }
}
