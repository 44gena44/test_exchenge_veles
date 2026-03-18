"use server"

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { CheckMailApiArg, CheckMailApiResponse } from "@/shared/model/api";
import { authenticateUser } from "@/d__features/userDataDisplay/lib/telegramAuth";

export async function checkMailRequirementAction(
  payload: CheckMailApiArg
): Promise<CheckMailApiResponse> {
  const { initData, user_id } = payload;

  await authenticateUser(initData, user_id);

  const fetchApiProps: FetchApiProps = {
    path: "/user/check-mail/",
    params: { user_id: payload.user_id },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(initData ? { "x-telegram-init-data": initData } : {}),
    },
  };

  const res = await fetchApi<CheckMailApiResponse>(fetchApiProps);
  return res;
}
