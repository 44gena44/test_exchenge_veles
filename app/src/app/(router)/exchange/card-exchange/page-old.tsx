"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Landmark, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { LimitsModal } from "@/components/limits-modal";
import { useServerAction } from "@/shared/lib";
import { getFastExchangeRateAction, getLimitsInfoAction } from "@/d__features/mockApi/api/actions";
import { getDirectionInitialDataAction } from "@/d__features/exchange/api/actions/getDirectionInitialDataAction";
import { useAppSelector } from "@/shared/model/store";
import { setGetFastExchangeRateLoading, setGetLimitsInfoLoading } from "@/d__features/mockApi/model/store/mockApiLoadingReducer";
import { setGetDirectionInitialDataLoading } from "@/d__features/exchange/model/store/reducer/exchangeApiLoadingReducer";

const formatRate = (rate: number | null | undefined): string => {
  if (!rate) return "Загрузка...";
  return `1 USDT ≈ ${rate.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽`;
};

const exchangeTypesConfig = [
  {
    id: "instant",
    title: "Мгновенная покупка USDT",
    description: "Покупайте USDT в несколько кликов от 1.000 рублей.",
    kyc: "KYC Обязателен",
    price: "от 1 000 ₽",
    time: "3 мин",
    icon: Zap,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    href: "/exchange/instant",
  },
  {
    id: "p2p",
    title: "Обмен любой суммы без лимитов и ограничений",
    description: "Обмен любой суммы без лимитов и ограничений через оператора.",
    kyc: "KYC по запросу",
    price: "от 800 USDT",
    time: "30 мин",
    icon: Landmark,
    iconBg: "bg-zinc-900",
    iconColor: "text-white",
    href: "/exchange/type?direction=COIN_BANK",
  },
];

export default function ExchangeTypePage() {
  const [isInstantLimitsModalOpen, setIsInstantLimitsModalOpen] = React.useState(false);

  const [getFastRate, fastRateData] = useServerAction({
    action: getFastExchangeRateAction,
    loadingAction: setGetFastExchangeRateLoading,
  });
  const [getInitialData, initialData] = useServerAction({
    action: getDirectionInitialDataAction,
    loadingAction: setGetDirectionInitialDataLoading,
  });

  const [getLimits, limitsData] = useServerAction({
    action: getLimitsInfoAction,
    loadingAction: setGetLimitsInfoLoading,
  });

  const userId = useAppSelector(state => state.user.id)

  React.useEffect(() => {
    if (userId) {
      getLimits({ user_id: userId });
    }
  }, [userId])

  React.useEffect(() => {
    getFastRate(undefined);
    getInitialData("COIN - BANK");

    const intervalId = setInterval(() => {
      getFastRate(undefined);
      getInitialData("COIN - BANK");
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const instantRate = fastRateData?.rub_usdt_rate ?? null;
  const p2pRate = initialData?.rate?.course ?? null;

  const getRate = (id: string): string => {
    if (id === "instant") {
      return formatRate(instantRate);
    }
    if (id === "p2p") {
      return formatRate(p2pRate);
    }
    return "Загрузка...";
  };




  return (
    <div className="w-full">
      <LimitsModal additionalData={[{
        ignoreParseDesc: true,
        info_list: [
          { title: 'Минимальная сумма', description: `${(1000).toLocaleString('ru-RU')} ₽` },
          { title: 'Комиссия', description: '1–2 USDT' },
          { title: '', description: 'Точная сумма будет рассчитана после ввода адреса кошелька' },
        ],
      }]} limitsInfo={limitsData ?? undefined} isOpen={isInstantLimitsModalOpen} onOpenChange={setIsInstantLimitsModalOpen} />
      <PageHeader>Выберите способ</PageHeader>
      <div className="grid gap-24">
        {exchangeTypesConfig.map((type) => (
          <div key={type.title} className="bg-white rounded-[32px] p-24 shadow-sm border border-zinc-100 flex flex-col gap-24 relative">
            <div className="flex justify-between items-start">
              <div className={`w-48 h-48 rounded-full flex items-center justify-center ${type.iconBg}`}>
                <type.icon className={`h-24 w-24 ${type.iconColor}`} />
              </div>
              <div className="flex gap-8">
                <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 hover:bg-zinc-100 rounded-lg px-12 py-4 text-[10px] font-bold uppercase tracking-wider border-none">
                  {type.kyc}
                </Badge>
              </div>
            </div>

            <div className="space-y-16">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900 leading-tight">
                  {type.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-16 pt-8">
                <div className="flex items-center gap-8">
                  <TrendingUp className="h-16 w-16 text-zinc-400" />
                  <span className="text-sm font-semibold text-zinc-600">{getRate(type.id)}</span>
                </div>
                <div className="flex items-center gap-8">
                  <Clock className="h-16 w-16 text-zinc-400" />
                  <span className="text-sm font-semibold text-zinc-600">{type.time}</span>
                </div>
              </div>

              <p className="text-sm text-zinc-500 leading-relaxed">
                {type.description}
              </p>
            </div>

            <div className="pt-24 border-t border-zinc-100 flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <div className="flex items-center gap-8">
                  <span className="text-lg font-bold text-zinc-900">{type.price}</span>
                  <button
                    onClick={() => type.id === 'instant' ? setIsInstantLimitsModalOpen(true) : ''}
                    className="text-[10px] text-zinc-400 font-semibold hover:text-zinc-600 transition-colors underline underline-offset-2 decoration-zinc-300"
                  >
                    Подробнее
                  </button>
                </div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Лимит</span>
              </div>
              <Link href={type.href}>
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-24 h-44 font-bold">
                  Перейти
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
