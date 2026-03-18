"use client";

import ProcessLayout from "@/c__widgets/processLayout/ui";
import {
  LicenseAndInvoiceExampleInput,
  RussianCompanyRequisitesInput,
  AbroadCompanyRequisitesInput,
} from "@/d__features/transferAbroad/ui";
import { useRouterPushCallback } from "@/shared/lib";

export default function TransferAbroadInputFtaRequisitesAndLicense() {
  const [handleSubmit] = useRouterPushCallback({
    nextPagePath: "/transfer-abroad/details",
  });
  
  return (
    <ProcessLayout onMainButtonClick={handleSubmit} buttonText="Далее">
      <RussianCompanyRequisitesInput></RussianCompanyRequisitesInput>
      <AbroadCompanyRequisitesInput></AbroadCompanyRequisitesInput>
      <LicenseAndInvoiceExampleInput></LicenseAndInvoiceExampleInput>
        <div className={'h-30'}></div>
    </ProcessLayout>
  );
}
