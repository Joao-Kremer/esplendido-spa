"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const zones = [
  {
    name: "Lisboa Centro",
    areas: "Baixa, Chiado, Avenida, Saldanha, Marquês, Parque das Nações, Benfica, Lumiar, Telheiras, Campo de Ourique",
  },
  {
    name: "Margem Sul",
    areas: "Almada, Seixal, Barreiro, Montijo, Setúbal",
  },
];

export default function CoverageMap() {
  return (
    <section className="bg-neutral py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-dark md:text-4xl">
            Onde atuamos
          </h2>
          <p className="mt-3 text-dark/50">
            Cobertura em Lisboa e Margem Sul
          </p>
        </div>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-lg flex-1"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-dark/5 p-4">
              {/* SVG Map of Lisbon & Margem Sul region */}
              <svg viewBox="0 0 500 500" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                {/* Water / Tejo */}
                <path
                  d="M0 200 Q100 220 200 210 Q300 200 400 230 Q450 245 500 240 L500 280 Q400 300 300 290 Q200 280 100 295 Q50 300 0 290 Z"
                  fill="#00DAFF"
                  opacity="0.15"
                />
                <path
                  d="M0 210 Q100 230 200 220 Q300 210 400 240 Q450 255 500 250 L500 270 Q400 290 300 280 Q200 270 100 285 Q50 290 0 280 Z"
                  fill="#00DAFF"
                  opacity="0.08"
                />

                {/* Lisboa region - north of river */}
                <ellipse
                  cx="220"
                  cy="150"
                  rx="140"
                  ry="100"
                  fill="none"
                  stroke="#00DAFF"
                  strokeWidth="2.5"
                  strokeDasharray="8 4"
                  opacity="0.6"
                />
                <ellipse
                  cx="220"
                  cy="150"
                  rx="140"
                  ry="100"
                  fill="#00DAFF"
                  opacity="0.06"
                />

                {/* Lisboa label */}
                <text x="220" y="100" textAnchor="middle" fill="#0A1628" fontSize="14" fontWeight="700" fontFamily="var(--font-heading)">
                  Lisboa Centro
                </text>

                {/* Lisboa pin dots */}
                {[
                  { x: 200, y: 140, label: "Baixa" },
                  { x: 240, y: 130, label: "Chiado" },
                  { x: 260, y: 155, label: "Saldanha" },
                  { x: 310, y: 140, label: "P. Nações" },
                  { x: 160, y: 120, label: "Benfica" },
                  { x: 190, y: 170, label: "C. Ourique" },
                  { x: 230, y: 180, label: "Avenida" },
                  { x: 280, y: 110, label: "Lumiar" },
                ].map((pin) => (
                  <g key={pin.label}>
                    <circle cx={pin.x} cy={pin.y} r="4" fill="#00DAFF" opacity="0.8" />
                    <circle cx={pin.x} cy={pin.y} r="7" fill="none" stroke="#00DAFF" strokeWidth="1" opacity="0.3" />
                    <text x={pin.x} y={pin.y - 10} textAnchor="middle" fill="#0A1628" fontSize="8" opacity="0.5">
                      {pin.label}
                    </text>
                  </g>
                ))}

                {/* Margem Sul region - south of river */}
                <ellipse
                  cx="250"
                  cy="370"
                  rx="160"
                  ry="80"
                  fill="none"
                  stroke="#00DAFF"
                  strokeWidth="2.5"
                  strokeDasharray="8 4"
                  opacity="0.6"
                />
                <ellipse
                  cx="250"
                  cy="370"
                  rx="160"
                  ry="80"
                  fill="#00DAFF"
                  opacity="0.06"
                />

                {/* Margem Sul label */}
                <text x="250" y="330" textAnchor="middle" fill="#0A1628" fontSize="14" fontWeight="700" fontFamily="var(--font-heading)">
                  Margem Sul
                </text>

                {/* Margem Sul pin dots */}
                {[
                  { x: 180, y: 360, label: "Almada" },
                  { x: 240, y: 380, label: "Seixal" },
                  { x: 300, y: 370, label: "Barreiro" },
                  { x: 350, y: 360, label: "Montijo" },
                  { x: 280, y: 410, label: "Setúbal" },
                ].map((pin) => (
                  <g key={pin.label}>
                    <circle cx={pin.x} cy={pin.y} r="4" fill="#00DAFF" opacity="0.8" />
                    <circle cx={pin.x} cy={pin.y} r="7" fill="none" stroke="#00DAFF" strokeWidth="1" opacity="0.3" />
                    <text x={pin.x} y={pin.y - 10} textAnchor="middle" fill="#0A1628" fontSize="8" opacity="0.5">
                      {pin.label}
                    </text>
                  </g>
                ))}

                {/* Bridge indicator */}
                <line x1="180" y1="240" x2="220" y2="300" stroke="#0A1628" strokeWidth="1.5" opacity="0.15" strokeDasharray="4 3" />
                <line x1="280" y1="240" x2="300" y2="300" stroke="#0A1628" strokeWidth="1.5" opacity="0.15" strokeDasharray="4 3" />

                {/* Rio Tejo label */}
                <text x="380" y="260" textAnchor="middle" fill="#00DAFF" fontSize="11" fontStyle="italic" opacity="0.5">
                  Rio Tejo
                </text>
              </svg>
            </div>
          </motion.div>

          {/* Zone details */}
          <div className="flex flex-1 flex-col gap-6">
            {zones.map((zone, i) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-xl border border-primary/15 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-dark">{zone.name}</h3>
                </div>
                <p className="text-sm leading-relaxed text-dark/50">{zone.areas}</p>
              </motion.div>
            ))}

            <p className="text-sm text-dark/40">
              Não encontrou a sua zona? Entre em contacto — podemos ter cobertura na sua área.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
