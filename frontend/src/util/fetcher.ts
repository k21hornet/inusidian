import { getAccessToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const request = async (url: string, method: string, data?: unknown) => {
  const fullUrl = `${BASE_URL}${url}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const accessToken = await getAccessToken();

  // 認証が必要な場合はアクセストークンを追加
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const options: RequestInit = {
    method,
    credentials: "include",
    headers,
  };

  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // レスポンスが空の場合はnullを返す
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    console.warn("Failed to parse JSON response:", text);
    return null;
  }
};

export const fetcher = {
  get: (url: string) => request(url, "GET", undefined),
  post: (url: string, data?: unknown) => request(url, "POST", data),
  put: (url: string, data?: unknown) => request(url, "PUT", data),
  delete: (url: string) => request(url, "DELETE", undefined),
};

export const getApi = (url: string) => request(url, "GET", undefined);
export const postApi = (url: string, data?: unknown) =>
  request(url, "POST", data);
export const putApi = (url: string, data?: unknown) =>
  request(url, "PUT", data);
export const deleteApi = (url: string) => request(url, "DELETE", undefined);
