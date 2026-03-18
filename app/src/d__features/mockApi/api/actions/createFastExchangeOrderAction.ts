"use server";

import { fetchApi } from "@/shared/lib/serverAction";
import {
  FastExchangeOrderCreateApiArg,
  FastExchangeOrderCreateApiResponse,
} from "@/shared/model/api";

export async function createFastExchangeOrderAction(
  body: FastExchangeOrderCreateApiArg
): Promise<FastExchangeOrderCreateApiResponse> {
  return await fetchApi<FastExchangeOrderCreateApiResponse>({
    path: "/fast-exchange/order/rub-usdt",
    method: "POST",
    body,
  });
}
