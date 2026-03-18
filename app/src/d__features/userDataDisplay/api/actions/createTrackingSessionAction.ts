'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { CreateSessionArg, CreateSessionResponse } from "../../model";
import { authenticateUser } from "@/d__features/userDataDisplay/lib/telegramAuth";

export async function createTrackingSessionAction(
  body: CreateSessionArg
): Promise<CreateSessionResponse> {
  const { initData, user_id } = body;

 await authenticateUser(initData, user_id);

  const props: FetchApiProps = {
    path: "/user/tracking/session",
    method: "POST",
    body: { user_id },
    headers: {
      "Content-Type": "application/json",
      ...(initData ? { "x-telegram-init-data": initData } : {}),
    },
  };
  return await fetchApi<CreateSessionResponse>(props);
}
