# i18n Multilingual Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add multilingual support (PT-PT, EN, PT-BR, ES) with URL-based routing, browser detection, and navbar language selector.

**Architecture:** Use `next-intl` with App Router. All routes move under `src/app/[locale]/`. A middleware detects browser language and redirects. All hardcoded text moves to JSON message files. PT-PT is the default locale.

**Tech Stack:** next-intl, Next.js App Router dynamic segments, JSON message files

---

## File Structure

### New files to create:
- `messages/pt.json` — Portuguese (Portugal) translations (default)
- `messages/en.json` — English translations
- `messages/pt-br.json` — Portuguese (Brazil) translations
- `messages/es.json` — Spanish translations
- `src/i18n/request.ts` — next-intl server config
- `src/i18n/routing.ts` — locale routing config
- `src/middleware.ts` — locale detection + redirect middleware
- `src/app/[locale]/layout.tsx` — localized root layout (move from `src/app/layout.tsx`)
- `src/app/[locale]/page.tsx` — localized home page (move from `src/app/page.tsx`)
- `src/app/[locale]/api/booking/route.ts` — move API route
- `src/components/LanguageSelector.tsx` — navbar language picker

### Files to modify:
- `next.config.ts` — add next-intl plugin
- `src/components/Navbar.tsx` — add LanguageSelector
- `src/components/Hero.tsx` — replace hardcoded text with `useTranslations`
- `src/components/StorySection.tsx` — replace hardcoded text
- `src/components/Services.tsx` — replace hardcoded text
- `src/components/HowItWorks.tsx` — replace hardcoded text
- `src/components/SocialProof.tsx` — replace hardcoded text
- `src/components/CoverageMap.tsx` — replace hardcoded text
- `src/components/FinalCTA.tsx` — replace hardcoded text
- `src/components/Footer.tsx` — replace hardcoded text
- `src/components/ChatBot.tsx` — replace hardcoded text
- `src/components/ChatBotBubble.tsx` — replace aria-label
- `src/lib/data.ts` — make translatable (function that receives translations)
- `src/lib/chatbot-flows.ts` — make translatable
- `src/lib/wizard-schema.ts` — make translatable

### Files to delete:
- `src/app/layout.tsx` (moved to `[locale]`)
- `src/app/page.tsx` (moved to `[locale]`)

---

## Chunk 1: Setup next-intl + routing infrastructure

### Task 1: Install next-intl

- [ ] **Step 1: Install the package**

```bash
npm install next-intl
```

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install next-intl"
```

---

### Task 2: Create routing config

**Files:**
- Create: `src/i18n/routing.ts`

- [ ] **Step 1: Create routing config**

```ts
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "pt-br", "es"],
  defaultLocale: "pt",
});
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n/routing.ts
git commit -m "feat: add next-intl routing config"
```

---

### Task 3: Create server request config

**Files:**
- Create: `src/i18n/request.ts`

- [ ] **Step 1: Create request config**

```ts
// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n/request.ts
git commit -m "feat: add next-intl server request config"
```

---

### Task 4: Create middleware

**Files:**
- Create: `src/middleware.ts`

- [ ] **Step 1: Create middleware with browser detection**

```ts
// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add i18n middleware with browser locale detection"
```

---

### Task 5: Update next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add next-intl plugin**

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 2: Commit**

```bash
git add next.config.ts
git commit -m "feat: integrate next-intl plugin in next.config"
```

---

### Task 6: Move app routes under [locale]

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`
- Delete: `src/app/layout.tsx` (keep globals.css and favicon in src/app/)
- Delete: `src/app/page.tsx`

- [ ] **Step 1: Create localized layout**

```tsx
// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://esplendido.pt"),
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  const htmlLang = locale === "pt-br" ? "pt-BR" : locale === "pt" ? "pt-PT" : locale;

  return (
    <html lang={htmlLang} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Move page.tsx to [locale]**

Copy `src/app/page.tsx` to `src/app/[locale]/page.tsx` (content unchanged for now).

- [ ] **Step 3: Delete old layout.tsx and page.tsx**

```bash
rm src/app/layout.tsx src/app/page.tsx
```

- [ ] **Step 4: Move API route**

```bash
mkdir -p src/app/[locale]/api/booking
mv src/app/api/booking/route.ts src/app/[locale]/api/booking/route.ts
```

Note: API routes may not need locale. If `next-intl` causes issues with API routes, move it back to `src/app/api/` and add `/api` to the middleware matcher exclusion. Test this.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: move app routes under [locale] segment"
```

