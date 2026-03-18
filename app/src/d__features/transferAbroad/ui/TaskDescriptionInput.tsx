import { InputWrapper } from "@/shared/ui";
import { SectionHeading } from "@/shared/ui/exchange/SectionHeading";
import { BaseTextarea } from "@/shared/ui";
import { memo } from "react";
import { useTaskInputError } from "../lib/useTaskInputError";
import { useAppSelector, useAppDispatch } from "@/shared/model/store";
import { setTaskDescription } from "../model";

export const TaskDescriptionInput = memo(() => {
  const description = useAppSelector(
    (state) => state.transferAbroad.taskDescription
  );

  const dispatch = useAppDispatch();

  const handleTextInput = (value: string) => {
    dispatch(setTaskDescription(value));
  };

  const { taskInputError } = useTaskInputError();

  return (
    <div className="w-full">
      <SectionHeading title="Описание задачи"></SectionHeading>
      <InputWrapper errorIcon={false} error={taskInputError}>
        <BaseTextarea
          trackingLabel="Описание задачи"
          placeholder="Описание задачи в свободной форме, минимум 10 символов"
          value={description || ""}
          setValue={handleTextInput}
          className="text-16 leading-[148%] transition-all duration-500"
        ></BaseTextarea>
      </InputWrapper>
    </div>
  );
});

TaskDescriptionInput.displayName = "TaskDescriptionInput";
