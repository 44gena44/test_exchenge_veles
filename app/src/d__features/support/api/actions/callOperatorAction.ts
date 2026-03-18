'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { PostCallingOperatorApiArg, PostCallingOperatorApiResponse } from "@/shared/model/api";

export async function callOperatorAction(
  payload: PostCallingOperatorApiArg
): Promise<PostCallingOperatorApiResponse> {
  const props: FetchApiProps = {
    path: "/calling-operator",
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json" },
  };
  return await fetchApi<PostCallingOperatorApiResponse>(props);
}