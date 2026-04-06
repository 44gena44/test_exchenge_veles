
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Zap, Landmark, Info } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { LimitsModal } from "@/components/limits-modal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const SbpLogo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Логотип СБП"
    >
        <path d="M12 78L50 12L88 78H12Z" fill="none" />
        <path d="M50 12L88 78H62L37 34L50 12Z" fill="#F9A825" />
        <path d="M12 78L50 12L63 35L38 78H12Z" fill="#673AB7" />
        <path d="M38 78L63 35L88 78H38Z" fill="#4CAF50" />
        <path d="M18 68L82 34L88 45L24 78L18 68Z" fill="#2196F3" />
    </svg>
);

const formatShortRate = (rate: number | null | undefined): string => {
    if (!rate) return "—";
    const displayRate = rate < 1 ? 1 / rate : rate;
    return displayRate.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatMinAmount = (amount: number | null | undefined): string => {
    if (!amount) return "—";
    return `От ${amount.toLocaleString("ru-RU")}₽`;
};

const getDemoRate = () => Number((76 + Math.random() * 8).toFixed(2));
const getDemoMinAmount = () => (Math.floor(10 + Math.random() * 16) * 1000);

export default function ExchangeTypePage() {
    const [isLimitsModalOpen, setIsLimitsModalOpen] = React.useState(false);
    const [demoRates, setDemoRates] = React.useState(() => ({
        instantRate: getDemoRate(),
        classicBuyRate: getDemoRate(),
        classicSellRate: getDemoRate(),
        classicMinAmount: getDemoMinAmount(),
    }));

    const limitsData = null;

    React.useEffect(() => {
        const updateRates = () => {
            setDemoRates({
                instantRate: getDemoRate(),
                classicBuyRate: getDemoRate(),
                classicSellRate: getDemoRate(),
                classicMinAmount: getDemoMinAmount(),
            });
        };

        updateRates();
        const intervalId = setInterval(updateRates, 12000);

        return () => clearInterval(intervalId);
    }, []);

    const instantRate = demoRates.instantRate;
    const classicBuyRate = demoRates.classicBuyRate;
    const classicSellRate = demoRates.classicSellRate;
    const classicMinAmount = demoRates.classicMinAmount;

    const exchangeTypes = [
        {
            id: "instant",
            title: "Мгновенный",
            description: "Покупка USDT напрямую через СБП в несколько кликов",
            badge: "Мгновенно",
            price: "1 000₽",
            shortRate: formatShortRate(instantRate),
            icon: Zap,
            gradient: "from-zinc-50 to-zinc-100",
            badgeBg: "bg-zinc-200",
            href: "/exchange/instant",
            bgImageId: "sbp-bg",
            limitModalEnabled: true
        },
        {
            id: "limitless",
            title: "Классический",
            description: "Привычный обмен по приятному курсу",
            badge: "Оператор",
            price: classicMinAmount ? `${classicMinAmount.toLocaleString("ru-RU")}₽` : "—",
            shortRate: formatShortRate(classicBuyRate),
            icon: Landmark,
            gradient: "from-primary/15 to-accent/15",
            badgeBg: "bg-primary/20",
            href: '/exchange/type?direction=BANK_COIN',
            bgImageId: "limitless-bg",
            limitModalEnabled: false

        },
    ];

    return (
        <div className="w-full mx-auto">
            <LimitsModal
                additionalData={[{
                    ignoreParseDesc: true,
                    info_list: [
                        { title: 'Минимальная сумма', description: `${(1000).toLocaleString('ru-RU')} ₽` },
                        { title: 'Комиссия', description: '1–2 USDT' },
                        { title: '', description: 'Точная сумма будет рассчитана после ввода адреса кошелька' },
                    ],
                }]}
                limitsInfo={limitsData ?? undefined}
                isOpen={isLimitsModalOpen}
                onOpenChange={setIsLimitsModalOpen}
            />
            <PageHeader className="text-left mb-24">Выберите способ</PageHeader>

            <div className="bg-[#f8f9fb] rounded-[24px] overflow-hidden border border-zinc-100 mb-32 shadow-sm">
                <Table className="pb-10">
                    <TableHeader className="bg-transparent border-none">
                        <TableRow className="border-none hover:bg-transparent">
                            <TableHead className="text-[10px] font-black text-zinc-900 h-40 px-12 uppercase tracking-wider">Обмен</TableHead>
                            <TableHead className="text-[10px] font-black text-zinc-900 h-40 px-4 text-center uppercase tracking-wider">Курс</TableHead>
                            <TableHead className="text-[10px] font-black text-zinc-900 h-40 px-4 text-center uppercase tracking-wider">KYC</TableHead>
                            <TableHead className="text-[10px] font-black text-zinc-900 h-40 px-12 text-right uppercase tracking-wider">Мин</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="border-zinc-50 hover:bg-transparent">
                            <TableCell className="py-12 px-12">
                                <div className="flex items-center gap-6">
                                    <img src="/images/icons/sbp.png" className="h-16 w-16" alt="" />
                                    <span className="text-[12px] font-bold text-zinc-900">Мгновенный</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-[10px] font-bold text-zinc-900 text-center px-4">
                                <div className="flex flex-col gap-4 items-center">
                                    <div className="flex items-center gap-4" title="RUB → USDT">
                                        <span className=" text-accent font-black">{formatShortRate(instantRate)}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-[10px] font-bold text-zinc-500 text-center px-4 leading-tight">Обязательно</TableCell>
                            <TableCell className="text-[12px] font-bold text-zinc-900 text-right px-12 whitespace-nowrap">От 1 000₽</TableCell>
                        </TableRow>
                        <TableRow className="border-none hover:bg-transparent">
                            <TableCell className="py-12 px-12">
                                <div className="flex items-center gap-6">
                                    <Landmark className="h-12 w-12 text-primary" />
                                    <span className="text-[12px] font-bold text-zinc-900">Классический</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-[10px] font-bold text-zinc-900 text-center px-4">
                                <div className="flex flex-col gap-6 items-center">
                                    <div className="flex items-center gap-4" title="RUB → USDT">
                                        <span className=" text-accent font-black">{formatShortRate(classicBuyRate)}</span>
                                    </div>
                                    <div className="flex items-center gap-4" title="USDT → RUB">
                                        <span className="text-primary font-black">{formatShortRate(classicSellRate)}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-[10px] font-bold text-zinc-500 text-center px-4 leading-tight">По запросу</TableCell>
                            <TableCell className="text-[12px] font-bold text-zinc-900 text-right px-12 whitespace-nowrap">{formatMinAmount(classicMinAmount)}</TableCell>
                        </TableRow>
                        <TableRow><TableCell className="h-5"></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-40">
                {exchangeTypes.map((type) => {
                    const bgImage = PlaceHolderImages.find(img => img.id === type.bgImageId);

                    return (
                        <div key={type.id} className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-zinc-100 flex flex-col h-full">
                            <div className={cn("p-16 pb-24 bg-gradient-to-b relative overflow-hidden min-h-[120px] flex flex-col justify-end", type.gradient)}>
                                {bgImage && (
                                    <div className="absolute inset-0 opacity-15 pointer-events-none">
                                        <Image
                                            src={bgImage.imageUrl}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            data-ai-hint={bgImage.imageHint}
                                        />
                                    </div>
                                )}
                                <div className={cn("inline-flex items-center px-8 py-2 rounded-full text-[9px] font-bold text-zinc-700 mb-auto relative z-10 w-fit", type.badgeBg)}>
                                    {type.badge}
                                </div>

                                <div className="space-y-2 relative z-10">
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-2xl font-black text-zinc-900 tracking-tighter">{type.shortRate}</span>
                                        <span className="text-xs font-bold text-zinc-600">₽</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Курс RUB-USDT</p>
                                </div>
                            </div>

                            <div className="p-12 pt-16 flex flex-col flex-grow justify-between gap-16">
                                <div className="space-y-12">
                                    <div className="min-h-[56px]">
                                        <h3 className="text-[14px] font-bold text-zinc-900 leading-tight">
                                            {type.title}
                                        </h3>
                                        <p className="text-[10px] text-zinc-600 font-bold leading-tight mt-4">
                                            {type.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between group">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black text-zinc-900">{type.price}</span>
                                            <span className="text-[8px] text-zinc-500 font-black uppercase tracking-wider">Мин. сумма</span>
                                        </div>
                                        {type.limitModalEnabled && <button
                                            onClick={() => setIsLimitsModalOpen(true)}
                                            aria-label="Подробнее о лимитах"
                                            className="w-44 h-44 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors border border-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-900"
                                        >
                                            <Info className="h-20 w-20" />
                                        </button>}
                                    </div>
                                </div>

                                <Link href={type.href} className="block w-full">
                                    <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-[16px] h-44 text-[12px] font-black shadow-md shadow-zinc-100 transition-all active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-zinc-900">
                                        Перейти
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
