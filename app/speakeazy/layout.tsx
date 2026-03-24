// app/speakeazy/layout.tsx
import type { Metadata } from "next";
 
export const metadata: Metadata = {
  title: "Speakeasy — Ibiza Club Rouen",
  description:
    "Le Speakeasy de l'Ibiza Club Rouen : un espace secret et exclusif au premier étage. Cocktails signature, ambiance feutrée, accès sur réservation.",
  openGraph: {
    title: "Speakeasy — Ibiza Club Rouen",
    description:
      "Un sanctuaire nocturne caché au cœur de Rouen. Accès sur réservation uniquement.",
    url: "https://ibizaclubrouen.fr/speakeazy",
  },
};
 
export default function SpeakeazyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Pas de <html>/<body> ici — ils sont déjà dans app/layout.tsx (root layout)
  // Ce layout hérite automatiquement de la navbar, du footer et du BackgroundGlobal
  return <>{children}</>;
}
 