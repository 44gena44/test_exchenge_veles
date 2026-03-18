import { SectionHeading } from "@/shared/ui/exchange";
import { FileInput } from "@/shared/ui/form/FileInput";
import { memo, useState } from "react";
import { LicenseAndInvoiceExampleNote } from "./LicenseAndInvoiceExampleNote";
import { useAppSelector, useAppDispatch } from "@/shared/model/store";
import { setFile1, setFile1PreviewUrl, setFile2, setFile2PreviewUrl } from "../../model";


export const LicenseAndInvoiceExampleInput = memo(() => {
  const file1 = useAppSelector((state) => state.transferAbroad.file1);
  const file2 = useAppSelector((state) => state.transferAbroad.file2);

  const dispatch = useAppDispatch();

  const handleFile1Input = (file: File) => {
    dispatch(setFile1(file));
    const url = URL.createObjectURL(file);
    if (url) dispatch(setFile1PreviewUrl(url));
  };

  const handleFile2Input = (file: File) => {
    dispatch(setFile2(file));
    const url = URL.createObjectURL(file);
    if (url) dispatch(setFile2PreviewUrl(url));
  };

  return (
    <div className="relative">
      <SectionHeading title="Лицензия компании <br/>и пример invoice" />
      <div className="flex gap-7">
        <FileInput trackingLabel="Загружен файл" value={file1} onChange={handleFile1Input} />
        <FileInput trackingLabel="Загружен файл" value={file2} onChange={handleFile2Input} />
      </div>
     {!file1 && !file2 && <LicenseAndInvoiceExampleNote  />}
    </div>
  );
});

LicenseAndInvoiceExampleInput.displayName = "LicenseAndInvoiceExampleInput";
