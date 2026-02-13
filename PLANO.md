# Esplendido SPA - Plano de Desenvolvimento v2

## Visao Geral

Uma landing page **premium, imersiva e cinematografica** para a empresa de limpezas Esplendido. Nao e um site de limpeza generico - e uma **experiencia visual** que transmite frescor, pureza e transformacao. Cada secao conta uma historia, com animacoes tematicas de limpeza integradas (bolhas, brilhos, vassouras animadas, superficies sendo limpas). O objetivo: o visitante sentir a limpeza so de navegar.

**Conceito criativo:** "Antes & Depois" - a pagina inteira e uma jornada de transformacao. Conforme o usuario faz scroll, o site visualmente "limpa" elementos, revela conteudo como se estivesse removendo sujeira, e usa metaforas visuais de purificacao.

---

## Stack Tecnica

| Tecnologia | Uso |
|---|---|
| **Next.js 15** (App Router) | Framework principal, deploy Vercel |
| **TypeScript** | Tipagem estatica |
| **Tailwind CSS v4** | Estilizacao utility-first |
| **Framer Motion** | Animacoes de scroll, transicoes, reveals, micro-interacoes |
| **Three.js + React Three Fiber + Drei** | Cenas 3D tematicas (bolhas, particulas, brilhos) |
| **GSAP ScrollTrigger** | Animacoes avancadas de scroll (wipe effects, parallax) |
| **Lottie React** | Animacoes vetoriais de limpeza (vassoura, spray, brilho) |
| **React Hook Form + Zod** | Formulario de contato com validacao |
| **Resend** | Envio de emails via API Route |
| **Google Tag Manager** | Google Ads + Facebook Pixel (preparado) |

---

## Paleta de Cores

### Cores Principais
| Nome | Hex | Uso |
|---|---|---|
| Deep Ocean | `#0A1628` | Backgrounds escuros, contraste premium |
| Royal Blue | `#1E56A0` | Headings, elementos primarios |
| Electric Blue | `#3B82F6` | CTAs, botoes, links hover |
| Cyan Glow | `#06D6A0` | Acentos, brilhos, badges de destaque |
| Ice White | `#F0F7FF` | Backgrounds das secoes claras |
| Pure White | `#FFFFFF` | Cards, texto sobre escuro |

### Gradientes
- **Hero gradient**: `#0A1628` -> `#1E3A5F` -> `#1E56A0` (noite para dia / sujo para limpo)
- **CTA gradient**: `#3B82F6` -> `#06D6A0` (energico, fresco)
- **Glow effect**: radial `#06D6A0` com opacity 0.15 (brilho de limpeza)

### Efeitos Visuais
- Glassmorphism (blur + transparencia) nos cards e navbar
- Glow neon sutil nos hovers e CTAs
- Gradientes mesh animados como background de secoes

---

## Tipografia

| Elemento | Fonte | Peso |
|---|---|---|
| Headings | **Space Grotesk** | Bold (700) |
| Body | **Inter** | Regular (400), Medium (500) |
| Acentos/Numeros | **Outfit** | Semi-Bold (600) |

Carregadas via `next/font/google` para performance maxima.

---

## Animacoes e Efeitos Tematicos de Limpeza

### Three.js - Cena Hero (Full-screen)
- **Bolhas de sabao 3D** flutuando por toda a tela, com reflexos iridescentes e fisica realista
- As bolhas reagem ao cursor do mouse (se afastam suavemente)
- Particulas de brilho ("sparkles") que surgem aleatoriamente
- Efeito de "agua limpa" - uma superficie reflectiva sutil no fundo
- Transicao suave: as bolhas se dissipam conforme o usuario scrolla para baixo

### Lottie Animations (Vetoriais, leves)
- **Vassoura animada** que "varre" o titulo do hero da esquerda para a direita, revelando o texto
- **Spray de limpeza** com particulas de produto sendo borrifado (usado como transicao entre secoes)
- **Brilho/Sparkle** que aparece quando cards entram na viewport
- **Gota d'agua** caindo e criando ripple effect (transicao)
- **Check animado** quando servicos aparecem na tela

### Scroll-Based Animations (GSAP + Framer Motion)
- **Wipe Reveal**: secoes sao "reveladas" com um efeito de pano limpando a tela - como se uma mao com pano estivesse limpando e revelando o conteudo por baixo
- **Counter animado**: numeros de estatisticas contam de 0 ate o valor final
- **Parallax em camadas**: backgrounds movem em velocidades diferentes criando profundidade
- **Stagger animations**: itens de lista aparecem um a um com delay
- **Magnetic buttons**: botoes de CTA que "puxam" suavemente na direcao do cursor

