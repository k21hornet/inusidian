import { getApi, postApi } from "./apiClient";

export async function postCard(data) {
  try {
    const response = await postApi(`/cards/create`, data);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getDueCards(deckId: number) {
  try {
    const response = await getApi(`/cards/review/${deckId}`);
    return response;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function reviewSuccess(id: number) {
  try {
    const response = await postApi(`/cards/review/${id}/success`, null);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function reviewFailure(id: number) {
  try {
    const response = await postApi(`/cards/review/${id}/failure`, null);
    return response;
  } catch (e) {
    console.log(e);
  }
}
