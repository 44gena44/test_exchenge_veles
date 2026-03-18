import { SectionHeading } from "@/shared/ui/exchange/SectionHeading";
import { BaseTextarea } from "@/shared/ui/form/BaseTextarea";
import { memo } from "react";
import { InputCopiedIcon } from "../icon";
import { IconTextButton } from "../button/IconTextButton";

type Props = {
  title: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  trackingLabel?: string;
};

export const RequisitesTextInput = memo(
  ({ title, placeholder, value, setValue, trackingLabel }: Props) => {
    const inputClipboardText = async () => {
      try {
        const text = await navigator.clipboard.readText();
        setValue(text);
      } catch (e) {
        console.error("Ошибка при чтении буфера обмена:", e);
      }
    };
    return (
      <div>
        <SectionHeading title={title}></SectionHeading>
        <div className="relative">
          <IconTextButton
            onClick={inputClipboardText}
            icon={<InputCopiedIcon color="var(--main-color)" />}
            text="Вставить"
          ></IconTextButton>
          <BaseTextarea
            className="text-11 leading-[148%]"
            placeholder={placeholder}
            value={value}
            setValue={setValue}
          ></BaseTextarea>
        </div>
      </div>
    );
  }
);

RequisitesTextInput.displayName = "RequisitesTextInput";
