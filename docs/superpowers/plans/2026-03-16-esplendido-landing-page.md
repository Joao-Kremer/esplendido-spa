# Esplêndido Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, dark-themed landing page for Esplêndido cleaning services with Three.js hero, 6 sections, and a WhatsApp conversion wizard drawer.

**Architecture:** Single-page Next.js 16 app. All sections are client components composed in `page.tsx`. Shared data lives in `src/lib/data.ts`. The wizard drawer uses React Hook Form + Zod for validation and generates a WhatsApp URL. Three.js scene is lazy-loaded only in the Hero.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion, GSAP, Three.js + React Three Fiber, Lucide React, React Hook Form, Zod

**Spec:** `docs/superpowers/specs/2026-03-16-esplendido-landing-page-design.md`

---

## File Structure

```
src/
├── app/
│   ├── globals.css          (exists — no changes)
│   ├── layout.tsx            (exists — no changes)
│   └── page.tsx              (exists — compose all sections)
├── components/
│   ├── Navbar.tsx            (fixed nav, glass effect on scroll)
│   ├── Hero.tsx              (split layout, badge, CTA, proof)
│   ├── BubbleScene.tsx       (Three.js particle scene, lazy-loaded)
│   ├── Services.tsx          (8 service cards grid)
│   ├── HowItWorks.tsx        (3-step flow with GSAP line)
│   ├── SocialProof.tsx       (stats counters + testimonial carousel)
│   ├── Footer.tsx            (3-column footer)
│   └── WizardDrawer.tsx      (multi-step wizard overlay)
├── hooks/
│   └── useScrollPosition.ts  (scroll Y tracker for navbar)
└── lib/
    ├── data.ts               (services, testimonials, steps, contacts)
    └── wizard-schema.ts      (Zod schema + WhatsApp URL builder)
```

---

## Chunk 1: Foundation + Data Layer

### Task 1: Create shared data file

**Files:**
- Create: `src/lib/data.ts`

- [ ] **Step 1: Create `src/lib/data.ts`**

```typescript
import {
  Home,
  Building2,
  Sofa,
  HardHat,
  PanelTop,
  Droplets,
  Bed,
  SquareStack,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  { name: "Limpeza Doméstica", description: "Limpeza de pó, desinfetação e aspiração", icon: Home },
  { name: "Limpeza Comercial", description: "Espaços comerciais e empresariais", icon: Building2 },
  { name: "Higienização Sofás", description: "Pulverização, escovagem e lavagem", icon: Sofa },
  { name: "Limpeza Pós-obra", description: "Recolha de entulho e limpeza profunda", icon: HardHat },
  { name: "Vidros/Janelas/Estores", description: "Limpeza interior e exterior com produtos específicos", icon: PanelTop },
  { name: "Bolor e Humidade", description: "Remoção de fungos em paredes e tetos", icon: Droplets },
  { name: "Higiene Colchões", description: "Pulverização, escovagem e lavagem", icon: Bed },
  { name: "Higiene Tapetes", description: "Aspiração profunda e shampoo", icon: SquareStack },
];

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  { name: "Marta Pereira", text: "Minha casa parece nova depois da limpeza. Equipa muito simpática.", rating: 5 },
  { name: "Manuel Oliveira", text: "Serviço de limpeza de janelas impecável.", rating: 5 },
  { name: "João Santos", text: "Atendimento de primeira, serviço de alta qualidade.", rating: 5 },
  { name: "Ana Silveira", text: "Limpeza pós-obra incrível.", rating: 5 },
];

export interface Step {
  number: string;
  title: string;
  description: string;
  iconColor: string;
}

export const steps: Step[] = [
  { number: "01", title: "Escolha o serviço", description: "Selecione o tipo de limpeza que precisa no nosso menu de serviços.", iconColor: "text-accent" },
  { number: "02", title: "Agende pelo WhatsApp", description: "Preencha os detalhes e envie diretamente para o nosso WhatsApp.", iconColor: "text-primary" },
  { number: "03", title: "Receba a equipa", description: "A nossa equipa treinada chega na data marcada, pronta para transformar o seu espaço.", iconColor: "text-golden" },
];

export const stats = [
  { value: 300, suffix: "+", label: "Clientes felizes", color: "text-primary" },
  { value: 4.9, suffix: "★", label: "Avaliação média", color: "text-golden", decimals: 1 },
  { value: 20, suffix: "+", label: "Profissionais", color: "text-accent" },
];

export const contacts = {
  phone: "910 725 044",
  email: "contatocliente@esplendidoapp.com",
  whatsapp: "351910725044",
  hours: "Seg-Sex 08:00-17:00",
  area: "Lisboa & Margem Sul",
  social: {
    facebook: "https://facebook.com/esplendido",
    instagram: "https://instagram.com/esplendido",
    tiktok: "https://tiktok.com/@esplendido",
  },
};

export const frequencyOptions = ["Pontual", "Semanal", "Quinzenal", "Mensal"] as const;
export const zoneOptions = ["Lisboa Centro", "Margem Sul", "Outra"] as const;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: add shared data constants for services, testimonials, steps, and contacts"
```

