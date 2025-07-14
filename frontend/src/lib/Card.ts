import { postApi } from "./apiClient";

export async function postCard(data) {
  try {
    const response = await postApi(`/cards/create`, data);
    return response;
  } catch (e) {
    console.log(e);
  }
}