### Micro-interacoes
- Hover em cards: elevacao 3D com sombra e leve brilho cyan
- Hover em botoes: gradient shift + glow + scale sutil
- Cursor customizado: um pequeno brilho/sparkle segue o mouse (desktop only)
- Loading state do formulario: animacao de bolhas
- Scroll indicator animado no hero (seta pulsante)

---

## Estrutura da Pagina (Secoes)

### 1. NAVBAR - Premium Glassmorphism
- Fixa no topo, transparente inicialmente
- No scroll: transforma em glassmorphism (backdrop-blur + borda sutil + sombra)
- Logo "Esplendido" com animacao de brilho nas estrelas do logo
- Links suaves com underline animado no hover (linha que cresce do centro)
- CTA "Orcamento Gratis" com gradient animado e glow
- Mobile: menu fullscreen com overlay escuro e links que aparecem em stagger
- Smooth scroll para todas as ancoras

### 2. HERO - Experiencia Imersiva Full-Screen
- **Background**: Cena Three.js full-screen com bolhas de sabao 3D + particulas de brilho
- **Gradient overlay** sobre o 3D para legibilidade
- **Animacao de entrada**:
  1. Background carrega com fade
  2. Uma animacao Lottie de vassoura "varre" da esquerda para direita
  3. Conforme varre, revela o headline principal letra a letra
  4. Subtitulo faz fade-in suave por baixo
  5. CTAs surgem com spring animation
- **Conteudo**:
  - Pre-titulo: "Servico de Limpeza Premium em Portugal"
  - Headline: "Transformamos Espacos. Elevamos Padroes."
  - Subtitulo: "Limpeza profissional com garantia de satisfacao. Porque o seu espaco merece o Esplendido."
  - CTA Primario: "Pedir Orcamento Gratis" (WhatsApp - icone animado)
  - CTA Secundario: "Conhecer Servicos" (scroll suave)
- **Badges flutuantes** (floating com animacao de bob):
  - "+500 Clientes Satisfeitos"
  - "100% Garantia"
  - "Produtos Eco-Friendly"
- **Scroll indicator** na base: seta animada + texto "Descubra Mais"

### 3. BARRA DE CONFIANCA - Social Proof Rapido
- Faixa horizontal entre Hero e Servicos
- Background com gradiente sutil
- Numeros animados (counter up ao entrar na viewport):
  - **+500** Clientes Satisfeitos
  - **+2000** Limpezas Realizadas
  - **8** Anos de Experiencia
  - **100%** Garantia de Satisfacao
- Icones animados (Lottie) ao lado de cada stat
- Efeito de brilho passando por cima da barra (shimmer)

### 4. SERVICOS - Cards Premium com Reveal
- **Transicao de entrada**: efeito de "spray limpando" (Lottie) antes da secao aparecer
- Titulo com destaque: "Os Nossos **Servicos**" (palavra destacada com gradient e underline decorativa)
- Subtitulo: "Solucoes completas de limpeza para cada necessidade"
- **Layout**: Grid 3x3 (desktop), 2x2 (tablet), 1 coluna (mobile)
- **Cards com design glassmorphism**:
  - Icone grande e tematico (SVG custom ou Lucide icons) com animacao de entrada
  - Nome do servico em bold
  - Descricao curta (2 linhas)
  - Lista de 3-4 itens incluidos com checkmarks animados
  - Botao "Saiba Mais" com arrow animation
  - **Hover**: card eleva, borda fica cyan glow, icone faz animacao especifica
  - **Efeito especial**: ao hover, micro-particulas de brilho surgem no card
- **Servicos**:
  1. **Limpeza Domestica** - icone: casa brilhando
  2. **Limpeza Comercial** - icone: edificio
  3. **Higienizacao de Sofas** - icone: sofa com brilho
  4. **Limpeza de Condominios** - icone: predio
  5. **Limpeza Pos Obra** - icone: capacete + vassoura
  6. **Limpeza de Vidros e Janelas** - icone: janela transparente
  7. **Limpeza de Bolor e Humidade** - icone: gota + escudo
  8. **Higienizacao de Colchoes** - icone: colchao + estrelas
  9. **Higienizacao de Tapetes** - icone: tapete limpo
- Cada card ao clicar "Saiba Mais" abre um **modal elegante** com:
  - Descricao completa do servico
  - Lista detalhada do que inclui
  - Imagem ilustrativa
  - CTA "Pedir Orcamento" (WhatsApp)

### 5. COMO FUNCIONA - Timeline Visual Interativa
- **Conceito**: mostrar o processo de forma visual e engajante
- Titulo: "Como **Funciona**"
- Subtitulo: "Simples, rapido e sem complicacoes"
- **Design**: Timeline vertical (mobile) / horizontal (desktop) com 4 passos
- Cada passo tem:
  - Numero grande com gradient
  - Icone animado (Lottie)
  - Titulo do passo
  - Descricao breve
