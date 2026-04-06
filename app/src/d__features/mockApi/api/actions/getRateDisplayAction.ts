"use server";

import { RateDisplayApiResponse } from "@/shared/model/api";

export async function getRateDisplayAction(): Promise<RateDisplayApiResponse> {
  const demoBaseRates = [
    { id: 1, title: "Курс USDT", description: "Классический обмен" },
    { id: 2, title: "Курс USDT", description: "Наличный обмен" },
    { id: 3, title: "Курс USDT", description: "Мгновенная покупка USDT" },
  ];

  return demoBaseRates.map((item, index) => {
    const buyRate = Number((76 + Math.random() * 8).toFixed(2));
    const sellRate = Number((buyRate - (0.6 + Math.random() * 1.5)).toFixed(2));

    return {
      id: item.id,
      weight: index + 1,
      title: item.title,
      description: item.description,
      currency_give: `${buyRate.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽`,
      currency_get: `${Math.max(sellRate, 70).toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽`,
    };
  });
}
