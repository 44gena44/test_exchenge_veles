"use server";

import { fetchApi } from "@/shared/lib/serverAction";
import { FastExchangeHistoryApiResponse } from "@/shared/model/api";

export async function getFastExchangeHistoryAction(userId: number): Promise<FastExchangeHistoryApiResponse> {
  return await fetchApi<FastExchangeHistoryApiResponse>({
    path: "/fast-exchange/history",
    method: "GET",
    params: {
      user_id: userId
    }
  });
}
