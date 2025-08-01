"use server";

import { Card } from "@/type";
import { getAccessToken } from "@/util/auth";
import { getApi, postApi } from "@/util/fetcher";

// レビュー対象カード一覧を取得
export async function getReviewCards(deckId: number): Promise<Card[]> {
  try {
    const accessToken = await getAccessToken();
    return await getApi(`/cards/review/${deckId}`, accessToken);
  } catch {
    return [];
  }
}

// レビュー成功
export async function reviewSuccess(cardId: number): Promise<undefined> {
  try {
    const accessToken = await getAccessToken();
    return await postApi(
      `/cards/review/${cardId}/success`,
      undefined,
      accessToken
    );
  } catch {
    return undefined;
  }
}

// レビュー失敗
export async function reviewFailure(cardId: number): Promise<undefined> {
  try {
    const accessToken = await getAccessToken();
    return await postApi(
      `/cards/review/${cardId}/failure`,
      undefined,
      accessToken
    );
  } catch {
    return undefined;
  }
}
