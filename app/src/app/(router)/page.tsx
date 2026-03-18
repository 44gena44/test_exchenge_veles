"use client";
import dynamic from "next/dynamic";
const LandingPage = dynamic(
  () => import("@/app/(router)/landing/page").then((mod) => mod.default),
  { ssr: false }
);

export default function Home() {
  return <LandingPage></LandingPage>;
}
