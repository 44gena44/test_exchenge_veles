'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { InvoiceOrderBody, OrderResponse } from "@/shared/model/api";

export async function createInvoiceOrderAction(
  payload: InvoiceOrderBody
): Promise<OrderResponse> {
  const props: FetchApiProps = {
    path: "/transfer-abroad/order/invoice",
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json" },
  };

  return await fetchApi<OrderResponse>(props);
}