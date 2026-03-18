import { PlaceSelect } from "@/entities/place/ui";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/model/store";
import { memo, useState } from "react";
import { useTransferDetailsOptions } from "../lib/useTransferDetailsOptions";
import { useCountryInputError } from "../lib/useCountryInputError";
import { setCardNumber, setCountryName } from "../model";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";
import { Input, InputWrapper } from "@/shared/ui";
import { normalizeInput, preventKeysOnCountryNameInput } from "@/shared/lib";

export const TransferCountryInput = memo(() => {

  const [isSelectedManualInput, setIsSelectedManualInput] = useState(false)

  const dispatch = useAppDispatch();

  const { countries } = useTransferDetailsOptions();

  const countryName = useAppSelector(
    (state) => state.transferAbroad.countryName
  );

  const { countryInputError } = useCountryInputError(isSelectedManualInput);

  const { trackInputChange } = useTrackUserAction()

  const handleSelect = (value: string | null) => {
    if (value) {
      if (value !== "Свой вариант") {
        dispatch(setCountryName(value))
        setIsSelectedManualInput(false)
      } else {
        setIsSelectedManualInput(true)
      }
      trackInputChange('Страна', value)
    };
  };

  const handleCountryNameInput = (e: React.ChangeEvent<HTMLInputElement> ) => {
      const value = e.target.value
      dispatch(setCountryName(value));
  }

  return (
    <div className="-mt-26">
      <PlaceSelect
        error={isSelectedManualInput ? '' : countryInputError}
        onChange={handleSelect}
        value={isSelectedManualInput ? "Свой вариант" : countryName}
        options={countries}
        placeholder="Введите название страны"
      ></PlaceSelect>
      {isSelectedManualInput && <InputWrapper className="" error={countryInputError}>
        <Input
          trackingLabel="Название страны"
          onChange={handleCountryNameInput}
          // onKeyDown={preventKeysOnCountryNameInput}
          value={countryName}
          type="text"
          className=" border border-[var(--border-placeholder)] rounded-full bg-[var(--background-secondary)] placeholder:text-[var(--text-light)] text-16 leading-normal px-18 py-13 w-full"
          placeholder="Название страны"
        />
      </InputWrapper>}
    </div>
  );
});
TransferCountryInput.displayName = "TransferCountryInput";
