"use server";

import { Card } from "@/type/index";
import { PostCardFormData } from "@/type/request";
import { getApi, postApi, putApi, deleteApi } from "@/util/fetcher";

// カードを取得
export async function getCard(id: number): Promise<Card | undefined> {
  try {
    return await getApi(`/cards/${id}`);
  } catch {
    return undefined;
  }
}

// カードを作成
export async function postCard(
  data: PostCardFormData
): Promise<Card | undefined> {
  try {
    return await postApi(`/cards/create`, data);
  } catch {
    return undefined;
  }
}

// カードを更新
export async function updateCard(
  data: PostCardFormData
): Promise<Card | undefined> {
  try {
    return await putApi(`/cards/update`, data);
  } catch {
    return undefined;
  }
}

// カードを削除
export async function deleteCard(id: number): Promise<undefined> {
  try {
    return await deleteApi(`/cards/${id}`);
  } catch {
    return undefined;
  }
}

// 次のカードIDを取得
export async function getNextCardId(
  deckId: number,
  cardId: number
): Promise<number> {
  try {
    return await getApi(`/cards/next/${deckId}/${cardId}`);
  } catch {
    return -999;
  }
}

// 前のカードIDを取得
export async function getPrevCardId(
  deckId: number,
  cardId: number
): Promise<number> {
  try {
    return await getApi(`/cards/prev/${deckId}/${cardId}`);
  } catch {
    return -999;
  }
}
