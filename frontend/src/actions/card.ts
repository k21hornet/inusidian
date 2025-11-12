"use server";

import { Card } from "@/type/index";
import { PostCardFormData } from "@/type/request";
import { postApi, putApi, deleteApi } from "@/util/fetcher";

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
