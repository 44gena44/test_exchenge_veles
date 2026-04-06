'use server'

import { PROJECT_SERVER_DATA } from "@/shared/config/server";
import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { RateListApiArg, RateListApiResponse } from "@/shared/model/api";
import { getDemoRate } from "./demoExchangeData";

export async function getRateAction(
  params?: RateListApiArg
): Promise<RateListApiResponse> {
  if (!PROJECT_SERVER_DATA.apiUrl) {
    return getDemoRate(params);
  }

  const props: FetchApiProps = {
    path: "/rate",
    params,
    method: "GET",
  };
  return await fetchApi<RateListApiResponse>(props);
}
