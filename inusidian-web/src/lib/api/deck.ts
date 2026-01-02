import { Deck } from "@/type";
import { fetcher } from "@/util/fetcher";

// ユーザーのデッキ一覧を取得
export async function getAllDecks(): Promise<{ decks: Deck[] }> {
  return await fetcher.get(`/decks`);
}

// デッキを取得
export async function getDeck(id: number): Promise<Deck | undefined> {
  return await fetcher.get(`/decks/${id}`);
}
