import { faqs } from "@/lib/faq-data";

export function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    name: "Esplêndido Limpezas",
    description: "Serviços de limpeza profissional em Portugal. Limpeza doméstica, comercial, higienização de sofás, colchões e tapetes.",
    telephone: "+351910725044",
    url: "https://esplendido.pt",
    priceRange: "$$",
    openingHours: "Mo-Su 08:00-20:00",
    address: { "@type": "PostalAddress", addressCountry: "PT" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500" },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Esplêndido",
    url: "https://esplendido.pt",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }} />
    </>
  );
}
