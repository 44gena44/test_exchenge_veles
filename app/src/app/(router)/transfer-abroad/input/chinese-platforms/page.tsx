"use client"

import dynamic from "next/dynamic";
const TransferAbroadInputChinesePlatformsPage = dynamic(
  () =>
    import("@/b__pages/transferAbroadInputChinesePlatforms/ui").then(
      (mod) => mod.default
    ),
  { ssr: false }
);
export default function TransferAbroadInputChinesePlatforms() {
  return <TransferAbroadInputChinesePlatformsPage />;
}

