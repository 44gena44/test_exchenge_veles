'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { CheckPromocodeApiArg, CheckPromocodeApiResponse } from "@/shared/model/api";

export async function checkPromocodeAction(
  code: CheckPromocodeApiArg["code"]
): Promise<CheckPromocodeApiResponse> {
  const props: FetchApiProps = {
    path: "/check-promo-code",
    params: { code },
    method: "GET",
  };
  return await fetchApi<CheckPromocodeApiResponse>(props);
}