"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";
import Image from "next/image";
import LanguageSelector from "./LanguageSelector";

interface NavbarProps {
  onOpenWizard: () => void;
}

export default function Navbar({ onOpenWizard }: NavbarProps) {
  const t = useTranslations("navbar");
  const isScrolled = useScrollPosition(50);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("about"), href: "#sobre" },
    { label: t("services"), href: "#servicos" },
    { label: t("howItWorks"), href: "#como-funciona" },
    { label: t("testimonials"), href: "#depoimentos" },
    { label: t("coverage"), href: "#cobertura" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-dark shadow-lg"
            : "bg-dark"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo */}
          <a href="#" className="relative px-1">
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes sparkleMove {
                0% { left: -10%; opacity: 0; transform: translateY(-50%) scale(0.3) rotate(0deg); }
                5% { opacity: 1; transform: translateY(-50%) scale(1) rotate(15deg); }
                15% { transform: translateY(-50%) scale(0.8) rotate(-10deg); }
                25% { left: 50%; transform: translateY(-50%) scale(1.1) rotate(20deg); }
                35% { transform: translateY(-50%) scale(0.7) rotate(-5deg); }
                45% { left: 105%; opacity: 1; transform: translateY(-50%) scale(1) rotate(15deg); }
                50% { left: 110%; opacity: 0; transform: translateY(-50%) scale(0.3) rotate(0deg); }
                100% { left: 110%; opacity: 0; }
              }
              .logo-sparkle {
                animation: sparkleMove 6s ease-in-out infinite;
              }
              .logo-sparkle svg {
                filter: drop-shadow(0 0 4px rgba(0,218,255,0.9)) drop-shadow(0 0 8px rgba(0,218,255,0.5));
              }
            `}} />
            <Image
              src="/images/esplendido-logo.png"
              alt="Esplêndido"
              width={150}
              height={50}
              className="relative h-8 w-auto sm:h-10"
              priority
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="logo-sparkle absolute top-1/2 -translate-y-1/2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="white" />
                </svg>
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA + Language */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSelector />
            <button
              onClick={onOpenWizard}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-dark transition-all hover:shadow-[0_0_12px_rgba(0,218,255,0.45),0_0_32px_rgba(0,218,255,0.2)]"
            >
              {t("cta")}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-[70] text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer — rendered via portal to escape header stacking context */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-dark lg:hidden"
              >
                {/* Close button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-3 right-4 flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>

                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-2xl font-bold text-white transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenWizard();
                  }}
                  className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-dark"
                >
                  {t("cta")}
                </button>

                {/* Language selector in mobile menu */}
                <div className="mt-4">
                  <LanguageSelector />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
