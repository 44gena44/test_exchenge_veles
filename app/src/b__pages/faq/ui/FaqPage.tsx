"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, MessageSquare, Repeat, Send, Shield } from "lucide-react";
import { faqData } from "@/lib/data";
import { useServerAction } from "@/shared/lib";
import { getFaqsAction } from "@/d__features/exchange/api";
import { typograf } from "@/shared/lib/string/typograf";
import { useAppDispatch } from "@/shared/model/store";
import { setPageName } from "@/shared/model/store/reducers/uiReducer";
import { useCallSupport } from "@/d__features/support/lib";

const SupportHeader = () => (
  <div className="text-center mb-32">
    <div className="inline-flex items-center justify-center bg-primary/10 text-primary h-64 w-64 rounded-full mb-16">
      <MessageSquare className="h-32 w-32" />
    </div>
    <h1 className="text-3xl font-bold text-foreground">Поддержка</h1>
    <p className="text-muted-foreground">Мы всегда готовы помочь</p>
  </div>
);

const StatsCard = () => (
  <Card className="p-16 mb-32">
    <div className="grid grid-cols-3 divide-x divide-border text-center">
      <div className="px-2 flex flex-col items-center gap-1">
        <Clock className="h-20 w-20 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Время ответа</p>
        <p className="text-sm font-semibold text-foreground">~3 мин</p>
      </div>
      <div className="px-2 flex flex-col items-center gap-1">
        <Shield className="h-20 w-20 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Безопасность</p>
        <p className="text-sm font-semibold text-foreground">100%</p>
      </div>
      <div className="px-2 flex flex-col items-center gap-1">
        <Repeat className="h-20 w-20 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Обменов</p>
        <p className="text-sm font-semibold text-foreground">8000+</p>
      </div>
    </div>
  </Card>
);

const ContactForm = ({ onClick }: { onClick: () => void }) => (
  <div className="mt-32">
    <h2 className="text-lg font-semibold mb-16 text-center">
      Остались вопросы?
    </h2>
    <p className="text-muted-foreground text-center mb-16">
      Свяжитесь с нашей службой поддержки
    </p>
    <Button
      onClick={onClick}
      className="w-full h-56 text-base font-bold bg-accent hover:bg-accent/90 text-white"
    >
      <Send className="mr-8 h-20 w-20" />
      Задать вопрос в Telegram
    </Button>
  </div>
);

export default function FaqPage() {
  const dispatch = useAppDispatch();
  const { callSupport } = useCallSupport();
  const [getFaqs, faqResponse] = useServerAction({
    action: getFaqsAction,
  });

  React.useEffect(() => {
    dispatch(setPageName("Поддержка"));
    getFaqs(undefined);
  }, []);

  const faqs = faqResponse?.[0]?.faqs || faqData;

  return (
    <div className="w-full pb-100">
      <SupportHeader />
      <StatsCard />
      <Button
        onClick={callSupport}
        className="w-full h-48 text-base font-bold bg-accent hover:bg-accent/90 text-white mb-32"
      >
        <Send className="mr-8 h-20 w-20" />
        Задать вопрос
      </Button>

      <h2 className="text-lg font-semibold mb-16">Частые вопросы</h2>
      <Accordion type="single" collapsible className="w-full space-y-8">
        {faqs.map((faq, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={index}
            className="bg-gradient-to-r from-primary/20 to-accent/18 border rounded-lg px-16"
          >
            <AccordionTrigger className="font-medium text-foreground text-left no-underline hover:no-underline py-16">
              {'question' in faq ? faq.question : faq.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-16">
              <span
                dangerouslySetInnerHTML={{
                  __html: typograf('answer' in faq ? faq.answer : faq.description),
                }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ContactForm onClick={callSupport} />
    </div>
  );
}
