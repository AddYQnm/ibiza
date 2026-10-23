
"use client";

import Image from "next/image";
import "./ibiza.css";
import { useState } from "react";
import {
  Instagram,
  Facebook,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Menu,
  X,
} from "lucide-react";


const slides = [
 {
    title: "TON CLUB",
    accent: "TON UNIVERS",
    image: "/images/qrcode/slide1.jpg",
    description: "Découvre l'univers IBIZA.",
    href: "https://ibizaclub.fr/",
  },
  {
    title: "TES ÉVÉNEMENTS",
    accent: "SUR SHOTGUN",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2000&q=90",
    description: "Retrouve les prochaines soirées.",
    href: "https://shotgun.live/fr/venues/ibiza-club",
  },
  {
    title: "TON ANNIVERSAIRE",
    accent: "EN GRAND",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2000&q=90",
    description: "Célèbre ton moment chez IBIZA.",
    href: "#anniversaire",
  },
  {
    title: "TA TABLE",
    accent: "TON EXPÉRIENCE",
    image:
      "IMAGES/QRcode/slide4.jpg",
    description: "Prépare ta prochaine soirée.",
    href: "/reservation",
  },
];



const links = [
  { label: "SITE INTERNET", href: "https://ibizaclub.fr/" },
  {
    label: "SHOTGUN",
    href: "https://shotgun.live/fr/venues/ibiza-club",
  },
  { label: "PACK ANNIVERSAIRE", href: "#anniversaire" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/" },
  { label: "GROUPE WHATSAPP", href: "#whatsapp" },
  { label: "RÉSERVATIONS", href: "/reservation" },
];


export default function IbizaQrPage() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const slide = slides[active];

  const changeSlide = (direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <main className="ibiza-editorial">
      {/* Motif graphique */}
      <div className="ibiza-pattern" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i}>IBIZA · IBIZA · IBIZA ·
          IBIZA · IBIZA · IBIZA ·
          IBIZA · IBIZA · IBIZA ·</span>
          
        ))}
      </div>

      {/* Marque */}
      <a href="/qrcode" className="ibiza-brand" aria-label="IBIZA accueil">
  <Image
    src="/images/ibiza/logo.png"
    alt="IBIZA Club Rouen"
    width={100}
    height={30}
    priority
    className="ibiza-logo"
  />
</a>

      {/* Navigation gauche */}
      <aside className="ibiza-sidebar">
        <div className="sidebar-heading">
          <span className="sidebar-index">01 / 06</span>
          <span className="sidebar-rule" />
        </div>

        <nav className="ibiza-navigation">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={i === 0 ? "nav-active" : ""}
            >
              <span>{link.label}</span>
              <span className="nav-number">0{i + 1}</span>
            </a>
          ))}
        </nav>

        <a className="ibiza-reserve" href="/reservation">
          <span>MA RESERVATION</span>
          <ArrowUpRight size={17} />
        </a>

        <div className="sidebar-address">
          <MapPin size={15} />
          <div>
            <span>FIND US</span>
            <p>Rouen, France</p>
          </div>
        </div>

        <p className="sidebar-footnote">MUSIC · PEOPLE · ENERGY</p>
      </aside>

      {/* Scène principale */}
      <section className="ibiza-stage">
        <div
          className="stage-image"
          key={slide.image}
          style={{ backgroundImage: `url("${slide.image}")` }}
          role="img"
          aria-label={`Ambiance de nuit IBIZA — ${slide.description}`}
        />

        <div className="stage-overlay" />

        <div className="stage-topline">
          <span>DISCOTHÈQUE</span>
          <span>SEINE-MARITIME · 76</span>
        </div>

        <div className="stage-vertical">
          IBIZA® — LA NUIT PREND UNE AUTRE DIMENSION
        </div>

        {/* Affiche posée sur la photographie */}
       
<a
  className="stage-poster"
  key={slide.title}
  href={slide.href}
  target={slide.href.startsWith("http") ? "_blank" : undefined}
  rel={slide.href.startsWith("http") ? "noreferrer" : undefined}
  aria-label={`Accéder à ${slide.accent}`}
>
  <div className="poster-top">
    <span>IBIZA PRESENTS</span>
    <span>ROUEN / FRANCE</span>
  </div>

  <div className="poster-copy">
    <span className="poster-small">{slide.title}</span>
    <h1>{slide.accent}</h1>
  </div>

  <div className="poster-bottom">
    <span>{slide.description}</span>
    <span>ACCÉDER <ArrowUpRight size={14} /></span>
  </div>

  <div className="poster-stamp">I.</div>
</a>


        {/* Contrôles de la galerie */}
        <div className="stage-controls">
          <div className="stage-dots" aria-label="Choisir une photographie">
            {slides.map((item, i) => (
              <button
                key={item.title}
                aria-label={`Afficher la scène ${i + 1}`}
                aria-pressed={active === i}
                className={active === i ? "active" : ""}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          <div className="stage-arrows">
            <button
              onClick={() => changeSlide(-1)}
              aria-label="Photo précédente"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => changeSlide(1)}
              aria-label="Photo suivante"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className="stage-bottom-label">
          
          <span>{slide.description}</span>
        </div>
      </section>

      {/* Réseaux sociaux verticaux */}
      <aside className="ibiza-socials">
        <span className="social-label">FOLLOW THE NIGHT</span>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <Instagram size={19} />
          <span>INSTAGRAM</span>
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <Facebook size={19} />
          <span>FACEBOOK</span>
        </a>
        <a href="https://shotgun.live/" target="_blank" rel="noreferrer">
          <span className="social-ticket">↗</span>
          <span>SHOTGUN</span>
        </a>
      </aside>

      {/* Navigation mobile */}
      <button
        className="ibiza-mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {menuOpen && (
        <nav className="ibiza-mobile-navigation">
          <span className="mobile-menu-title">ENTRE DANS LA NUIT.</span>
          {links.map((link, i) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
              <span className="mobile-link-index">0{i + 1}</span>
              {link.label}
              <ArrowUpRight size={17} />
            </a>
          ))}
        </nav>
      )}

      {/* Typographie monumentale de bas de page */}
      <div className="ibiza-marquee" aria-hidden="true">
        <span>IBIZA CLUB · IBIZA CLUB · IBIZA CLUB · IBIZA CLUB · </span>
      </div>

      {/* Accès rapides mobile */}
      <div className="ibiza-mobile-actions">
        <a href="https://shotgun.live/" target="_blank" rel="noreferrer">
          ÉVÉNEMENTS <ArrowUpRight size={16} />
        </a>
        <a href="/reservation">
          RÉSERVER <ArrowUpRight size={16} />
        </a>
      </div>
    </main>
  );
}
