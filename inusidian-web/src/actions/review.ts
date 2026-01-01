"use server";

import { postApi } from "@/util/fetcher";

// レビュー成功
export async function reviewSuccess(cardId: number, answerTime: number) {
  try {
    return await postApi(`/cards/review/${cardId}/success`, { answerTime });
  } catch {
    return undefined;
  }
}

// レビュー失敗
export async function reviewFailure(cardId: number, answerTime: number) {
  try {
    return await postApi(`/cards/review/${cardId}/failure`, { answerTime });
  } catch {
    return undefined;
  }
}
