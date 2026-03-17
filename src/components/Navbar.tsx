"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { createPortal } from "react-dom";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Cobertura", href: "#cobertura" },
];

interface NavbarProps {
  onOpenWizard: () => void;
}

export default function Navbar({ onOpenWizard }: NavbarProps) {
  const isScrolled = useScrollPosition(50);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-dark/90 shadow-lg backdrop-blur-md"
            : "bg-dark/60 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo */}
          <a href="#" className="font-heading text-xl font-bold text-white">
            esplêndido
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

          {/* Desktop CTA */}
          <button
            onClick={onOpenWizard}
            className="hidden rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-dark transition-all hover:shadow-[0_0_12px_rgba(0,218,255,0.45),0_0_32px_rgba(0,218,255,0.2)] lg:block"
          >
            Agendar
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-[70] text-white lg:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
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
                  aria-label="Fechar menu"
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
                  Agendar
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