---

## Chunk 2: Create translation files (all 4 languages)

### Task 7: Create PT (default) message file

**Files:**
- Create: `messages/pt.json`

- [ ] **Step 1: Create the full PT translation file**

This file must contain ALL translatable strings organized by namespace. Structure:

```json
{
  "metadata": {
    "title": "Esplêndido | Serviços de Limpeza Profissional em Portugal",
    "description": "Limpeza doméstica, comercial e higienização profissional. Equipa treinada, produtos eco-friendly e 100% garantia de satisfação. Orçamento grátis!"
  },
  "navbar": {
    "about": "Sobre",
    "services": "Serviços",
    "howItWorks": "Como Funciona",
    "testimonials": "Depoimentos",
    "coverage": "Cobertura",
    "cta": "Agendar"
  },
  "hero": {
    "headlineTop": "Sua casa merece",
    "headlineBottom": "ser",
    "headlineHighlight": "esplêndida",
    "subtitle1": "Equipa fixa e treinada ao seu serviço.",
    "subtitle2": "Lisboa & Margem Sul.",
    "cta": "Agendar pelo WhatsApp",
    "clients": "300+ clientes",
    "guarantee": "100% garantia",
    "imageAlt": "Serviço de limpeza profissional"
  },
  "story": {
    "title": "Conheça a Esplêndido",
    "subtitle": "A nossa história contada passo a passo",
    "steps": [
      {
        "title": "O Nosso Empenho",
        "text": "Estamos constantemente a melhorar os nossos já elevados padrões para que nos veja como a melhor empresa do sector.",
        "highlights": [
          "Limpezas diárias, semanais ou mensais",
          "Equipa fixa e treinada",
          "Melhor relação qualidade-preço"
        ]
      },
      {
        "title": "Como Funcionamos",
        "text": "A nossa especialidade é eliminar o stress de qualquer aspeto da limpeza. Reserve online em 60 segundos.",
        "highlights": [
          "Agendamento em 60 segundos",
          "Equipa verificada — 5 estrelas",
          "Gerencie tudo online"
        ]
      },
      {
        "title": "Satisfação Garantida",
        "text": "Na Esplêndido, estamos totalmente vinculados e segurados, o que significa que pode ter paz de espírito quando entramos em sua casa. A qualidade do nosso serviço é a nossa maior prioridade.",
        "highlights": [
          "Totalmente vinculados e segurados",
          "Compromisso com a excelência"
        ]
      },
      {
        "title": "Produtos Eco-Friendly",
        "text": "Produtos biodegradáveis que não prejudicam o ambiente, os animais de estimação ou os seres humanos.",
        "highlights": [
          "100% biodegradáveis e seguros",
          "Rede extensa em Lisboa e Margem Sul"
        ]
      }
    ]
  },
  "services": {
    "title": "Nossos Serviços",
    "subtitle": "Soluções de limpeza para cada necessidade",
    "viewMore": "Ver mais",
    "book": "Agendar",
    "bookService": "Agendar {service}",
    "includes": "O que inclui",
    "items": [
      {
        "name": "Limpeza Doméstica",
        "description": "Limpeza de pó, desinfetação e aspiração",
        "details": [
          "A nossa equipa limpa minuciosamente todos os cantos de cada divisão, do teto ao chão!",
          "Utilizamos produtos específicos para cada superfície, garantindo uma limpeza profunda e segura."
        ],
        "includes": [
          "Limpeza de poeira em todas as divisões",
          "Desinfetação de superfícies com produtos específicos",
          "Aspiração profissional e limpeza com esfregona",
          "Limpeza e desinfetação de móveis (interior e exterior)",
          "Desinfetação completa de artigos sanitários",
          "Troca de roupa de cama e substituição de sacos de lixo",
          "Lavagem e secagem de louça",
          "Limpeza de vidros, janelas, azulejos, portas e rodapés"
        ]
      },
      {
        "name": "Limpeza Comercial",
        "description": "Espaços comerciais e empresariais",
        "details": [
          "Garantimos um ambiente saudável e produtivo para funcionários e clientes, melhorando a imagem corporativa.",
          "Começamos com uma avaliação inicial onde visitamos o local para entender as necessidades específicas e criamos um plano customizado."
        ],
        "includes": [
          "Entradas e recepção: aspiração, limpeza de pisos, tapetes, portas e maçanetas",
          "Escritórios: limpeza de mesas, cadeiras, desinfetação de teclados, mouses e telefones",
          "Casas de banho: desinfetação completa de pisos, sanitários, pias e espelhos",
          "Salas de descanso: limpeza de móveis e desinfetação de áreas de alto contacto",
          "Esvaziamento de lixeiras e reposição de consumíveis"
        ]
      },
      {
        "name": "Higienização Sofás",
        "description": "Pulverização, escovagem e lavagem",
        "details": [
          "Serviço fundamental para manter um ambiente limpo e saudável, eliminando sujidade, ácaros, odores e manchas dos estofados.",
          "Utilizamos metodologias avançadas e produtos adaptados ao tipo de tecido do seu sofá."
        ],
        "includes": [
          "Inspeção inicial para identificar áreas de sujidade e manchas",
          "Aspiração profunda com aspiradores de alta potência",
          "Aplicação de produtos específicos que eliminam ácaros e bactérias",
          "Remoção de odores indesejados e desodorização completa",
          "Extração para secagem rápida"
        ]
      },
      {
        "name": "Limpeza Pós-obra",
        "description": "Recolha de entulho e limpeza profunda",
        "details": [
          "Serviço essencial para preparar um imóvel recém-construído ou renovado para uso.",
          "Eliminamos resíduos de construção, pó, manchas de tinta, cimento e outros materiais, higienizando todas as superfícies de forma profunda."
        ],
        "includes": [
          "Remoção de resíduos: restos de madeira, cimento e detritos",
          "Aspiração e higienização de pisos, paredes, tetos, portas e janelas",
          "Limpeza de vidros, rodapés, tomadas e interruptores",
          "Higienização completa de cozinhas e casas de banho",
          "Desinfetação de maçanetas, corrimãos e luminárias",
          "Inspeção final de qualidade antes da entrega"
        ]
      },
      {
        "name": "Vidros/Janelas/Estores",
        "description": "Limpeza interior e exterior com produtos específicos",
        "details": [
          "Serviço essencial para manter a luminosidade e a estética de qualquer espaço.",
          "Combinamos técnicas profissionais com produtos adequados para remover acumulações de poeira, manchas e sujidade."
        ],
        "includes": [
          "Vidros: remoção interna e externa de poeira, manchas e marcas digitais",
          "Janelas: limpeza de molduras, caixilhos e esquadrias",
          "Verificação e limpeza de trilhos e canais de drenagem",
          "Estores: remoção de poeira, teias de aranha e sujidade",
          "Verificação e lubrificação dos mecanismos de funcionamento"
        ]
      },
      {
        "name": "Bolor e Humidade",
        "description": "Remoção de fungos em paredes e tetos",
        "details": [
          "Serviço que visa garantir a saúde e a integridade de ambientes internos através da remoção eficaz de fungos e mofo.",
          "Seguimos uma abordagem sistemática: avaliação, remoção, tratamento preventivo e secagem completa."
        ],
        "includes": [
          "Inspeção detalhada para identificar áreas afetadas e origem da humidade",
          "Remoção de bolor com produtos especializados",
          "Tratamento de superfícies variadas: paredes, tetos, pisos e móveis",
          "Aplicação de soluções antifúngicas preventivas",
          "Secagem completa das áreas tratadas"
        ]
      },
      {
        "name": "Higiene Colchões",
        "description": "Pulverização, escovagem e lavagem",
        "details": [
          "Serviço essencial para manter um ambiente de sono saudável e livre de ácaros, bactérias e alérgenos.",
          "Especialmente importante para pessoas com sensibilidades alérgicas ou problemas respiratórios."
        ],
        "includes": [
          "Inspeção inicial para identificar áreas de sujidade e manchas",
          "Aspiração profunda com aspiradores de alta potência",
          "Aplicação de produtos de limpeza e desinfetantes específicos para o tecido",
          "Eliminação de ácaros, bactérias e microrganismos nocivos",
          "Remoção de manchas e odores indesejados"
        ]
      },
      {
        "name": "Higiene Tapetes",
        "description": "Aspiração profunda e shampoo",
        "details": [
          "Processo completo de limpeza profunda para manter a limpeza e a durabilidade dos seus tapetes.",
          "Trabalhamos com produtos específicos e adequados ao tipo de fibra de cada tapete."
        ],
        "includes": [
          "Inspeção inicial para determinar tipo de tecido e identificar manchas",
          "Aspiração profunda com aspiradores de alta potência",
          "Lavagem especializada com produtos adequados ao tipo de fibra",
          "Remoção de manchas, odores e microrganismos",
          "Restauração da aparência original do tapete"
        ]
      }
    ]
  },
  "howItWorks": {
    "title": "Como funciona",
    "cta": "Agendar agora",
    "steps": [
      {
        "title": "Escolha o serviço",
        "description": "Selecione o tipo de limpeza que precisa no nosso menu de serviços."
      },
      {
        "title": "Agende pelo WhatsApp",
        "description": "Preencha os detalhes e envie diretamente para o nosso WhatsApp."
      },
      {
        "title": "Receba a equipa",
        "description": "A nossa equipa treinada chega na data marcada, pronta para transformar o seu espaço."
      }
    ]
  },
  "socialProof": {
    "title": "O que dizem os nossos clientes",
    "stats": [
      { "label": "Clientes felizes" },
      { "label": "Avaliação média" },
      { "label": "Profissionais" }
    ],
    "testimonials": [
      { "name": "Marta Pereira", "text": "Minha casa parece nova depois da limpeza. Equipa muito simpática." },
      { "name": "Manuel Oliveira", "text": "Serviço de limpeza de janelas impecável." },
      { "name": "João Santos", "text": "Atendimento de primeira, serviço de alta qualidade." },
      { "name": "Ana Silveira", "text": "Limpeza pós-obra incrível." }
    ]
  },
  "coverage": {
    "title": "Onde atuamos",
    "subtitle": "Cobertura em Lisboa e Margem Sul",
    "notFound": "Não encontrou a sua zona? Entre em contacto — podemos ter cobertura na sua área.",
    "zones": [
      {
        "name": "Lisboa Centro",
        "areas": "Baixa, Chiado, Avenida, Saldanha, Marquês, Parque das Nações, Benfica, Lumiar, Telheiras, Campo de Ourique"
      },
      {
        "name": "Margem Sul",
        "areas": "Almada, Seixal, Barreiro, Montijo, Setúbal"
      }
    ],
    "mapLabels": {
      "lisboaCentro": "Lisboa Centro",
      "margemSul": "Margem Sul",
      "rioTejo": "Rio Tejo"
    }
  },
  "finalCta": {
    "badge": "Agende em 60 segundos",
    "headlineTop": "Pronto para ter a sua",
    "headlineBottom": "casa",
    "headlineHighlight": "esplêndida",
    "subtitle": "Escolha o serviço, diga-nos o que precisa e receba a nossa equipa treinada na sua porta. Sem compromisso.",
    "cta": "Agendar pelo WhatsApp",
    "phone": "ou ligue 910 725 044"
  },
  "footer": {
    "brand": "esplêndido",
    "description": "Serviços de limpeza profissional em Lisboa e Margem Sul. Equipa treinada, produtos eco-friendly e 100% garantia de satisfação.",
    "contacts": "Contactos",
    "quickLinks": "Links rápidos",
    "copyright": "© {year} Esplêndido. Todos os direitos reservados.",
    "bookCta": "Agendar pelo WhatsApp"
  },
  "chatbot": {
    "openChat": "Abrir chat",
    "menu": {
      "greeting": "Olá! Sou o assistente da Esplêndido. Como posso ajudar?",
      "bookService": "📋 Agendar Serviço",
      "knowServices": "🔍 Conhecer Serviços",
      "support": "💬 Falar com Suporte",
      "about": "🏢 Sobre a Esplêndido",
      "locations": "📍 Locais de Atendimento",
      "products": "🧴 Produtos Utilizados",
      "faq": "❓ Perguntas Frequentes"
    },
    "booking": {
      "whichService": "Qual serviço precisa?",
      "frequency": "Com que frequência?",
      "oneTime": "Pontual",
      "weekly": "Semanal",
      "biweekly": "Quinzenal",
      "monthly": "Mensal",
      "skip": "Pular",
      "areaQuestion": "Qual a área do espaço em m²?",
      "enterArea": "Inserir área",
      "zoneQuestion": "Qual a zona?",
      "lisboaCentro": "Lisboa Centro",
      "margemSul": "Margem Sul",
      "other": "Outra",
      "notesQuestion": "Tem alguma observação?",
      "yesWrite": "Sim, quero escrever",
      "noSendNow": "Não, enviar agora",
      "submitEmail": "📧 Enviar pedido",
      "restart": "🔄 Recomeçar"
    },
    "support": {
      "question": "Como prefere entrar em contacto com o nosso suporte?",
      "whatsapp": "💬 WhatsApp",
      "whatsappMessage": "Olá, preciso de suporte.",
      "call": "📞 Ligar agora",
      "backToMenu": "Voltar ao menu"
    },
    "about": {
      "line1": "A Esplêndido é uma empresa de serviços de limpeza profissional em Lisboa e Margem Sul.",
      "line2": "Com mais de 300 clientes satisfeitos, oferecemos equipa fixa e treinada, produtos eco-friendly e 100% garantia de satisfação.",
      "line3": "A nossa missão é transformar espaços com qualidade, confiança e um atendimento esplêndido.",
      "backToMenu": "Voltar ao menu"
    },
    "locations": {
      "intro": "Atualmente atendemos nas seguintes zonas:",
      "lisboa": "📍 Lisboa Centro — Baixa, Chiado, Avenida, Saldanha, Marquês, Parque das Nações, Benfica, Lumiar, Telheiras, Campo de Ourique",
      "margemSul": "📍 Margem Sul — Almada, Seixal, Barreiro, Montijo, Setúbal",
      "cta": "Quer agendar um serviço na sua zona?",
      "bookService": "Agendar Serviço",
      "backToMenu": "Voltar ao menu"
    },
    "products": {
      "intro": "Utilizamos apenas produtos profissionais eco-friendly e biodegradáveis, seguros para crianças e animais de estimação.",
      "general": "🧴 Limpeza geral: Produtos multi-superfície certificados",
      "disinfection": "🌿 Desinfetação: Soluções hospitalares de baixa toxicidade",
      "upholstery": "🛋️ Estofados: Shampoos neutros específicos para tecidos",
      "compliance": "Todos os nossos produtos são aprovados e seguem normas europeias de segurança.",
      "backToMenu": "Voltar ao menu"
    },
    "faq": {
      "title": "Sobre o que gostaria de saber?",
      "guaranteeQ": "Qual a garantia?",
      "guaranteeA": "Oferecemos 100% garantia de satisfação. A nossa equipa é treinada para entregar sempre o melhor resultado, com total compromisso e profissionalismo.",
      "paymentQ": "Como funciona o pagamento?",
      "paymentA": "O pagamento é feito após a realização do serviço. Aceitamos transferência bancária e MBWay. Para planos mensais, o pagamento é feito ao final do primeiro mês.",
      "teamQ": "A equipa é fixa?",
      "teamA": "Sim! Mantemos a mesma equipa para cada cliente, para que conheçam o seu espaço e as suas preferências.",
      "presenceQ": "Preciso estar em casa?",
      "presenceA": "Não é obrigatório. Muitos clientes entregam a chave à nossa equipa de confiança. Todos os profissionais são verificados e segurados.",
      "priceQ": "Quero saber o preço",
      "priceA": "Para um orçamento personalizado, entre em contacto pelo WhatsApp!",
      "openWhatsApp": "Abrir WhatsApp",
      "priceWhatsApp": "Olá, gostaria de saber o preço dos serviços.",
      "anotherQuestion": "Outra pergunta",
      "backToMenu": "Voltar ao menu"
    },
    "servicesInfo": {
      "title": "Sobre qual serviço gostaria de saber mais?",
      "bookThis": "📋 Agendar este serviço",
      "otherService": "Outro serviço",
      "backToMenu": "Voltar ao menu",
      "includesLabel": "O que inclui:"
    }
  },
  "wizard": {
    "selectService": "Selecione um serviço",
    "enterArea": "Insira a área em m²",
    "whatsappGreeting": "Olá! Gostaria de agendar um serviço:",
    "serviceLabel": "📋 Serviço:",
    "frequencyLabel": "🔄 Frequência:",
    "areaLabel": "📐 Área:",
    "zoneLabel": "📍 Zona:",
    "notesLabel": "📝 Observações:",
    "closing": "Aguardo contacto. Obrigado!"
  },
  "common": {
    "hours": "Seg-Sex 08:00-17:00",
    "area": "Lisboa & Margem Sul"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add messages/pt.json
git commit -m "feat: add PT-PT translation file"
```

