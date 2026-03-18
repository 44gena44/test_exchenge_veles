import { valueMask } from "@/shared/lib";
import { Details, DetailsDescription, FilePreview } from "@/shared/ui";
import { memo } from "react";

type Props = {
  currency: {
    icon: string;
    name: string;
  };
  currencyAmount: number;
  russianCompanyRequisites?: string;
  abroadCompanyRequisites?: string;
  taskDescription?: string;
  cardNumber?: string;
  filePreviews?: { url: string; type: string }[];
};

export const TransferDetails = memo(
  ({
    currency,
    currencyAmount,
    russianCompanyRequisites,
    abroadCompanyRequisites,
    taskDescription,
    cardNumber,
    filePreviews,
  }: Props) => {
    return (
      <Details
        currency={currency}
        currencyAmount={valueMask(currencyAmount)}
      >
        <div className="flex flex-col gap-20">
          {taskDescription && (
            <DetailsDescription
              title="Описание задачи"
              description={taskDescription}
            />
          )}
          {russianCompanyRequisites && (
            <DetailsDescription
              title="Реквизиты компании в РФ"
              description={russianCompanyRequisites}
              descriptionClassName="[&]:text-11"
            />
          )}
          {abroadCompanyRequisites && (
            <DetailsDescription
              title="Реквизиты компании за рубежом"
              description={abroadCompanyRequisites}
              descriptionClassName="[&]:text-11"
            />
          )}
          {cardNumber && (
            <DetailsDescription
              title="Карта получения "
              description={cardNumber}
              descriptionClassName="tracking-[4px]"
            />
          )}

          {filePreviews && filePreviews.length > 0 && (
            <div className="flex gap-6">
              {filePreviews.map((file) => (
                <FilePreview key={file.url}
                  fileType={file.type}
                  fileUrl={file.url}
                  className="rounded-6 w-48 h-48 border border-[var(--border-placeholder)]"
                ></FilePreview>
              ))}
            </div>
          )}
        </div>
      </Details>
    );
  }
);

TransferDetails.displayName = "TransferDetails";
