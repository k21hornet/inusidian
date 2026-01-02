import { Card } from "@/type";
import { fetcher } from "@/util/fetcher";

// レビュー対象カード一覧を取得
export async function getReviewCards(deckId: number): Promise<Card[]> {
  return await fetcher.get(`/cards/review/${deckId}`);
}
