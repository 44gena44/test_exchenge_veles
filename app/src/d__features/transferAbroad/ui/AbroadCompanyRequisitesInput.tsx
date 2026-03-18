import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { RequisitesTextInput } from "@/shared/ui";
import { memo, useState } from "react";
import { setAbroadCompanyRequisites } from "../model";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

const title = "Реквизиты компании за рубежом";
const placeholder = `Shenzhen Electronics Co., Ltd
Account number (IBAN): 
DE8937040040532013000
Bank: Deutsche Bank AG
SWIFT: DEUTDEFF
Bank address: Taunusanlage 12, 60325 Frankfurt am Main, Germany
Company address: 12 Nanshan Rd, Shenzhen, China`;

export const AbroadCompanyRequisitesInput = memo(() => {
  const value = useAppSelector(
    (state) => state.transferAbroad.abroadCompanyRequisites
  );
  const dispatch = useAppDispatch();
    const {trackInputChange} = useTrackUserAction()
  
  const handleInputChange = (value: string) => {
    dispatch(setAbroadCompanyRequisites(value));
        trackInputChange(title, value)

  };
  return (
    <RequisitesTextInput
      title={title}
      placeholder={placeholder}
      value={value}
      setValue={handleInputChange}
    />
  );
});

AbroadCompanyRequisitesInput.displayName = "AbroadCompanyRequisitesInput";
