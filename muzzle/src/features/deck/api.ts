import { fetcher } from "@/util/fetcher";

// ユーザーのデッキ一覧を取得
export async function getAllDecks() {
  return await fetcher.get(`/decks`);
}

// デッキを取得
export async function getDeck(id: number) {
  return await fetcher.get(`/decks/${id}`);
}
