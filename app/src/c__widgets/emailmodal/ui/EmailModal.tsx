import { updateUserDataAction } from "@/d__features/userDataDisplay/api";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";
import {
  setMailRequired,
  setUpdateUserDataLoading,
  setUserEmail,
} from "@/d__features/userDataDisplay/model";
import { useServerAction, validateEmail } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { InputField, BaseModal } from "@/shared/ui";
import React, { useEffect, useState } from "react";

export default function EmailModal() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isErrorShowing, setIsErrorShowing] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.id);
  const isMailRequired = useAppSelector((state) => state.user.mailRequired);
  const sessionId = useAppSelector((state) => state.user.sessionId);

  useEffect(() => {
    if (isMailRequired)
      setTimeout(() => {
        setIsEmailModalOpen(true);
        dispatch(setMailRequired(false));
      }, 1000);
  }, [isMailRequired]);

  useEffect(() => {
    const validationResult = validateEmail(value);
    setError(validationResult.error);
  }, [value]);

  const [updateUser, response, errorResponse] = useServerAction({
    action: updateUserDataAction,
    loadingAction: setUpdateUserDataLoading,
  });

  const { trackUserAction } = useTrackUserAction();
    const initData = useAppSelector(state => state.user.initData)

  const handleSubmit = () => {
    setIsErrorShowing(true);
    if (!error && userId) {
      trackUserAction("Email отправлен");
      updateUser({
        user_id: userId,
        email: value,
          initData
      });
    } else {
      trackUserAction("Ошибка при валидации email");
    }
  };

  useEffect(() => {
    if (sessionId) {
      if (isEmailModalOpen) {
        trackUserAction("Открыто модальное окно для ввода электронной почты");
        return () => {
          trackUserAction("Закрыто модальное окно для ввода электронной почты");
        };
      }
    }
  }, [isEmailModalOpen, sessionId]);

  useEffect(() => {
    if (sessionId) {
      if (isSuccessModalOpen) {
        trackUserAction("Открыто модальное окно 'Email успешно сохранен!'");
        return () => {
          trackUserAction("Закрыто модальное окно 'Email успешно сохранен!'");
        };
      }
    }
  }, [isSuccessModalOpen, sessionId]);

  useEffect(() => {
    if (sessionId) {
      if (isErrorModalOpen) {
        trackUserAction(
          "Открыто модальное окно 'Произошла ошибка при попытке сохранить email'"
        );
        return () => {
          trackUserAction(
            "Закрыто модальное окно 'Произошла ошибка при попытке сохранить email'"
          );
        };
      }
    }
  }, [isErrorModalOpen, sessionId]);

  useEffect(() => {
    if (response) {
      dispatch(setUserEmail(value));
      setIsEmailModalOpen(false);
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 3000);
    }
  }, [response]);

  useEffect(() => {
    if (errorResponse) {
      setIsEmailModalOpen(false);
      setIsErrorModalOpen(true);
      setTimeout(() => {
        setIsErrorModalOpen(false);
      }, 3000);
    }
  }, [errorResponse]);
  return (
    <>
      <BaseModal
        isOpen={isEmailModalOpen}
        handleClose={() => setIsEmailModalOpen(false)}
        handleButton={handleSubmit}
        buttonText="Отправить"
      >
        <div className="mb-[-25px]">
          <p className="mb-[30px]">
            Пожалуйста, введите свою почту для&nbsp;обратной связи - никакого
            спама, пишем только по&nbsp;делу
          </p>
          <InputField
            trackingLabel="Электронная почта"
            onChange={setValue}
            error={isErrorShowing ? error : ""}
            value={value}
            className="[&]:bg-[var(--background-global)]"
            placeholder="Электронная почта"
          />
        </div>
      </BaseModal>
      <BaseModal
        isOpen={isSuccessModalOpen}
        handleClose={() => setIsSuccessModalOpen(false)}
      >
        <p className="text-center">Email успешно сохранен!</p>
      </BaseModal>
      <BaseModal
        isOpen={isErrorModalOpen}
        handleClose={() => setIsErrorModalOpen(false)}
      >
        Произошла ошибка при попытке сохранить email. Свяжитесь с оператором.
      </BaseModal>
    </>
  );
}
