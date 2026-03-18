"use server";

import { fetchApi } from "@/shared/lib/serverAction";
import { RateDisplayApiResponse } from "@/shared/model/api";

export async function getRateDisplayAction(): Promise<RateDisplayApiResponse> {
  const response = await fetchApi<
    RateDisplayApiResponse | { rates_info?: RateDisplayApiResponse }
  >({
    path: "/rate/display",
    method: "GET",
  });

  if (Array.isArray(response)) {
    return response;
  }

  return response.rates_info ?? [];
}
