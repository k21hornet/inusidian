import { Card } from "@/type";
import { getApi } from "@/util/fetcher";

// レビュー対象カード一覧を取得
export async function getReviewCards(deckId: number): Promise<Card[]> {
  try {
    return await getApi(`/cards/review/${deckId}`);
  } catch {
    return [];
  }
}