---

### Task 8: Create EN translation file

**Files:**
- Create: `messages/en.json`

- [ ] **Step 1: Create full EN translation**

Same structure as `messages/pt.json` but with all values translated to English. Key translations:

- Limpeza Doméstica → Residential Cleaning
- Limpeza Comercial → Commercial Cleaning
- Higienização Sofás → Sofa Cleaning
- Limpeza Pós-obra → Post-Construction Cleaning
- Vidros/Janelas/Estores → Windows/Glass/Blinds
- Bolor e Humidade → Mold & Moisture
- Higiene Colchões → Mattress Cleaning
- Higiene Tapetes → Carpet Cleaning
- Agendar pelo WhatsApp → Book via WhatsApp
- Seg-Sex → Mon-Fri
- etc.

- [ ] **Step 2: Commit**

```bash
git add messages/en.json
git commit -m "feat: add EN translation file"
```

---

### Task 9: Create PT-BR translation file

**Files:**
- Create: `messages/pt-br.json`

- [ ] **Step 1: Create full PT-BR translation**

Same structure. Key differences from PT-PT:
- "equipa" → "equipe"
- "telemóvel" → "celular"
- "casa de banho" → "banheiro"
- "esfregona" → "rodo/mop"
- "estores" → "persianas"
- "contacto" → "contato"
- "divisão" → "cômodo"
- etc.

