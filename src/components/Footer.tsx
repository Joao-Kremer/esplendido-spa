import { Phone, Mail, Clock, MapPin, Facebook, Instagram } from "lucide-react";
import { contacts } from "@/lib/data";

interface FooterProps {
  onOpenWizard: () => void;
}

export default function Footer({ onOpenWizard }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cta py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold text-white">
              esplêndido
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              Serviços de limpeza profissional em Lisboa e Margem Sul.
              Equipa treinada, produtos eco-friendly e 100% garantia de satisfação.
            </p>
            <div className="mt-6 flex gap-4">
              <a href={contacts.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/50 transition-colors hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href={contacts.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 transition-colors hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href={contacts.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/50 transition-colors hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white/70">
              Contactos
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={16} className="text-primary" />
                {contacts.phone}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={16} className="text-primary" />
                {contacts.email}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Clock size={16} className="text-primary" />
                {contacts.hours}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <MapPin size={16} className="text-primary" />
                {contacts.area}
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white/70">
              Links rápidos
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#servicos" className="text-sm text-white/60 transition-colors hover:text-primary">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="text-sm text-white/60 transition-colors hover:text-primary">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-sm text-white/60 transition-colors hover:text-primary">
                  Depoimentos
                </a>
              </li>
            </ul>
            <button
              onClick={onOpenWizard}
              className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-dark transition-transform hover:scale-105"
            >
              Agendar pelo WhatsApp
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/30">
          © {currentYear} Esplêndido. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