- **Passos**:
  1. **Contacte-nos** - "Envie uma mensagem pelo WhatsApp ou preencha o formulario" (icone: telefone)
  2. **Orcamento Gratis** - "Analisamos as suas necessidades e enviamos um orcamento personalizado" (icone: documento)
  3. **Agendamento** - "Escolha o dia e horario que melhor se adapta a si" (icone: calendario)
  4. **Limpeza Perfeita** - "A nossa equipa cuida de tudo. Voce so precisa de relaxar!" (icone: brilho/check)
- **Animacao**: conforme scrolla, uma linha/trace animada conecta os passos, como se estivesse "desenhando" o caminho
- Uma animacao de vassoura percorre o timeline conforme o scroll

### 6. SOBRE NOS - Split Layout Cinematografico
- **Layout**: 60% texto / 40% imagem (ou ilustracao 3D)
- **Background**: gradiente escuro sutil para contraste
- Titulo: "Porque Somos **Diferentes**"
- Texto com storytelling:
  - A paixao pela excelencia
  - Equipa treinada e dedicada
  - Compromisso com o cliente
- **Lista de diferenciais** com icones animados e stagger reveal:
  - Limpezas Diarias, Semanais ou Mensais
  - Equipa Fixa e Treinada
  - Melhor relacao Qualidade-Preco
  - Materiais e Equipamentos profissionais
  - Produtos Biodegradaveis e Seguros
  - 100% Garantia de Satisfacao
- **Lado visual**: composicao de imagens com efeito parallax em camadas OU uma ilustracao/animacao Lottie de uma equipa de limpeza a trabalhar
- Botao CTA: "Conheca a Nossa Equipa" (scroll para contato)

### 7. RAZOES PARA ESCOLHER - Feature Showcase
- **Background**: secao com pattern sutil de bolhas/circulos em opacity baixa
- Titulo: "Razoes para nos **Escolher**"
- **Layout**: 3 blocos em destaque, cada um com:
  - Icone grande animado
  - Titulo
  - Descricao detalhada
  - Pequena animacao on-scroll
- **Blocos**:
  1. **Garantia de Satisfacao** - "Se nao ficar satisfeito, refazemos o servico sem custo adicional. Zero risco para si."
     - Animacao: escudo com checkmark que aparece
  2. **Qualidade Superior** - "Equipamentos de ultima geracao e tecnicas profissionais para resultados impecaveis."
     - Animacao: estrelas/brilhos aparecendo
  3. **Eco-Friendly** - "Produtos 100% biodegradaveis. Cuidamos do seu espaco e do planeta."
     - Animacao: folha/planta crescendo
- **Efeito visual**: background com "clean wave" - uma onda azul sutil que se move lentamente

### 8. PLANOS E PRECOS - Cards com Impacto
- Titulo: "Planos que **Cabem** no Seu Orcamento"
- Subtitulo: "Servicos personalizados para cada necessidade"
- **3 Cards de pricing** (mesmo que so 1 tenha preco agora):
  - **Card 1 - Avulso**: "Limpeza Pontual" - "Consulte" - ideal para quem precisa de 1 limpeza
  - **Card 2 - Mensal (DESTACADO)**: "Plano Mensal" - "A partir de 150EUR" - badge "Mais Popular"
  - **Card 3 - Empresarial**: "Plano Empresarial" - "Sob Medida" - para empresas
- **Card destacado** (Mensal):
  - Borda com gradient animado (glow effect)
  - Badge "Mais Popular" com animacao pulse
  - Inclui: 4 Limpezas Mensais, Equipa Experiente, Seguranca e Garantia, Preco Justo, Voce seleciona os dias, Pagamento Apos um Mes
  - Efeito 3D tilt on hover (VanillaTilt style via Framer Motion)
- Cada card tem CTA que envia para WhatsApp com mensagem pre-configurada do plano

### 9. DEPOIMENTOS - Carousel Imersivo
- **Background**: escuro com efeito de particulas brilhantes (sparkles CSS)
- Titulo: "O que Dizem os Nossos **Clientes**"
- **Design**: carousel horizontal com snap scroll
- Cada card de depoimento:
  - Aspas grandes estilizadas (tipografia decorativa)
  - Texto do depoimento
  - Nome do cliente
  - Tipo de servico utilizado
  - Rating com estrelas animadas (preenchimento da esquerda para direita)
  - Avatar/iniciais em circulo com borda gradient
- **Controles**: setas laterais + dots/indicadores
- Auto-play suave com pausa no hover
- **Efeito**: cards que nao estao em foco ficam com blur e escala menor

### 10. FAQ - Accordion Elegante
- Titulo: "Perguntas **Frequentes**"
- **Design**: accordion com animacoes fluidas de abrir/fechar
- Cada pergunta:
  - Icone de + que rotaciona para x ao abrir
  - Animacao de height com spring physics
  - Borda sutil que brilha ao abrir
