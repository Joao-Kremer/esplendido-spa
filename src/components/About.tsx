"use client";

import { motion } from "framer-motion";
import { Clock, Users, ShieldCheck, Award, Leaf, ThumbsUp } from "lucide-react";

const highlights = [
  { icon: Clock, text: "Limpezas diárias, semanais ou mensais" },
  { icon: Users, text: "Equipa fixa e treinada" },
  { icon: ShieldCheck, text: "Totalmente vinculados e segurados" },
  { icon: Award, text: "Melhor relação qualidade-preço" },
  { icon: Leaf, text: "Materiais e equipamentos adequados" },
  { icon: ThumbsUp, text: "100% garantia de satisfação" },
];

export default function About() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="font-heading text-3xl font-bold text-dark md:text-4xl">
              Sobre a Esplêndido
            </h2>
            <p className="mt-5 text-base leading-relaxed text-dark/60">
              A limpeza pode ser uma tarefa árdua e sabemos que tem muitas opções
              quando pensa em contratar um serviço de limpeza. Por isso, estamos
              constantemente a tentar melhorar os nossos já elevados padrões para
              que nos veja como a melhor empresa do sector.
            </p>
            <p className="mt-4 text-base leading-relaxed text-dark/60">
              Quando o fim de semana finalmente chega, é preferível pôr os pés no
              chão enquanto um serviço de limpeza faz o trabalho, em vez de passar
              o seu precioso tempo de inatividade a esfregar as mãos e os joelhos.
            </p>
            <p className="mt-4 text-base leading-relaxed text-dark/60">
              A nossa equipa de limpeza conta com formação profissional e, caso não
              fique satisfeito, refazemos o trabalho gratuitamente. Estamos
              totalmente vinculados e segurados para garantir a sua segurança.
            </p>
          </motion.div>

          {/* Right — highlights grid */}
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3 rounded-xl border border-neutral bg-neutral/50 p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium leading-snug text-dark/70">
                    {item.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
