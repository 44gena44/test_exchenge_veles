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
import clsx from "clsx";

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
    ? "flex-grow w-full px-16 pt-24 pb-150 bg-background"
    : "pb-150 grow h-full";

  const appShellClassName = clsx(
    "w-full",
    !isLandingRoute &&
      "relative mx-auto min-h-screen w-full max-w-[430px] bg-background md:my-16 md:min-h-[calc(100vh-2rem)] md:rounded-[34px] md:border md:border-border/70 md:shadow-[0_30px_90px_rgba(27,28,35,0.25)] md:overflow-hidden"
  );

  return (
    <html lang="ru">
      <Head />
      <body className={inter.variable}>
        <StoreProvider>
          <ThemeInitialiser />
          <TelegramAppInitializer />
          <div className={appShellClassName}>
            {!isLandingRoute && <PageOpenTracking />}
            {!isNewDesignRoute && !isLandingRoute && <Header />}
            <LoadingProvider />
            <main className={mainClassName}>
              {isNewDesignRoute && pathname !== "/obmennik" && <BackHeader />}
              {children}
            </main>
            {!isLandingRoute && <BottomNav />}
          </div>

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
