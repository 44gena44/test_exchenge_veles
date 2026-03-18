import { validateAmount } from "@/shared/lib";
import {
  useAppSelector,
  useAppDispatch,
} from "@/shared/model/store";
import { useEffect } from "react";
import { setTaskInputError } from "../model";

export const useTaskInputError = () => {
  const taskDescription = useAppSelector(
    (state) => state.transferAbroad.taskDescription
  );

  const taskInputError = useAppSelector(
    (state) => state.transferAbroad.taskInputError
  );

  const dispatch = useAppDispatch();

  const areErrorsVisible = useAppSelector(
    (state) => state.transferAbroad.areTransferAbroadErrorsVisible
  );

  useEffect(() => {
    let error = null;

    if (taskDescription && taskDescription?.trim().length < 10) {
      error = "Не менее 10 символов";
    }

    if (!taskDescription || taskDescription.trim().length === 0) {
      error = "Введите текст";
    }

    dispatch(setTaskInputError(error));
  }, [taskDescription]);

  return { taskInputError: areErrorsVisible ? taskInputError : null };
};