---

### Task 2: Create wizard schema and WhatsApp URL builder

**Files:**
- Create: `src/lib/wizard-schema.ts`

- [ ] **Step 1: Create `src/lib/wizard-schema.ts`**

```typescript
import { z } from "zod";
import { contacts } from "./data";

export const wizardSchema = z.object({
  service: z.string().min(1, "Selecione um serviço"),
  frequency: z.string().optional(),
  area: z.coerce.number().min(1, "Insira a área em m²"),
  zone: z.string().optional(),
  notes: z.string().optional(),
});

export type WizardFormData = z.infer<typeof wizardSchema>;

export function buildWhatsAppUrl(data: WizardFormData): string {
  const lines = [
    "Olá! Gostaria de agendar um serviço:",
    "",
    `📋 Serviço: ${data.service}`,
  ];

  if (data.frequency) lines.push(`🔄 Frequência: ${data.frequency}`);
  lines.push(`📐 Área: ${data.area} m²`);
  if (data.zone) lines.push(`📍 Zona: ${data.zone}`);
  if (data.notes) lines.push(`📝 Observações: ${data.notes}`);

  lines.push("", "Aguardo contacto. Obrigado!");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${contacts.whatsapp}?text=${text}`;
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/wizard-schema.ts
git commit -m "feat: add wizard Zod schema and WhatsApp URL builder"
```

---

### Task 3: Create scroll position hook

**Files:**
- Create: `src/hooks/useScrollPosition.ts`

- [ ] **Step 1: Create `src/hooks/useScrollPosition.ts`**

```typescript
"use client";

import { useState, useEffect } from "react";

export function useScrollPosition(threshold = 50): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useScrollPosition.ts
git commit -m "feat: add useScrollPosition hook for navbar glass effect"
```

---

## Chunk 2: Navbar + Hero + BubbleScene

### Task 4: Create Navbar component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create `src/components/Navbar.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
];

interface NavbarProps {
  onOpenWizard: () => void;
}

export default function Navbar({ onOpenWizard }: NavbarProps) {
  const isScrolled = useScrollPosition(50);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass bg-dark/80" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="font-heading text-xl font-bold text-white">
          esplêndido
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={onOpenWizard}
          className="hidden rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-dark transition-all hover:shadow-[0_0_12px_rgba(0,218,255,0.45),0_0_32px_rgba(0,218,255,0.2)] md:block"
        >
          Agendar
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white md:hidden"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="glass fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-dark/95 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-2xl font-bold text-white transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenWizard();
              }}
              className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-dark"
            >
              Agendar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Navbar with glass effect on scroll and mobile drawer"
```

---

### Task 5: Create BubbleScene (Three.js)

**Files:**
- Create: `src/components/BubbleScene.tsx`

- [ ] **Step 1: Create `src/components/BubbleScene.tsx`**

This is the Three.js particle scene, rendered only in the Hero background. It creates floating translucent bubbles/particles in `primary` color with low opacity.

```tsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 60 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sz[i] = Math.random() * 0.3 + 0.1;
    }
    return [pos, sz];
  }, [count]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += delta * 0.15 * (sizes[i] + 0.5);
      if (posArray[i * 3 + 1] > 4) {
        posArray[i * 3 + 1] = -4;
      }
      posArray[i * 3] += Math.sin(Date.now() * 0.001 + i) * delta * 0.05;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00DAFF"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function BubbleScene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/BubbleScene.tsx
