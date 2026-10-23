
"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { NavbarDemo } from "@/components/NavbarDemo";
import { BackgroundGlobal } from "@/components/BackgroundGlobal";

export function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isQrCodePage = pathname === "/qrcode";

  if (isQrCodePage) {
    return <main>{children}</main>;
  }

  return (
    <>
      <BackgroundGlobal />

      <header className="fixed top-0 left-0 z-50 w-full">
        <NavbarDemo />
      </header>

      <div className="relative z-10 pt-[55px]">
        {children}
      </div>

      <Footer />
    </>
  );
}
