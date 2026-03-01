import { fetcher } from "@/util/fetcher";

// 新規ユーザーがログインした時にユーザー情報を登録
export async function signupUser(
  email: string,
  accessToken: string
): Promise<undefined> {
  return await fetcher.post(`/auth/signup`, { email }, accessToken);
}

// ログイン中のメールアドレスを取得
export async function getLoginEmail(): Promise<string> {
  return await fetcher.get(`/auth/me`);
}