git commit -m "feat: add Three.js particle scene for hero background"
```

---

### Task 6: Create Hero component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Star, Shield, MessageCircle } from "lucide-react";
import Image from "next/image";

const BubbleScene = dynamic(() => import("./BubbleScene"), { ssr: false });

interface HeroProps {
  onOpenWizard: () => void;
}

export default function Hero({ onOpenWizard }: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-dark">
      {/* Three.js background */}
      <BubbleScene />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center px-6 pt-24 md:flex-row md:gap-12 md:pt-0">
        {/* Left content */}
        <div className="flex flex-1 flex-col justify-center py-12 md:py-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5"
          >
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              Disponível hoje
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Sua casa merece
            <br />
            ser <span className="gradient-text">esplêndida</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-md text-base leading-relaxed text-white/50 md:text-lg"
          >
            Equipa fixa e treinada ao seu serviço.
            <br />
            Lisboa & Margem Sul.
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={onOpenWizard}
            className="mt-8 flex w-fit items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-dark glow-cyan transition-transform hover:scale-105"
          >
            <MessageCircle size={18} />
            Agendar pelo WhatsApp
          </motion.button>

          {/* Proof bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center gap-4 text-sm"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-golden text-golden" />
                ))}
              </div>
              <span className="text-white/40">300+ clientes</span>
            </div>
            <span className="text-white/15">|</span>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-primary" />
              <span className="text-white/40">100% garantia</span>
            </div>
          </motion.div>
        </div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative order-first flex-1 md:order-last"
        >
          <div className="relative h-[300px] w-full md:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=1000&fit=crop"
              alt="Serviço de limpeza profissional"
              fill
              className="rounded-2xl object-cover opacity-85"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Fade gradient left */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-transparent" />
            {/* Fade gradient bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

            {/* Floating card */}
            <div className="glass animate-float absolute bottom-6 right-6 rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-primary">PRÓXIMO HORÁRIO</p>
              <p className="text-lg font-bold text-white">Amanhã, 9h</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with Three.js background and split layout"
```

---

## Chunk 3: Services + HowItWorks

### Task 7: Create Services component

**Files:**
- Create: `src/components/Services.tsx`

- [ ] **Step 1: Create `src/components/Services.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";

interface ServicesProps {
  onOpenWizard: (preselectedService?: string) => void;
}

export default function Services({ onOpenWizard }: ServicesProps) {
  return (
    <section id="servicos" className="bg-neutral py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-dark md:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-3 text-dark/50">
            Soluções de limpeza para cada necessidade
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => onOpenWizard(service.name)}
                className="group cursor-pointer rounded-xl border border-transparent bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
              >
                <Icon size={32} className="mb-4 text-primary" />
                <h3 className="font-heading text-lg font-bold text-dark">
                  {service.name}
                </h3>
                <p className="mt-1 text-sm text-dark/50">
                  {service.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Services.tsx
git commit -m "feat: add Services section with animated card grid"
```

---

### Task 8: Create HowItWorks component

**Files:**
- Create: `src/components/HowItWorks.tsx`

- [ ] **Step 1: Create `src/components/HowItWorks.tsx`**

```tsx
"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ClipboardList, MessageCircle, Users } from "lucide-react";
import { steps } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stepIcons = [ClipboardList, MessageCircle, Users];

interface HowItWorksProps {
  onOpenWizard: () => void;
}

export default function HowItWorks({ onOpenWizard }: HowItWorksProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="como-funciona" className="bg-dark py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Como funciona
          </h2>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col items-center gap-12 md:flex-row md:justify-between md:gap-0">
          {/* Connecting line (desktop: horizontal, mobile: vertical) */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-[10%] bottom-[10%] w-px origin-top border-l-2 border-dashed border-primary/20 md:left-[15%] md:right-[15%] md:top-1/2 md:bottom-auto md:h-px md:w-auto md:origin-left md:border-l-0 md:border-t-2"
          />

          {steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center md:flex-1"
              >
                <span className="font-heading text-4xl font-extrabold text-golden">
                  {step.number}
                </span>
                <div className={`mt-4 rounded-xl bg-white/5 p-4 ${step.iconColor}`}>
                  <Icon size={28} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[240px] text-sm text-white/50">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenWizard}
            className="rounded-lg bg-gradient-to-r from-primary to-cta px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            Agendar agora
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/HowItWorks.tsx
git commit -m "feat: add HowItWorks section with GSAP line animation"
```

---

## Chunk 4: SocialProof + Footer

### Task 9: Create SocialProof component

**Files:**
- Create: `src/components/SocialProof.tsx`

- [ ] **Step 1: Create `src/components/SocialProof.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/SocialProof.tsx
git commit -m "feat: add SocialProof section with GSAP counters and testimonial cards"
```

---

### Task 10: Create Footer component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create `src/components/Footer.tsx`**

