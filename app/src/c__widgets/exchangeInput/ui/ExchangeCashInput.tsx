import { setSelectedCityValue, setSelectedCountryValue } from "@/d__features/exchange/model";
import { CurrencyInput } from "@/entities/currency/ui";
import { useExchangeInput, usePlaceholder } from "@/shared/lib";
import { Currency } from "@/shared/model/api";
import {
  useAppDispatch,
  useAppSelector,
  selectSectionHeadingProps,
  selectCurrencyOptions,
  selectCityOptions,
  selectCityValue,
  selectCityError,
  selectCountryValue,
  selectCountryError,
  selectCountryOptions,
} from "@/shared/model/store";
import { SectionHeading } from "@/shared/ui";
import { memo, useEffect } from "react";
import { MinValueNote } from "./MinValueNote";
import { ExchangeCurrencyPosition } from "@/shared/model/exchange";
import { PlaceSelect } from "@/entities/place/ui";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

export type ExchangeCashInputProps = {
  position: ExchangeCurrencyPosition;
};

const ExchangeCashInput: React.FC<ExchangeCashInputProps> = memo(
  ({ position }) => {
    const dispatch = useAppDispatch();
    const {
      selectedCurrency,
      isInitialLoad,
      setIsInitialLoad,
      globalStateValue,
      valueError,
      areErrorsVisible,
      onSelectChange,
      onInputChange,
    } = useExchangeInput(position);

    const sectionHeadingProps = useAppSelector(
      selectSectionHeadingProps(position)
    );

    const currencyOptions = useAppSelector(selectCurrencyOptions(position));
    const cityOptions = useAppSelector(selectCityOptions);
    const countryOptions = useAppSelector(selectCountryOptions);

    const cities = useAppSelector((state) => state.exchange.cities);
    const countries = useAppSelector((state) => state.exchange.countries);

    const cityValue = useAppSelector(selectCityValue);
    const cityError = useAppSelector(selectCityError);
    const countryValue = useAppSelector(selectCountryValue);
    const countryError = useAppSelector(selectCountryError);
    const placeholder = usePlaceholder(position, "CASH");

    useEffect(() => {
      if (isInitialLoad) {
        setIsInitialLoad(false);
        return;
      }
    }, []);

    const { trackInputChange } = useTrackUserAction();


    const onSelectCity = (cityName: string | null) => {
      if (isInitialLoad) return;
      const city = cities?.find((city) => city.name === cityName) || null;
      dispatch(setSelectedCityValue(city));
      if (cityName)
        trackInputChange(`Город`, cityName)
    };

    const onSelectCountry = (countryName: string | null) => {
      if (isInitialLoad) return;
      const country = countries?.find((country) => country.name === countryName) || null;
      dispatch(setSelectedCountryValue(country));
      if (countryName)
        trackInputChange(`Страна`, countryName)
    };

    return (
      <div className="flex flex-col">
        <div>
          <SectionHeading
            note={<MinValueNote />}
            {...sectionHeadingProps}
            error={!!valueError && areErrorsVisible}
          />
          <CurrencyInput
            position={position}
            placeholder={placeholder}
            inputValue={globalStateValue}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
            selectValue={selectedCurrency as Currency}
            options={currencyOptions || []}
            error={!!valueError && areErrorsVisible}
          />
        </div>
        <PlaceSelect
          value={countryValue?.value?.name || ""}
          options={countryOptions || []}
          onChange={onSelectCountry}
          placeholder="Выберите страну"
          placeholderFocused="Введите название страны"
          error={countryError && areErrorsVisible ? countryError : null}
        />
        <PlaceSelect
          disabled={cityOptions?.length === 0}
          value={cityValue.value?.name || ""}
          options={cityOptions || []}
          onChange={onSelectCity}
          placeholder="Выберите город"
          placeholderFocused="Введите название города"
          error={cityError && areErrorsVisible ? cityError : null}
        />
      </div>
    );
  }
);

ExchangeCashInput.displayName = "ExchangeCashInput";

export default ExchangeCashInput;
