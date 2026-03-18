"use client";
import clsx from "clsx";
import {FC, useEffect, useState} from "react";
import {useGlobalLoading} from "./lib";
import {createPortal} from "react-dom";
import {PORTAL_TARGET_ID} from "@/shared/config";

export const LoadingProvider: FC = () => {
    const {isLoading} = useGlobalLoading();
    const [modalRoot, setModalRoot] = useState<null | Element>(null);
    useEffect(() => {
        setModalRoot(document.getElementById(PORTAL_TARGET_ID));
    }, []);

    const loadingBoard = <div className={clsx("shimmer-on-loading flex-grow ", {"loading": isLoading})}></div>
    return modalRoot ? createPortal(loadingBoard, modalRoot) : null;
};

LoadingProvider.displayName = "LoadingProvider";

