import { BankSelect, BankOption } from "@/entities/bank/ui";
import { CurrencyInput } from "@/entities/currency/ui";
import {
  useExchangeInput,
  usePlaceholder,
  normalizeInput,
  formatWithSpacesCardNumber,
  formatPhoneNumber,
  preventKeysOnPhoneInput,
  preventKeysOnCardNumberInput,
} from "@/shared/lib";
import {
  useAppDispatch,
  useAppSelector,
  selectSectionHeadingProps,
  selectCurrencyOptions,
  selectBankOptions,
  selectBankValue,
  selectCardNumberValue,
  selectPhoneNumberValue,
  selectIsPhoneNumberUsed,
  selectBankError,
  selectCardNumberError,
  selectPhoneNumberError,
} from "@/shared/model/store";
import { InputWrapper, Input } from "@/shared/ui";
import { SectionHeading } from "@/shared/ui/exchange/SectionHeading";
import React, { memo, useCallback, useEffect } from "react";
import { MinValueNote } from "./MinValueNote";
import {
  setCardNumberValue,
  setPhoneNumberValue,
  setSelectedBankValue,
} from "@/d__features/exchange/model";
import { Currency } from "@/shared/model/api";
import { ExchangeCurrencyPosition } from "@/shared/model/exchange";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

export type ExchangeCardInputProps = {
  position: ExchangeCurrencyPosition;
};

const ExchangeCardInput: React.FC<ExchangeCardInputProps> = memo(
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
    const bankOptions = useAppSelector(selectBankOptions);
    const bankValue = useAppSelector(selectBankValue);
    const banks = useAppSelector((state) => state.exchange.banks);
    const cardNumberValue = useAppSelector(selectCardNumberValue);
    const phoneNumberValue = useAppSelector(selectPhoneNumberValue);
    const isPhoneNumberUsed = useAppSelector(selectIsPhoneNumberUsed);
    const bankError = useAppSelector(selectBankError);

    const cardNumberError = useAppSelector(selectCardNumberError);
    const phoneNumberError = useAppSelector(selectPhoneNumberError);

    const placeholder = usePlaceholder(position, "BANK");

    const handleCardNumberChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = normalizeInput(e.target.value);
        dispatch(setCardNumberValue(formatWithSpacesCardNumber(raw)));
      },
      [dispatch]
    );

    const handlePhoneNumberChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        dispatch(setPhoneNumberValue(formattedPhone));
      },
      [dispatch]
    );

    useEffect(() => {
      if (isInitialLoad) {
        setIsInitialLoad(false);
        return;
      }
    }, []);

    const { trackInputChange } = useTrackUserAction();

    const handleBankChange = (option: BankOption | null) => {
      if (!option) return;
      if (isInitialLoad) return;
      const bank = banks?.find((bank) => bank.id === option.id);
      if (bank) {
        dispatch(setSelectedBankValue(bank));
        trackInputChange("Банк", bank.name);
      }
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

        {bankOptions.length > 0 && (
          <BankSelect
            value={bankValue}
            options={bankOptions || []}
            onChange={handleBankChange}
            placeholder="Выберите банк получения"
            error={bankError && areErrorsVisible ? bankError : null}
          />
        )}
        {position === "received" && (
          <div className="-mb-16">
            {isPhoneNumberUsed ? (
              <InputWrapper
                error={
                  phoneNumberError && areErrorsVisible ? phoneNumberError : null
                }
              >
                <Input
                  trackingLabel="Номер телефона"
                  onChange={handlePhoneNumberChange}
                  onKeyDown={preventKeysOnPhoneInput}
                  value={phoneNumberValue ?? ""}
                  type="text"
                  className=" border border-[var(--border-placeholder)] rounded-full  bg-[var(--background-secondary)] placeholder:text-[var(--text-light)] text-16 leading-normal px-18 py-13 w-full"
                  placeholder="Введите номер телефона"
                />
              </InputWrapper>
            ) : (
              <InputWrapper
                error={
                  cardNumberError && areErrorsVisible ? cardNumberError : null
                }
              >
                <Input
                  trackingLabel="Номер карты"
                  onChange={handleCardNumberChange}
                  onKeyDown={preventKeysOnCardNumberInput}
                  value={cardNumberValue ?? ""}
                  type="text"
                  className=" border border-[var(--border-placeholder)] rounded-full  bg-[var(--background-secondary)] placeholder:text-[var(--text-light)] text-16 leading-normal px-18 py-13 w-full"
                  placeholder="Номер карты"
                />
              </InputWrapper>
            )}
          </div>
        )}
      </div>
    );
  }
);

ExchangeCardInput.displayName = "ExchangeCardInput";

export default ExchangeCardInput;
