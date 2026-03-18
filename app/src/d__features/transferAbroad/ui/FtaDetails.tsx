import { typograf } from "@/shared/lib";
import {
  useAppSelector,
  abroadTransferDetailsSelector,
} from "@/shared/model/store";
import { DetailsDescription, FilePreview } from "@/shared/ui";
import { useEffect, useMemo } from "react";

export const FtaDetails = () => {
  const {
    abroadCompanyRequisites,
    russianCompanyRequisites,
    file1PreviewUrl,
    file2PreviewUrl,
    file1,
    file2,
  } = useAppSelector(abroadTransferDetailsSelector);

  const filesPreview = useMemo(
    () => [
      { type: file1?.type, url: file1PreviewUrl },
      { type: file2?.type, url: file2PreviewUrl },
    ],
    [file1, file2, file1PreviewUrl, file2PreviewUrl]
  );

  const requisites = useMemo(
    () => [
      {
        title: "Реквизиты компании в РФ",
        description: russianCompanyRequisites,
      },
      {
        title: "Реквизиты компании за рубежом",
        description: abroadCompanyRequisites,
      },
    ],
    [russianCompanyRequisites, abroadCompanyRequisites]
  );

  return (
    <>
      {requisites.map((info, index) => (
        info.description && <DetailsDescription
          key={index}
          title={info.title}
          description={typograf(info.description.replaceAll("\n", "<br/>"))}
          descriptionClassName="leading-[148%] [&]:text-11"
        />
      ))}
      <div className="flex gap-6">
        {filesPreview.map(
          (file, index) =>
            file.url && file.type && (
              <FilePreview
                key={index}
                className="rounded-6 overflow-hidden border border-[var(--border-placeholder)] w-48 h-48"
                fileType={file.type}
                fileUrl={file.url}
              />
            )
        )}
      </div>
    </>
  );
};