- **Perguntas**:
  1. Como funciona o agendamento do servico?
  2. Quais produtos de limpeza utilizam?
  3. Qual a area de cobertura dos vossos servicos?
  4. Posso cancelar ou reagendar uma limpeza?
  5. Como funciona a garantia de satisfacao?
  6. Os vossos produtos sao seguros para criancas e animais?
  7. Qual o metodo de pagamento aceite?
  8. Com quanta antecedencia devo agendar?
- **Efeito**: ao abrir uma resposta, um sutil brilho/shimmer passa pelo texto

### 11. FORMULARIO DE CONTATO - Secao Final de Conversao
- **Background**: gradiente azul escuro -> medio, com particulas Three.js sutis (bolhas pequenas)
- **Layout**: 2 colunas
- **Coluna esquerda - Info + Motivacao**:
  - Titulo: "Pronto para **Transformar** o Seu Espaco?"
  - Subtitulo motivacional
  - Info de contato com icones:
    - Telefone: 910 725 044 (clicavel)
    - Horario: Dom-Seg: 08:00 - 20:00
    - Email: (a definir)
    - Localizacao: (a definir)
  - Botao grande WhatsApp com animacao pulse
- **Coluna direita - Formulario**:
  - Card glassmorphism com o formulario
  - Campos:
    - Nome* (input com label flutuante)
    - Email* (input com validacao visual)
    - Telefone (input com mascara PT)
    - Tipo de Servico (select dropdown estilizado)
    - Mensagem* (textarea)
  - Botao "Enviar Mensagem" com gradient + loading state (bolhas animadas)
  - **Sucesso**: modal/toast animado com confetti de brilhos + mensagem de confirmacao
  - **Erro**: shake animation + mensagem vermelha sutil
- Validacao em tempo real com Zod

### 12. FOOTER - Clean e Moderno
- Background escuro (`#0A1628`)
- Logo Esplendido em branco
- 4 colunas:
  - **Sobre**: breve descricao + redes sociais (icones com hover glow)
  - **Servicos**: links rapidos para cada servico
  - **Links Uteis**: Sobre Nos, FAQ, Contactos, Blog (futuro)
  - **Contacto**: telefone, email, horario
- Linha separadora com gradient
- Copyright + links legais (Politica de Privacidade | Termos)
- "Feito com amor" ou similar
- **Efeito**: animacao sutil de onda na borda superior do footer

---

## Elementos Globais

### Botao WhatsApp Flutuante
- Canto inferior direito, fixo, z-index alto
- Icone WhatsApp com gradient verde
- **Animacao**: pulse continuo + tooltip que aparece e desaparece: "Fale Connosco!"
- Ao hover: escala up + glow
- Ao clicar: abre WhatsApp com mensagem pre-preenchida
- **Mobile**: ligeiramente maior para facilitar toque

### Scroll to Top
- Aparece apos 400px de scroll
- Icone de seta com background gradient azul
- Animacao de fade-in/out

### Cursor Custom (Desktop Only)
- Um pequeno circulo brilhante (sparkle) segue o cursor
- Em hover sobre elementos interativos: cursor muda de tamanho
- Desativado em touch devices

### Page Loader
- Loading screen inicial com logo animado do Esplendido
- Barra de progresso minimalista
- Animacao de "splash" ao completar (como se limpasse a tela)

### Transicoes entre Secoes
- Cada secao tem um "divider" tematico:
  - Onda de sabao (SVG wave animada)
  - Bolhas subindo
  - Spray de agua
  - Alternando entre estilos para variedade

---

## PERFORMANCE - Filosofia "Zero Compromisso"

**Meta: Lighthouse 95-100 em TODAS as categorias (Performance, Accessibility, Best Practices, SEO)**

### Principio Core: Animacoes Bonitas, Bundle Minusculo

A estrategia e: **o conteudo HTML/CSS carrega instantaneamente (SSG), as animacoes sao progressive enhancement que carregam DEPOIS**.

O usuario ve o site completo e lindo em < 1 segundo. As animacoes 3D e Lottie surgem suavemente depois, melhorando a experiencia sem bloquear nada.

### Estrategia de Rendering: Static Site Generation (SSG)

- **100% SSG** - a pagina e pre-renderizada em build time como HTML estatico
- Zero server-side rendering em runtime (exceto a API Route de email)
- O HTML completo com todo o conteudo textual e servido imediatamente pela CDN da Vercel
- Resultado: TTFB < 100ms (edge CDN), FCP < 0.8s

### Orcamento de Bundle (Budget Maximo)

