"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import { Users, Sparkles, Clock, ShieldCheck } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
}

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const stats: Stat[] = [
  {
    icon: <Users size={24} />,
    target: 500,
    suffix: "+",
    label: "Clientes Satisfeitos",
  },
  {
    icon: <Sparkles size={24} />,
    target: 2000,
    suffix: "+",
    label: "Limpezas Realizadas",
  },
  {
    icon: <Clock size={24} />,
    target: 8,
    suffix: "",
    label: "Anos de Experiência",
  },
  {
    icon: <ShieldCheck size={24} />,
    target: 100,
    suffix: "%",
    label: "Garantia de Satisfação",
  },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center">
              {stat.icon}
            </div>
            <div className="text-4xl font-[family-name:var(--font-heading)] font-bold text-[#0A1628]">
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                inView={inView}
              />
            </div>
            <div className="text-sm text-gray-text">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
