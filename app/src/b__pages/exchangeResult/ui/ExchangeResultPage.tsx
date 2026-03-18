"use client";
import React, { useEffect } from "react";

import { RequestResult } from "@/entities/requestResult/ui";
import { clearAll } from "@/d__features/exchange/model";
import { setUserId } from "@/d__features/userDataDisplay/model";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";

export default function ExchangeResultPage() {
  const dispatch = useAppDispatch();
  const exchangeId = useAppSelector((state) => state.ui.exchangeId);
  const userId = useAppSelector((state) => state.user.id);
  const videoData = useAppSelector((state) => state.pageData.result.video);

  const updateUserData = () => {
    if (userId) dispatch(setUserId(userId));
  };

  useEffect(() => {
    dispatch(clearAll());

    return () => {
      updateUserData();
    };
  }, []);

  return (
    <RequestResult
      id={exchangeId}
    ></RequestResult>
  );
}
