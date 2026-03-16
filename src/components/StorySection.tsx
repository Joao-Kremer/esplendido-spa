"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShieldCheck, Sparkles, Leaf, Clock, Users, Award, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import * as THREE from "three";

const storySteps = [
  {
    title: "O Nosso Empenho",
    text: "A limpeza pode ser uma tarefa árdua e sabemos que tem muitas opções quando pensa em contratar um serviço de limpeza. Por isso, estamos constantemente a tentar melhorar os nossos já elevados padrões para que nos veja como a melhor empresa do sector.",
    highlights: [
      { icon: Clock, label: "Limpezas diárias, semanais ou mensais" },
      { icon: Users, label: "Equipa fixa e treinada" },
      { icon: Award, label: "Melhor relação qualidade-preço" },
    ],
  },
  {
    title: "Como Funcionamos",
    text: "Quando o fim de semana finalmente chega, é preferível pôr os pés no chão enquanto um serviço de limpeza faz o trabalho. A nossa especialidade é eliminar o stress de qualquer aspeto da limpeza.",
    highlights: [
      { icon: Clock, label: "Agendamento em 60 segundos — reserve online" },
      { icon: ThumbsUp, label: "Equipa verificada e classificada 5 estrelas" },
      { icon: ShieldCheck, label: "Agende tudo online — visitas e serviços extra" },
    ],
  },
  {
    title: "Satisfação Garantida",
    text: "Na Esplêndido, estamos totalmente vinculados e segurados. A nossa equipa tem formação profissional e, se ficar insatisfeito, limpamos de novo no dia seguinte.",
    highlights: [
      { icon: Sparkles, label: "Refazemos sem custo adicional" },
      { icon: ShieldCheck, label: "Totalmente vinculados e segurados" },
    ],
  },
  {
    title: "A Nossa Experiência",
    text: "Estamos a dominar a indústria com uma rede extensa e adaptável que oferece resultados excepcionais. Produtos eco-friendly, biodegradáveis e seguros para todos.",
    highlights: [
      { icon: Leaf, label: "Produtos 100% biodegradáveis e seguros" },
      { icon: Award, label: "Rede extensa em Lisboa e Margem Sul" },
    ],
  },
];

// Three.js dust particle system that reacts to scroll
function DustParticles({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const count = 200;

  const [basePositions, velocities, sizes, opacities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const op = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
      vel[i * 3] = (Math.random() - 0.5) * 2;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 2;
      vel[i * 3 + 2] = (Math.random() - 0.3) * 1.5;
      sz[i] = Math.random() * 0.08 + 0.02;
      op[i] = Math.random() * 0.6 + 0.2;
    }
    return [pos, vel, sz, op];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const dispersal = Math.min(scrollProgress * 2.5, 1);

      // At 0 scroll: particles float gently in place
      // As scroll increases: particles fly outward (dispersing/cleaning)
      posArray[i * 3] = basePositions[i * 3] + velocities[i * 3] * dispersal * 8;
      posArray[i * 3 + 1] = basePositions[i * 3 + 1] + velocities[i * 3 + 1] * dispersal * 6;
      posArray[i * 3 + 2] = basePositions[i * 3 + 2] + velocities[i * 3 + 2] * dispersal * 10;

      // Gentle floating when not dispersed
      if (dispersal < 0.5) {
        posArray[i * 3 + 1] += Math.sin(Date.now() * 0.001 + i * 0.5) * 0.02;
        posArray[i * 3] += Math.cos(Date.now() * 0.0008 + i * 0.3) * 0.01;
      }
    }
    posAttr.needsUpdate = true;

    // Fade out material as particles disperse
    const mat = meshRef.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - scrollProgress * 2);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[basePositions.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#8B7355"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Sparkle particles that appear as dust clears
function SparkleParticles({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.PointsMaterial;
    // Sparkles fade in as dust fades out
    mat.opacity = Math.max(0, Math.min(1, (scrollProgress - 0.3) * 3));

    // Gentle twinkle
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(Date.now() * 0.002 + i) * 0.003;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00DAFF"
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <DustParticles scrollProgress={scrollProgress} />
      <SparkleParticles scrollProgress={scrollProgress} />
    </>
  );
}

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
      const rawProgress = (viewportHeight - rect.top) / (sectionHeight + viewportHeight);
      setScrollProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Background transitions from dirty brown-dark to clean neutral
  const bgOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      {/* Dirty background that fades */}
      <div
        className="absolute inset-0 bg-dark transition-opacity duration-300"
        style={{ opacity: bgOpacity }}
      />
      {/* Clean background always behind */}
      <div className="absolute inset-0 bg-neutral" style={{ zIndex: -1 }} />

      {/* Three.js particle overlay */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: bgOpacity > 0.1 ? 1 : 0 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Section header */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl"
            style={{ color: bgOpacity > 0.5 ? "rgba(255,255,255,0.9)" : "#0A1628" }}>
            Conheça a Esplêndido
          </h2>
          <p className="mt-3 transition-colors duration-500"
            style={{ color: bgOpacity > 0.5 ? "rgba(255,255,255,0.4)" : "rgba(10,22,40,0.5)" }}>
            Scroll para descobrir como transformamos os seus espaços
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {storySteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-primary/10 bg-white/95 p-7 shadow-lg backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-dark">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-dark/55">
                {step.text}
              </p>
              <div className="mt-5 space-y-2.5">
                {step.highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div key={h.label} className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/5">
                        <Icon size={14} className="text-primary" />
                      </div>
                      <span className="text-[13px] font-medium text-dark/60">{h.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
