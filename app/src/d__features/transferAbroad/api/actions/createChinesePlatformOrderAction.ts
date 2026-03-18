'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { ChinesePlatformOrderBody, OrderResponse } from "@/shared/model/api";


export async function createChinesePlatformOrderAction(
  payload: ChinesePlatformOrderBody
): Promise<OrderResponse> {
  const props: FetchApiProps = {
    path: "/transfer-abroad/order/chinese-platforms",
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json" },
  };

  return await fetchApi<OrderResponse>(props);
}