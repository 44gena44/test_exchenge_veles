import {
  getCurrenciesAction,
  getDirectionInitialDataAction,
} from "@/d__features/exchange/api";
import {
  setGetCurrenciesLoading,
  setGetDirectionInitialDataLoading,
  setInitialData,
} from "@/d__features/exchange/model";
import { RATE_INTERVAL_KEY } from "@/shared/config";
import { useServerAction } from "@/shared/lib";
import { restartRatePullingIfActive } from "@/d__features/exchange/lib/rate/restartRatePullingIfActive";
import {
  selectCurrencyTypes,
  useAppDispatch,
  useAppSelector,
} from "@/shared/model/store";
import { useEffect } from "react";
import { clearMyInterval } from "../../model/interval";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

export const useSetSelectedCurrencyTypesEffect = () => {
  const { givenType, receivedType } = useAppSelector(selectCurrencyTypes);
  const isRateBeingPulled = useAppSelector(
    (state) => state.exchange.isRateBeingPulled
  );
  const dispatch = useAppDispatch();

  const [getInitialData, initialData] = useServerAction({
    action: getDirectionInitialDataAction,
    loadingAction: setGetDirectionInitialDataLoading,
  });

  const [getCurrencies, availableCurrenciesGet] = useServerAction({
    action: getCurrenciesAction,
    loadingAction: setGetCurrenciesLoading,
  });

  useEffect(() => {
    if (receivedType && givenType) {

      const directionType = `${givenType} - ${receivedType}`;
      getInitialData(directionType);
    }
  }, [receivedType,givenType]);


   useEffect(() => {
    if (initialData) {
      console.log(initialData)
      const giveCurrencyId = initialData?.currencies_give
        ? initialData?.currencies_give[0].id
        : -1;
      if (giveCurrencyId === -1) {
        console.error("initial give currency is not found");
        return;
      }
      getCurrencies({
        currencyType: receivedType,
        giveCurrencyId: giveCurrencyId,
      });
    }
  }, [initialData]);

    useEffect(() => {
    if (initialData && availableCurrenciesGet && availableCurrenciesGet.length > 0) {
      dispatch(
        setInitialData({ initData: initialData, availableCurrenciesGet })
      );
      restartRatePullingIfActive(isRateBeingPulled, dispatch);
    }
  }, [availableCurrenciesGet]);
};
