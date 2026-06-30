## Objetivo

Migrar a landing da Fraga para a arquitetura visual do projeto RDLF enviado no ZIP (componentes, efeitos, botões, animações, GSAP/Framer/Three, preloader, footer cinematográfico, FAB), **mantendo 100% da copy atual da Fraga** (títulos, descrições, listas, FAQ, planos, depoimentos, números, CTAs em português).

## Escopo

### O que será copiado do RDLF
- Estrutura de seções em `src/components/fraga/` (renomeando o namespace `rdlf` → `fraga`):
  Header, Hero, TrustStrip, Manifesto, ProblemRiskSolution, AutoLegalOperatingSystem, ContractLifecycle, PracticeAreas, Methodology, CaseSituations, AboutAuthority, ContactForm, CinematicFooter, Preloader, FloatingWhatsAppButton, primitives e helpers de motion.
- `src/styles.css` completo do RDLF (tokens, animações, utilitários) — **adaptando apenas as variáveis de cor para a paleta Fraga** (`#36a2ac` teal, `#ffa819` laranja, `#edf7f8` mist, branco, cinzas).
- Dependências novas: `framer-motion`, `gsap`, `three`, `@types/three`.
- Assets necessários (mantendo o logo `fraga-logo.png` já existente; ignorando `about-portrait` e `rdlf-logo`).

### Mapeamento copy Fraga → seções RDLF

| Seção RDLF                  | Copy Fraga usada                                     |
| --------------------------- | ---------------------------------------------------- |
| Hero                        | Headline + lede + CTAs + ledger de números atuais    |
| TrustStrip                  | Linha "+50 anos, +1.000 empresas, CRC-ES, 4,9/5"     |
| Manifesto                   | "Impostos em ordem / Números claros / Decisões…"     |
| ProblemRiskSolution         | Seção "Como começa" + diferenciais                   |
| AutoLegalOperatingSystem    | "Como trabalhamos" (etapas/jornada WhatsApp)         |
| ContractLifecycle           | "Serviços numerados" da Fraga                        |
| PracticeAreas               | "StageSolutions" / soluções por estágio              |
| Methodology                 | "InteractiveDifferentials"                           |
| CaseSituations              | "VideoTestimonials" + "CommunityTrust"               |
| AboutAuthority              | "HistoryAuthority" (história desde 1974)             |
| Plans (novo, baseado RDLF)  | Seção "Planos" atual                                 |
| FAQ                         | "Dúvidas comuns que recebemos"                       |
| ContactForm → FinalCTA      | "Atendimento direto · sem formulário" + WhatsApp     |
| CinematicFooter             | Footer da Fraga (links, endereço, CRC, créditos)     |
| FloatingWhatsAppButton      | Substitui o FAB atual; usa `waLink` existente        |

### O que NÃO muda
- Toda a copy textual em português atual (frases, listas, números, CTAs, FAQs, planos, depoimentos).
- Paleta de marca Fraga (`#36a2ac`, `#ffa819`, `#edf7f8`, branco/cinza).
- Logo `fraga-logo.png` no header.
- Número/CTAs do WhatsApp (`src/lib/whatsapp.ts`).
- Rota TanStack `/` em `src/routes/index.tsx` (apenas o conteúdo do componente vira a composição RDLF).

### Detalhes técnicos
- Instalar deps: `bun add framer-motion gsap three @types/three`.
- Copiar `src/components/rdlf/*` → `src/components/fraga-sections/*`, ajustar imports `@/components/rdlf/...`.
- Substituir `App.tsx` do RDLF pela função `LandingPage` em `src/routes/index.tsx` que monta a mesma sequência de seções.
- Reescrever variáveis CSS do `styles.css` do RDLF (`:root`) para paleta Fraga; manter @keyframes, @utility, @property, animações.
- Manter `PremiumButton.tsx`, `VideoModal.tsx`, `whatsapp.ts` atuais; integrá-los onde fizer sentido (CTA principal).
- Remover `ScrollProgress` antigo se conflitar.
- Não tocar em `src/routes/__root.tsx`, router, server functions.

### Riscos
- GSAP/Three em SSR (TanStack Start): garantir `useEffect`/dynamic guards onde necessário.
- Bundle maior (Three.js ~600kb). Aceitável para landing.
- Tempo de adaptação alto (~30 componentes); risco de pequenas inconsistências de copy — vou validar seção por seção contra o `index.tsx` atual.

## Entrega

Ao final, a página `/` renderiza a mesma copy da Fraga atual, mas dentro do shell visual/efeitos do RDLF, com paleta Fraga aplicada.