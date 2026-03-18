"use client";
import ProcessLayout from "@/c__widgets/processLayout/ui";
import { useIsCardsFormValid } from "@/d__features/transferAbroad/lib";
import {
  TransferBankSelect,
  TransferCardNumberInput,
  TransferCurrencyInput,
} from "@/d__features/transferAbroad/ui";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";
import { useRouterPushCallback } from "@/shared/lib";

export default function TransferAbroadInputCards() {
  const { isFormValid } = useIsCardsFormValid();
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
      <TransferCurrencyInput isLimitInfoActive={true} />
      <TransferBankSelect />
      <TransferCardNumberInput />
    </ProcessLayout>
  );
}