| Recurso | Budget Max | Estrategia |
|---|---|---|
| **First Load JS** | < 80KB gzipped | Code splitting agressivo |
| **Three.js chunk** | < 60KB gzipped | Dynamic import, tree-shaking, so importar modulos usados |
| **Framer Motion** | < 20KB gzipped | Import seletivo: `from "framer-motion"` somente `motion`, `useInView`, `AnimatePresence` |
| **Lottie** | < 15KB gzipped | `lottie-light` (player leve) + JSON comprimidos |
| **GSAP** | < 12KB gzipped | Somente `gsap/dist/gsap.min` + `ScrollTrigger` |
| **Total First Load** | < 90KB gzipped | Tudo pesado e lazy loaded |
| **Total Completo** | < 250KB gzipped | Com todos os chunks carregados |

### Three.js - Leve e Otimizado

```
REGRA: Three.js NUNCA bloqueia o first paint.
```

- **Dynamic import**: `const BubbleScene = dynamic(() => import('./three/BubbleScene'), { ssr: false })`
- **Intersection Observer**: canvas Three.js so inicia quando hero esta visivel
- **Tree-shaking manual**: importar APENAS os modulos Three.js necessarios (nao importar `three` inteiro)
  ```ts
  // BOM - importa ~15KB
  import { Scene } from 'three/src/scenes/Scene'
  import { SphereGeometry } from 'three/src/geometries/SphereGeometry'
  import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial'

  // MAU - importa ~600KB
  import * as THREE from 'three'
  ```
- **Geometrias simples**: bolhas sao esferas com shader custom (nao modelos 3D pesados)
- **Max particulas**: 30 bolhas (desktop), 15 (tablet), 0 (mobile - fallback CSS)
- **requestAnimationFrame** com throttle a 30fps (suficiente para bolhas flutuantes, metade do custo)
- **Canvas resize** debounced (nao recalcula a cada pixel de resize)
- **Dispose automatico**: cleanup completo de geometrias, materiais e texturas no unmount
- **GPU detection**: se GPU fraca detectada, desativa Three.js e usa fallback CSS

### Fallback CSS para Dispositivos Fracos / Mobile

Quando Three.js nao carrega (mobile, GPU fraca, slow connection), o hero usa:
- Gradient animado com CSS `@keyframes` (0KB JS extra)
- Bolhas em CSS puro (`border-radius: 50%` + `animation: float`) - 6 a 8 bolhas
- Sparkles com CSS `box-shadow` animado
- Resultado: visualmente bonito, 0KB de JS adicional

### Imagens - Pipeline de Otimizacao

- **next/image** com `priority` APENAS no hero (LCP)
- **Formato**: AVIF (1o) > WebP (fallback) > JPEG (ultimo fallback)
- **Responsive sizes**: `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- **Placeholder**: `blur` com blurDataURL inline (base64 ~200 bytes, evita CLS)
- **Lazy loading nativo**: todas as imagens abaixo do fold sao `loading="lazy"`
- **Compressao**: qualidade 80 para fotos, 90 para logo/icones
- **SVG para icones**: todos os icones de servicos sao SVG inline (escalavel, 0 requests)
- **OG Image**: pre-gerada em build time (1200x630, < 100KB)

### Fontes - Zero CLS

```ts
// next/font com subset e display swap
import { Space_Grotesk, Inter } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',        // Texto visivel imediatamente
  variable: '--font-heading',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})
