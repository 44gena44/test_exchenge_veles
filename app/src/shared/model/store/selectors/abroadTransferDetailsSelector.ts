import { createSelector } from "reselect";
import { RootState } from "../state";

export const abroadTransferDetailsSelector = createSelector(
  (state: RootState) => state.transferAbroad.selectedTranserTypeOptionId,
  (state: RootState) => state.transferAbroad.transferTypeCategorySlug,
  (state: RootState) => state.transferAbroad.currency,
  (state: RootState) => state.transferAbroad.taskDescription,
  (state: RootState) => state.transferAbroad.countryName,
  (state: RootState) => state.transferAbroad.platform,
  (state: RootState) => state.transferAbroad.bank,
  (state: RootState) => state.transferAbroad.cardNumber,
  (state: RootState) => state.transferAbroad.amount,
  (state: RootState) => state.transferAbroad.abroadCompanyRequisites,
  (state: RootState) => state.transferAbroad.russianCompanyRequisites,
  (state: RootState) => state.transferAbroad.file1PreviewUrl,
  (state: RootState) => state.transferAbroad.file2PreviewUrl,
  (state: RootState) => state.transferAbroad.file1,
  (state: RootState) => state.transferAbroad.file2,
  (
    selectedTranserTypeOptionId,
    transferTypeCategorySlug,
    currency,
    taskDescription,
    countryName,
    platform,
    bank,
    cardNumber,
    amount,
    abroadCompanyRequisites,
    russianCompanyRequisites,
    file1PreviewUrl,
    file2PreviewUrl,
    file1,
    file2
  ) => {
    return {
      selectedTranserTypeOptionId,
      transferTypeCategorySlug,
      currency,
      taskDescription,
      countryName,
      platform,
      bank,
      cardNumber,
      amount,
      abroadCompanyRequisites,
      russianCompanyRequisites,
      file1PreviewUrl,
      file2PreviewUrl,
      file1,
      file2,
    };
  }
);
