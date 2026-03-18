"use client";

import ProcessLayout from "@/c__widgets/processLayout/ui";
import {
  TransferCurrencyInput,
  TaskDescriptionInput,
  TransferCountryInput,
} from "@/d__features/transferAbroad/ui";

import { useRouterPushCallback } from "@/shared/lib";
import { useIsInvoiceFormValid } from "@/d__features/transferAbroad/lib/useIsInvoiceFormValid";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

export default function TransferAbroadInputInvoice() {
  const { isFormValid } = useIsInvoiceFormValid();
  const [pushRoute] = useRouterPushCallback({
    nextPagePath: "/transfer-abroad/details",
    isFormValid,
  });

  const { trackUserAction } = useTrackUserAction();

  const handleSubmit = () => {
    pushRoute();

    if (!isFormValid) {
      trackUserAction("Поля формы не прошли валидацию");
    }
  };

  return (
    <ProcessLayout onMainButtonClick={handleSubmit} buttonText="Далее">
      <TransferCurrencyInput isLimitInfoActive={false} />
      <TransferCountryInput />
      <TaskDescriptionInput />
    </ProcessLayout>
  );
}
