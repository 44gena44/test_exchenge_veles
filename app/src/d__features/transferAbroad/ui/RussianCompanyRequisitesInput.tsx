import { useAppSelector, useAppDispatch } from "@/shared/model/store";
import { RequisitesTextInput } from "@/shared/ui";
import { memo } from "react";
import { setRussianCompanyRequisites } from "../model";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

const title = "Реквизиты компании в РФ";
const placeholder = `ООО «ТехноИмпорт»
ИНН: 7701234567
КПП: 770101001
Расчётный счёт: 40702810500000123456
Банк: ПАО «Сбербанк»
БИК: 044525225
Корр. счёт: 30101810400000000225
Юр. адрес: 109012, Москва, ул. Никольская, д. 10`;

export const RussianCompanyRequisitesInput = memo(() => {
  const value = useAppSelector(
    (state) => state.transferAbroad.russianCompanyRequisites
  );
  const dispatch = useAppDispatch();

  const {trackInputChange} = useTrackUserAction()
  const handleInputChange = (value: string) => {

    dispatch(setRussianCompanyRequisites(value));
    trackInputChange(title, value)
  };
  return (
    <RequisitesTextInput
      trackingLabel={title}
      title={title}
      placeholder={placeholder}
      value={value}
      setValue={handleInputChange}
    />
  );
});

RussianCompanyRequisitesInput.displayName = "RussianCompanyRequisitesInput";