- [ ] **Step 2: Commit**

```bash
git add messages/pt-br.json
git commit -m "feat: add PT-BR translation file"
```

---

### Task 10: Create ES translation file

**Files:**
- Create: `messages/es.json`

- [ ] **Step 1: Create full ES translation**

Same structure, all values in Spanish.

- [ ] **Step 2: Commit**

```bash
git add messages/es.json
git commit -m "feat: add ES translation file"
```

---

## Chunk 3: Add LanguageSelector + update components

### Task 11: Create LanguageSelector component

**Files:**
- Create: `src/components/LanguageSelector.tsx`

- [ ] **Step 1: Create the selector component**

```tsx
// src/components/LanguageSelector.tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

const locales = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "pt-br", label: "BR" },
  { code: "es", label: "ES" },
];

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(newLocale: string) {
    // Replace current locale prefix in pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.replace(segments.join("/"));
    setOpen(false);
  }

  const current = locales.find((l) => l.code === locale);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      >
        <Globe size={16} />
        <span>{current?.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 rounded-lg border border-white/10 bg-dark/95 py-1 shadow-lg backdrop-blur-md">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/10 ${
                l.code === locale ? "text-primary" : "text-white/70"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LanguageSelector.tsx
git commit -m "feat: add LanguageSelector component"
```