```

- `font-display: swap` garante texto visivel antes da fonte carregar
- `subsets: ['latin']` reduz o tamanho do font file (~50% menor)
- Fallback system fonts com metricas similares para zero CLS
- Apenas 2 fontes (Space Grotesk + Inter) - nao usar Outfit para reduzir requests

### CSS - Tailwind v4 Otimizado

- Tailwind v4 com purge automatico - so inclui classes usadas
- Zero CSS custom desnecessario - Tailwind handles 95% dos estilos
- Animacoes CSS nativas para micro-interacoes (mais leve que JS):
  - `@keyframes shimmer` para efeitos de brilho
  - `@keyframes float` para elementos flutuantes
  - `@keyframes pulse` para CTAs
  - `transition` para hovers (GPU-accelerated via `transform` e `opacity`)
- CSS animations usam `will-change` com parcimonia (so onde necessario)
- Todas as animacoes CSS usam `transform` e `opacity` (propriedades composited, nao causam reflow)

### Lazy Loading Inteligente (Progressive Enhancement)

**Ordem de carregamento:**
1. **Critico (inline/preload)**: HTML estatico + CSS critico + fontes + imagem hero
2. **Alto (prefetch)**: Framer Motion (animacoes above-the-fold)
3. **Medio (lazy)**: Lottie animations, GSAP ScrollTrigger
4. **Baixo (idle)**: Three.js, modals, carousel logic
5. **On-demand**: GTM, Meta Pixel (carregam apos interacao do usuario ou 5s delay)

```ts
// Exemplo de loading progressivo
// Three.js so carrega quando hero e visivel E a pagina ja carregou
useEffect(() => {
  if (isHeroVisible && document.readyState === 'complete') {
    import('./three/BubbleScene').then(setScene)
  }
}, [isHeroVisible])
```

### Scripts de Terceiros (GTM, Pixel) - Nao Bloqueiam NADA

- GTM e Meta Pixel carregam com `strategy="lazyOnload"` (Next.js Script)
- Alternativa: carregar somente apos 5 segundos OU apos primeira interacao do usuario
- Isso garante que ads tracking NUNCA afete o Lighthouse score
- DataLayer events sao enfileirados e enviados quando GTM estiver pronto

### Core Web Vitals - Targets

| Metrica | Target | Como Garantir |
|---|---|---|
| **LCP** | < 1.2s | Hero image com `priority` + `fetchpriority="high"`, SSG, CDN edge |
| **FID / INP** | < 50ms | Zero JS bloqueante no main thread, event handlers otimizados |
| **CLS** | 0 | Font swap com fallback metrico, image dimensions explicitas, no layout shifts |
| **TTFB** | < 100ms | SSG + Vercel edge CDN (Frankfurt para Portugal) |
| **FCP** | < 0.8s | HTML inline com CSS critico, fontes preloaded |
| **SI** | < 1.5s | Conteudo above-the-fold renderiza estatico, animacoes sao enhancement |

### Build & Deploy

- `next build` com `output: 'export'` avaliado (se API route permitir, usar static export)
- Se precisar de API route (email): manter hybrid com ISR
- **Vercel Edge Network**: distribuido globalmente, CDN automatica
- **Vercel region**: `iad1` ou `fra1` (Frankfurt - mais proximo de Portugal)
- **Headers de cache**: `Cache-Control: public, max-age=31536000, immutable` para assets estaticos
- **Brotli compression**: ativado automaticamente na Vercel

### Monitoring Pos-Deploy

- Vercel Analytics (Web Vitals reais de usuarios)
- Vercel Speed Insights
- Lighthouse CI no pipeline (falha o build se score < 90)
- Bundle analyzer (`@next/bundle-analyzer`) para monitorar tamanho do bundle

---

## Responsividade

### Mobile First
- **Mobile (< 768px)**: coluna unica, Three.js desativado (CSS fallback), menu fullscreen, touch-optimized
- **Tablet (768px - 1024px)**: grid 2 colunas, Three.js reduzido (15 particulas), menu hamburger
- **Desktop (> 1024px)**: experiencia completa, Three.js full, cursor custom, hover effects

### Acessibilidade (a11y)
- Todas as animacoes respeitam `prefers-reduced-motion: reduce`
- Contraste WCAG AA minimo em todo texto (4.5:1 normal, 3:1 grande)
- Focus visible em todos os elementos interativos
- Roles ARIA em nav, sections, buttons, accordion
- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Skip-to-content link (escondido, visivel no focus)
- Alt text em todas as imagens
- Formulario com labels acessiveis e error messages via `aria-describedby`

---

## SEO - Estrategia Completa para Ranking Maximo

### SEO Tecnico

#### Meta Tags (next/metadata API)
```ts
export const metadata: Metadata = {
  title: 'Esplendido | Servicos de Limpeza Profissional em Portugal',
  description: 'Limpeza domestica, comercial e higienizacao profissional. Equipa treinada, produtos eco-friendly e 100% garantia de satisfacao. Orcamento gratis!',
  keywords: ['limpeza profissional', 'limpeza domestica', 'limpeza comercial', 'higienizacao sofas', 'limpeza Portugal', 'empresa limpeza'],
  authors: [{ name: 'Esplendido Limpezas' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://esplendido.pt' },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    siteName: 'Esplendido',
    title: 'Esplendido | Limpeza Profissional que Transforma',
    description: 'Servicos de limpeza premium com garantia. Domestica, comercial, higienizacao. Orcamento gratis!',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esplendido | Limpeza Profissional',
    description: 'Transformamos espacos com limpeza de excelencia.',
    images: ['/og-image.png'],
  },
}
```

#### Schema.org - Structured Data (JSON-LD)
```json
[
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "additionalType": "https://schema.org/CleaningService",
    "name": "Esplendido Limpezas",
    "description": "Servicos de limpeza profissional em Portugal",
    "telephone": "+351910725044",
    "url": "https://esplendido.pt",
    "logo": "https://esplendido.pt/logo.svg",
    "image": "https://esplendido.pt/og-image.png",
    "priceRange": "$$",
    "openingHours": "Mo-Su 08:00-20:00",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PT"
    },
    "geo": { "@type": "GeoCoordinates" },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicos de Limpeza",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpeza Domestica" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpeza Comercial" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Higienizacao de Sofas" }}
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Como funciona o agendamento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "..."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Esplendido",
    "url": "https://esplendido.pt"
  }
]
```

#### Sitemap e Robots
```xml
<!-- sitemap.xml (gerado automaticamente pelo Next.js) -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://esplendido.pt</loc>
    <lastmod>2026-02-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

