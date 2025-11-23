import { getApi, postApi } from "@/util/fetcher";

// 新規ユーザーがログインした時にユーザー情報を登録
export async function signupUser(
  email: string,
  accessToken: string
): Promise<undefined> {
  try {
    return await postApi(`/auth/signup`, { email }, accessToken);
  } catch (e) {
    console.log("signupUser error: ", e);
    return undefined;
  }
}

// ログイン中のメールアドレスを取得
export async function getLoginEmail(): Promise<string> {
  try {
    const response = await getApi(`/auth/me`);
    return response.email;
  } catch {
    return "";
  }
}
