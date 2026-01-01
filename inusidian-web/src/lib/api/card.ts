import { Card } from "@/type/index";
import { getApi } from "@/util/fetcher";

// カードを取得
export async function getCard(id: number): Promise<Card | undefined> {
  try {
    return await getApi(`/cards/${id}`);
  } catch {
    return undefined;
  }
}

// 次のカードIDを取得
export async function getNextCardId(deckId: number, cardId: number) {
  return await getApi(`/cards/next/${deckId}/${cardId}`);
}

// 前のカードIDを取得
export async function getPrevCardId(deckId: number, cardId: number) {
  return await getApi(`/cards/prev/${deckId}/${cardId}`);
}
