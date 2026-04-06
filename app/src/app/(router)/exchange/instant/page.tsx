"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpDown, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BaseSelect, InputWrapper, Input } from "@/shared/ui";
import { LimitsModal } from "@/components/limits-modal";
import { ExchangeStatusModal } from "@/components/exchange-status-modal";
import { valueMask, formatWithSpaces, normalizeInput } from "@/shared/lib/string/valueMask";
import { FastExchangeWay } from "@/shared/model/api/mock/types";
import clsx from "clsx";

const MIN_AMOUNT = 1000
const DEMO_RATE_MIN = 76;
const DEMO_RATE_MAX = 84;
const DEMO_NETWORK_FEE_MIN = 0.8;
const DEMO_NETWORK_FEE_MAX = 1.8;
const FALLBACK_PAYMENT_OPTIONS: FastExchangeWay[] = [
  { id: 1, name: "СБП" },
  { id: 2, name: "Сбербанк" },
  { id: 3, name: "Т-Банк" },
  { id: 4, name: "ВТБ" },
];

export default function InstantExchangePage() {
  const [fromAmount, setFromAmount] = React.useState("");
  const [toAmount, setToAmount] = React.useState("");
  const [isRubToUsdt, setIsRubToUsdt] = React.useState(true);
  const [paymentMethod, setPaymentMethod] = React.useState<FastExchangeWay | null>(null);
  const [usdtAddress, setUsdtAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isLimitsModalOpen, setIsLimitsModalOpen] = React.useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = React.useState(false);
  const [paymentMethodSearch, setPaymentMethodSearch] = React.useState("");
  const [showFullPaymentOptions, setShowFullPaymentOptions] = React.useState(false);
  const [lastChangedField, setLastChangedField] = React.useState<"from" | "to">("from");
  const [areErrorsVisible, setAreErrorsVisible] = React.useState(false);
  const [fromAmountError, setFromAmountError] = React.useState<string | null>(null);
  const [fromAmountFormatted, setFromAmountFormatted] = React.useState("");
  const [toAmountFormatted, setToAmountFormatted] = React.useState("");
  const [demoUsdtRubRate, setDemoUsdtRubRate] = React.useState(() =>
    Number((DEMO_RATE_MIN + Math.random() * (DEMO_RATE_MAX - DEMO_RATE_MIN)).toFixed(2))
  );
  const [demoNetworkFee, setDemoNetworkFee] = React.useState(() =>
    Number((DEMO_NETWORK_FEE_MIN + Math.random() * (DEMO_NETWORK_FEE_MAX - DEMO_NETWORK_FEE_MIN)).toFixed(2))
  );

  const fromCurrency = isRubToUsdt ? "RUB" : "USDT";
  const toCurrency = isRubToUsdt ? "USDT" : "RUB";
  const fromCurrencyIcon = isRubToUsdt ? "/images/icons/rub.svg" : "/images/icons/usdt.svg";
  const toCurrencyIcon = isRubToUsdt ? "/images/icons/usdt.svg" : "/images/icons/rub.svg";

  const limitsData = null;

  const paymentOptions = FALLBACK_PAYMENT_OPTIONS;

  // Refresh demo rates periodically.
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setDemoUsdtRubRate(
        Number((DEMO_RATE_MIN + Math.random() * (DEMO_RATE_MAX - DEMO_RATE_MIN)).toFixed(2))
      );
      setDemoNetworkFee(
        Number((DEMO_NETWORK_FEE_MIN + Math.random() * (DEMO_NETWORK_FEE_MAX - DEMO_NETWORK_FEE_MIN)).toFixed(2))
      );
    }, 12000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    if (!paymentMethod && paymentOptions.length > 0) {
      setPaymentMethod(paymentOptions[0]);
    }
  }, [paymentOptions, paymentMethod]);

  React.useEffect(() => {
    const rate = demoUsdtRubRate;
    const fee = demoNetworkFee;

    if (lastChangedField === "from") {
      if (!fromAmount) {
        setToAmount("");
        return;
      }
      const parsed = Number(fromAmount);
      if (Number.isNaN(parsed)) {
        setToAmount("");
        return;
      }

      const converted = isRubToUsdt
        ? parsed / rate - fee
        : (parsed - fee) * rate;
      setToAmount(converted > 0 ? converted.toFixed(2) : "0");
      return;
    }

    if (!toAmount) {
      setFromAmount("");
      return;
    }
    const parsed = Number(toAmount);
    if (Number.isNaN(parsed)) {
      setFromAmount("");
      return;
    }

    const converted = isRubToUsdt
      ? (parsed + fee) * rate
      : parsed / rate + fee;
    setFromAmount(converted > 0 ? converted.toFixed(2) : "0");
  }, [fromAmount, toAmount, demoUsdtRubRate, demoNetworkFee, lastChangedField, isRubToUsdt]);

  // Payment method search logic
  React.useEffect(() => {
    setShowFullPaymentOptions(false);
  }, [paymentMethodSearch]);

  React.useEffect(() => {
    if (!isPaymentMethodOpen) {
      setShowFullPaymentOptions(true);
    }
  }, [isPaymentMethodOpen]);

  React.useEffect(() => {
    if (paymentMethod && paymentMethodSearch !== paymentMethod.name) {
      setPaymentMethodSearch(paymentMethod.name);
    }
  }, [paymentMethod]);

  const filterPaymentOptions = React.useCallback(
    (options: FastExchangeWay[], search: string) => {
      return showFullPaymentOptions
        ? options
        : options.filter((option) =>
          option.name.toLowerCase().includes(search.toLowerCase())
        );
    },
    [showFullPaymentOptions]
  );

  const handlePaymentMethodSelect = (method: FastExchangeWay) => {
    setPaymentMethod(method);
    setPaymentMethodSearch(method.name);
  };

  const handlePaymentSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPaymentMethodSearch(val);
    setIsPaymentMethodOpen(true);

    const exactMatch = paymentOptions.find(
      (option) => option.name.toLowerCase() === val.toLowerCase()
    );
    if (exactMatch) {
      setPaymentMethod(exactMatch);
    }
  };

  const networkFee = demoNetworkFee;

  const validateFields = () => {
    let hasErrors = false;
    const parsedAmount = Number(fromAmount);
    if (!fromAmount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setFromAmountError("Введите сумму обмена");
      hasErrors = true;
    } else {
      setFromAmountError(null);
    }

    return hasErrors;
  };

  const handleExchange = () => {
    setAreErrorsVisible(true);

    if (validateFields()) {
      return;
    }

    if (!paymentMethod) {
      setPaymentMethod(paymentOptions[0]);
    }
    if (isRubToUsdt && !usdtAddress) {
      setUsdtAddress("TDEMOu7N8gQw3TRC20walletX12");
    }
    if (!isRubToUsdt && !phoneNumber) {
      setPhoneNumber("+7 900 123-45-67");
    }

    const parsedFrom = Number(fromAmount);
    const parsedTo = Number(toAmount);
    if (Number.isNaN(parsedTo) || parsedTo <= 0) {
      const converted = isRubToUsdt
        ? parsedFrom / demoUsdtRubRate - networkFee
        : (parsedFrom - networkFee) * demoUsdtRubRate;
      if (converted > 0) {
        const convertedFixed = converted.toFixed(2);
        setToAmount(convertedFixed);
        setToAmountFormatted(valueMask(Number(convertedFixed)));
      }
    }

    setIsStatusModalOpen(true);
  };

  const handleSwapDirection = () => {
    const nextFromAmount = toAmount;
    const nextToAmount = fromAmount;
    const nextFromFormatted = toAmountFormatted;
    const nextToFormatted = fromAmountFormatted;

    setIsRubToUsdt((prev) => !prev);
    setFromAmount(nextFromAmount);
    setToAmount(nextToAmount);
    setFromAmountFormatted(nextFromFormatted);
    setToAmountFormatted(nextToFormatted);
    setLastChangedField("from");
    setFromAmountError(null);
  };

  const rateLabel = `${demoUsdtRubRate.toFixed(2)} RUB ≈ 1 USDT`;

  // Синхронизация отформатированных значений с внешними
  React.useEffect(() => {
    if (fromAmount) {
      const formatted = valueMask(Number(fromAmount));
      setFromAmountFormatted(formatted);
    } else {
      setFromAmountFormatted("");
    }
  }, [fromAmount]);

  React.useEffect(() => {
    if (toAmount) {
      const formatted = valueMask(Number(toAmount));
      setToAmountFormatted(formatted);
    } else {
      setToAmountFormatted("");
    }
  }, [toAmount]);

  // Обработчики для fromAmount
  const handleFromAmountChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = normalizeInput(e.target.value);

      if (!raw) {
        setFromAmountFormatted("");
        setFromAmount("");
        setLastChangedField("from");
        return;
      }

      const parts = raw.split(",");
      const intPart = parts[0];
      const decPart = parts[1]?.slice(0, 8);

      const combined =
        decPart !== undefined ? `${intPart},${decPart}` : intPart;
      const formatted = formatWithSpaces(combined);
      setFromAmountFormatted(formatted);

      const numeric = parseFloat(
        combined.replace(/\s/g, "").replace(",", ".")
      );
      setFromAmount(!isNaN(numeric) ? numeric.toString() : "");
      setLastChangedField("from");

      if (areErrorsVisible) {
        setFromAmountError(!isNaN(numeric) && numeric > 0 ? null : "Введите сумму обмена");
      }
    },
    [areErrorsVisible]
  );


  const handleFromAmountKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowed = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];
      const isNumber = /^[0-9]$/.test(e.key);
      const isSeparator = e.key === "," || e.key === ".";

      if (!isNumber && !allowed.includes(e.key) && !isSeparator) {
        e.preventDefault();
      }
    },
    []
  );

  // Обработчики для toAmount
  const handleToAmountChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = normalizeInput(e.target.value);

      if (!raw) {
        setToAmountFormatted("");
        setToAmount("");
        setLastChangedField("to");
        return;
      }

      const parts = raw.split(",");
      const intPart = parts[0];
      const decPart = parts[1]?.slice(0, 8);

      const combined =
        decPart !== undefined ? `${intPart},${decPart}` : intPart;
      const formatted = formatWithSpaces(combined);
      setToAmountFormatted(formatted);

      const numeric = parseFloat(
        combined.replace(/\s/g, "").replace(",", ".")
      );
      setToAmount(!isNaN(numeric) ? numeric.toString() : "");
      setLastChangedField("to");
    },
    []
  );


  const handleToAmountKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowed = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];
      const isNumber = /^[0-9]$/.test(e.key);
      const isSeparator = e.key === "," || e.key === ".";

      if (!isNumber && !allowed.includes(e.key) && !isSeparator) {
        e.preventDefault();
      }
    },
    []
  );

  return (
    <div className="w-full pb-40">
      <LimitsModal
        isOpen={isLimitsModalOpen}
        onOpenChange={setIsLimitsModalOpen}
        limitsInfo={limitsData ?? undefined}
        additionalData={[{
          ignoreParseDesc: true,
          info_list: [
            { title: 'Минимальная сумма', description: `${MIN_AMOUNT.toLocaleString('ru-RU')} ₽` },
            { title: 'Комиссия сети', description: `${valueMask(networkFee)} USDT` },
          ],
        }]} />
      <ExchangeStatusModal
        isOpen={isStatusModalOpen}
        onOpenChange={setIsStatusModalOpen}
        fromAmount={fromAmount}
        fromCurrency={fromCurrency}
        toAmount={toAmount}
        toCurrency={toCurrency}
        paymentMethod={paymentMethod?.name ?? FALLBACK_PAYMENT_OPTIONS[0].name}
        receivingBank={paymentMethod?.name ?? FALLBACK_PAYMENT_OPTIONS[0].name}
        usdtAddress={usdtAddress || "TDEMOu7N8gQw3TRC20walletX12"}
        phoneNumber={phoneNumber || "+7 900 123-45-67"}
        isRubToUsdt={isRubToUsdt}
        isUsdtToRub={!isRubToUsdt}
        paymentLink="https://google.com"
        finalAmount={Number(toAmount)}
      />
      <PageHeader>Мгновенный обмен</PageHeader>
      <p className="text-muted-foreground -mt-24 mb-16">
        {isRubToUsdt ? "Мгновенная покупка USDT без посредников" : "Мгновенная продажа USDT без посредников"}
      </p>
      <div className="grid gap-16 py-16">
        <div className="relative">
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-card p-16 rounded-xl border">
              <p className="text-xs text-muted-foreground mb-4">
                Вы отправляете
              </p>
              <div className="flex items-center justify-between gap-8">
                <Input
                  trackingLabel="Сумма отправки"
                  type="text"
                  placeholder="1 000"
                  value={fromAmountFormatted}
                  onChange={handleFromAmountChange}
                  onKeyDown={handleFromAmountKeyDown}
                  className="text-2xl font-bold border-none rounded-[12px] p-0 focus-visible:ring-0 placeholder:text-muted-foreground [&]:bg-white"
                />
                <span className="flex items-center gap-6 text-sm font-semibold text-foreground py-8 px-14 rounded-[12px]">
                  <Image src={fromCurrencyIcon} alt={fromCurrency} width={20} height={20} />
                  {fromCurrency}
                </span>
              </div>
            </div>

            <p className={clsx("h-13 text-xs -mt-4 text-red-500 px-16 opacity-0 transition-opacity duration-500", { "[&]:opacity-100": fromAmountError && areErrorsVisible })}>
              {fromAmountError}
            </p>
          </div>

          <div className="flex justify-center relative z-10 -my-4">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="h-40 w-40 rounded-full border"
              onClick={handleSwapDirection}
              aria-label="Поменять направление обмена"
            >
              <ArrowUpDown className="h-18 w-18" />
            </Button>
          </div>

          <div className="bg-card p-16 rounded-xl border mt-8">
            <p className="text-xs text-muted-foreground mb-4">Вы получаете</p>
            <div className="flex items-center justify-between gap-8">
              <Input
                trackingLabel="Сумма получения"
                type="text"
                placeholder={valueMask(Number((isRubToUsdt ? (1000 / demoUsdtRubRate - networkFee) : (100 - networkFee) * demoUsdtRubRate).toFixed(2)))}
                value={toAmountFormatted}
                onChange={handleToAmountChange}
                onKeyDown={handleToAmountKeyDown}
                className="text-2xl font-bold border-none rounded-[12px] p-0 focus-visible:ring-0 placeholder:text-muted-foreground [&]:bg-white"
              />
              <span className="flex items-center gap-6 text-sm font-semibold text-foreground py-8 px-14 rounded-[12px]">
                <Image src={toCurrencyIcon} alt={toCurrency} width={20} height={20} />
                {toCurrency}
              </span>
            </div>
          </div>

          
        </div>

        <div className="text-xs text-muted-foreground text-center pt-16">
            Курс: {rateLabel}
          </div>

        <div className="grid gap-24 pt-16">
          <div className="grid gap-8">
            <Label htmlFor="payment-method">{isRubToUsdt ? "Способ оплаты" : "Банк для получения"}</Label>
            <BaseSelect
              options={paymentOptions}
              value={paymentMethod}
              onChange={handlePaymentMethodSelect}
              isOpen={isPaymentMethodOpen}
              onOpenChange={setIsPaymentMethodOpen}
              disabled={false}
              searchValue={paymentMethodSearch}
              filterOptions={filterPaymentOptions}
              renderTrigger={({ isOpen }) => (
                <div
                  className="relative w-full flex items-center justify-between px-16 py-10 rounded-full border border-[var(--border-placeholder)] bg-[var(--background-secondary)] text-13 transition-all duration-500"
                >
                  {!paymentMethodSearch && (
                    <div className="absolute left-16 pointer-events-none text-16 text-[var(--text-main)]">
                      {isRubToUsdt ? "Выберите способ оплаты" : "Выберите банк"}
                    </div>
                  )}
                  <input
                    id="payment-method"
                    type="text"
                    className="w-full outline-none bg-transparent text-16 text-[var(--text-main)] placeholder:opacity-0"
                    value={paymentMethodSearch}
                    onChange={handlePaymentSearchChange}
                    onFocus={() => setIsPaymentMethodOpen(true)}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPaymentMethodOpen(!isOpen)}
                    tabIndex={-1}
                  >
                    <svg
                      className={`ml-2 w-15 h-15 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="var(--text-secondary)"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
              renderOption={({ option, onClick }) => (
                <button
                  className="shrink-0 px-18 py-9 text-left text-[var(--text-main)] w-full not-last:border-b not-last:border-[var(--divider-secondary)]"
                  key={option.id}
                  onClick={onClick}
                >
                  {option.name}
                </button>
              )}
            />
          </div>
          {isRubToUsdt ? (
            <div className="grid gap-8">
              <Label htmlFor="usdt-address">Адрес USDT TRC20</Label>
              <InputWrapper error={null}>
                <Input
                  trackingLabel="Адрес кошелька"
                  className="border border-[var(--border-placeholder)] rounded-[21px] bg-[var(--background-secondary)] text-16 leading-normal px-18 py-13 pr-30 w-full"
                  type="text"
                  placeholder="Адрес кошелька в сети TRC20"
                  value={usdtAddress}
                  onChange={(e) => {
                    setUsdtAddress(e.target.value);
                  }}
                />
              </InputWrapper>
            </div>
          ) : (
            <div className="grid gap-8">
              <Label htmlFor="phone-number">Номер телефона</Label>
              <InputWrapper error={null}>
                <Input
                  trackingLabel="Номер телефона"
                  className="border border-[var(--border-placeholder)] rounded-[21px] bg-[var(--background-secondary)] text-16 leading-normal px-18 py-13 pr-30 w-full"
                  type="text"
                  placeholder="+7 900 123-45-67"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </InputWrapper>
            </div>
          )}
        </div>
      </div>

      {/* Network Fee Block */}
      <div className="mb-16 bg-card border rounded-lg p-16">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Комиссия сети
          </span>
          <div className="text-right">
            <span className="text-sm font-semibold text-foreground">
              {valueMask(networkFee)} USDT
            </span>
          </div>
        </div>
      </div>

      <div className="mb-16 bg-card border rounded-lg p-12 py-12 flex items-center justify-between gap-12">
        <div className="flex items-center gap-12">
          <ShieldCheck className="h-20 w-20 text-accent" />
          <div className="flex flex-col justify-center gap-5">
            <span className="text-sm font-medium text-foreground">
              Демо-режим активен
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              Все сценарии обмена доступны для показа
            </span>
          </div>

        </div>
        <Button
          onClick={() => setIsLimitsModalOpen(true)}
          variant="secondary"
          size="sm"
        >
          Лимиты
        </Button>
      </div>

      <div>
        <Button
          onClick={handleExchange}
          className="w-full h-48 text-base font-bold"
          disabled={false}
        >
          Обменять
        </Button>
      </div>
    </div>
  );
}
