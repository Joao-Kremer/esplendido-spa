# Esplêndido — Chatbot de Botões

## Overview

Substituir o WizardDrawer atual por um chatbot interativo baseado em botões. O chatbot simula uma conversa com bolhas de mensagem, onde o bot envia texto + botões e o usuário clica para responder. Tudo via botões para evitar perguntas sem resposta. O fluxo de agendamento mantém a mesma lógica (React Hook Form + Zod → WhatsApp URL).

## Triggers

- **CTAs da página** (Navbar, Hero, Services, HowItWorks, Footer): abrem o chatbot direto no fluxo "Agendar Serviço". Se veio de um card de serviço, o serviço aparece como resposta do usuário (bolha à direita) e o bot pula direto para Step 2 (frequência).
- **Botão flutuante** (canto inferior direito): abre o chatbot no menu principal com as 6 opções.

## Comportamento de estado

- **Fechar e reabrir**: fechar o drawer **reseta** toda a conversa. Reabrir começa do zero.
- **Não há persistência** entre sessões — cada abertura é uma conversa nova.

## Visual

### Drawer (mesmo local do wizard atual)
- Drawer lateral direito, fundo `white`, `md:rounded-l-2xl`
- Header: avatar do bot (círculo `primary` com ícone) + "Esplêndido" em `font-heading` + botão fechar
- Mobile: full-screen
- Animação: `slide-in-right` ao abrir

