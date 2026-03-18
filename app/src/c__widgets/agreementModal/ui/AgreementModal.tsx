import React, { useEffect, useMemo, useState } from "react";
import { BaseModal } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/model/store/hooks";
import { setAgreementAccepted } from "@/d__features/userDataDisplay/model/store/reducer/userReducer";
import Checkbox from "../../../shared/ui/form/Checkbox";
import { typograf } from "@/shared/lib/string/typograf";
import { useServerAction } from "@/shared/lib";
import { updateUserDataAction } from "@/d__features/userDataDisplay/api";
import { setUpdateUserDataLoading } from "@/d__features/userDataDisplay/model";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

const matureCheckboxLabel = "Я подтверждаю, что мне уже исполнилось 18 лет";
const idPossessorCheckboxLabel =
  "Я подтверждаю, что использую собственный Telegram ID и имею право распоряжаться указанной учётной записью";
const agreedWithTermsCheckboxLabel = "Я даю согласие на обработку";

export default function AgreementModal() {
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [isMature, setIsMature] = useState(false);
  const [isIdPossessor, setIsIdPossessor] = useState(false);
  const [hasAgreedWithTerms, setHasAgreedWithTerms] = useState(false);
  const userId = useAppSelector((state) => state.user.id);
  const agreementAccepted = useAppSelector(
    (state) => state.user.agreementAccepted
  );

  
  const sessionId = useAppSelector((state) => state.user.sessionId);
  const policyUrl = useAppSelector((state) => state.pageData.home.policyUrl);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAgreementModalOpen === agreementAccepted)
      setIsAgreementModalOpen(!agreementAccepted);
  }, [agreementAccepted]);

  const [updateUser] = useServerAction({
    action: updateUserDataAction,
    loadingAction: setUpdateUserDataLoading,
  });

  const { trackUserAction, trackCheckboxChange } = useTrackUserAction();
    const initData = useAppSelector(state => state.user.initData)

  const handleSubmit = () => {
    dispatch(setAgreementAccepted(true));
    if (userId) {
      trackUserAction("Данные чекбоксов отправлены");
      updateUser({ user_id: userId, has_consented: true, initData  });
    }
  };

  const isSubmitButtonDisabled = useMemo(() => {
    return !(isMature && isIdPossessor && hasAgreedWithTerms);
  }, [isMature, isIdPossessor, hasAgreedWithTerms]);

  const handleIsMatureCheckbox = () => {
    trackCheckboxChange(matureCheckboxLabel, !isMature);
    setIsMature(!isMature);
  };

  const handleIsIdPossessor = () => {
    trackCheckboxChange(idPossessorCheckboxLabel, !isIdPossessor);
    setIsIdPossessor(!isIdPossessor);
  };

  const handleIsAgreementAccepted = () => {
    trackCheckboxChange(
      agreedWithTermsCheckboxLabel + " персональных данных",
      !hasAgreedWithTerms
    );
    setHasAgreedWithTerms(!hasAgreedWithTerms);
  };

  useEffect(() => {
    if (sessionId) {
      if (isAgreementModalOpen) {
        trackUserAction(
          "Открыто модальное окно 'Поддтверждение совершеннолетия, прав на пользования Telegram аккаунтом, осведомленности с политикой обработки персональных данных'"
        );
        return () => {
          trackUserAction(
            "Закрыто модальное окно 'Поддтверждение совершеннолетия, прав на пользования Telegram аккаунтом, осведомленности с политикой обработки персональных данных'"
          );
        };
      }
    }
  }, [isAgreementModalOpen, sessionId]);

  return (
    <BaseModal
      isOpen={isAgreementModalOpen}
      handleClose={() => {}}
      handleButton={handleSubmit}
      buttonText="Подтвердить"
      className="[&]:z-[300]"
      isCloseButtonHidden={true}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
    >
      <div className="flex flex-col gap-[17px]">
        <Checkbox checked={isMature} onClick={handleIsMatureCheckbox}>
          {typograf(matureCheckboxLabel)}
        </Checkbox>
        <Checkbox checked={isIdPossessor} onClick={handleIsIdPossessor}>
          {typograf(idPossessorCheckboxLabel)}
        </Checkbox>
        <Checkbox
          checked={hasAgreedWithTerms}
          onClick={handleIsAgreementAccepted}
        >
          {typograf(agreedWithTermsCheckboxLabel)}
          <a
            onClick={(e) => e.stopPropagation()}
            data-tracking-label="Политика обработки персональных данных"
            target="_blank"
            className="underline underline-offset-2"
            href={policyUrl}
          >
            персональных данных
          </a>
        </Checkbox>
      </div>
    </BaseModal>
  );
}