```tsx
import { Phone, Mail, Clock, MapPin, Facebook, Instagram } from "lucide-react";
import { contacts } from "@/lib/data";

interface FooterProps {
  onOpenWizard: () => void;
}

export default function Footer({ onOpenWizard }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold text-white">
              esplêndido
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              Serviços de limpeza profissional em Lisboa e Margem Sul.
              Equipa treinada, produtos eco-friendly e 100% garantia de satisfação.
            </p>
            <div className="mt-6 flex gap-4">
              <a href={contacts.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/50 transition-colors hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href={contacts.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 transition-colors hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href={contacts.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/50 transition-colors hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white/70">
              Contactos
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={16} className="text-primary" />
                {contacts.phone}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={16} className="text-primary" />
                {contacts.email}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Clock size={16} className="text-primary" />
                {contacts.hours}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <MapPin size={16} className="text-primary" />
                {contacts.area}
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white/70">
              Links rápidos
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#servicos" className="text-sm text-white/60 transition-colors hover:text-primary">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="text-sm text-white/60 transition-colors hover:text-primary">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-sm text-white/60 transition-colors hover:text-primary">
                  Depoimentos
                </a>
              </li>
            </ul>
            <button
              onClick={onOpenWizard}
              className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-dark transition-transform hover:scale-105"
            >
              Agendar pelo WhatsApp
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/30">
          © {currentYear} Esplêndido. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer with contacts, social links, and quick navigation"
```

---

## Chunk 5: WizardDrawer + Page Assembly

### Task 11: Create WizardDrawer component

**Files:**
- Create: `src/components/WizardDrawer.tsx`

- [ ] **Step 1: Create `src/components/WizardDrawer.tsx`**

```tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight, ChevronLeft, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { services, frequencyOptions, zoneOptions } from "@/lib/data";
import { wizardSchema, type WizardFormData, buildWhatsAppUrl } from "@/lib/wizard-schema";

interface WizardDrawerProps {
  open: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const TOTAL_STEPS = 5;

export default function WizardDrawer({ open, onClose, preselectedService }: WizardDrawerProps) {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      service: preselectedService ?? "",
      frequency: "",
      area: undefined,
      zone: "",
      notes: "",
    },
  });

  const selectedService = watch("service");
  const selectedFrequency = watch("frequency");
  const selectedZone = watch("zone");

  useEffect(() => {
    if (preselectedService) {
      setValue("service", preselectedService);
    }
  }, [preselectedService, setValue]);

  function onSubmit(data: WizardFormData) {
    const url = buildWhatsAppUrl(data);
    window.open(url, "_blank");
    handleClose();
  }

  function handleClose() {
    setStep(1);
    reset();
    onClose();
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  const canAdvance = () => {
    if (step === 1) return !!selectedService;
    if (step === 3) {
      const area = watch("area");
      return area !== undefined && area > 0;
    }
    return true;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl md:rounded-l-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral px-6 py-4">
                <h3 className="font-heading text-lg font-bold text-dark">
                  Agendar serviço
                </h3>
                <button onClick={handleClose} className="text-dark/40 hover:text-dark">
                  <X size={20} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-neutral">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <form id="wizard-form" onSubmit={handleSubmit(onSubmit)}>
                  {/* Step 1: Service */}
                  {step === 1 && (
                    <div>
                      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-dark/50">
                        Qual serviço precisa?
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {services.map((s) => {
                          const Icon = s.icon;
                          const isSelected = selectedService === s.name;
                          return (
                            <button
                              key={s.name}
                              type="button"
                              onClick={() => setValue("service", s.name)}
                              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5"
                                  : "border-neutral hover:border-primary/30"
                              }`}
                            >
                              <Icon size={24} className={isSelected ? "text-primary" : "text-dark/40"} />
                              <span className="text-xs font-medium text-dark">{s.name}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.service && (
                        <p className="mt-2 text-xs text-accent">{errors.service.message}</p>
                      )}
                    </div>
                  )}

                  {/* Step 2: Frequency */}
                  {step === 2 && (
                    <div>
                      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-dark/50">
                        Com que frequência?
                      </h4>
                      <div className="flex flex-col gap-3">
                        {frequencyOptions.map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setValue("frequency", f)}
                            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                              selectedFrequency === f
                                ? "border-primary bg-primary/5 text-dark"
                                : "border-neutral text-dark/60 hover:border-primary/30"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Area */}
                  {step === 3 && (
                    <div>
                      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-dark/50">
                        Qual a área do espaço?
                      </h4>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Ex: 80"
                          {...register("area")}
                          className="w-full rounded-xl border-2 border-neutral px-4 py-3 pr-12 text-dark outline-none transition-colors focus:border-primary"
                        />
                        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-dark/40">
                          m²
                        </span>
                      </div>
                      {errors.area && (
                        <p className="mt-2 text-xs text-accent">{errors.area.message}</p>
                      )}
                    </div>
                  )}

                  {/* Step 4: Zone */}
                  {step === 4 && (
                    <div>
                      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-dark/50">
                        Qual a zona?
                      </h4>
                      <div className="flex flex-col gap-3">
                        {zoneOptions.map((z) => (
                          <button
                            key={z}
                            type="button"
                            onClick={() => setValue("zone", z)}
                            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                              selectedZone === z
                                ? "border-primary bg-primary/5 text-dark"
                                : "border-neutral text-dark/60 hover:border-primary/30"
                            }`}
                          >
                            {z}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Notes */}
                  {step === 5 && (
                    <div>
                      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-dark/50">
                        Observações (opcional)
                      </h4>
                      <textarea
                        placeholder="Algo que devemos saber? Detalhes especiais, horário preferido..."
                        {...register("notes")}
                        rows={4}
                        className="w-full resize-none rounded-xl border-2 border-neutral px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary"
                      />
                    </div>
                  )}
                </form>
              </div>

              {/* Footer navigation */}
              <div className="flex items-center justify-between border-t border-neutral px-6 py-4">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center gap-1 text-sm text-dark/40 transition-colors hover:text-dark disabled:invisible"
                >
                  <ChevronLeft size={16} />
                  Voltar
                </button>

                {step < TOTAL_STEPS ? (
                  <button
                    onClick={nextStep}
                    disabled={!canAdvance()}
                    className="flex items-center gap-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                  >
                    Próximo
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="wizard-form"
                    className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:scale-105"
                  >
                    <MessageCircle size={16} />
                    Enviar pelo WhatsApp
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/WizardDrawer.tsx
git commit -m "feat: add WizardDrawer with 5-step flow and WhatsApp integration"
```

---

### Task 12: Assemble page.tsx

**Files:**
- Modify: `src/app/page.tsx` (replace entire file)

- [ ] **Step 1: Rewrite `src/app/page.tsx`**

```tsx
"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import WizardDrawer from "@/components/WizardDrawer";

export default function Home() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();

  const openWizard = useCallback((service?: string) => {
    setPreselectedService(service);
    setWizardOpen(true);
  }, []);

  const closeWizard = useCallback(() => {
    setWizardOpen(false);
    setPreselectedService(undefined);
  }, []);

  return (
    <>
      <Navbar onOpenWizard={() => openWizard()} />
      <main>
        <Hero onOpenWizard={() => openWizard()} />
        <Services onOpenWizard={openWizard} />
        <HowItWorks onOpenWizard={() => openWizard()} />
        <SocialProof />
        <Footer onOpenWizard={() => openWizard()} />
      </main>
      <WizardDrawer
        open={wizardOpen}
        onClose={closeWizard}
        preselectedService={preselectedService}
      />
    </>
  );
}
```

- [ ] **Step 2: Run dev server to verify everything renders**

Run: `cd /Users/kremer/freelance-projects/esplendido-spa && npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble landing page with all sections and wizard integration"
```

---

### Task 13: Visual QA and polish

After the build passes, run `npm run dev` and check each section in the browser:

- [ ] **Step 1: Check Navbar** — transparent at top, glass on scroll, mobile hamburger works
- [ ] **Step 2: Check Hero** — Three.js particles render, image loads, badge pulses, CTA opens wizard
- [ ] **Step 3: Check Services** — 8 cards in 4-col grid, hover effects work, clicking opens wizard with service pre-selected
- [ ] **Step 4: Check HowItWorks** — 3 steps visible, line draws on scroll, colors match spec (accent, primary, golden)
- [ ] **Step 5: Check SocialProof** — counters animate on scroll, testimonials scroll horizontally on mobile
- [ ] **Step 6: Check Footer** — 3 columns, all contact info correct, CTA opens wizard
- [ ] **Step 7: Check WizardDrawer** — all 5 steps work, progress bar updates, WhatsApp URL generates correctly
- [ ] **Step 8: Check mobile** — resize to <768px, verify stacking, wizard goes full-screen, hamburger menu works
- [ ] **Step 9: Fix any issues found and commit**

```bash
git add -A
git commit -m "fix: visual QA polish and responsive adjustments"
```
