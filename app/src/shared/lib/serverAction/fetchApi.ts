"use server";

import { PROJECT_SERVER_DATA } from "@/shared/config/server";
import { getToken } from "@/shared/lib/serverAction";

export interface FetchError {
  message: string;
  status?: number; // HTTP-статус (например, 400, 401, 500)
  type: "http" | "network" | "json" | "unknown"; // Тип ошибки
}

export type FetchApiProps = {
  path: string;
  method?: string;
  params?: object;
  body?: object | FormData | null;
  headers?: HeadersInit;
};

const MOCKABLE_PATH_PREFIXES = [
  "/fast_exchange",
  "/limits_info",
  "/news",
  "/rate/display",
  "/user_info",
  "/profile/kyc",
];

const isMockablePath = (path: string) =>
  MOCKABLE_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));

const isTrackingPath = (path: string) => path.startsWith("/user/tracking");

const buildQueryString = (
  params?: Record<string, string | number | boolean | null | undefined>
) =>
  params
    ? Object.entries(params)
        .reduce(
          (str, [key, value], index) =>
            str + `${index === 0 ? "?" : "&"}${key}=${value}`,
          ""
        )
        .split(" ")
        .join("%20")
    : "/";

const resolveLocalBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? "3001"}`;
};

export async function fetchApi<T>({
  path,
  method = "GET",
  params,
  body,
  headers,
}: FetchApiProps): Promise<T> {
  if (!PROJECT_SERVER_DATA.apiUrl) {
    if (isTrackingPath(path)) {
      throw new Error("API_URL is required for tracking endpoints.");
    }
    if (isMockablePath(path)) {
      const queryString = buildQueryString(
        params as
          | Record<string, string | number | boolean | null | undefined>
          | undefined
      );
      const url = `${resolveLocalBaseUrl()}${path}${queryString}`;
      const fetchOptions: RequestInit = {
        method,
        headers: { ...headers },
      };

      if (body instanceof FormData) {
        fetchOptions.body = body;
        delete (fetchOptions.headers as Record<string, string>)["Content-Type"];
      } else if (body !== null && body !== undefined) {
        fetchOptions.body = JSON.stringify(body);
        (fetchOptions.headers as Record<string, string>)["Content-Type"] =
          "application/json";
      }

      const result = await fetch(url, fetchOptions);
      const contentType = result.headers.get("Content-Type");
      if (!contentType?.includes("application/json")) {
        const text = (await result.text()).slice(0, 5000);
        throw {
          error: result.statusText,
          message: `Expected JSON, but received ${contentType}`,
          details: text,
          status: result.status,
        } as T;
      }
      return (await result.json()) as T;
    }
    throw new Error(`API_URL is required for ${path}.`);
  }
  try {

    let responseBody: any = null;
    let isTokenValid = true;
    const tryFetch = async () => {
      const token = await getToken({ isTokenValid });
      // console.log('token',token)
      const queryString = buildQueryString(
        params as
          | Record<string, string | number | boolean | null | undefined>
          | undefined
      );


      const url = `${PROJECT_SERVER_DATA.apiUrl}${path}${queryString}`;

      // console.log(`Bearer ${token}`)
      const fetchOptions: RequestInit = {
        method,
        headers: { ...headers, Authorization: `Bearer ${token}` },
      };

      if (body instanceof FormData) {
        fetchOptions.body = body;
        delete (fetchOptions.headers as any)["Content-Type"];
      } else if (body !== null && body !== undefined) {
        fetchOptions.body = JSON.stringify(body);
        (fetchOptions.headers as any)["Content-Type"] = "application/json";
      }

      if (url.includes('/order')) {
        console.log('URL', url)
        console.log('fetchOptions', fetchOptions)

      }

      const result = await fetch(url, fetchOptions);


      const contentType = result.headers.get("Content-Type");
      if (!contentType?.includes("application/json")) {
        const text = (await result.text()).slice(0, 5000);
        throw {
          error: result.statusText,
          message: `Expected JSON, but received ${contentType}`,
          details: text,
          status: result.status,
          headers: { "Content-Type": "application/json" },
        } as T;
      }
      responseBody = await result.json();
    };

    await tryFetch();

    // console.log('responseBody?.code', responseBody?.code)

    if (responseBody?.code === "token_not_valid" || responseBody?.code === 'bad_authorization_header') {

      isTokenValid = false;
      await tryFetch();
    }

    return responseBody;
  } catch (e) {
    console.error(e)
    throw e;
  }
}
