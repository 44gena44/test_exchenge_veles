"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  FileClock,
  Info,
  Repeat,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { LimitsModal } from "@/components/limits-modal";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useServerAction, validateEmail } from "@/shared/lib";
import {
  getLimitsInfoAction,
} from "@/d__features/mockApi/api/actions";
import { updateUserDataAction } from "@/d__features/userDataDisplay/api";
import {
  setUpdateUserDataLoading,
  updateUserProfileData,
} from "@/d__features/userDataDisplay/model";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import type { UserUpdateCreateApiArg } from "@/shared/model/api";

const userProfileImage = PlaceHolderImages.find(
  (img) => img.id === "user-profile"
);

const ProfileHeader = ({
  name,
  subtitle,
}: {
  name: string;
  subtitle: string;
}) => {

  const profileImage = useAppSelector(state => state.user.data?.user_data?.profile_picture)

  return (
    <div className="flex flex-col items-center text-center mb-32">
      <Avatar className="h-96 w-96 mb-16 border-4 border-background ring-2 ring-primary">
        {userProfileImage && (
          <AvatarImage
            src={profileImage}
            alt={'Аватар пользователя'}
            data-ai-hint={userProfileImage.imageHint}
          />
        )}
        <AvatarFallback>
          <User className="h-48 w-48 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  )
};

const VerificationStatus = ({ kycStatus }: { kycStatus?: 'False' | 'True' | 'InProcess' }) => {
  const isClickable = kycStatus === 'False';

  const cardContent = (
    <Card className={`p-16 ${isClickable ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          {kycStatus === 'True' && <CheckCircle2 className="h-20 w-20 text-accent" />}
          {kycStatus === 'False' && <Info className="h-20 w-20 text-red-500" />}
          {kycStatus === 'InProcess' && <FileClock className="h-20 w-20 amber-500" />}
          <div>
            <h3 className="font-semibold text-foreground">
              {kycStatus === 'True' && "Верификация пройдена"}
              {kycStatus === 'False' && "Верификация не пройдена"}
              {kycStatus === 'InProcess' && "Верификация в процессе"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Для мгновенной покупки USDT
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8">
        {kycStatus === 'False' &&  <ChevronRight className={`h-20 w-20 ${isClickable ? 'text-muted-foreground' : 'text-muted-foreground/50'}`} />}
        </div>
      </div>
    </Card>
  );

  return isClickable ? (
    <Link className="mb-16 block" href="/kyc">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

const TariffsAndLimits = ({ onOpen }: { onOpen: () => void }) => (
  <Card
    onClick={onOpen}
    className="flex items-center justify-between p-16 cursor-pointer hover:bg-muted/50 transition-colors"
  >
    <h3 className="font-semibold text-foreground">Тарифы и лимиты</h3>
    <div className="flex items-center gap-8">
      <p className="text-sm text-muted-foreground">Подробнее</p>
      <ChevronRight className="h-20 w-20 text-muted-foreground" />
    </div>
  </Card>
);

const EmailBinding = ({
  email,
  onChange,
  onSubmit,
  isLoading,
  message,
}: {
  email: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  message?: { text: string; tone: "success" | "error" } | null;
}) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground mb-8">
        Привязка почты
      </h3>
      <Card className="p-16">
        <div className="flex items-center gap-8">
          <Input
            type="email"
            placeholder="example@gmail.com"
            className="flex-grow"
            value={email}
            onChange={(event) => onChange(event.target.value)}
          />
          <Button onClick={onSubmit} disabled={!email || isLoading}>
            Привязать
          </Button>
        </div>
        {message && (
          <p
            className={`text-xs mt-8 ${message.tone === "success" ? "text-accent" : "text-destructive"
              }`}
          >
            {message.text}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-8">
          Привяжите почту для получения уведомлений об операциях
        </p>
      </Card>
    </div>
  )
};

const Stats = ({ total, volume }: { total: number; volume: string }) => (
  <div>
    <h3 className="text-sm font-semibold text-muted-foreground mb-8">
      Статистика
    </h3>
    <Card className="p-16">
      <div className="grid grid-cols-2 divide-x divide-border">
        <div className="px-16 text-center">
          <BarChart3 className="h-24 w-24 mx-auto text-primary mb-4" />
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-xs text-muted-foreground">обменов</p>
        </div>
        <div className="px-16 text-center">
          <Repeat className="h-24 w-24 mx-auto text-primary mb-4" />
          <p className="text-2xl font-bold">{volume}</p>
          <p className="text-xs text-muted-foreground">объем</p>
        </div>
      </div>
    </Card>
  </div>
);

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { id: userId, data } = useAppSelector((state) => state.user);
  const isUpdatingEmail = useAppSelector(
    (state) => state.userApiLoading.isUpdateUserDataActionLoading
  );
  const initData = useAppSelector((state) => state.user.initData);

  const [isLimitsModalOpen, setIsLimitsModalOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState<{
    text: string;
    tone: "success" | "error";
  } | null>(null);

  const [getLimits, limitsInfo] = useServerAction({
    action: getLimitsInfoAction,
  });


  const [updateUser, response, updateError] = useServerAction({
    action: updateUserDataAction,
    loadingAction: setUpdateUserDataLoading,
  });

  const kycStatus = useAppSelector(state => state.user.data?.user_data?.kyc_verified)


  React.useEffect(() => {
    if (userId) {
      getLimits({ user_id: userId });
    }
  }, [userId]);

  React.useEffect(() => {
    setEmail(data?.user_data?.email ?? "");
  }, [data?.user_data?.email]);


  const handleEmailSubmit = () => {

    const mailError = validateEmail(email)
    if (mailError.error) {
      setMessage({ text: mailError.error, tone: 'error' })
      return
    } else {
      setMessage({ text: "Почта успешно привязана", tone: "success" });

    }


    if (!userId) return;
    const updateUserMutationArgs: UserUpdateCreateApiArg = {
      user_id: userId,
      email,
      initData,
    };
    updateUser(updateUserMutationArgs);
  };

  const userName = data?.user_data?.name ?? "Пользователь";
  const subtitle = data?.user_data?.email
    ? data.user_data.email
    : userId
      ? `@user_${userId}`
      : "@guest";
  const totalUsdt = (data?.requests_all ?? []).reduce((sum, request) => {
    const give =
      request.currency_give?.name === "USDT" ? request.currency_give.amount : 0;
    const get =
      request.currency_get?.name === "USDT" ? request.currency_get.amount : 0;
    return sum + (give ?? 0) + (get ?? 0);
  }, 0);
  const volumeLabel =
    totalUsdt > 0
      ? `${totalUsdt.toLocaleString("ru-RU", {
        maximumFractionDigits: 2,
      })} USDT`
      : "—";

  return (
    <div className="w-full">
      <LimitsModal
       additionalData={[{
        ignoreParseDesc: true,
        info_list: [
          { title: 'Минимальная сумма', description: `${(1000).toLocaleString('ru-RU')} ₽` },
          { title: 'Комиссия', description: '1–2 USDT' },
          { title: '', description: 'Точная сумма будет рассчитана после ввода адреса кошелька' },
        ],
      }]} 
        isOpen={isLimitsModalOpen}
        onOpenChange={setIsLimitsModalOpen}
        limitsInfo={limitsInfo ?? undefined}
      />
      <PageHeader className="text-center">Профиль</PageHeader>
      <ProfileHeader name={userName} subtitle={subtitle} />
      <div className="space-y-16">
        <VerificationStatus kycStatus={kycStatus} />
        <TariffsAndLimits onOpen={() => setIsLimitsModalOpen(true)} />
        <EmailBinding
          email={email}
          onChange={setEmail}
          onSubmit={handleEmailSubmit}
          isLoading={isUpdatingEmail}
          message={message}
        />
        {/* <Stats total={totalExchanges} volume={volumeLabel} /> */}
      </div>
    </div>
  );
}
