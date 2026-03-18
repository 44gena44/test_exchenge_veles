"use client";
import ProcessLayout from "@/c__widgets/processLayout/ui";
import {
  TransferCurrencyInput,
  TaskDescriptionInput,
} from "@/d__features/transferAbroad/ui";

import { useRouterPushCallback } from "@/shared/lib";
import { useIsFtaCurrencyAndTaskFormValid } from "@/d__features/transferAbroad/lib/useIsFtaCurrencyAndTaskFormValid";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

export default function TransferAbroadInputFtaCurrencyAndTask() {
  const { isFormValid } = useIsFtaCurrencyAndTaskFormValid();
  const [pushRoute] = useRouterPushCallback({
    nextPagePath: "/transfer-abroad/input/fta/requisites-and-license",
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
      <TaskDescriptionInput />
    </ProcessLayout>
  );
}
