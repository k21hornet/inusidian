"use server";

import { Card } from "@/type/index";
import { PostCardFormData } from "@/type/request";
import { getAccessToken } from "@/util/auth";
import { postApi, putApi, deleteApi } from "@/util/fetcher";

// カードを作成
export async function postCard(
  data: PostCardFormData
): Promise<Card | undefined> {
  try {
    const accessToken = await getAccessToken();
    return await postApi(`/cards/create`, data, accessToken);
  } catch {
    return undefined;
  }
}

// カードを更新
export async function updateCard(
  data: PostCardFormData
): Promise<Card | undefined> {
  try {
    const accessToken = await getAccessToken();
    return await putApi(`/cards/update`, data, accessToken);
  } catch {
    return undefined;
  }
}

// カードを削除
export async function deleteCard(id: number): Promise<undefined> {
  try {
    const accessToken = await getAccessToken();
    return await deleteApi(`/cards/${id}`, accessToken);
  } catch {
    return undefined;
  }
}
