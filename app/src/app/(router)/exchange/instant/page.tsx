"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ShieldX, ChevronRight, ShieldQuestion } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BaseSelect, InputWrapper, Input } from "@/shared/ui";
import { LimitsModal } from "@/components/limits-modal";
import { ExchangeStatusModal } from "@/components/exchange-status-modal";
import { useServerAction, validateExchangeInput } from "@/shared/lib";
import { valueMask, formatWithSpaces, normalizeInput } from "@/shared/lib/string/valueMask";
import {
  createFastExchangeOrderAction,
  getFastExchangeRateAction,
  getLimitsInfoAction,
} from "@/d__features/mockApi/api/actions";
import { FastExchangeWay } from "@/shared/model/api/mock/types";
import { setCreateFastExchangeOrderLoading, setGetFastExchangeRateLoading } from "@/d__features/mockApi/model";
import { useAppSelector } from "@/shared/model/store";
import clsx from "clsx";

const MIN_AMOUNT = 1000

export default function InstantExchangePage() {
  const [fromAmount, setFromAmount] = React.useState("");
  const [toAmount, setToAmount] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState<FastExchangeWay | null>(null);
  const [usdtAddress, setUsdtAddress] = React.useState("");
  const [isLimitsModalOpen, setIsLimitsModalOpen] = React.useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = React.useState(false);
  const [paymentMethodSearch, setPaymentMethodSearch] = React.useState("");
  const [showFullPaymentOptions, setShowFullPaymentOptions] = React.useState(false);
  const [lastChangedField, setLastChangedField] = React.useState<"from" | "to">("from");
  const [areErrorsVisible, setAreErrorsVisible] = React.useState(false);
  const [fromAmountError, setFromAmountError] = React.useState<string | null>(null);
  const [usdtAddressError, setUsdtAddressError] = React.useState<string | null>(null);
  const [fromAmountFormatted, setFromAmountFormatted] = React.useState("");
  const [toAmountFormatted, setToAmountFormatted] = React.useState("");
  const fromCurrency = "RUB";
  const toCurrency = "USDT";

  const userId = useAppSelector(state => state.user.id)
  const kycStatus = useAppSelector(state => state.user.data?.user_data?.kyc_verified)


  const [getRate, rateData] = useServerAction({
    action: getFastExchangeRateAction,
    loadingAction: setGetFastExchangeRateLoading,
  });
  const [getLimits, limitsData] = useServerAction({
    action: getLimitsInfoAction,
  });

  const [createOrder, orderResponse] = useServerAction({
    action: createFastExchangeOrderAction,
    loadingAction: setCreateFastExchangeOrderLoading
  });

  // Extract limits from limitsData
  const extractedLimits = React.useMemo<{
    amountLimit: number | null;
    exchangeCountLeft: number | null;
  } | null>(() => {
    if (!limitsData?.info_list) return null;

    let minAmountLimit: number | null = null;
    let exchangeCountLeft: number | null = null;

    limitsData.info_list.forEach(category => {
      category.info_list.forEach(limit => {
        if (limit.limit_left !== undefined && typeof limit.description === 'string' && typeof limit.title === 'string') {
          // Check if this is amount limit (contains currency symbols or large numbers)
          if (limit.description.includes('₽') || limit.description.includes('р') ||
            limit.title.toLowerCase().includes('сумм') || limit.title.toLowerCase().includes('объем')) {
            const match = limit.description.match(/[\d\s]+/);
            if (match) {
              const totalAmount = parseFloat(match[0].replace(/\s/g, ''));
              if (!isNaN(totalAmount)) {
                const currentLimit = limit.limit_left as number;
                // Find minimum limit among all amount limits
                if (minAmountLimit === null || currentLimit < minAmountLimit) {
                  minAmountLimit = currentLimit;
                }
              }
            }
          }
          // Check if this is exchange count limit
          else if (limit.title.toLowerCase().includes('обмен') ||
            limit.title.toLowerCase().includes('запрос') ||
            limit.title.toLowerCase().includes('транзакц')) {
            exchangeCountLeft = limit.limit_left as number;
          }
        }
      });
    });

    return { amountLimit: minAmountLimit, exchangeCountLeft };
  }, [limitsData]);

  // Fetch rate and limits on mount and refresh every 30 seconds
  React.useEffect(() => {
    getRate(undefined);
    if (userId) {
      getLimits({ user_id: userId });
    }

    const intervalId = setInterval(() => {
      getRate(undefined);
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [userId]);

  React.useEffect(() => {
    if (rateData?.payment_ways?.length && !paymentMethod) {
      setPaymentMethod(rateData.payment_ways[0]);
    }
  }, [rateData, paymentMethod]);

  React.useEffect(() => {
    const rate = rateData?.rub_usdt_rate;
    const fee = rateData?.network_fee_usdt ?? 0;
    if (!rate) {
      if (lastChangedField === "from") {
        setToAmount("");
      } else {
        setFromAmount("");
      }
      return;
    }

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
      const converted = parsed / rate - fee;
      setToAmount(converted > 0 ? converted.toFixed(2) : "0");
    } else {
      if (!toAmount) {
        setFromAmount("");
        return;
      }
      const parsed = Number(toAmount);
      if (Number.isNaN(parsed)) {
        setFromAmount("");
        return;
      }
      setFromAmount(((parsed + fee) * rate).toFixed(2));
    }
  }, [fromAmount, toAmount, rateData, lastChangedField]);

  React.useEffect(() => {
    if (orderResponse) {
      console.log(orderResponse)
      setIsStatusModalOpen(true);
    }
  }, [orderResponse]);

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

    const exactMatch = (rateData?.payment_ways || []).find(
      (option) => option.name.toLowerCase() === val.toLowerCase()
    );
    if (exactMatch) {
      setPaymentMethod(exactMatch);
    }
  };

  const networkFee = rateData?.network_fee_usdt ?? null;

  const validateFields = () => {
    let hasErrors = false;

    // Validate from amount
    const amountError = validateExchangeInput({
      value: fromAmount,
      inputType: "amount",
      position: "given",
      minValue: 0,
    });
    setFromAmountError(amountError);
    if (amountError) hasErrors = true;

    // Validate amount against limit
    if (!amountError && extractedLimits?.amountLimit !== null && extractedLimits?.amountLimit !== undefined) {
      const parsedAmount = Number(fromAmount);
      const limitAmount = extractedLimits.amountLimit;
      const minAmount = MIN_AMOUNT
      if (!isNaN(parsedAmount) && parsedAmount > limitAmount) {
        setFromAmountError(`Превышен лимит. Доступно: ${limitAmount.toLocaleString('ru-RU')} ₽`);
        hasErrors = true;
      }
      if (!isNaN(parsedAmount) && parsedAmount < minAmount) {
        setFromAmountError(`Сумма ниже лимита. Минимально: ${minAmount.toLocaleString('ru-RU')} ₽`);
        hasErrors = true;
      }
    }

    // Validate wallet address
    const walletError = validateExchangeInput({
      value: usdtAddress,
      inputType: "walletAddress",
      position: "received",
      minValue: 0,
    });
    setUsdtAddressError(walletError);
    if (walletError) hasErrors = true;

    return hasErrors;
  };

  const handleExchange = () => {
    setAreErrorsVisible(true);

    if (validateFields()) {
      return;
    }

    const rate = rateData?.rub_usdt_rate;
    const parsed = Number(fromAmount);
    console.log(1)

    if (!rate || Number.isNaN(parsed) || parsed <= 0 || !usdtAddress) {
      return;
    }
    console.log(2)

    const payment_way_id = paymentMethod?.id

    if (!payment_way_id || !userId) {
      throw "payment_way_id or userId undefined"
    }
    if (networkFee === null) {
      throw "networkFee undefined"
    }

    const parsedToAmount = Number(toAmount);
    if (isNaN(parsedToAmount) || parsedToAmount <= 0) {
      return;
    }

    createOrder({
      amount_give: parsed,
      amount_get: parsedToAmount,
      fee: networkFee,
      user_id: userId,
      payment_way_id,
      wallet: usdtAddress,
      rub_usdt_rate: rate
    });
  };

  const rateLabel = rateData?.rub_usdt_rate
    ? `${(rateData.rub_usdt_rate).toFixed(2)} RUB ≈ 1 USDT`
    : "Курс недоступен";

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
        // Check limit when typing
        if (!isNaN(numeric) && extractedLimits?.amountLimit !== null && extractedLimits?.amountLimit !== undefined) {
          const limitAmount = extractedLimits.amountLimit;
          if (numeric > limitAmount) {
            setFromAmountError(`Превышен лимит. Доступно: ${limitAmount.toLocaleString('ru-RU')} ₽`);
          } else {
            setFromAmountError(null);
          }
        } else {
          setFromAmountError(null);
        }
      }
    },
    [areErrorsVisible, extractedLimits]
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
            { title: 'Комиссия сети', description: networkFee !== null ? `${valueMask(networkFee)} USDT` : 'Загрузка...' },
          ],
        }]} />
      <ExchangeStatusModal
        isOpen={isStatusModalOpen}
        onOpenChange={setIsStatusModalOpen}
        fromAmount={fromAmount}
        fromCurrency={fromCurrency}
        toAmount={toAmount}
        toCurrency={toCurrency}
        paymentMethod={paymentMethod?.name}
        usdtAddress={usdtAddress}
        isRubToUsdt
        paymentLink={orderResponse?.payment_url}
        finalAmount={Number(toAmount)}
      />
      <PageHeader>Мгновенный обмен</PageHeader>
      <p className="text-muted-foreground -mt-24 mb-16">
        Мгновенная покупка USDT без посредников
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
                  <Image src="/images/icons/rub.svg" alt="RUB" width={20} height={20} />
                  {fromCurrency}
                </span>
              </div>
            </div>

            <p className={clsx("h-13 text-xs -mt-4 text-red-500 px-16 opacity-0 transition-opacity duration-500", { "[&]:opacity-100": fromAmountError && areErrorsVisible })}>
              {fromAmountError}
            </p>

          </div>


          <div className="bg-card p-16 rounded-xl border mt-8">
            <p className="text-xs text-muted-foreground mb-4">Вы получаете</p>
            <div className="flex items-center justify-between gap-8">
              <Input
                trackingLabel="Сумма получения"
                type="text"
                placeholder={valueMask(Number((1000 / (rateData?.rub_usdt_rate || 1) - (rateData?.network_fee_usdt ?? 0)).toFixed(2)))}
                value={toAmountFormatted}
                onChange={handleToAmountChange}
                onKeyDown={handleToAmountKeyDown}
                className="text-2xl font-bold border-none rounded-[12px] p-0 focus-visible:ring-0 placeholder:text-muted-foreground [&]:bg-white"
              />
              <span className="flex items-center gap-6 text-sm font-semibold text-foreground py-8 px-14 rounded-[12px]">
                <Image src="/images/icons/usdt.svg" alt="USDT" width={20} height={20} />
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
            <Label htmlFor="payment-method">Способ оплаты</Label>
            <BaseSelect
              options={rateData?.payment_ways || []}
              value={paymentMethod}
              onChange={handlePaymentMethodSelect}
              isOpen={isPaymentMethodOpen}
              onOpenChange={setIsPaymentMethodOpen}
              disabled={!rateData?.payment_ways?.length}
              searchValue={paymentMethodSearch}
              filterOptions={filterPaymentOptions}
              renderTrigger={({ isOpen }) => (
                <div
                  className="relative w-full flex items-center justify-between px-16 py-10 rounded-full border border-[var(--border-placeholder)] bg-[var(--background-secondary)] text-13 transition-all duration-500"
                >
                  {!paymentMethodSearch && (
                    <div className="absolute left-16 pointer-events-none text-16 text-[var(--text-main)]">
                      Выберите способ оплаты
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
          <div className="grid gap-8">
            <Label htmlFor="usdt-address">Адрес USDT TRC20</Label>
            <InputWrapper error={usdtAddressError && areErrorsVisible ? usdtAddressError : null}>
              <Input
                trackingLabel="Адрес кошелька"
                className="border border-[var(--border-placeholder)] rounded-[21px] bg-[var(--background-secondary)] text-16 leading-normal px-18 py-13 pr-30 w-full"
                type="text"
                placeholder="Адрес кошелька в сети TRC20"
                value={usdtAddress}
                onChange={(e) => {
                  setUsdtAddress(e.target.value);
                  if (areErrorsVisible) {
                    setUsdtAddressError(null);
                  }
                }}
              />
            </InputWrapper>
          </div>
        </div>
      </div>

      {/* Network Fee Block */}
      <div className="mb-16 bg-card border rounded-lg p-16">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Комиссия сети
          </span>
          <div className="text-right">
            {networkFee !== null ? (
              <span className="text-sm font-semibold text-foreground">
                {valueMask(networkFee)} USDT
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">
                Загрузка...
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-16 bg-card border rounded-lg p-12 py-12 flex items-center justify-between gap-12">
        <div className="flex items-center gap-12">
          {kycStatus === 'True' && <ShieldCheck className="h-20 w-20 text-accent" />}
          {kycStatus === 'False' && <ShieldX className="h-20 w-20 text-red-500" />}
          {kycStatus === 'InProcess' && <ShieldQuestion className="h-20 w-20 amber-500" />}
          <div className="flex flex-col justify-center gap-5">
            <span className="text-sm font-medium text-foreground">
              {kycStatus === 'True' && "Верификация пройдена"}
              {kycStatus === 'False' && "Верификация не пройдена"}
              {kycStatus === 'InProcess' && "Верификация в процессе"}
            </span>
            {kycStatus !== 'True' && <span className="text-xs font-normal text-muted-foreground">
              Мгновенная покупка USDT недоступна
            </span>}
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

      {kycStatus === 'False' && (
        <div className="mb-16">
          <Link href="/kyc">
            <Button
              variant="default"
              className="w-full h-48 text-base font-bold flex items-center justify-center gap-2"
            >
              Пройти верификацию
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      )}

      <div>
        <Button
          onClick={handleExchange}
          className="w-full h-48 text-base font-bold"
          disabled={
            kycStatus !== 'True' || (!!fromAmountError && areErrorsVisible) ||
            !fromAmount ||
            !toAmount ||
            !usdtAddress ||
            !rateData?.rub_usdt_rate ||
            (extractedLimits?.exchangeCountLeft !== null && extractedLimits?.exchangeCountLeft !== undefined && extractedLimits.exchangeCountLeft <= 0)
          }
        >
          Обменять
        </Button>
        {extractedLimits?.exchangeCountLeft !== null &&
          extractedLimits?.exchangeCountLeft !== undefined &&
          extractedLimits.exchangeCountLeft <= 0 && (
            <p className="text-sm text-red-500 mt-8 text-center">
              Исчерпан лимит на количество обменов. Попробуйте позже.
            </p>
          )}
      </div>
    </div>
  );
}
