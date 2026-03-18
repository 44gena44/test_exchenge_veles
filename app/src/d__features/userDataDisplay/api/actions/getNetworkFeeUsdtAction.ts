"use server";

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import {
  GetNetworkFeeUsdtApiArg,
  GetNetworkFeeUsdtApiResponse,
} from "@/shared/model/api";

export async function getNetworkFeeUsdtAction(
  payload: GetNetworkFeeUsdtApiArg
): Promise<GetNetworkFeeUsdtApiResponse> {
  const { target_address, initData } = payload;

  const fetchApiProps: FetchApiProps = {
    path: "/get-network-fee-usdt/",
    params: { target_address },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(initData ? { "x-telegram-init-data": initData } : {}),
    },
  };

  const res = await fetchApi<GetNetworkFeeUsdtApiResponse>(fetchApiProps);
  return res;
}
