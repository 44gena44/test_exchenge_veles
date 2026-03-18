"use server";

import { headers } from "next/headers";

export type FetchMockApiProps = {
  path: string;
  method?: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: object | FormData | null;
  headers?: HeadersInit;
};

const buildQueryString = (
  params?: FetchMockApiProps["params"]
): string => {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== null
  );
  if (!entries.length) return "";
  return (
    "?" +
    entries
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join("&")
  );
};

const getOrigin = async () => {
  const headersList = await headers();
  const forwardedHost = headersList.get("x-forwarded-host");
  const host = forwardedHost ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "http";

  if (host) return `${proto}://${host}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

export async function fetchMockApi<T>({
  path,
  method = "GET",
  params,
  body,
  headers: requestHeaders,
}: FetchMockApiProps): Promise<T> {
  const queryString = buildQueryString(params);
  const origin = await getOrigin();
  const url = `${origin}${path}${queryString}`;

  const fetchOptions: RequestInit = {
    method,
    headers: { ...requestHeaders },
  };

  if (body instanceof FormData) {
    fetchOptions.body = body;
    if (fetchOptions.headers) delete (fetchOptions.headers as any)["Content-Type"];
  } else if (body !== null && body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
    (fetchOptions.headers as any)["Content-Type"] = "application/json";
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

  return await result.json();
}