### Interface de chat
- **Bolhas do bot**: fundo `neutral` (#F7F9FA), alinhadas à esquerda, border-radius 16px (com canto superior esquerdo menor), `font-body`, cor `dark`
- **Respostas do usuário**: fundo `primary` (#00DAFF), alinhadas à direita, border-radius 16px (com canto superior direito menor), cor `dark`, `font-body`
- **Botões de resposta**: abaixo da última mensagem do bot, estilo outline com borda `primary/30`, border-radius 10px, hover `primary/10`, `font-body`, texto `dark`
- **Scroll**: automático para a última mensagem
- **Animação**: bolhas entram com fade-in sutil (opacity 0→1, translateY 8→0, 200ms)
- **Delay**: mensagens do bot aparecem com 400ms de delay entre si para simular digitação

### Botão flutuante
- Posição: fixed, bottom-6 right-6, z-40
- Visual: círculo 56px, fundo `primary`, ícone MessageCircle `dark`, `glow-cyan`
- Animação: `pulse-glow` sutil nos primeiros 3 segundos, depois para
- **Desaparece** quando o drawer está aberto
- Hover: scale 1.1

## Fluxos

### Menu Principal
Bot: "Olá! Sou o assistente da Esplêndido. Como posso ajudar?"

Botões:
1. "📋 Agendar Serviço"
2. "💬 Falar com Suporte"
3. "🏢 Sobre a Esplêndido"
4. "📍 Locais de Atendimento"
5. "🧴 Produtos Utilizados"
6. "❓ Perguntas Frequentes"

### Fluxo: Agendar Serviço

Step 1 — Bot: "Qual serviço precisa?"
Botões: 8 serviços (Limpeza Doméstica, Limpeza Comercial, Higienização Sofás, Limpeza Pós-obra, Vidros/Janelas/Estores, Bolor e Humidade, Higiene Colchões, Higiene Tapetes)

Step 2 — Bot: "Com que frequência?"
Botões: Pontual, Semanal, Quinzenal, Mensal, Pular
("Pular" define frequency como string vazia e avança para Step 3)

Step 3 — Bot: "Qual a área do espaço em m²?"
Botões: 30, 50, 80, 100, 150, 200+
("200+" mapeia para o valor numérico 200. Todos os valores são armazenados como number no formData.)

Step 4 — Bot: "Qual a zona?"
Botões: Lisboa Centro, Margem Sul, Outra

Step 5 — Bot: "Tem alguma observação?"
Botões: "Sim, quero escrever", "Não, enviar agora"

Step 5b (se "Sim") — Mostra campo de textarea (único campo de texto livre do chatbot)
Botão: "Confirmar"

Step 6 — Bot mostra resumo:
"Perfeito! Aqui está o resumo:
📋 Serviço: {serviço}
🔄 Frequência: {frequência}
📐 Área: {área} m²
📍 Zona: {zona}
📝 Observações: {notas}"

Botões: "Enviar pelo WhatsApp" (abre wa.me com mensagem formatada via `buildWhatsAppUrl()`), "Recomeçar" (reseta formData e volta ao menu principal)

### Fluxo: Falar com Suporte

Bot: "Vou direcionar você para o nosso suporte via WhatsApp."
Botões: "Abrir WhatsApp" (abre wa.me com "Olá, preciso de suporte."), "Voltar ao menu"

### Fluxo: Sobre a Esplêndido

Bot: "A Esplêndido é uma empresa de serviços de limpeza profissional em Lisboa e Margem Sul."
Bot: "Com mais de 300 clientes satisfeitos, oferecemos equipa fixa e treinada, produtos eco-friendly e 100% garantia de satisfação."
Bot: "A nossa missão é transformar espaços com qualidade, confiança e um atendimento esplêndido."
Botões: "Voltar ao menu"

### Fluxo: Locais de Atendimento

Bot: "Atualmente atendemos nas seguintes zonas:"
Bot: "📍 Lisboa Centro — Baixa, Chiado, Avenida, Saldanha, Marquês, Parque das Nações, Benfica, Lumiar, Telheiras, Campo de Ourique"
Bot: "📍 Margem Sul — Almada, Seixal, Barreiro, Montijo, Setúbal"
Bot: "Quer agendar um serviço na sua zona?"
Botões: "Agendar Serviço", "Voltar ao menu"

### Fluxo: Produtos Utilizados

Bot: "Utilizamos apenas produtos profissionais eco-friendly e biodegradáveis, seguros para crianças e animais de estimação."
Bot: "🧴 Limpeza geral: Produtos multi-superfície certificados"
Bot: "🌿 Desinfetação: Soluções hospitalares de baixa toxicidade"
Bot: "🛋️ Estofados: Shampoos neutros específicos para tecidos"
Bot: "Todos os nossos produtos são aprovados e seguem normas europeias de segurança."
Botões: "Voltar ao menu"

### Fluxo: Perguntas Frequentes

Bot: "Sobre o que gostaria de saber?"
Botões:
1. "Qual a garantia?"
2. "Como funciona o pagamento?"
3. "A equipa é fixa?"
4. "Preciso estar em casa?"
5. "Quero saber o preço"
6. "Voltar ao menu"

Respostas do FAQ:

- **Garantia**: "Oferecemos 100% garantia de satisfação. Se não ficar satisfeito, voltamos sem custo adicional."
  → Botões: "Outra pergunta" (`goto` flow "faq" step "menu"), "Voltar ao menu" (`goto_menu`)

- **Pagamento**: "O pagamento é feito após a realização do serviço. Aceitamos transferência bancária e MBWay. Para planos mensais, o pagamento é feito ao final do primeiro mês."
  → Botões: "Outra pergunta" (`goto` flow "faq" step "menu"), "Voltar ao menu" (`goto_menu`)

- **Equipa fixa**: "Sim! Mantemos a mesma equipa para cada cliente, para que conheçam o seu espaço e as suas preferências."
  → Botões: "Outra pergunta" (`goto` flow "faq" step "menu"), "Voltar ao menu" (`goto_menu`)

- **Estar em casa**: "Não é obrigatório. Muitos clientes entregam a chave à nossa equipa de confiança. Todos os profissionais são verificados e segurados."
  → Botões: "Outra pergunta" (`goto` flow "faq" step "menu"), "Voltar ao menu" (`goto_menu`)

- **Preço**: "Para um orçamento personalizado, entre em contacto pelo WhatsApp!"
  → Botões: "Abrir WhatsApp" (`whatsapp` com "Olá, gostaria de saber o preço dos serviços."), "Outra pergunta" (`goto` flow "faq" step "menu"), "Voltar ao menu" (`goto_menu`)

## Notas técnicas

- O chatbot NÃO usa React Hook Form internamente. Em vez disso, mantém um `formData` simples em `useState` que é preenchido pelos botões `set_field`. Só chama `buildWhatsAppUrl()` no `submit_booking`.
- O `wizard-schema.ts` é reutilizado apenas para `buildWhatsAppUrl()` e o tipo `WizardFormData`. A validação Zod não é necessária pois os botões garantem que os campos obrigatórios são preenchidos pelo fluxo.
- Componentes ficam na raiz de `src/components/` (mesmo padrão dos componentes existentes: Navbar.tsx, Hero.tsx, etc.)
- O `WizardDrawer.tsx` é deletado pois é 100% substituído pelo ChatBot.

## Estrutura de dados (chatbot-flows.ts)

```typescript
interface ChatMessage {
  text: string;
}

interface ChatButton {
  label: string;
  action: { type: "goto"; flow: string; step: string }
    | { type: "goto_menu" }                              // reseta conversa e mostra menu principal
    | { type: "whatsapp"; message: string }              // abre wa.me com mensagem estática
    | { type: "set_field"; field: string; value: string | number; nextStep: string } // armazena valor no formData e avança
    | { type: "show_notes_input"; nextStep: string }     // mostra textarea, ao confirmar vai para nextStep
    | { type: "submit_booking" }                         // chama buildWhatsAppUrl(formData) e abre wa.me
    | { type: "restart" };                               // reseta formData e volta ao menu principal
}

interface ChatNode {
  id: string;
  messages: ChatMessage[];
  buttons?: ChatButton[];
}

interface ChatFlow {
  id: string;
  nodes: ChatNode[];
}
```

## Ficheiros

### Criar:
- `src/lib/chatbot-flows.ts` — todos os fluxos, nós, mensagens e botões
- `src/components/ChatBot.tsx` — drawer + chat interface + lógica de fluxo
- `src/components/ChatBotBubble.tsx` — botão flutuante

### Modificar:
- `src/app/page.tsx` — substituir WizardDrawer por ChatBot + ChatBotBubble

### Deletar:
- `src/components/WizardDrawer.tsx`

### Reutilizar (sem modificação):
- `src/lib/wizard-schema.ts` — `buildWhatsAppUrl()` e `WizardFormData`
- `src/lib/data.ts` — services, contacts, frequencyOptions, zoneOptions

## Tema

Todas as cores, fontes e animações DEVEM usar as variáveis do tema do `globals.css`:
- `primary` (#00DAFF) — botão flutuante, respostas do usuário, destaques
- `neutral` (#F7F9FA) — bolhas do bot
- `dark` (#0A1628) — texto, overlay
- `white` (#FFFFFF) — fundo do drawer
- `accent` (#FF2C6F) — não usado diretamente, reservado
- `golden` (#FAC72C) — não usado diretamente, reservado
- `font-heading` (Space Grotesk) — header do chatbot
- `font-body` (Inter) — mensagens e botões
- Classes: `glass`, `glow-cyan`, animações do tema

## Responsividade

- Desktop: drawer lateral direito (max-w-md)
- Mobile: full-screen
- Botão flutuante: sempre visível (bottom-6 right-6), some quando drawer aberto
