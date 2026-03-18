"use server";

import { fetchApi } from "@/shared/lib/serverAction";
import { NewsListApiResponse } from "@/shared/model/api";

export async function getNewsAction(): Promise<NewsListApiResponse> {
  const response = await fetchApi<
    NewsListApiResponse | { news_list?: NewsListApiResponse }
  >({
    path: "/news",
    method: "GET",
  });

  if (Array.isArray(response)) {
    return response;
  }

  return response.news_list ?? [];
}
