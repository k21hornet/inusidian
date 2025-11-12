import { getApi } from "@/util/fetcher";

// 新規ユーザーがログインした時にユーザー情報を同期
export async function syncUser(): Promise<undefined> {
  try {
    return await getApi(`/auth/sync-user`);
  } catch {
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
