"use client";
import React, { useEffect } from "react";
import DropdownTrigger from "@/shared/ui/dropdown/DropdownTrigger";
import ExpandableElement from "@/shared/ui/dropdown/ExpandableElement";
import { typograf } from "@/shared/lib/string/typograf";
import { useAppDispatch } from "@/shared/model/store/hooks";
import { setPageName } from "@/shared/model/store/reducers/uiReducer";
import { useServerAction } from "@/shared/lib";
import { getFaqsAction } from "@/d__features/exchange/api";
import { setGetFaqsLoading } from "@/d__features/exchange/model";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

export default function FaqList() {
  const dispatch = useAppDispatch();

  const [getFaqs, data] = useServerAction({
    action: getFaqsAction,
    loadingAction: setGetFaqsLoading,
  });

  const {  trackUserAction } = useTrackUserAction();

  useEffect(() => {
    const pageName = "Нас часто спрашивают";
    dispatch(setPageName(pageName));
    getFaqs(undefined);
  }, []);

  const handleTriggerClick = (
    title: string,
    isOpen: boolean,
    cd: () => void
  ) => {
    cd();
    trackUserAction(`${isOpen ? "Закрыт" : "Открыт"} елемент с вопросом '${title}'`);
  };

  return (
    <div className="flex flex-col gap-[20px] mt-20">
      {data &&
        data[0]?.faqs?.map((question, index) => (
          <ExpandableElement
            key={index}
            triggerRender={({ onClick, isOpen }) => (
              <DropdownTrigger
                className="[&]:justify-between px-[20px] [&]:text-left [&]:py-[15px] [&]:h-auto [&]:min-h-[50px] [&]:gap-30"
                onClick={() =>
                  handleTriggerClick(question.title, isOpen, onClick)
                }
                arrowPosition={isOpen ? "bottom" : "top"}
                arrow
              >
                {question.title}
              </DropdownTrigger>
            )}
          >
            <p
              className="answer"
              dangerouslySetInnerHTML={{
                __html: typograf(question.description),
              }}
            ></p>{" "}
          </ExpandableElement>
        ))}
    </div>
  );
}
