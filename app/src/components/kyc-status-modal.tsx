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
import { CheckCircle2, Clock } from 'lucide-react';
import { Separator } from './ui/separator';

const verificationItems = [
    { id: 'passport', label: 'Фото паспорта' },
    { id: 'selfie', label: 'Селфи' },
    { id: 'phone', label: 'Номер телефона' },
];

export function KycStatusModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background p-24">
        <DialogHeader>
          <div className="flex justify-center items-center h-64 w-64 rounded-full bg-primary/10 mx-auto mb-16">
            <CheckCircle2 className="h-32 w-32 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold text-center">Спасибо!</DialogTitle>
          <DialogDescription className="text-center text-base">
            Ваши документы приняты для верификации
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-16">
            {verificationItems.map((item) => (
                 <div key={item.id} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-8 font-medium text-accent">
                        <CheckCircle2 className="h-16 w-16" />
                    </div>
                </div>
            ))}
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground p-16 bg-muted/50 rounded-lg">
            <p className='flex items-center justify-between gap-8'><Clock className="h-16 w-16" />Пожалуйста, ожидайте. <br/>Верификация занимает не более 20 минут <span className='w-16'/></p>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full" variant="secondary">
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
