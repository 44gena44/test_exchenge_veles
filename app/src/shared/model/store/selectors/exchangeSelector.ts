import { calculateRate } from "@/shared/lib";
import { createSelector } from "reselect";
import { selectCurrencyTypes } from "./currencyTypesSelector";
import { RootState } from "../state";
import { ExchangeCurrencyPosition } from "../../exchange";

// Section Heading Props Selector
export const selectSectionHeadingProps = (position: "given" | "received") =>
    createSelector(
      (state: RootState) => state.exchange,

      (exchange) => {
  
        return position === "given"
          ? { title: "Отдаете", minValue: exchange.exchangeRate?.currency_give_min_value }
          : {
              title: "Получаете",
              rate: calculateRate({
                currencyGive: exchange.selectedCurrencySell?.name || "",
                currencyGet: exchange.selectedCurrencyBuy?.name || "",
                course: exchange.exchangeRate?.course || 0,
              }),
            };
      }
    );
  
  // Currency Types Selector
  export { selectCurrencyTypes };
  
  // Currency Options Selector
  export const selectCurrencyOptions = (position: "given" | "received") =>
    createSelector(
      (state: RootState) => state.exchange,
      (exchange) => {
        switch (position) {
          case "given":
            return exchange.currenciesSell;
          case "received":
            return exchange.currenciesBuy;
          default:
            return [];
        }
      }
    );
  
  // Bank Options Selector
  export const selectBankOptions = createSelector(
    (state: RootState) => state.exchange,
    (exchange) => (exchange.banks ? exchange.banks : [])
  );
  
  // City Options Selector
  export const selectCityOptions = createSelector(
    (state: RootState) => state.exchange,
    (exchange) =>  exchange.cities?.filter(city => city.country === exchange.selectedCountry?.value?.name)
  );

  export const selectCountryOptions = createSelector(
    (state: RootState) => state.exchange,
    (exchange) =>  exchange.countries
  );
  
  // Nets Options Selector
  export const selectNetsOptions = createSelector(
    (state: RootState) => state.exchange,
    (exchange) => (exchange.networks ? exchange.networks : [])
  );
  
  // Input Value Selector
  export const selectInputValue = (position: ExchangeCurrencyPosition) =>
    createSelector(
      (state: RootState) => state.exchange,
      (exchange) => {
        return position === "given"
          ? exchange.currencySellAmount.value
          : exchange.currencyBuyAmount.value;
      }
    );
  
  // Bank Value Selector
  export const selectBankValue = (state: RootState) =>state.exchange.selectedBank.value;
  
  // City Value Selector
  export const selectCityValue = (state: RootState) =>
    state.exchange.selectedCity

    // Country Value Selector
    export const selectCountryValue = (state: RootState) =>
      state.exchange.selectedCountry
  
  // Card Number Value Selector
  export const selectCardNumberValue = (state: RootState) =>
    state.exchange.cardNumber.value;
  
  // Phone Number Value Selector
  export const selectPhoneNumberValue = (state: RootState) =>
    state.exchange.phoneNumber?.value;
  
  // Is Phone Number Used Selector
  export const selectIsPhoneNumberUsed = (state: RootState) => {
    return state.exchange.isPhoneNumberUsed;
  };
  
  // Net Value Selector
  export const selectNetValue = (state: RootState) =>
    state.exchange.selectedNetwork.value;
  
  // Wallet Address Value Selector
  export const selectWalletAddressValue = (state: RootState) =>
    state.exchange.walletAddress.value;
  
  // Selected Currency Selector
  
  export const selectCurrency = (position: ExchangeCurrencyPosition) =>
    createSelector(
      (state: RootState) => state.exchange,
      (exchange) =>
        position === "given"
          ? exchange.selectedCurrencySell
          : exchange.selectedCurrencyBuy
    );
  
  export const selectRate = () =>
    createSelector(
      (state: RootState) => state.exchange,
      (exchange) =>
        calculateRate({
          currencyGive: exchange.selectedCurrencySell?.name || "",
          currencyGet: exchange.selectedCurrencyBuy?.name || "",
          course: exchange.exchangeRate?.course || 0,
        })
    );
  
  // Error Selectors
  export const selectValueError = (position: ExchangeCurrencyPosition) =>
    createSelector(
      (state: RootState) => state.exchange,
      (exchange) => {
        return position === "given"
          ? exchange.currencySellAmount.error
          : exchange.currencyBuyAmount.error;
      }
    );
  
  export const selectBankError = (state: RootState) =>
    state.exchange.selectedBank.error || null;
  export const selectCardNumberError = (state: RootState) =>
    state.exchange.cardNumber.error;
  
  export const selectPhoneNumberError = (state: RootState) =>
    state.exchange.phoneNumber?.error;
  
  export const selectCityError = (state: RootState) =>
    state.exchange.selectedCity ? state.exchange.selectedCity.error : null;

  export const selectCountryError = (state: RootState) =>
    state.exchange.selectedCountry ? state.exchange.selectedCountry.error : null;
  
  export const selectWalletAddressError = (state: RootState) =>
    state.exchange.walletAddress.error;
  
  // Errors Visibility Selector
  export const selectAreErrorsVisible = (state: RootState) =>
    state.exchange.areErrorsVisible;
  
  // Currency Type Selection Selectors
  export const selectIsSelectedCurrencyType = (position: "given" | "received", type: string) =>
    createSelector(
      (state: RootState) => position === "received" 
        ? state.exchange.selectedCurrencyBuyType 
        : state.exchange.selectedCurrencySellType,
      (selectedType) => selectedType === type
    );
  
  // Profile picture selector - простая функция без createSelector
  export const profilePictureSelector = (state: RootState) => state.user?.data?.user_data?.profile_picture;
  