"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/testimonials-data";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 352; // min-w-[320px] + gap
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = 352;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  return (
    <section id="depoimentos" className="py-24 bg-[#0A1628] text-white relative overflow-hidden">
      {/* Decorative sparkle dots */}
      <div className="absolute top-12 left-12 w-2 h-2 rounded-full bg-[#3B82F6]/40 animate-pulse" />
      <div className="absolute top-24 right-20 w-1.5 h-1.5 rounded-full bg-[#06D6A0]/40 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-16 left-1/4 w-2 h-2 rounded-full bg-[#3B82F6]/30 animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-24 right-1/3 w-1.5 h-1.5 rounded-full bg-[#06D6A0]/30 animate-pulse" style={{ animationDelay: "0.5s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#06D6A0] text-sm font-semibold tracking-widest uppercase">
            Testemunhos
          </span>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mt-3">
            O Que Dizem os Nossos{" "}
            <span className="gradient-text">Clientes</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06D6A0] mx-auto mt-6 rounded-full" />
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[320px] max-w-[340px] snap-center flex-shrink-0 bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-colors"
            >
              {/* Quote mark */}
              <Quote size={32} className="text-[#3B82F6]/30 mb-4" />

              {/* Text */}
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-6" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06D6A0] flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatarInitials}
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-white/50 text-xs">
                    {testimonial.service}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, si) => (
                    <Star
                      key={si}
                      size={14}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-[#06D6A0] w-8"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Ir para testemunho ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
