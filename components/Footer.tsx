"use client";

import { FaInstagram, FaTiktok, FaSpotify, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full py-24 bg-black/50 overflow-hidden">

      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-full w-[80%] bg-gradient-to-b from-black via-pink-700 to-indigo-900 opacity-20 blur-3xl animate-pulse-slow" />
      </div>

      {/* Footer container */}
      <div className="relative z-10 mx-auto max-w-7xl rounded-3xl bg-zinc-900/90 px-12 py-16 shadow-2xl backdrop-blur-md text-zinc-200">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* LOGO + CTA */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Ibiza Club
            </h2>
            <p className="text-white/70 text-sm leading-relaxed hover:text-white transition">
              Tables VIP, speakeasy et privatisations pour des soirées inoubliables à Rouen.
            </p>
            <a
              href="#reservation"
              className="inline-block rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white uppercase tracking-wide hover:bg-white/10 hover:scale-105 transition"
            >
              Réserve ta table
            </a>
          </div>

          {/* JOIN OUR COMMUNITY */}
          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-widest text-fuchsia-400 uppercase">
              Rejoignez-nous
            </h3>
            <div className="flex gap-4">
              <SocialIcon icon={<FaInstagram />} link="https://www.instagram.com/" />
              <SocialIcon icon={<FaTiktok />} link="https://www.tiktok.com/" />
              <SocialIcon icon={<FaSpotify />} link="https://www.spotify.com/" />
            </div>
          </div>

          {/* INFO & CONTACT */}
          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-widest text-fuchsia-400 uppercase">
              Infos & Contact
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white transition cursor-pointer">Tables VIP & réservations</li>
              <li className="hover:text-white transition cursor-pointer">Speakeasy privatisé</li>
              <li className="hover:text-white transition cursor-pointer">Événements privés et corporate</li>
              <li className="flex items-center gap-2 hover:text-white transition cursor-pointer">
                <FaPhoneAlt className="text-fuchsia-400" /> +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-2 hover:text-white transition cursor-pointer">
                <FaEnvelope className="text-fuchsia-400" /> contact@ibizaclub.fr
              </li>
              <li className="hover:text-white transition cursor-pointer">Dress code & règles du club</li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-widest text-fuchsia-400 uppercase">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white transition cursor-pointer">Politique de confidentialité</li>
              <li className="hover:text-white transition cursor-pointer">Cookies</li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} Ibiza Club Rouen. Tous droits réservés.
        </div>

      </div>
    </footer>
  );
}

function SocialIcon({ icon, link }: { icon: React.ReactNode; link: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-black transition transform hover:scale-110 hover:bg-fuchsia-500 hover:text-white"
    >
      {icon}
    </a>
  );
}
