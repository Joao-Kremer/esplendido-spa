"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const zones = [
  { name: "Lisboa", color: "#00DAFF" },
  { name: "Cascais", color: "#FAC72C" },
  { name: "Almada", color: "#00DAFF" },
  { name: "Seixal", color: "#FAC72C" },
];

export default function CoverageMap() {
  const t = useTranslations("coverage");

  return (
    <section id="cobertura" className="bg-neutral py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-dark md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-dark/50">{t("subtitle")}</p>
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          {/* Mapa interactivo */}
          <div className="w-full overflow-hidden rounded-xl shadow-md ring-1 ring-dark/5 md:w-[380px] md:shrink-0">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-9.3%2C38.62%2C-9.0%2C38.80&layer=mapnik&marker=38.7223%2C-9.1393"
              width="380"
              height="320"
              className="block h-[320px] w-full"
              title="Mapa de cobertura"
              loading="lazy"
            />
          </div>

          {/* Regiões */}
          <div className="flex w-full flex-col gap-3">
            {zones.map((zone) => (
              <div
                key={zone.name}
                className="flex items-center gap-3 rounded-lg border border-dark/5 bg-white px-4 py-3 shadow-sm"
              >
                <MapPin size={16} style={{ color: zone.color }} />
                <span className="text-sm font-semibold text-dark">{zone.name}</span>
              </div>
            ))}
            <p className="mt-1 text-xs text-dark/35">{t("notFound")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
