'use server'

import { PROJECT_SERVER_DATA } from "@/shared/config/server";
import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { GetCurrenciesGetApiArg, GetCurrenciesGetApiResponse } from "@/shared/model/api";
import { getDemoCurrenciesGet } from "./demoExchangeData";

export async function getCurrenciesAction(
  payload: GetCurrenciesGetApiArg
): Promise<GetCurrenciesGetApiResponse> {
  if (!PROJECT_SERVER_DATA.apiUrl) {
    return getDemoCurrenciesGet(payload.currencyType);
  }

  const props: FetchApiProps = {
    path: "/currencies-get",
    params: {
      give_currency_id: payload.giveCurrencyId,
      currency_type: payload.currencyType,
    },
    method: "GET",
  };
  return await fetchApi<GetCurrenciesGetApiResponse>(props);
}
