"use server";

import { getAccessToken } from "@/util/auth";
import { getApi } from "@/util/fetcher";

// 新規ユーザーがログインした時にユーザー情報を同期
export async function syncUser(): Promise<undefined> {
  try {
    const accessToken = await getAccessToken();
    return await getApi(`/auth/sync-user`, accessToken);
  } catch {
    return undefined;
  }
}

// ログイン中のメールアドレスを取得
export async function getLoginEmail(): Promise<string> {
  try {
    const accessToken = await getAccessToken();
    const response = await getApi(`/auth/me`, accessToken);
    return response.email;
  } catch {
    return "";
  }
}
