"use client";

import * as React from "react";
import { Camera, ChevronRight, ScanFace, ScanLine } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KycStatusModal } from "@/components/kyc-status-modal";
import { useServerAction } from "@/shared/lib";
import { createFastExchangeOrderAction, postProfileKycAction } from "@/d__features/mockApi/api/actions";
import { useRouter } from "next/navigation";
import { setCreateFastExchangeOrderLoading, setPostProfileKycLoading } from "@/d__features/mockApi/model";
import { useAppSelector } from "@/shared/model/store";
import { setKycStatus } from "@/d__features/userDataDisplay/model";

interface KycStepProps {
  icon: React.ElementType;
  title: string;
  description: string | React.ReactNode;
  cameraType?: 'front' | 'back';
  onPhotoTaken: (file: File, stepType: string) => void;
  selectType: string
}

const KycStep = ({
  icon: Icon,
  title,
  description,
  cameraType = 'back',
  selectType,
  onPhotoTaken,
}: KycStepProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [isUploaded, setIsUploaded] = React.useState(false);

  const handleOpenCamera = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Создаем превью
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Передаем файл родителю
      onPhotoTaken(file, selectType);
      setIsUploaded(true);

      // Сбрасываем input для возможности повторной съемки
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card
      className="flex items-center p-16 transition-colors hover:bg-muted/50 cursor-pointer"
      onClick={handleOpenCamera}
    >
      <div className="flex-shrink-0 w-40 h-40 flex items-center justify-center bg-muted rounded-8xl mr-16">
        {photoPreview ? (
          <img
            src={photoPreview}
            alt="Preview"
            className="w-full h-full rounded-8xl object-cover"
          />
        ) : (
          <Icon className="h-24 w-24 text-foreground" />
        )}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <div className="text-sm text-muted-foreground">
          {description}
          {isUploaded && (
            <span className="ml-8 text-accent">✓ Загружено</span>
          )}
        </div>
      </div>
      <ChevronRight className="h-20 w-20 text-muted-foreground ml-16" />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture={cameraType === 'front' ? 'user' : 'environment'}
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Сделать фото для ${title}`}
      />
    </Card>
  );
};

export default function KycPage() {
  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);
  const [submitKyc, kycResponse] = useServerAction({
    action: postProfileKycAction,
    loadingAction: setPostProfileKycLoading
  });

 
  const userId = useAppSelector(state => state.user.id)

  const [photos, setPhotos] = React.useState<Record<string, File>>({});
  const [phoneNumber, setPhoneNumber] = React.useState("");

  React.useEffect(() => {

    if (kycResponse) {
      setIsStatusModalOpen(true);
    }
  }, [kycResponse]);

  const handlePhotoTaken = (file: File, stepType: string) => {
    setPhotos(prev => ({
      ...prev,
      [stepType]: file
    }));
  };

  const router = useRouter()

  const handleSubmit = async () => {
    // Здесь можно отправить все фото и номер телефона на сервер

    const formData = new FormData();

    // Добавляем файлы
    formData.append('pasport_picture_registration', photos.pasport_picture_registration);
    formData.append('pasport_picture_main_page', photos.pasport_picture_main_page);
    formData.append('person_picture', photos.person_picture);
    formData.append('phone', '+7' + phoneNumber);
    if (userId)
    formData.append('user_id', userId.toString());

    // Отправка KYC
    submitKyc(formData);
  };

  React.useEffect(() => {
   if (isStatusModalOpen) {
    return () => {
      setKycStatus('InProcess')
      router.push('/profile')
    }
   }
  }, [isStatusModalOpen])

  const isFormComplete = () => {
    return (
      photos['pasport_picture_main_page'] &&
      photos['pasport_picture_registration'] &&
      photos['person_picture'] &&
      phoneNumber.length >= 10
    );
  };

  return (
    <div className="w-full">
      <KycStatusModal
        isOpen={isStatusModalOpen}
        onOpenChange={setIsStatusModalOpen}
      />
      <PageHeader>Верификация аккаунта</PageHeader>
      <p className="text-muted-foreground mb-32 -mt-16">
        Верифицируйте свой аккаунт для <br />мгновенных обменов без&nbsp;посредников
      </p>

      <div className="space-y-16">
        <KycStep
          icon={ScanFace}
          title="Фото паспорта"
          description="Разворот c фотографией"
          cameraType="back"
          onPhotoTaken={handlePhotoTaken}
          selectType="pasport_picture_main_page"
        />
        <KycStep
          icon={ScanLine}
          title="Фото паспорта"
          description="Разворот с регистрацией"
          cameraType="back"
          onPhotoTaken={handlePhotoTaken}
          selectType="pasport_picture_registration"
        />
        <KycStep
          icon={Camera}
          title="Селфи"
          description="Сделайте свое фото"
          cameraType="front"
          onPhotoTaken={handlePhotoTaken}
          selectType="person_picture"
        />

        <Card className="p-16">
          <div className="grid gap-8">
            <Label htmlFor="phone-number">Номер телефона</Label>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-8 p-8 rounded-4xl bg-muted text-sm">
                <span>🇷🇺</span>
                <span>+7</span>
              </div>
              <Input
                id="phone-number"
                placeholder="(XXX) XXX-XX-XX"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
              />
            </div>
            {phoneNumber.length > 0 && phoneNumber.length < 10 && (
              <p className="text-sm text-red-500 mt-4">
                Введите корректный номер телефона (10 цифр)
              </p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-32">
        <Button
          onClick={handleSubmit}
          className="w-full h-48 text-base font-bold"
          disabled={!isFormComplete()}
        >
          {isFormComplete() ? 'Подтвердить верификацию' : 'Заполните все поля'}
        </Button>

        {!isFormComplete() && (
          <p className="text-sm text-muted-foreground mt-16 text-center">
            Необходимо сделать все 3 фото и указать номер телефона
          </p>
        )}
      </div>
    </div>
  );
}