"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, History } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { popularServices } from "@/lib/data";
import { useAppSelector } from "@/shared/model/store";
import { useServerAction } from "@/shared/lib";
import { getFastExchangeHistoryAction } from "@/d__features/mockApi/api/actions";

const ServiceCard = ({
  service,
}: {
  service: (typeof popularServices)[0];
}) => {
  return (
    <Link href={service.href}>
      <div className="relative rounded-2xl overflow-hidden mb-16 h-128 group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/18 p-20 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground">
              {service.title}
            </h3>
            <p className="text-sm text-foreground/80">{service.description}</p>
          </div>
          <div className="flex items-center text-foreground/90 font-medium text-sm">
            <span>Перейти</span>
            <ChevronRight className="h-16 w-16 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const TradeSummary = ({
  p2pCount,
  fastCount,
}: {
  p2pCount: number;
  fastCount: number;
}) => {
  const totalCount = p2pCount + fastCount;

  return (
    <Link href="/history">
      <div className="bg-card p-16 rounded-2xl mt-32 flex items-center justify-between border hover:bg-muted/50 transition-colors cursor-pointer">
        <div className="flex items-center gap-12">
          <History className="h-24 w-24 text-primary" />
          <div>
            <p className="text-sm font-semibold">История сделок</p>
            {/* <p className="text-xs text-muted-foreground">за последний месяц</p> */}
          </div>
        </div>
        <div className="text-right flex items-center gap-8">
          {/* <div>
            <p className="text-sm font-bold">{totalCount} обменов</p>
            <p className="text-xs text-muted-foreground">
              P2P: {p2pCount} · Мгновенные: {fastCount}
            </p>
          </div> */}
          <ChevronRight className="h-20 w-20 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );
};

export default function ExchangePage() {
  const p2pCount =
    useAppSelector((state) => state.user.data?.requests_all?.length) ?? 0;
  const [getFastHistory, fastHistory] = useServerAction({
    action: getFastExchangeHistoryAction,
  });

  const userId = useAppSelector(state => state.user.id)

  React.useEffect(() => {
    if (userId)
    getFastHistory(userId);
  }, [userId]);

  const fastCount = fastHistory?.transactions?.length ?? 0;

  return (
    <div className="w-full">
      <PageHeader>Обмен</PageHeader>
      <div className="flex flex-col">
        {popularServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <TradeSummary p2pCount={p2pCount} fastCount={fastCount} />
    </div>
  );
}
