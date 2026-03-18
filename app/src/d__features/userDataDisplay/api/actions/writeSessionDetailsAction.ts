"use server";
import { fetchApi, FetchApiProps } from "@/shared/lib/serverAction";
import {
  WriteSessionDetailsArg,
  WriteSessionDetailsResponse,
} from "../../model";

export const writeSessionDetailsAction = async (
  body: WriteSessionDetailsArg
): Promise<WriteSessionDetailsResponse> => {
  const props: FetchApiProps = {
    path: "/user/tracking/action",
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await fetchApi<WriteSessionDetailsResponse>(props);
};
