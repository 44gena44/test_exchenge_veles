'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { FaqsListApiResponse } from "@/shared/model/api";

export async function getFaqsAction(): Promise<FaqsListApiResponse> {
  const props: FetchApiProps = { path: "/faqs", method: "GET" };
  return await fetchApi<FaqsListApiResponse>(props);
}