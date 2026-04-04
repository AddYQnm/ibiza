"use client";

import dynamic from "next/dynamic";

const Skiper48 = dynamic(
  () => import("@/components/HiIbizaStackCards").then(m => m.Skiper48),
  { ssr: false, loading: () => <div className="h-40" /> }
);

export function Skiper48Loader() {
  return <Skiper48 />;
}