---

### Task 12: Update Navbar with LanguageSelector

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Add LanguageSelector and useTranslations to Navbar**

Import `LanguageSelector` and `useTranslations` from `next-intl`. Replace hardcoded navLinks labels and CTA text with `t('key')`. Add `<LanguageSelector />` next to the desktop CTA. Also add it inside the mobile drawer.

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add language selector to navbar"
```

---

### Task 13: Update Hero component

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Replace hardcoded text with useTranslations('hero')**

```tsx
const t = useTranslations("hero");
// Then use t("headlineTop"), t("headlineHighlight"), t("cta"), etc.
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: i18n Hero component"
```

---

### Task 14: Update StorySection component

**Files:**
- Modify: `src/components/StorySection.tsx`

- [ ] **Step 1: Replace hardcoded text with useTranslations('story')**

Use `t("title")`, `t("subtitle")`. For story steps array, use `t.raw("steps")` to get the array from translations.

- [ ] **Step 2: Commit**

```bash
git add src/components/StorySection.tsx
git commit -m "feat: i18n StorySection component"
```

---

### Task 15: Update Services component

**Files:**
- Modify: `src/components/Services.tsx`

- [ ] **Step 1: Replace hardcoded text with useTranslations('services')**

Service data now comes from translations. The `icon` mapping stays in code (associate by index from services in data.ts to translations). Use `t("title")`, `t("subtitle")`, and `t.raw("items")` for the service array.

- [ ] **Step 2: Commit**

```bash
git add src/components/Services.tsx
git commit -m "feat: i18n Services component"
```

---

### Task 16: Update HowItWorks component

- [ ] **Step 1: Replace hardcoded text with useTranslations('howItWorks')**
- [ ] **Step 2: Commit**

---

### Task 17: Update SocialProof component

- [ ] **Step 1: Replace hardcoded text with useTranslations('socialProof')**

Stats values/suffixes stay in code. Labels and testimonial text come from translations.

- [ ] **Step 2: Commit**

---

### Task 18: Update CoverageMap component

- [ ] **Step 1: Replace hardcoded text with useTranslations('coverage')**

Map pin labels (neighborhood names) are proper nouns and stay as-is. Zone names and UI text come from translations.

- [ ] **Step 2: Commit**

---

### Task 19: Update FinalCTA component

- [ ] **Step 1: Replace hardcoded text with useTranslations('finalCta')**
- [ ] **Step 2: Commit**

---

### Task 20: Update Footer component

- [ ] **Step 1: Replace hardcoded text with useTranslations('footer')**

Contact info (phone, email) stays from data.ts (not translatable). Labels come from translations.

- [ ] **Step 2: Commit**

---

## Chunk 4: Chatbot + data layer i18n

### Task 21: Refactor chatbot-flows.ts to use translations

**Files:**
- Modify: `src/lib/chatbot-flows.ts`

- [ ] **Step 1: Make flows a function that receives a translation function**

Change `flows` from a static export to a function `getFlows(t: (key: string) => string)` that builds the flow objects using translation keys. The `ChatBot.tsx` component will call this with the chatbot translations.

Similarly update `getFlowNode` to accept translations.

- [ ] **Step 2: Commit**

```bash
git add src/lib/chatbot-flows.ts
git commit -m "feat: i18n chatbot flows"
```

---

### Task 22: Update ChatBot.tsx to use translations

**Files:**
- Modify: `src/components/ChatBot.tsx`

- [ ] **Step 1: Add useTranslations('chatbot') and pass to getFlows**

```tsx
const t = useTranslations("chatbot");
// Pass t to getFlows to build localized flows
```

Also translate any hardcoded text in ChatBot.tsx (summary generation, input placeholders, etc.).

- [ ] **Step 2: Commit**

```bash
git add src/components/ChatBot.tsx
git commit -m "feat: i18n ChatBot component"
```

---

### Task 23: Update wizard-schema.ts

**Files:**
- Modify: `src/lib/wizard-schema.ts`

- [ ] **Step 1: Make validation messages and WhatsApp template translatable**

Change `wizardSchema` to a function that receives translation strings. Update `buildWhatsAppUrl` to accept translated labels.

- [ ] **Step 2: Commit**

```bash
git add src/lib/wizard-schema.ts
git commit -m "feat: i18n wizard schema and WhatsApp template"
```

---

### Task 24: Update data.ts

**Files:**
- Modify: `src/lib/data.ts`

- [ ] **Step 1: Remove translatable text from data.ts**

Keep only non-translatable data: icons, contacts, stat values/suffixes/colors, step numbers/colors. Remove all Portuguese text strings (names, descriptions, etc.) — these now live in the JSON message files.

- [ ] **Step 2: Commit**

```bash
git add src/lib/data.ts
git commit -m "refactor: remove translatable text from data.ts"
```

---

## Chunk 5: Final verification

### Task 25: Build and verify

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: successful build with no errors.

- [ ] **Step 2: Test each locale manually**

Visit:
- `http://localhost:3000/pt` — Portuguese (default)
- `http://localhost:3000/en` — English
- `http://localhost:3000/pt-br` — Brazilian Portuguese
- `http://localhost:3000/es` — Spanish

Verify:
- All text is translated
- Language selector works and changes URL
- Chatbot works in all languages
- WhatsApp messages are sent in the correct language
- Browser language detection works (clear cookies, change browser language)

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete i18n with 4 languages (PT, EN, PT-BR, ES)"
```
