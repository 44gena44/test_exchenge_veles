"use client";

import Link from "next/link";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  MessageSquare,
  Rocket,
  ShieldCheck,
  ShieldQuestion,
  ShieldX,
  TrendingUp,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { quickActions, exchangeRatesCarousel, newsItems } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useServerAction } from "@/shared/lib";
import {
  getNewsAction,
  getRateDisplayAction,
} from "@/d__features/mockApi/api/actions";
import { useCallSupport } from "@/d__features/support/lib";
import EmailModal from "@/c__widgets/emailmodal/ui";
import AgreementModal from "@/c__widgets/agreementModal/ui";
import { useAppSelector } from "@/shared/model/store";
import { NewsItem, RateDisplayItem } from "@/shared/model/api";

const userProfileImage = PlaceHolderImages.find(
  (img) => img.id === "user-profile"
);

type RateCard = {
  id: number | string;
  title: string;
  currency_get?: string;
  currency_give?: string | null;
  description?: string;
  weight?: number
};

const parseRateDescription = (description?: string) => {
  if (!description) return { buy: undefined, sell: undefined };
  const buyMatch = description.match(/Покупка\s+([\d.,]+)\s*₽/i);
  const sellMatch = description.match(/продажа\s+([\d.,]+)\s*₽/i);
  return {
    buy: buyMatch?.[1],
    sell: sellMatch?.[1],
  };
};

