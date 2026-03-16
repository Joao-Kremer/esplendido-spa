# Esplêndido — Landing Page Redesign

## Overview

Redesign da landing page da Esplêndido, empresa de serviços de limpeza doméstica e comercial em Lisboa e Margem Sul. O objetivo é criar uma versão modernizada com estética minimalista/tech (SaaS-like) mas com elementos amigáveis e humanos (imagens reais, prova social), focada em conversão via WhatsApp com wizard de pré-qualificação.

## Público-alvo

- Famílias/residências (foco principal) e empresas/escritórios
- Zona: Lisboa Centro e Margem Sul

## Objetivo de conversão

WhatsApp como canal único. O visitante passa por um wizard (drawer/modal) que coleta todas as informações necessárias e abre o WhatsApp com mensagem pré-formatada, eliminando o vai-e-vem inicial.

## Stack técnico

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS 4
- **Animações**: Framer Motion (scroll/entrada) + GSAP (microinterações, counters, parallax)
- **3D**: Three.js + React Three Fiber (apenas no Hero)
- **Ícones**: Lucide React
- **Forms**: React Hook Form + Zod (wizard)
- **Fontes**: Space Grotesk (headings), Inter (body)

## Tema (globals.css)

Todas as cores, fontes e animações DEVEM usar as variáveis do tema:

| Variável | Valor | Uso |
|----------|-------|-----|
| `--color-primary` | #00DAFF | Destaques, glows, ícones, badges, CTA principal |
| `--color-cta` | #00458B | Gradientes com primary, botões secundários |
| `--color-accent` | #FF2C6F | Elementos de destaque pontual, diferenciação |
| `--color-golden` | #FAC72C | Estrelas, avaliações, números de impacto |
| `--color-dark` | #0A1628 | Fundos escuros, texto principal |
| `--color-neutral` | #F7F9FA | Fundos claros |
| `--color-white` | #FFFFFF | Texto sobre dark, cards |
| `--font-heading` | Space Grotesk | Todos os títulos |
| `--font-body` | Inter | Corpo de texto |

Animações do tema: `shimmer`, `float`, `pulse-glow`, `fade-in-up`, `slide-in-left`, `slide-in-right`, `bubble-float`, `spin-slow`, `wave`.

Classes utilitárias: `glass`, `gradient-text`, `glow-cyan`.

## Estrutura da página

6 seções + 1 componente overlay (wizard):

### 1. Navbar

- **Posição**: fixed, top, z-50, glassmorphism (class `glass`)
- **Esquerda**: logo "esplêndido" em texto (placeholder para imagem futura), `font-heading`, weight 700
- **Centro**: links âncora — Serviços, Como Funciona, Depoimentos (scroll suave)
- **Direita**: botão CTA "Agendar" em `primary` — abre wizard drawer
- **Mobile**: hamburger menu com drawer lateral, glass effect
- **Comportamento**: transparente no topo, ganha fundo glass ao scroll (threshold ~50px)

### 2. Hero

