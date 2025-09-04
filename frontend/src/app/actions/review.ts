"use server";

import { Card } from "@/type";
import { getApi, postApi } from "@/util/fetcher";

// レビュー対象カード一覧を取得
export async function getReviewCards(deckId: number): Promise<Card[]> {
  try {
    return await getApi(`/cards/review/${deckId}`);
  } catch {
    return [];
  }
}

// レビュー成功
export async function reviewSuccess(
  cardId: number,
  elapsedTime: number
): Promise<undefined> {
  try {
    return await postApi(`/cards/review/${cardId}/success`, { elapsedTime });
  } catch {
    return undefined;
  }
}

// レビュー失敗
export async function reviewFailure(cardId: number): Promise<undefined> {
  try {
    return await postApi(`/cards/review/${cardId}/failure`, undefined);
  } catch {
    return undefined;
  }
}
