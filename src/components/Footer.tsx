import { useTranslations } from "next-intl";
import { Phone, Mail, Clock, MapPin, Facebook, Instagram } from "lucide-react";
import { contacts } from "@/lib/data";
import Image from "next/image";

interface FooterProps {
  onOpenWizard: () => void;
}

export default function Footer({ onOpenWizard }: FooterProps) {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("navbar");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="relative inline-block px-1">
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
                .logo-sparkle { animation: sparkleMove 6s ease-in-out infinite; }
                .logo-sparkle svg { filter: drop-shadow(0 0 4px rgba(0,218,255,0.9)) drop-shadow(0 0 8px rgba(0,218,255,0.5)); }
              `}} />
              <Image
                src="/images/esplendido-logo.png"
                alt="Esplêndido"
                width={150}
                height={50}
                className="relative h-8 w-auto"
              />
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="logo-sparkle absolute top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              {t("description")}
            </p>
            <div className="mt-6 flex gap-3">
              <a href={contacts.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.07] text-white/60 ring-1 ring-white/[0.08] transition-all hover:bg-primary/20 hover:text-primary hover:ring-primary/30">
                <Facebook size={20} />
              </a>
              <a href={contacts.social.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.07] text-white/60 ring-1 ring-white/[0.08] transition-all hover:bg-primary/20 hover:text-primary hover:ring-primary/30">
                <Instagram size={20} />
              </a>
              <a href={contacts.social.tiktok} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.07] text-white/60 ring-1 ring-white/[0.08] transition-all hover:bg-primary/20 hover:text-primary hover:ring-primary/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white/70">
              {t("contacts")}
            </h4>
            <ul className="mt-4 space-y-1">
              <li className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 sm:py-2">
                <Phone size={16} className="shrink-0 text-primary" />
                {contacts.phone}
              </li>
              <li className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 sm:py-2">
                <Mail size={16} className="shrink-0 text-primary" />
                {contacts.email}
              </li>
              <li className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 sm:py-2">
                <Clock size={16} className="shrink-0 text-primary" />
                {tCommon("hours")}
              </li>
              <li className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 sm:py-2">
                <MapPin size={16} className="shrink-0 text-primary" />
                {tCommon("area")}
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white/70">
              {t("quickLinks")}
            </h4>
            <ul className="mt-4 space-y-1">
              <li>
                <a href="#servicos" className="inline-block rounded-lg px-2 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-primary sm:py-2">
                  {tNav("services")}
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="inline-block rounded-lg px-2 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-primary sm:py-2">
                  {tNav("howItWorks")}
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="inline-block rounded-lg px-2 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-primary sm:py-2">
                  {tNav("testimonials")}
                </a>
              </li>
            </ul>
            <button
              onClick={onOpenWizard}
              className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-dark transition-transform hover:scale-105"
            >
              {t("bookCta")}
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/30">
          {t("copyright", { year: currentYear })}
        </div>
      </div>
    </footer>
  );
}
