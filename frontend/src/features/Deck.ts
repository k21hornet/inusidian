import { deleteApi, getApi, postApi } from "@/lib/apiClient";
import { Deck } from "@/type/index";
import { PostDeckFormData } from "@/type/request";

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

export async function postDeck(
  data: PostDeckFormData
): Promise<Deck | undefined> {
  try {
    const response = await postApi(`/decks/create`, data);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteDeck(id: number): Promise<undefined> {
  try {
    const response = await deleteApi(`/decks/${id}`);
    return response;
  } catch (e) {
    console.log(e);
  }
}