const Header = ({ kycStatus }: { kycStatus?: 'False' | 'True' | 'InProcess' }) => {

   const realProfilePicture = useAppSelector(state => state.user.data?.user_data?.profile_picture)

  // Состояние для плавной анимации появления фото профиля
  const [showRealPhoto, setShowRealPhoto] = React.useState(false)

  React.useEffect(() => {
    if (realProfilePicture) {
      // Небольшая задержка перед показом для плавной анимации
      const timer = setTimeout(() => setShowRealPhoto(true), 100)
      return () => clearTimeout(timer)
    } else {
      setShowRealPhoto(false)
    }
  }, [realProfilePicture])
  return (
    <header className="mb-32 p-24 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/18 text-foreground">
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-start gap-8">
          <Image
            src="/images/icons/veles-symbol.png"
            alt="Veles"
            width={52}
            height={52}
            className="w-52 h-52 object-contain"
          />
          <div className="leading-[0.86] brand-wordmark text-primary">
            <h1 className="text-[40px] md:text-[46px] font-extrabold">VELES</h1>
            <h1 className="text-[40px] md:text-[46px] font-extrabold mt-2">EXCHENGE</h1>
          </div>
        </div>
        <Link
          href="/profile"
          className="flex items-center gap-8 bg-background/50 rounded-full pl-4 pr-12 py-4 text-sm font-medium min-w-[130px] font-main"
        >
          <div className="relative">
            <Avatar className="h-32 w-32">
            
              <AvatarFallback>
                <User className="h-20 w-20 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            {/* Реальное фото профиля с абсолютным позиционированием и анимацией */}
              <div
                className={`absolute inset-0 rounded-full overflow-hidden transition-opacity duration-500 ease-in-out ${
                  showRealPhoto ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={realProfilePicture}
                  alt="Фото профиля"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.warn('Failed to load profile picture:', realProfilePicture)
                    setShowRealPhoto(false)
                  }}
                />
              </div>
          </div>
          <div className="flex items-center gap-4">
          {kycStatus === 'True' && <><ShieldCheck className="h-16 w-16 text-accent" /><span>Verified</span></>}
          {kycStatus === 'False' && <><ShieldX className="h-16 w-16 text-red-500" /><span>Not verified</span></>}
          {kycStatus === 'InProcess' && <><ShieldQuestion className="h-16 w-16 text-amber-500" /><span>KYC in process</span></>}
          </div>
        </Link>
      </div>
      <p className="text-muted-foreground mt-8 font-main">
        Сервис, которым ты всегда хотел пользоваться.
      </p>

      <div className="mt-16 flex items-center gap-8 flex-wrap">
        <div className="inline-flex items-center gap-8 text-sm font-medium text-foreground bg-background/50 rounded-full px-12 py-4">
          <Rocket className="h-16 w-16 text-primary" />
          <span className="text-xs">Быстрый обмен</span>
        </div>
        <div
          className="inline-flex items-center gap-8 text-sm font-medium text-foreground bg-background/50 rounded-full px-12 py-4"
        >
          <ShieldCheck className="h-16 w-16 text-accent" />
          <span className="text-xs">Безопасность</span>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-2 gap-12">
        <Link href="/exchange" className="w-full">
          <Button className="w-full h-44 text-base font-bold hover:bg-primary/90">Начать обмен</Button>
        </Link>
        <Link href="/faq">
          <Button
            variant="secondary"
            className="w-full h-44 text-base font-bold bg-foreground/10 hover:bg-foreground/20 text-foreground"
          >
            Поддержка
          </Button>
        </Link>
      </div>
    </header>
  )
};

// Скелетон компонент для элементов карусели
const RateSkeleton = () => (
  <CarouselItem>
    <div className="bg-card border p-16 rounded-2xl animate-pulse h-[150px]">
      <div className="flex justify-between items-center mb-8">
        <div className="h-6 bg-muted rounded w-32"></div>
      </div>
      <div className="h-4 bg-muted rounded w-48 mb-16"></div>
      <div className="grid grid-cols-2 gap-16">
        <div className="flex items-center gap-12">
          <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center">
            <div className="w-20 h-20 bg-muted-foreground/20 rounded"></div>
          </div>
          <div>
            <div className="h-3 bg-muted rounded w-16 mb-2"></div>
            <div className="h-6 bg-muted rounded w-20"></div>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center">
            <div className="w-20 h-20 bg-muted-foreground/20 rounded"></div>
          </div>
          <div>
            <div className="h-3 bg-muted rounded w-16 mb-2"></div>
            <div className="h-6 bg-muted rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  </CarouselItem>
);

const RatesCarousel = ({ rates }: { rates?: RateDisplayItem[] | null }) => (
  <div className="mb-32">
    <Carousel
      opts={{
        align: "start",
        loop: Boolean(rates && rates.length > 1),
      }}
      plugins={rates && rates.length > 1 ? [
        Autoplay({
          delay: 5000,
        }),
      ] : []}
    >
      <CarouselContent>
        {rates && rates.length > 0 ? (
          rates.map((rate) => (
            <CarouselItem key={rate.id}>
              <div className="bg-card border p-16 rounded-2xl transition-all duration-300 ease-in-out">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-semibold">{rate.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-16">{rate.description}</p>
                <div className="grid grid-cols-2 gap-16">
                  <div className="flex items-center gap-12">
                    <div className="w-40 h-40 rounded-full bg-accent/15 flex items-center justify-center">
                      <ArrowDown className="h-20 w-20 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Покупка</p>
                      <p className="font-bold text-lg">{rate.currency_give ?? "—"}</p>
                    </div>
                  </div>
                  {rate.currency_get && (
                    <div className="flex items-center gap-12">
                      <div className="w-40 h-40 rounded-full bg-primary/15 flex items-center justify-center">
                        <ArrowUp className="h-20 w-20 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Продажа</p>
                        <p className="font-bold text-lg">{rate.currency_get}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))
        ) : (
          // Показываем 3 скелетона пока данные загружаются
          Array.from({ length: 3 }, (_, index) => (
            <RateSkeleton key={`skeleton-${index}`} />
          ))
        )}
      </CarouselContent>
    </Carousel>
  </div>
);

const QuickActions = () => (
  <div className="mb-32">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
      {quickActions.map((action) => (
        <Link
          href={action.href}
          key={action.title}
          className="flex flex-col items-center justify-center p-8 rounded-2xl gap-8 transition-colors bg-gradient-to-r from-primary/20 to-accent/18 hover:opacity-90"
        >
          <div className="h-40 w-40 flex items-center justify-center rounded-xl bg-background/50">
            <action.icon className="h-20 w-20" style={{ color: action.color }} />
          </div>
          <span className="text-xs font-medium text-center text-foreground max-w-100">
            {action.title}
          </span>
        </Link>
      ))}
    </div>
  </div>
);

const NewsCarousel = ({
  items,
}: {
  items:NewsItem[] | null;
}) => (
  <div className="mb-24">
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {items?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="bg-primary/10 p-16 rounded-2xl text-primary-foreground relative overflow-hidden flex items-center gap-16">
              <div className="absolute top-8 right-8 bg-primary/20 px-8 py-2 rounded-full text-xs font-medium flex items-center gap-4">
                {item.label}
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-4">
                  {item.description}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </div>
);

const AskQuestionButton = ({ onClick }: { onClick: () => void }) => {

  const {callSupport} = useCallSupport()

  return (
    <div className="mt-32">
        <Button onClick={callSupport}
          className="w-full h-56 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <MessageSquare className="mr-8 h-20 w-20" />
          Задать вопрос
        </Button>
    </div>
  )
};

export default function HomePage() {
  const [getRates, ratesResponse] = useServerAction({
    action: getRateDisplayAction,
  });
  const [getNews, newsResponse] = useServerAction({
    action: getNewsAction,
  });

  const { callSupport } = useCallSupport();

  const kycStatus = useAppSelector(state => state.user.data?.user_data?.kyc_verified)
  const realProfilePicture = useAppSelector(state => state.user.data?.user_data?.profile_picture)

  // Состояние для плавной анимации появления фото профиля
  const [showRealPhoto, setShowRealPhoto] = React.useState(false)

  React.useEffect(() => {
    getRates(undefined);
    getNews(undefined);
  }, []);

  React.useEffect(() => {
    if (realProfilePicture) {
      // Небольшая задержка перед показом для плавной анимации
      const timer = setTimeout(() => setShowRealPhoto(true), 100)
      return () => clearTimeout(timer)
    } else {
      setShowRealPhoto(false)
    }
  }, [realProfilePicture])



  return (
    <div className="w-full pb-30">
      <Header kycStatus={kycStatus} />
      <RatesCarousel rates={ratesResponse} />
      <QuickActions />
      <NewsCarousel items={newsResponse} />
      <AskQuestionButton onClick={callSupport} />
      <EmailModal />
      <AgreementModal />
    </div>
  );
}
