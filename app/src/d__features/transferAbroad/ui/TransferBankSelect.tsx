import { BankSelect } from "@/entities/bank/ui";
import { memo, useEffect } from "react";
import { useTransferDetailsOptions } from "../lib/useTransferDetailsOptions";
import { useBankInputError } from "../lib/useBankInputError";
import { useAppSelector, useAppDispatch } from "@/shared/model/store";
import { setBank } from "../model";
import { CurrencySubOption } from "@/shared/model/api";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

export const TransferBankSelect = memo(() => {
  const { banks } = useTransferDetailsOptions();
  const bank = useAppSelector((state) => state.transferAbroad.bank);
  const dispatch = useAppDispatch();

  const { trackInputChange } = useTrackUserAction();

  const handleSelect = (value: CurrencySubOption | null) => {
    if (value) {
      dispatch(setBank(value));
      trackInputChange("Банк", value.name);
    }
  };

  const { bankInputError } = useBankInputError();

  return (
    <div className="-mt-26">
      <BankSelect
        placeholder="Выберите банк получения"
        value={bank}
        options={banks}
        onChange={handleSelect}
        error={bankInputError}
      ></BankSelect>
    </div>
  );
});

TransferBankSelect.displayName = "TransferBankSelect";
