import {
  formatWithSpacesCardNumber,
  normalizeInput,
  preventKeysOnCardNumberInput,
} from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { InputWrapper, Input } from "@/shared/ui";
import { memo } from "react";
import { useCardNumberInputError } from "../lib/useCardNumberInputError";
import { setCardNumber } from "../model";

export const TransferCardNumberInput = memo(() => {
  const cardNumber = useAppSelector((state) => state.transferAbroad.cardNumber);
  const dispatch = useAppDispatch();
  const handleCardNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatWithSpacesCardNumber(normalizeInput(e.target.value));
    dispatch(setCardNumber(value));
  };

  const { cardNumberInputError } = useCardNumberInputError();

  return (
    <InputWrapper className="-mt-26" error={cardNumberInputError}>
      <Input
        trackingLabel="Номер карты"
        onChange={handleCardNumberInput}
        onKeyDown={preventKeysOnCardNumberInput}
        value={cardNumber}
        type="text"
        className=" border border-[var(--border-placeholder)] rounded-full bg-[var(--background-secondary)] placeholder:text-[var(--text-light)] text-16 leading-normal px-18 py-13 w-full"
        placeholder="Номер карты"
      />
    </InputWrapper>
  );
});

TransferCardNumberInput.displayName = "TransferCardNumberInput";
