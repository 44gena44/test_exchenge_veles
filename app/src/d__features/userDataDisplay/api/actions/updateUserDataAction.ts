"use server"

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { UserUpdateCreateApiArg, UserUpdateCreateApiResponse } from "@/shared/model/api";
import { authenticateUser } from "@/d__features/userDataDisplay/lib/telegramAuth";

export async function updateUserDataAction(
  payload: UserUpdateCreateApiArg
): Promise<UserUpdateCreateApiResponse> {
  const { initData, user_id, ...rest } = payload;

  await authenticateUser(initData, user_id);

  const fetchApiProps: FetchApiProps = {
    path: "/user/update",
    method: "POST",
    body: { user_id, ...rest },
    headers: {
      "Content-Type": "application/json",
      ...(initData ? { "x-telegram-init-data": initData } : {}),
    },
  };

  const res = await fetchApi<UserUpdateCreateApiResponse>(fetchApiProps);
  return res;
}
