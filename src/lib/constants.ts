import type { NavLink } from "@/types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://esplendido.pt";
export const COMPANY_NAME = "Esplêndido";
export const PHONE = "910 725 044";
export const PHONE_LINK = "tel:+351910725044";
export const WHATSAPP_NUMBER = "351910725044";
export const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os serviços de limpeza do Esplêndido.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const EMAIL = "info@esplendido.pt";

export const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Sobre", href: "#sobre" },
  { label: "Preços", href: "#precos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];
