import { fetcher } from "@/util/fetcher";

// カードを取得
export async function getCard(id: number) {
  return await fetcher.get(`/cards/${id}`);
}

// 次のカードIDを取得
export async function getNextCardId(deckId: number, cardId: number) {
  return await fetcher.get(`/cards/next/${deckId}/${cardId}`);
}

// 前のカードIDを取得
export async function getPrevCardId(deckId: number, cardId: number) {
  return await fetcher.get(`/cards/prev/${deckId}/${cardId}`);
}
