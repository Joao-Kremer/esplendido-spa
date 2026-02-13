import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://esplendido.pt"),
  title: "Esplêndido | Serviços de Limpeza Profissional em Portugal",
  description:
    "Limpeza doméstica, comercial e higienização profissional. Equipa treinada, produtos eco-friendly e 100% garantia de satisfação. Orçamento grátis!",
  keywords: [
    "limpeza profissional",
    "limpeza doméstica",
    "limpeza comercial",
    "higienização sofás",
    "higienização colchões",
    "limpeza Portugal",
    "empresa de limpeza",
    "limpeza pós obra",
    "produtos ecológicos",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Esplêndido",
    title: "Esplêndido | Limpeza Profissional que Transforma",
    description:
      "Serviços de limpeza premium com garantia de satisfação. Doméstica, comercial, higienização. Orçamento grátis!",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Esplêndido Limpezas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Esplêndido | Limpeza Profissional",
    description: "Transformamos espaços com limpeza de excelência.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
