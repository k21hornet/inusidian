"use server";

import { postApi } from "@/util/fetcher";

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
