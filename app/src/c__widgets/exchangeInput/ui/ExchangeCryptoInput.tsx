import React, { memo, useEffect, useState } from "react";
import CurrencyInput from "../../../entities/currency/ui/CurrencyInput";
import { useAppDispatch, useAppSelector } from "@/shared/model/store/hooks";
import {
  selectSectionHeadingProps,
  selectCurrencyOptions,
  selectNetsOptions,
  selectNetValue,
  selectWalletAddressValue,
  selectWalletAddressError,
} from "@/shared/model/store/selectors";

import { usePlaceholder } from "@/d__features/exchange/lib/inputField/usePlaceholder";
import { InputWrapper } from "../../../shared/ui/form/InputWrapper";
import { Input } from "../../../shared/ui/form/Input";
import { BaseTabs as CryptoNetSelect } from "@/shared/ui";
import { useExchangeInput } from "@/d__features/exchange/lib/inputField/useExchangeInput";
import {
  setSelectedNetworkValue,
  setWalletAddressValue,
} from "@/d__features/exchange/model/store/reducer/exchangeReducer/exchangeReducer";
import clsx from "clsx";
import { Currency, Network } from "@/shared/model/api/exchange/types";
import { SectionHeading } from "@/shared/ui/exchange/SectionHeading";
import { MinValueNote } from "./MinValueNote";
import { ExchangeCurrencyPosition } from "@/shared/model/exchange";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

export type ExchangeCryptoInputProps = {
  position: ExchangeCurrencyPosition;
};

const ExchangeCryptoInput: React.FC<ExchangeCryptoInputProps> = memo(
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
    const netsOptions = useAppSelector(selectNetsOptions);
    const networks = useAppSelector((state) => state.exchange.networks);
    const netValue = useAppSelector(selectNetValue);
    const walletAddressValue = useAppSelector(selectWalletAddressValue);
    const walletAddressError = useAppSelector(selectWalletAddressError);

    const placeholder = usePlaceholder(position, "COIN");

    // Обработка изменения валюты
    useEffect(() => {
      if (isInitialLoad) {
        setIsInitialLoad(false);
        return;
      }
    }, []);

        const { trackInputChange } = useTrackUserAction();

    const handleNetChange = (net: Network) => {
      const network = networks?.find((network) => network.id === net.id);
      if (network) {
        dispatch(setSelectedNetworkValue(network));
        trackInputChange('Сеть', network.name)
      }
    };

    const handleWalletAddressChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      dispatch(setWalletAddressValue(e.target.value));
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

        {netsOptions.length > 0 && (
          <div className="mt-13">
            <SectionHeading title="Выберите сеть" />
            <CryptoNetSelect
              onChange={handleNetChange}
              value={netValue as Network}
              options={netsOptions || []}
            />
          </div>
        )}

        {position === "received" && (
          <div
            className={clsx("mt-0", {
              "mt-20": netsOptions.length > 0,
            })}
          >
            <InputWrapper
              error={
                walletAddressError && areErrorsVisible
                  ? walletAddressError
                  : null
              }
            >
              <Input
                trackingLabel="Адрес кошелька"
                className="border border-[var(--border-placeholder)] rounded-[21px] bg-[var(--background-secondary)] text-16 leading-normal px-18 py-13 pr-30 w-full"
                type="text"
                onChange={handleWalletAddressChange}
                value={walletAddressValue ?? ""}
                placeholder={
                  netValue
                    ? `Адрес кошелька в сети ${netValue?.name}`
                    : `Адрес кошелька`
                }
              />
            </InputWrapper>
          </div>
        )}
      </div>
    );
  }
);

ExchangeCryptoInput.displayName = "ExchangeCryptoInput";

export default ExchangeCryptoInput;
