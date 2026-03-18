"use client";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import clsx from "clsx";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {BACK_BUTTON_ROUTES} from "@/shared/config";
import {Menu} from "./Menu";
import {CrossIcon, HeaderArrowIcon} from "@/shared/ui";
import {ProgressBar} from "@/c__widgets/progressBar/ui";
import {useTrackUserAction} from "@/d__features/userDataDisplay/lib";
import {useCallSupport} from "@/d__features/support/lib";

export function Header() {
    const pathname = usePathname();
    const isHome = useMemo(() => pathname === "/obmennik", [pathname]);
    const isTransferAbroadDetails = useMemo(
        () => pathname === "/transfer-abroad/details",
        [pathname]
    );

    const isResultPage = useMemo(() => pathname?.endsWith("/result"), [pathname]);
    const router = useRouter();

    const isAppReady = useAppSelector((state) => state.ui.isAppReady);

    const {trackPushButton} = useTrackUserAction();

    const onBackButtonClick = () => {
        // if (!isAppReady) return;
        // const backButtonPath = BACK_BUTTON_ROUTES[pathname as string];
        // if (isTransferAbroadDetails) {
        //     router.back();
        // } else {
        //     router.push(backButtonPath);
        // }
        router.back();

        trackPushButton("Назад");
    };


    const {callSupport} = useCallSupport();

    const handleSupportButton = () => {
        callSupport()
        trackPushButton('Поддержка')
    }

    const handleCloseResultPage = () => {
        router.push("/obmennik");
        trackPushButton('Закрыть')
    }


    return (
        <div
            className={clsx(
                "container pt-33 pb-23 transition-all duration-500 relative z-10",
            )}
        >
            <div className="flex items-end justify-between pl-[14px] pr-[7px]">
                {isHome && <> <img src="/images/icons/logo.svg" className="w-[105px] h-[25px]" alt=""/>
                    <button
                        onClick={handleSupportButton}
                        className="flex items-center justify-between px-[18px] py-[7px] bg-[#292B32] rounded-full border border-[#3A3A3A] gap-[9px]">
                        <img className="w-[15px] h-[15px] " src="/images/icons/heart.svg" alt=""/>
                        <span className="text-[13px] text-[var(--text-secondary)] font-medium">поддержка</span>
                    </button>
                </>}
                {isResultPage && <> <span></span>
                    <button
                        onClick={handleCloseResultPage}
                        className="p-8 mr-[-15px]">
                        <CrossIcon color={'var(--text-main)'} className={'w-12 h-12'}></CrossIcon>
                    </button>
                </>}
                {!isHome && !isResultPage &&
                    <button onClick={onBackButtonClick} className={'ml-[-7px] flex items-center gap-7'}><img
                        className={'w-13 h-12'} src="/images/icons/arrow.svg" alt=""/><span
                        className={'text-16 text-[var(--text-main)] font-medium'}>Вернуться</span></button>}
            </div>
        </div>
    );
}
