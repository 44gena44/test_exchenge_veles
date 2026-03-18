"use server";

import { fetchApi } from "@/shared/lib/serverAction";
import { FastExchangeRateApiResponse } from "@/shared/model/api";

export async function getFastExchangeRateAction(): Promise<FastExchangeRateApiResponse> {
  return await fetchApi<FastExchangeRateApiResponse>({
    path: "/fast-exchange/rate",
    method: "GET",
  });
}
