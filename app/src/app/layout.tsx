"use client";
import "@/shared/styles/globals.css";
import localFont from "next/font/local";
import {
  LoadingProvider,
  StoreProvider,
  TelegramAppInitializer,
} from "@/app/providers";
import { PORTAL_TARGET_ID } from "@/shared/config";
import { RateUpdatingRequirementChecking } from "@/d__features/exchange/lib";
import {
  AgreementsRequirementChecking,
  ButtonPressTracking,
  EmailRequirementChecking,
  InputChangeTracking,
  PageOpenTracking,
} from "@/d__features/userDataDisplay/lib";
import { ThemeInitialiser } from "./providers/ThemeInitialiser";
import { Head } from "@/c__widgets/head/ui";
import { Header } from "@/c__widgets/header/ui";
import { BackHeader } from "@/components/back-header";
import BottomNav from "@/components/layout/bottom-nav";
import { usePathname } from "next/navigation";
import { KycStatusPuller } from "@/d__features/userDataDisplay/lib/KycStatusPuller";

const inter = localFont({
  src: "../../public/fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingRoute = pathname === "/" || pathname === "/landing";
  const newDesignRoutes = new Set([
    "/obmennik",
    "/exchange",
    "/exchange/instant",
    "/history",
    "/faq",
    "/profile",
    "/kyc",
    "/exchange/card-exchange"
  ]);
  const isNewDesignRoute = pathname ? newDesignRoutes.has(pathname) : false;

  const mainClassName = isLandingRoute
    ? "grow h-full bg-[#f5f5f7]"
    : isNewDesignRoute
    ? "flex-grow mx-auto w-full max-w-lg px-16 pt-24 pb-150 bg-background"
    : "pb-150 grow h-full";

  return (
    <html lang="ru">
      <Head />
      <body className={inter.variable}>
        <StoreProvider>
          <ThemeInitialiser />
          <TelegramAppInitializer />
          {!isLandingRoute && <PageOpenTracking />}
          {!isNewDesignRoute && !isLandingRoute && <Header />}
          <LoadingProvider/>
            <main className={mainClassName}>
              {isNewDesignRoute && pathname !== "/obmennik" && <BackHeader />}
              {children}
            </main>
         {!isLandingRoute && <BottomNav />}

          {!isLandingRoute && (
            <>
              <EmailRequirementChecking />
              <AgreementsRequirementChecking />
              <RateUpdatingRequirementChecking />
              <InputChangeTracking />
              <ButtonPressTracking />
              <KycStatusPuller/>
            </>
          )}
        </StoreProvider>
        <div id={PORTAL_TARGET_ID}></div>
      </body>
    </html>
  );
}
