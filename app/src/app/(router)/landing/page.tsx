"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import * as React from "react";

const navItems = [
  { label: "Боты", withChevron: true },
  { label: "Бэктесты" },
  { label: "Блог" },
  { label: "Лидерборд" },
  { label: "Академия Veles", withChevron: true },
  { label: "О компании", withChevron: true },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1b1b1b]">
      <div className="mx-auto max-w-[430px] min-h-screen bg-[#f5f5f7]">
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-[#ebeaf1]">
          <div className="px-14 py-12 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Image
                src="/images/icons/veles-symbol.png"
                alt="Veles"
                width={34}
                height={34}
                className="w-34 h-34 object-contain"
              />
              <div className="brand-wordmark leading-[0.85] text-primary">
                <p className="text-[22px] font-extrabold">VELES</p>
                <p className="text-[10px] tracking-[0.2em] text-primary/60">finance</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="h-40 w-40 rounded-full flex items-center justify-center text-[#1f1f24]"
              aria-label="Открыть меню"
            >
              <Menu className="h-26 w-26" />
            </button>
          </div>
        </header>

        <main className="px-14 pt-16 pb-40">
          <section className="rounded-[26px] border border-[#ececf4] bg-white p-20 shadow-[0_6px_24px_rgba(65,28,91,0.06)]">
            <h1 className="font-heading text-[48px] leading-[1.02] font-bold text-center">
              <span className="text-primary">VELES</span> - платформа для создания
              торговых ботов на крипторынке
            </h1>
            <p className="mt-14 text-center text-[36px] leading-[1.06] font-[500] font-heading">
              для <span className="line-through">трейдеров</span> людей
              <span className="ml-6 text-primary">♥</span>
            </p>

            <div className="mt-20 rounded-[18px] py-13 px-18 text-center text-[26px] font-[700] text-white brand-gradient shadow-[0_8px_16px_rgba(100,0,117,0.25)]">
              Получить $5 на тест
            </div>

            <div className="mt-16 rounded-[18px] bg-[#faf9fd] border border-[#ececf4] px-12 py-10 flex items-center gap-10">
              <div className="flex -space-x-8">
                <div className="h-34 w-34 rounded-full bg-[#f6d5ff] border-2 border-white" />
                <div className="h-34 w-34 rounded-full bg-[#e8f0c2] border-2 border-white" />
                <div className="h-34 w-34 rounded-full bg-[#d4edff] border-2 border-white" />
              </div>
              <div className="leading-tight">
                <p className="text-[28px] font-[700]">45 793</p>
                <p className="text-[16px] text-[#7f8093]">пользователей онлайн</p>
              </div>
            </div>

            <p className="mt-14 text-center text-[18px] text-[#8c8d9f]">
              Загрузите приложение
            </p>
            <div className="mt-10 grid grid-cols-2 gap-10">
              <div className="rounded-[16px] border border-[#ececf4] bg-white py-11 text-center text-[17px] font-[600]">
                Google Play
              </div>
              <div className="rounded-[16px] border border-[#ececf4] bg-white py-11 text-center text-[17px] font-[600]">
                App Store
              </div>
            </div>
          </section>
        </main>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/30"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Закрыть меню"
        />

        <aside
          className={`absolute right-0 top-0 h-full w-[82%] max-w-[340px] bg-white shadow-[-10px_0_32px_rgba(19,13,31,0.16)] transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-18">
            <div className="flex items-center justify-between mb-20">
              <div className="flex items-center gap-8">
                <Image
                  src="/images/icons/veles-symbol.png"
                  alt="Veles"
                  width={30}
                  height={30}
                  className="w-30 h-30 object-contain"
                />
                <div className="brand-wordmark leading-[0.85] text-primary">
                  <p className="text-[18px] font-extrabold">VELES</p>
                  <p className="text-[9px] tracking-[0.2em] text-primary/60">
                    finance
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="h-34 w-34 rounded-full flex items-center justify-center text-[#19171f]"
                aria-label="Закрыть"
              >
                <X className="h-22 w-22" />
              </button>
            </div>

            <nav className="flex flex-col gap-12">
              <div className="flex items-center justify-between py-6 text-[18px] font-[700]">
                <span>Боты</span>
                <ChevronDown className="h-16 w-16" />
              </div>

              <Link
                href="/obmennik"
                onClick={() => setIsMenuOpen(false)}
                className="py-6 text-[18px] font-[700] text-[#1f1f25]"
              >
                Обменник
              </Link>

              {navItems.slice(1).map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-6 text-[18px] font-[700]"
                >
                  <span>{item.label}</span>
                  {item.withChevron ? <ChevronDown className="h-16 w-16" /> : null}
                </div>
              ))}
            </nav>

            <div className="mt-24">
              <p className="text-[15px] text-[#393946] font-[700]">Мы в социальных сетях:</p>
              <div className="mt-10 flex items-center gap-8">
                <div className="h-30 w-30 rounded-8 brand-gradient" />
                <div className="h-30 w-30 rounded-8 brand-gradient" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
