'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { ExchangesCreateApiArg, ExchangesCreateApiResponse } from "@/shared/model/api";
import { authenticateUser } from "@/d__features/userDataDisplay/lib/telegramAuth";
import { PROJECT_NAME } from "@/shared/config";

type PayloadWithInitData = ExchangesCreateApiArg & { initData: string };

export async function createExchangeAction(
  payload: PayloadWithInitData
): Promise<ExchangesCreateApiResponse> {
  const { initData, user_id, ...rest } = payload;

 await authenticateUser(initData, user_id);

  const props: FetchApiProps = {
    path: "/exchange",
    method: "POST",
    body: { user_id, ...rest },
    headers: {
      "Content-Type": "application/json",
      ...(initData ? { "x-telegram-init-data": initData } : {}),
    },  };
  return await fetchApi<ExchangesCreateApiResponse>(props);
}
