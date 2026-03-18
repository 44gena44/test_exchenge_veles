'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { FTAOrderBody, OrderResponse } from "@/shared/model/api";

export async function createFTAOrderAction(
  payload: FTAOrderBody
): Promise<OrderResponse> {
  const formData = new FormData();

  formData.append("user_id", String(payload.user_id));
  formData.append("currency_name", payload.currency_name);
  formData.append("amount", String(payload.amount));
  formData.append("task_description", payload.task_description);

  if (payload.russian_company_requisites)
    formData.append("russian_company_requisites", payload.russian_company_requisites);
  if (payload.abroad_company_requisites)
    formData.append("abroad_company_requisites", payload.abroad_company_requisites);
  if (payload.file_1) formData.append("file_1", payload.file_1);
  if (payload.file_2) formData.append("file_2", payload.file_2);

  const props: FetchApiProps = {
    path: "/transfer-abroad/order/fta",
    method: "POST",
    body: formData,
    // Важно: не передаём Content-Type, браузер сам поставит с boundary
  };

  return await fetchApi<OrderResponse>(props);
}