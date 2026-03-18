"use client";

import ExchangeLayout from "@/c__widgets/processLayout/ui";
import PromoModal from "@/c__widgets/promocodeModal/ui";
import {
  checkPromocodeAction,
  createExchangeAction,
} from "@/d__features/exchange/api";
import {
  setPromocode,
  setIsPromocodeValid,
  setCreateExchangeLoading,
  setCheckPromocodeLoading,
} from "@/d__features/exchange/model";
import { ExchangeRequestDetails } from "@/d__features/exchange/ui/exchangeRequestDetails";
import { checkConsentRequirementAction } from "@/d__features/userDataDisplay/api";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";
import { useServerAction } from "@/shared/lib";
import {
  useAppDispatch,
  useAppSelector,
  selectExchangeDetails,
  setPageName,
  selectExchangeCreateData,
  setExchangeId,
} from "@/shared/model/store";

import { SignIcon } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";

export default function ExchangeDetailsPage() {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectExchangeDetails);
  const initData = useAppSelector(state => state.user.initData)
  const router = useRouter();
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [promocode, setPromoCode] = useState("");
  const [isPromocodeErrorShowing, setIsPromocodeErrorShowing] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    dispatch(setPageName("подтверждение заявки"));
  }, [dispatch]);
  const createExchangeData = useAppSelector(selectExchangeCreateData);

  const [createExchange, createExchangeResponse] = useServerAction({
    action: createExchangeAction,
    loadingAction: setCreateExchangeLoading,
  });

  const [checkPromocode, checkPromocodeResponse] = useServerAction({
    action: checkPromocodeAction,
    loadingAction: setCheckPromocodeLoading,
  });

  const { trackUserAction } = useTrackUserAction();

  const onSubmit = () => {
    if (initData) {
      createExchange({ ...createExchangeData, initData });
  
    }
   
    else console.log('initData is not valid')
  };

  useEffect(() => {
    if (createExchangeResponse) {
      dispatch(setExchangeId(createExchangeResponse?.exchange_id));
      router.push("/exchange/result");
    }
  }, [createExchangeResponse]);

  const handlePromoButton = () => {
    setIsPromoModalOpen(true);
  };

  const handlePromoModalCloseEvent = () => {
    setIsPromoModalOpen(false);
  };

  const handlePromocodeSubmit = () => {
    checkPromocode(promocode);
    trackUserAction("Промокод отправлен на проверку");
  };

  useEffect(() => {
    if (checkPromocodeResponse) {
      if (checkPromocodeResponse.detail === 'Промокод не найден.') {
        trackUserAction("Промокод не прошел проверку");
        setIsPromocodeErrorShowing(true);
        if (timeoutId.current) clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
          setIsPromocodeErrorShowing(false);
        }, 3000);
      } else {
        trackUserAction("Промокод упешно прошел проверку");
        setIsPromoApplied(true);
        handlePromoModalCloseEvent();
        dispatch(setPromocode(promocode));
        dispatch(setIsPromocodeValid(true));
      }
    }
  }, [checkPromocodeResponse]);

  return (
    <>
      <ExchangeLayout onMainButtonClick={onSubmit} buttonText="Оставить заявку">
        <div className="flex flex-col gap-26">
          {details.map((item, idx) => (
            <ExchangeRequestDetails {...item} key={idx} />
          ))}
          <div className="bg-[var(--background-secondary)] rounded-full border border-[var(--border-placeholder)] px-20 py-9 flex items-center justify-center mb-50">
            {!isPromoApplied ? (
              <button
                data-tracking-label="У меня есть промокод"
                className=" underline underline-offset-3 text-13 text-[var(--text-main)] pb-3"
                onClick={handlePromoButton}
              >
                У меня есть промокод
              </button>
            ) : (
              <div className="flex items-center justify-center gap-[15px]">
                <p className="text-[var(--main-color)]">
                  Промокод будет успешно применен
                </p>
                <SignIcon className="w-[16px] h-[16px] translate-y-[2px]" />
              </div>
            )}
          </div>
        </div>
      </ExchangeLayout>
      <PromoModal
        handleCloseEvent={handlePromoModalCloseEvent}
        isErrorMessageShowing={isPromocodeErrorShowing}
        isOpen={isPromoModalOpen}
        onSubmit={handlePromocodeSubmit}
        value={promocode}
        setValue={setPromoCode}
      ></PromoModal>
    </>
  );
}
