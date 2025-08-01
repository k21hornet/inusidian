const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const request = async (
  url: string,
  method: string,
  data?: any,
  accessToken?: string
) => {
  const fullUrl = `${BASE_URL}${url}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

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
  } catch (error) {
    console.warn("Failed to parse JSON response:", text);
    return null;
  }
};

export const getApi = (url: string, accessToken?: string) =>
  request(url, "GET", undefined, accessToken);
export const postApi = (url: string, data?: any, accessToken?: string) =>
  request(url, "POST", data, accessToken);
export const putApi = (url: string, data?: any, accessToken?: string) =>
  request(url, "PUT", data, accessToken);
export const deleteApi = (url: string, accessToken?: string) =>
  request(url, "DELETE", undefined, accessToken);
