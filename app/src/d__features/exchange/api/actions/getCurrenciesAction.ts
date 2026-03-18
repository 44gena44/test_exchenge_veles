'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { GetCurrenciesGetApiArg, GetCurrenciesGetApiResponse } from "@/shared/model/api";

export async function getCurrenciesAction(
  payload: GetCurrenciesGetApiArg
): Promise<GetCurrenciesGetApiResponse> {
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