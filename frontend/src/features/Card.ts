import { PostCardFormData } from "@/type/request";
import { Card } from "@/type/index";
import { deleteApi, getApi, postApi } from "../lib/apiClient";

export async function postCard(
  data: PostCardFormData
): Promise<Card | undefined> {
  try {
    const response = await postApi(`/cards/create`, data);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getDueCards(deckId: number): Promise<Card[]> {
  try {
    const response = await getApi(`/cards/review/${deckId}`);
    return response;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function reviewSuccess(id: number): Promise<undefined> {
  try {
    const response = await postApi(`/cards/review/${id}/success`, null);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function reviewFailure(id: number): Promise<undefined> {
  try {
    const response = await postApi(`/cards/review/${id}/failure`, null);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteCard(id: number): Promise<undefined> {
  try {
    const response = await deleteApi(`/cards/${id}`);
    return response;
  } catch (e) {
    console.log(e);
  }
}
