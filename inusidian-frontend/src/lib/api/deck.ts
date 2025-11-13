import { Deck } from "@/type";
import { getApi } from "@/util/fetcher";

// ユーザーのデッキ一覧を取得
export async function getAllDecks(): Promise<{ decks: Deck[] }> {
  try {
    return await getApi(`/decks`);
  } catch {
    return { decks: [] };
  }
}

// デッキを取得
export async function getDeck(id: number): Promise<Deck | undefined> {
  try {
    return await getApi(`/decks/${id}`);
  } catch {
    return undefined;
  }
}
