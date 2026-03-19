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
    <section id="cobertura" className="bg-neutral py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header — mesmo padrão das outras secções */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-dark md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-dark/50">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-stretch">
          {/* Mapa */}
          <div className="w-full overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm lg:w-1/2" style={{ height: "420px" }}>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-9.3%2C38.62%2C-9.0%2C38.80&layer=mapnik&marker=38.7223%2C-9.1393"
              className="block h-full w-full border-0"
              title="Mapa de cobertura"
              loading="lazy"
            />
          </div>

          {/* Regiões — mesmo estilo dos cards de serviços */}
          <div className="flex w-full flex-col justify-center gap-4 lg:w-1/2">
            {zones.map((zone) => (
              <div
                key={zone.name}
                className="group flex items-center gap-4 rounded-xl border border-transparent bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${zone.color}15` }}
                >
                  <MapPin size={20} style={{ color: zone.color }} />
                </div>
                <span className="font-heading text-lg font-bold text-dark">{zone.name}</span>
              </div>
            ))}
            <p className="mt-2 text-sm text-dark/40">{t("notFound")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
