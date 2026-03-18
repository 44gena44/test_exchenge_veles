import {
  useAppSelector,
  abroadTransferDetailsSelector,
  useAppDispatch,
} from "@/shared/model/store";
import { useRouter } from "next/navigation";

import {
  setCreateAbroadCardOrderLoading,
  setCreateChinesePlatformOrderLoading,
  setCreateFTAOrderLoading,
  setCreateInvoiceOrderLoading,
  setOrderId,
} from "../model";
import { useServerAction } from "@/shared/lib";
import {
  createAbroadCardOrderAction,
  createChinesePlatformOrderAction,
  createFTAOrderAction,
  createInvoiceOrderAction,
} from "../api";
import { OrderResponse } from "@/shared/model/api";
import { useEffect } from "react";

export const useTransferInputDataSubmit = (transferType: string | null) => {
  const router = useRouter();
  const {
    transferTypeCategorySlug,
    currency,
    amount,
    bank,
    cardNumber,
    countryName,
    taskDescription,
    platform,
    file1,
    file2,
    russianCompanyRequisites,
    abroadCompanyRequisites,
  } = useAppSelector(abroadTransferDetailsSelector);

  const [createInvoiceOrder, createInvoiceOrderResponse] = useServerAction({
    action: createInvoiceOrderAction,
    loadingAction: setCreateInvoiceOrderLoading,
  });
  const [createFTAOrder, createFTAOrderResponse] = useServerAction({
    action: createFTAOrderAction,
    loadingAction: setCreateFTAOrderLoading,
  });
  const [createChinesePlatformOrder, createChinesePlatformOrderResponse] =
    useServerAction({
      action: createChinesePlatformOrderAction,
      loadingAction: setCreateChinesePlatformOrderLoading,
    });
  const [createAbroadCardTransferOrder, createAbroadCardTransferOrderResponse] =
    useServerAction({
      action: createAbroadCardOrderAction,
      loadingAction: setCreateAbroadCardOrderLoading,
    });

  const dispatch = useAppDispatch();

  const requiestPromiseCallback = (data?: OrderResponse | undefined) => {
    dispatch(setOrderId(data?.order_id || "no_info"));
    router.push("/transfer-abroad/result");
  };

  const userId = useAppSelector((state) => state.user.id);

  const handleSubmit = () => {
    switch (transferType) {
      case "cards": {
        if (cardNumber && currency?.name && amount && bank?.name && userId)
          createAbroadCardTransferOrder({
            card_number: cardNumber,
            currency_name: currency?.name,
            amount,
            bank_name: bank?.name,
            user_id: userId,
          });
        break;
      }
      case "chinese-platforms": {
        if (currency?.name && amount && platform?.name && userId)
          createChinesePlatformOrder({
            currency_name: currency?.name,
            amount,
            platform_name: platform?.name,
            user_id: userId,
          });
        break;
      }
      case "fta": {
        if (currency?.name && amount && taskDescription && userId)
          createFTAOrder({
            user_id: userId,
            currency_name: currency?.name,
            amount,
            task_description: taskDescription,
            file_1: file1,
            file_2: file2,
            russian_company_requisites: russianCompanyRequisites,
            abroad_company_requisites: abroadCompanyRequisites,
          });
        break;
      }
      case "invoice": {
  
        if (
          currency?.name &&
          amount &&
          taskDescription &&
          countryName &&
          transferTypeCategorySlug &&
          userId
        )
          createInvoiceOrder({
            currency_name: currency?.name,
            amount,
            task_description: taskDescription,
            country_name: countryName,
            transfer_type: transferTypeCategorySlug,
            user_id: userId,
          });
        break;
      }
    }
  };

  useEffect(() => {
    if (createInvoiceOrderResponse) {
      requiestPromiseCallback(createInvoiceOrderResponse);
    }
  }, [createInvoiceOrderResponse]);

  useEffect(() => {
    if (createFTAOrderResponse) {
      requiestPromiseCallback(createFTAOrderResponse);
    }
  }, [createFTAOrderResponse]);

  useEffect(() => {
    if (createChinesePlatformOrderResponse) {
      requiestPromiseCallback(createChinesePlatformOrderResponse);
    }
  }, [createChinesePlatformOrderResponse]);

  useEffect(() => {
    if (createAbroadCardTransferOrderResponse) {
      requiestPromiseCallback(createAbroadCardTransferOrderResponse);
    }
  }, [createAbroadCardTransferOrderResponse]);

  return [handleSubmit];
};
