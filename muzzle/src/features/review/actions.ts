"use server";

import { fetcherOld } from "@/util/fetcherOld";

// 正解
export async function reviewSuccess(cardId: number, answerTime: number) {
  return await fetcherOld.post(`/cards/review/${cardId}/success`, {
    answerTime,
  });
}

// 不正解
export async function reviewFailure(cardId: number, answerTime: number) {
  return await fetcherOld.post(`/cards/review/${cardId}/failure`, {
    answerTime,
  });
}
