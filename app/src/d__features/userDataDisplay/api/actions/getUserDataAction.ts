// app/actions.ts
"use server"; // ← Обязательно! Делает все функции внутри серверными

import {
  fetchApi,
  FetchApiProps,
} from "@/shared/lib/serverAction";
import {
  UserListApiArg,
  UserListApiResponse,
} from "@/shared/model/api";
import { authenticateUser } from "@/d__features/userDataDisplay/lib/telegramAuth";

export async function getUserDataAction(
  payload: UserListApiArg & { initData: string }
): Promise<UserListApiResponse> {
  const { userId, initData } = payload;

  await authenticateUser(initData, userId);

  const fetchApiProps: FetchApiProps = {
    path: "/user",
    params: {
      user_id: userId,
    },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(initData ? { "x-telegram-init-data": initData } : {}),
    },
  };

  const res = await fetchApi<UserListApiResponse>(fetchApiProps);
  return res;
}
