import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { Toggle } from "@/shared/ui";
import { memo, useEffect, useState } from "react";
import {
  setTransferTypeCategory,
  setTransferTypeCategorySlug,
} from "../../model";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

export const TransferTypeCategorySwitcher = memo(() => {
  const [isLegalEntity, setIsLegalEntity] = useState(true);

  const transferTypeCategory = useAppSelector(
    (state) => state.transferAbroad.transferTypeCategory
  );

  const sessionId = useAppSelector((state) => state.user.sessionId);
  const { trackUserAction } = useTrackUserAction();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (transferTypeCategory === "individual") {
      setIsLegalEntity(false);
    } else if (transferTypeCategory === "legal_entity") {
      setIsLegalEntity(true);
    }
  }, [transferTypeCategory]);

  const handleToggle = (isLegalEntity: boolean) => {
    setIsLegalEntity(isLegalEntity);
    const transferTypeCategory = isLegalEntity ? "legal_entity" : "individual";

    dispatch(setTransferTypeCategory(transferTypeCategory));
  };

  useEffect(() => {
    const transferTypeCategorySlug = isLegalEntity ? "Юр. Лица" : "Физ. Лица";
    dispatch(setTransferTypeCategorySlug(transferTypeCategorySlug));
  }, [isLegalEntity]);

  useEffect(() => {
    if (sessionId) {
      const transferTypeCategorySlug = isLegalEntity ? "юр. лиц" : "физ. лиц";
      trackUserAction(`Выбран список операций для ${transferTypeCategorySlug}`)
    }
  }, [isLegalEntity, sessionId]);

  return (
    <Toggle
      firstButtonText="Юр. лица"
      secondButtonText="Физ. лица"
      isFirstSelected={isLegalEntity}
      setIsFirstSelected={handleToggle}
    ></Toggle>
  );
});

TransferTypeCategorySwitcher.displayName = "TransferTypeCategorySwitcher";
