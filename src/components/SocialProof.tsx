"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { stats, testimonials } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          setDisplayed(obj.val.toFixed(decimals));
        },
      });
    });

    return () => ctx.revert();
  }, [value, decimals]);

  return (
    <span ref={ref}>
      {displayed}
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  return (
    <section id="depoimentos" className="bg-neutral py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Stats */}
        <div className="mb-20 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div className="text-center">
                <p className={`font-heading text-4xl font-extrabold md:text-5xl ${stat.color}`}>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </p>
                <p className="mt-1 text-sm text-dark/50">{stat.label}</p>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden h-12 w-px bg-primary/15 md:block" />
              )}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-dark md:text-4xl">
            O que dizem os nossos clientes
          </h2>
        </div>

        {/* Mobile: draggable carousel */}
        <motion.div
          className="flex cursor-grab gap-6 overflow-hidden pb-4 active:cursor-grabbing md:hidden"
          drag="x"
          dragConstraints={{ left: -(testimonials.length - 1) * 296, right: 0 }}
          dragElastic={0.1}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[280px] rounded-2xl border-l-[3px] border-primary bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-golden text-golden" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-dark">{t.text}</p>
              <p className="mt-4 font-heading text-sm font-bold text-dark">{t.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop: static grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border-l-[3px] border-primary bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-golden text-golden" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-dark">{t.text}</p>
              <p className="mt-4 font-heading text-sm font-bold text-dark">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
