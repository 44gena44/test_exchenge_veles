"use server";

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import {
  GetSbpLimitApiArg,
  GetSbpLimitApiResponse,
} from "@/shared/model/api";
import { authenticateUser } from "@/d__features/userDataDisplay/lib/telegramAuth";

export async function getSbpLimitAction(
  payload: GetSbpLimitApiArg
): Promise<GetSbpLimitApiResponse> {
  const { user_id, initData } = payload;

  await authenticateUser(initData, user_id);

  const fetchApiProps: FetchApiProps = {
    path: "/get-sbp-limit/",
    params: { user_id },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(initData ? { "x-telegram-init-data": initData } : {}),
    },
  };

  const res = await fetchApi<GetSbpLimitApiResponse>(fetchApiProps);
  return res;
}
