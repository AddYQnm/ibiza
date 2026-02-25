"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export function NavbarDemo() {
  const navItems = [
    { name: "Accueil", link: "/" },
    { name: "Events", link: "/events" },
    { name: "Réservation", link: "/reservation" },
    { name: "Speak Easy", link: "/speakeazy" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const phoneDisplay = "06 63 32 15 32";
  const phoneHref = "tel:+33663321532";

  return (
    <Navbar>
      {/* Desktop */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />

        <div className="flex items-center gap-4">
          {/* ✅ bouton cliquable qui appelle */}
          <NavbarButton href={phoneHref} variant="primary" aria-label={`Appeler ${phoneDisplay}`}>
            {phoneDisplay}
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-neutral-600 dark:text-neutral-300"
              >
                {item.name}
              </a>
            ))}

            {/* ✅ numéro aussi sur mobile */}
            <div className="pt-2">
              <a
                href={phoneHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  inline-flex w-full items-center justify-center
                  rounded-md px-4 py-3 font-medium
                  bg-neutral-900 text-white
                  dark:bg-white dark:text-neutral-900
                "
                aria-label={`Appeler ${phoneDisplay}`}
              >
                {phoneDisplay}
              </a>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}