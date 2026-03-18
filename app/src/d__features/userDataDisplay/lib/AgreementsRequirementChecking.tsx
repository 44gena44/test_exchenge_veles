"use client";
import { useAppDispatch, useAppSelector } from "@/shared/model/store/hooks";
import { setAgreementAccepted } from "@/d__features/userDataDisplay/model/store/reducer/userReducer";
import { redirect, usePathname } from "next/navigation";
import React, { startTransition, useEffect } from "react";
import { checkConsentRequirementAction } from "../api";

export function AgreementsRequirementChecking() {
  const path = usePathname();
  const userId = useAppSelector((state) => state.user.id);
  const agreementAccepted = useAppSelector(
    (state) => state.user.agreementAccepted
  );
  const dispatch = useAppDispatch();
    const initData = useAppSelector(state => state.user.initData)

  useEffect(() => {
    if (userId && initData)
      startTransition(async () => {
        const res = await checkConsentRequirementAction({ user_id: userId, initData });
        if (res.consent_required) dispatch(setAgreementAccepted(false));
      });
  }, [userId,initData]);

  useEffect(() => {
    if (!agreementAccepted && path !== "/obmennik") {
      redirect("/obmennik");
    }
  }, [path, agreementAccepted]);
  return <></>;
}
