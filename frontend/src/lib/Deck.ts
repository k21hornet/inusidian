import { getApi, postApi } from "@/lib/apiClient";
import { Deck } from "@/type/Deck";

export async function getAllDecks(): Promise<Deck[]> {
  try {
    const response = await getApi(`/decks`);
    return response;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getDeck(id: number): Promise<Deck | undefined> {
  try {
    const response = await getApi(`/decks/${id}`);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function postDeck(data) {
  try {
    const response = await postApi(`/decks/create`, data);
    return response;
  } catch (e) {
    console.log(e);
  }
}