```txt
# robots.txt
User-agent: *
Allow: /
Sitemap: https://esplendido.pt/sitemap.xml
```

### SEO On-Page

#### Estrutura de Headings (1 unico H1, hierarquia correta)
```
H1: "Transformamos Espacos. Elevamos Padroes." (Hero - unico H1)
  H2: "Os Nossos Servicos" (Servicos)
    H3: Limpeza Domestica, Limpeza Comercial, etc.
  H2: "Como Funciona" (Timeline)
  H2: "Porque Somos Diferentes" (Sobre)
  H2: "Razoes para nos Escolher" (Why Choose Us)
  H2: "Planos e Precos" (Pricing)
    H3: Limpeza Pontual, Plano Mensal, Plano Empresarial
  H2: "O que Dizem os Nossos Clientes" (Depoimentos)
  H2: "Perguntas Frequentes" (FAQ)
    H3: cada pergunta
  H2: "Entre em Contacto" (Contato)
```

#### Keywords Strategy (SEO Local Portugal)
- **Primarias**: limpeza profissional portugal, empresa de limpeza, servico de limpeza
- **Secundarias**: limpeza domestica, limpeza comercial, higienizacao sofas, limpeza pos obra
- **Long-tail**: servico de limpeza profissional em [cidade], empresa de limpeza de confianca, limpeza com garantia de satisfacao
- **LSI**: higienizacao, desinfecao, produtos biodegradaveis, equipa profissional, orcamento gratis
- Keywords integradas naturalmente nos textos, headings, alt texts, e meta descriptions

#### Conteudo SEO
- Cada secao tem texto semantico real (nao so visual) - o Google indexa o conteudo completo
- FAQ com perguntas reais que as pessoas pesquisam (long-tail keywords)
- Alt text descritivo e unico para cada imagem
- Links internos entre secoes (ex: servicos linkam para contato)
- Texto do hero e above-the-fold sao renderizados no HTML estatico (nao dependem de JS)

### SEO Tecnico Adicional
- **Canonical URL** em todas as paginas
- **Hreflang** preparado (caso expanda para PT-BR)
- **Mobile-first indexing**: layout perfeito em mobile
- **Page Speed**: Lighthouse 95+ (fator de ranking do Google)
- **HTTPS**: automatico na Vercel
- **No broken links**: verificacao em build time
- **Semantic HTML**: nav, main, article, section, aside, footer
- **Internal linking**: CTAs linkam entre secoes, criando uma estrutura de links interna solida

---

## Integracao Ads (Preparado)

### Google Tag Manager
- Container GTM configurado
- **Carregamento**: `strategy="lazyOnload"` - nao afeta performance
- Eventos de conversao:
  - `whatsapp_click` (com detalhes da secao de origem)
  - `form_submit` (com tipo de servico)
  - `cta_click` (com label do botao)
  - `phone_call`
  - `service_detail_view`

### Meta Pixel
- Integrado via GTM (1 unico script de terceiros)
- Eventos:
  - `PageView`
  - `Lead` (formulario enviado)
  - `Contact` (WhatsApp clicado)
  - `ViewContent` (servico detalhado visualizado)

### Analytics
- Google Analytics 4 via GTM
- Scroll depth tracking
- Heatmap-ready (preparado para Hotjar/Clarity se necessario)

### Conversao Tracking
- Todos os CTAs com `data-tracking` attributes para facilitar GTM triggers
- UTM parameters preservados no formulario (para atribuicao de ads)
- Event-driven architecture: todos os eventos disparam via um `trackEvent()` utility centralizado

---

## Estrutura de Pastas

