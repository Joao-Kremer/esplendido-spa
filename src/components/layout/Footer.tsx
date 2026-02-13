"use client";

import { Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { PHONE, PHONE_LINK, EMAIL } from "@/lib/constants";

export default function Footer() {
  const serviceLinks = [
    "Limpeza Doméstica", "Limpeza Comercial", "Higienização de Sofás",
    "Limpeza de Condomínios", "Limpeza Pós Obra", "Limpeza de Vidros",
    "Higienização de Colchões", "Higienização de Tapetes",
  ];

  return (
    <footer className="relative bg-[#0A1628] text-white">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 36C840 48 960 64 1080 64C1200 64 1320 48 1380 40L1440 32V80H0Z" fill="#0A1628" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Col 1 - Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-[family-name:var(--font-heading)] font-bold">
                <span className="text-white">E</span>
                <span className="gradient-text">splêndido</span>
              </span>
              <span className="text-[#06D6A0] text-xs">✦</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Serviço de limpeza profissional com garantia de satisfação. Transformamos espaços com excelência.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#5B9BD5] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#5B9BD5] transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Col 2 - Services */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button onClick={() => document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" })} className="text-white/60 text-sm hover:text-[#06D6A0] transition-colors">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              {["Sobre Nós", "FAQ", "Contactos", "Política de Privacidade", "Termos de Serviço"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/60 text-sm hover:text-[#06D6A0] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] font-semibold mb-4">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"><Phone size={16} /></div>
                <a href={PHONE_LINK} className="text-white/60 text-sm hover:text-white transition-colors">{PHONE}</a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"><Mail size={16} /></div>
                <a href={`mailto:${EMAIL}`} className="text-white/60 text-sm hover:text-white transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"><Clock size={16} /></div>
                <span className="text-white/60 text-sm">Dom-Seg: 08:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#5B9BD5]/40 to-transparent my-12" />

        {/* Bottom */}
        <div className="text-center text-white/40 text-sm">
          © {new Date().getFullYear()} Esplêndido. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