- **Layout**: split — conteúdo à esquerda, imagem à direita
- **Fundo**: `dark` (#0A1628) com cena Three.js (partículas/bolhas sutis flutuando em `primary` com opacidade baixa, lazy-loaded)
- **Lado esquerdo**:
  - Badge "Disponível hoje" com dot pulsante (`pulse-glow`) em `primary`
  - Headline: "Sua casa merece ser **esplêndida**" — "esplêndida" com class `gradient-text` (cta → primary, conforme CSS)
  - Subtítulo em `white` 50% opacidade, `font-body`
  - CTA: "Agendar pelo WhatsApp" em `primary` com `glow-cyan` — abre wizard
  - Prova social inline: estrelas em `golden` + "300+ clientes" | "100% garantia"
- **Lado direito**:
  - Imagem real com fade gradient para esquerda (mistura com `dark`)
  - Card flutuante glassmorphism (class `glass`) "Próximo horário" com animação `float`
- **Mobile**: empilha verticalmente, imagem no topo com overlay, conteúdo embaixo

### 3. Serviços

- **Fundo**: `neutral` (#F7F9FA)
- **Título**: "Nossos Serviços" centrado, `font-heading`
- **Subtítulo**: "Soluções de limpeza para cada necessidade" em opacidade reduzida
- **Grid**: 4 colunas desktop, 2 tablet, 1 mobile
- **Cards** (8 serviços: Doméstica, Comercial, Sofás, Pós-obra, Vidros, Bolor, Colchões, Tapetes):
  - Fundo `white`, border-radius 12px, sombra sutil
  - Ícone Lucide no topo em `primary`
  - Nome do serviço em bold, `font-heading`
  - Descrição curta (1 linha), `font-body`
  - Hover: translateY -4px, sombra mais forte, borda `primary` sutil
  - Click: abre wizard drawer com esse serviço pré-selecionado
- **Animação**: `fade-in-up` escalonado (stagger) via Framer Motion ao scroll

### 4. Como Funciona

- **Fundo**: `dark` (#0A1628) — contraste com seção anterior
- **Título**: "Como funciona" centrado, `white`, `font-heading`
- **Layout**: 3 passos em linha horizontal (desktop), vertical (mobile)
- **Cada passo**:
  - Número grande em `golden`
  - Ícone Lucide — passo 1 em `accent`, passo 2 em `primary`, passo 3 em `golden`
  - Título curto: "Escolha o serviço" → "Agende pelo WhatsApp" → "Receba a equipa"
  - Descrição breve em `white` 50%
- **Conexão entre passos**: linha tracejada em `primary` 20% opacidade (horizontal desktop, vertical mobile)
- **CTA final**: botão gradiente `primary` → `cta` centrado abaixo — abre wizard
- **Animação**: steps entram sequencialmente ao scroll (stagger), linha "desenha-se" com GSAP

### 5. Prova Social (Depoimentos + Stats)

- **Fundo**: `neutral` (#F7F9FA)
- **Stats** (topo):
  - 3 blocos em linha: "300+" em `primary`, "4.9★" em `golden`, "20+" em `accent`
  - Labels em `dark` com opacidade reduzida
  - Números animam com counter (GSAP) ao entrar em viewport
  - Separados por linha vertical `primary` 15% opacidade
- **Depoimentos**:
  - Título: "O que dizem os nossos clientes", `font-heading`, cor `dark`
  - Carousel horizontal com 4 cards (Framer Motion drag/snap)
  - Cada card:
    - Fundo `white`, border-radius 16px, sombra sutil
    - Estrelas em `golden` no topo
    - Texto do depoimento em `dark`, `font-body`
    - Nome do cliente em bold
    - Borda esquerda 3px em `primary`
  - Mobile: scroll horizontal nativo com snap
  - Animação: `fade-in-up` escalonado ao scroll

### 6. Footer

- **Fundo**: `dark` (#0A1628)
- **Layout**: 3 colunas desktop, empilhado mobile
- **Coluna 1 — Marca**:
  - Logo "esplêndido" em texto `white`, `font-heading`
  - Descrição curta em `white` 40% opacidade
  - Ícones redes sociais (Facebook, Instagram, TikTok) em `white` 50%, hover `primary`
- **Coluna 2 — Contactos**:
  - Telefone: 910 725 044
  - Email: contatocliente@esplendidoapp.com
  - Horário: Seg-Sex 08:00-17:00
  - Zona: Lisboa & Margem Sul
  - Ícones Lucide ao lado, cor `primary`
- **Coluna 3 — Links rápidos**:
  - Serviços, Como Funciona, Depoimentos — scroll âncora
  - CTA "Agendar pelo WhatsApp" em `primary`, texto `dark`
- **Base**: linha separadora `white` 10% opacidade + copyright em `white` 30%

### Wizard Drawer (Componente Overlay)

- **Trigger**: qualquer CTA na página
- **Posição**: drawer lateral direito, overlay `dark` 60% opacidade
- **Fundo drawer**: `white`, border-radius esquerdo 20px
- **Progress bar** no topo em `primary`
- **Passos**:
  1. **Serviço** — grid de ícones clicáveis (pré-selecionado se veio de um card de serviço)
  2. **Frequência** — 4 botões: Pontual, Semanal, Quinzenal, Mensal
  3. **Área (m²)** — input numérico (sempre m², sem tipologias)
  4. **Zona** — Lisboa Centro, Margem Sul, Outra
  5. **Observações** — textarea opcional
- **Botão final**: "Enviar pelo WhatsApp" em `primary` com ícone WhatsApp
  - Abre `wa.me/351910725044?text=` com mensagem formatada contendo todas as escolhas
- **Animação**: `slide-in-right` ao abrir, transições suaves entre steps
- **Mobile**: full-screen em vez de drawer lateral
- **Validação**: React Hook Form + Zod — serviço e área são obrigatórios, resto opcional

## Dados dos serviços

| Serviço | Ícone Lucide |
|---------|-------------|
| Limpeza Doméstica | Home |
| Limpeza Comercial | Building2 |
| Higienização Sofás | Sofa |
| Limpeza Pós-obra | HardHat |
| Vidros/Janelas/Estores | PanelTop |
| Bolor e Humidade | Droplets |
| Higiene Colchões | Bed |
| Higiene Tapetes | SquareStack |

## Dados dos depoimentos

| Nome | Depoimento |
|------|-----------|
| Marta Pereira | "Minha casa parece nova depois da limpeza. Equipa muito simpática." |
| Manuel Oliveira | "Serviço de limpeza de janelas impecável." |
| João Santos | "Atendimento de primeira, serviço de alta qualidade." |
| Ana Silveira | "Limpeza pós-obra incrível." |

## Formato da mensagem WhatsApp

```
Olá! Gostaria de agendar um serviço:

📋 Serviço: {serviço selecionado}
🔄 Frequência: {frequência}
📐 Área: {x} m²
📍 Zona: {zona}
📝 Observações: {texto livre}

Aguardo contacto. Obrigado!
```

## Responsividade

- **Desktop**: >= 1024px — layout completo
- **Tablet**: 768px-1023px — grids 2 colunas, wizard drawer
- **Mobile**: < 768px — single column, wizard full-screen, hamburger nav

## Performance

- Three.js lazy-loaded (dynamic import) apenas no Hero
- Imagens com next/image para otimização automática
- Framer Motion com `whileInView` + `viewport={{ once: true }}` para animações de scroll
- Fonte preloaded (já configurado no layout.tsx)