```
esplendido-spa/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── about/
│   │   ├── testimonials/
│   │   └── og-image.png         # 1200x630, pre-otimizada
│   ├── animations/               # Lottie JSON files (comprimidos)
│   │   ├── broom-sweep.json
│   │   ├── spray-clean.json
│   │   ├── sparkle.json
│   │   ├── water-drop.json
│   │   └── check-mark.json
│   ├── icons/                    # SVG icons inline-ready
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml               # Gerado em build time
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout + metadata global + fonts + GTM
│   │   ├── page.tsx              # Pagina principal (SSG)
│   │   ├── globals.css           # Tailwind + CSS keyframes custom
│   │   ├── loading.tsx           # Page loader animado
│   │   ├── sitemap.ts            # Gerador de sitemap dinamico
│   │   ├── robots.ts             # Gerador de robots.txt
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts      # API Route email (Resend)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageLoader.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── About.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Counter.tsx
│   │   │   ├── SectionDivider.tsx
│   │   │   ├── WhatsAppFloat.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   └── CustomCursor.tsx
│   │   ├── three/                # Dynamic imports only (ssr: false)
│   │   │   ├── BubbleScene.tsx
│   │   │   ├── Sparkles.tsx
│   │   │   └── ContactBg.tsx
│   │   ├── animations/
│   │   │   ├── BroomSweep.tsx
│   │   │   ├── SprayClean.tsx
│   │   │   ├── WipeReveal.tsx
│   │   │   └── ShimmerText.tsx
│   │   └── seo/
│   │       ├── JsonLd.tsx        # Schema.org structured data
│   │       └── GTMScript.tsx     # Google Tag Manager (lazy)
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── useInView.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useReducedMotion.ts   # Detecta prefers-reduced-motion
│   │   └── useGPUTier.ts         # Detecta capacidade GPU para Three.js
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── services-data.ts
│   │   ├── faq-data.ts
│   │   ├── testimonials-data.ts
│   │   ├── tracking.ts          # trackEvent() utility para GTM
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts                # Headers, redirects, image optimization
├── package.json
├── .env.local
└── next.config.ts                # Com bundle analyzer condicional
```

---

## Variaveis de Ambiente (.env.local)

```env
# Email (Resend)
RESEND_API_KEY=

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=351910725044
NEXT_PUBLIC_WHATSAPP_MESSAGE=Ola! Gostaria de saber mais sobre os servicos de limpeza do Esplendido.

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=

# Email de destino
CONTACT_EMAIL=

# URL do site (para SEO)
NEXT_PUBLIC_SITE_URL=
```

---

## Proximos Passos

### Fase 1 - Fundacao (Performance-First)
1. **[APROVACAO]** Revisar e aprovar este plano
2. **[SETUP]** Inicializar Next.js 15 + dependencias + tailwind + typescript config
3. **[SEO-BASE]** Metadata global, JSON-LD, sitemap.ts, robots.ts, fonts otimizadas
4. **[BASE]** Layout raiz (layout.tsx, globals.css, Navbar, Footer) - tudo SSG, HTML semantico

### Fase 2 - Secoes (Conteudo Estatico Primeiro, Animacoes Depois)
5. **[HERO]** Hero section - primeiro o HTML/CSS estatico, depois Three.js como dynamic import
6. **[TRUST]** Barra de confianca com counters (CSS-first, JS counter como enhancement)
7. **[SERVICOS]** Grid de servicos - HTML semantico + cards glassmorphism + modais
8. **[COMO]** Timeline "Como Funciona" - layout CSS, GSAP scroll como enhancement
9. **[SOBRE]** Secao Sobre Nos
10. **[RAZOES]** Feature showcase
11. **[PRECOS]** Cards de pricing com 3D tilt (CSS transform, Framer enhancement)
12. **[DEPOIMENTOS]** Carousel (CSS scroll-snap nativo, JS como enhancement)
13. **[FAQ]** Accordion (HTML details/summary nativo + Framer para animacao)

### Fase 3 - Interacao e Conversao
14. **[CONTATO]** Formulario + validacao + API Route email (Resend)
15. **[CTA]** WhatsApp float, scroll to top, cursor custom
16. **[ANIMACOES]** Lottie animations, wipe reveals, dividers tematicos
17. **[THREE.JS]** Cena de bolhas no hero + sparkles (com fallback CSS testado)

### Fase 4 - Otimizacao e Deploy
18. **[LIGHTHOUSE]** Audit completo - target 95+ em tudo
19. **[BUNDLE]** Bundle analyzer - verificar budget de 250KB total
20. **[A11Y]** Teste de acessibilidade (axe-core, keyboard nav, screen reader)
21. **[MOBILE]** Teste em dispositivos reais (iPhone, Android, tablet)
22. **[ADS]** GTM + Meta Pixel (lazy loaded)
23. **[DEPLOY]** Deploy Vercel + dominio + verificar headers de cache
24. **[MONITOR]** Vercel Analytics + Speed Insights ativados

---

## Conteudo Necessario do Cliente

- [ ] Logo em SVG (ou alta resolucao PNG)
- [ ] Fotos profissionais (ou autorizacao para usar stock premium)
- [ ] Numero WhatsApp confirmado
- [ ] Email de contato para formulario
- [ ] Depoimentos reais de clientes (ou autorizacao para criar exemplos)
- [ ] Precos atualizados (alem do plano mensal 150EUR)
- [ ] Redes sociais (Instagram, Facebook, etc.)
- [ ] Endereco/localizacao da empresa
- [ ] IDs Google Ads e Meta Pixel (quando disponivel)
- [ ] Preferencia de dominio (esplendido.pt ? esplendidolimpezas.pt ?)
