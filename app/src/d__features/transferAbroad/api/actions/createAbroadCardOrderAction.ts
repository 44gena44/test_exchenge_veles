'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { AbroadCardOrderBody, OrderResponse } from "@/shared/model/api";

export async function createAbroadCardOrderAction(
  payload: AbroadCardOrderBody
): Promise<OrderResponse> {
  const props: FetchApiProps = {
    path: "/transfer-abroad/order/abroad-cards",
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json" },
  };

  return await fetchApi<OrderResponse>(props);
}