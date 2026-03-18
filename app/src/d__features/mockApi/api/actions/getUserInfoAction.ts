"use server";

import { fetchApi } from "@/shared/lib/serverAction";
import { UserInfoApiResponse } from "@/shared/model/api";

export async function getUserInfoAction(): Promise<UserInfoApiResponse> {
  return await fetchApi<UserInfoApiResponse>({
    path: "/user_info",
    method: "GET",
  });
}
