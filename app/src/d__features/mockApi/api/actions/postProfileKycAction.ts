"use server";

import { fetchApi } from "@/shared/lib/serverAction";
import { ProfileKycApiResponse } from "@/shared/model/api";

export type ProfileKycData = {
  pasport_picture_registration: File;
  pasport_picture_main_page: File;
  person_picture: File;
  phone: string;
  user_id: string
};

export async function postProfileKycAction(
  formData: FormData
): Promise<ProfileKycApiResponse> {
  return await fetchApi<ProfileKycApiResponse>({
    path: "/profile/kyc", // Изменил путь для соответствия моковому эндпоинту
    method: "POST",
    body: formData,
  });
}
