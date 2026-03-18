"use client";

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SendUsdtModal({
  isOpen,
  onOpenChange,
  onConfirm
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  const { toast } = useToast();
  const usdtAddress = "TQ1a1zP1eP5QG9aF2b9C3d8e6f4g7h8i9"; // Dummy address
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${usdtAddress}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(usdtAddress).then(() => {
      toast({
        description: "Адрес скопирован в буфер обмена.",
      });
    }, (err) => {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось скопировать адрес.",
      });
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Оправьте USDT</DialogTitle>
          <DialogDescription className="text-center">
            Отправьте USDT по данному адресу
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-4 py-4">
            <div className="p-2 border rounded-lg bg-white">
                <Image
                    src={qrCodeUrl}
                    alt="QR-код для адреса USDT"
                    width={200}
                    height={200}
                />
            </div>
            <div className="w-full text-center p-3 bg-muted rounded-lg flex items-center justify-between">
                <p className="text-sm font-mono break-all text-muted-foreground">{usdtAddress}</p>
                <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
                Сеть: USDT TRC20
            </p>
        </div>

        <DialogFooter>
          <Button onClick={onConfirm} className="w-full h-12 text-base font-bold">
            Я отправил
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
