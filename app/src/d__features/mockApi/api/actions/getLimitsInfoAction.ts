"use server";

import { fetchApi } from "@/shared/lib/serverAction";
import { LimitsInfoApiResponse, LimitsInfoApiArg } from "@/shared/model/api";

export async function getLimitsInfoAction(args: LimitsInfoApiArg): Promise<LimitsInfoApiResponse> {
  return await fetchApi<LimitsInfoApiResponse>({
    path: `/limits-info`,
    params: {
      user_id: args.user_id
    },
    method: "GET",
  });
}
