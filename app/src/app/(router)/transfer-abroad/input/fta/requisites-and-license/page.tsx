"use client"
import dynamic from "next/dynamic";
const TransferAbroadInputFtaRequisitesAndLicense = dynamic(
  () =>
    import("@/b__pages/transferAbroadInputFtaRequisitesAndLicense/ui").then(
      (mod) => mod.default
    ),
  { ssr: false }
);
export default function TransferAbroadInputFtaRequisitesAndLicensePage() {
  return <TransferAbroadInputFtaRequisitesAndLicense />;
}

