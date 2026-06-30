import { FileText } from "lucide-react";

const stages = [
  { label: "Iniciação", icon: "↥", x: 300, y: 42 },
  { label: "Escrita", icon: "✎", x: 438, y: 92 },
  { label: "Negociação", icon: "”", x: 522, y: 222 },
  { label: "Edição", icon: "⌕", x: 500, y: 388 },
  { label: "Aprovação da\nAssinatura", icon: "✓", x: 402, y: 520 },
  { label: "Execução", icon: "▷", x: 300, y: 560 },
  { label: "Acompanhamento", icon: "⌁", x: 166, y: 482 },
  { label: "Geração\nde relatórios", icon: "▥", x: 86, y: 335 },
  { label: "Finalização ou\nrenovação", icon: "↻", x: 112, y: 168 },
];

function LifecycleDial() {
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="rdlf-disc" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="oklch(0.40 0.06 175)" />
          <stop offset="62%" stopColor="oklch(0.22 0.05 175)" />
          <stop offset="100%" stopColor="#041F1F" />
        </radialGradient>
        <filter id="rdlf-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="24" stdDeviation="26" floodColor="black" floodOpacity="0.45" />
        </filter>
        <filter id="rdlf-green-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="300" cy="300" r="238" fill="none" stroke="oklch(1 0 0 / 0.05)" strokeWidth="1" />
      <circle cx="300" cy="300" r="190" fill="none" stroke="oklch(0.94 0.012 85 / 0.18)" strokeWidth="1" />

      <g transform="translate(300 300)">
        {Array.from({ length: 72 }).map((_, i) => {
          const angle = (i / 72) * Math.PI * 2;
          const major = i % 6 === 0;
          const r1 = 205;
          const r2 = major ? 186 : 196;
          const x1 = Math.cos(angle) * r1;
          const y1 = Math.sin(angle) * r1;
          const x2 = Math.cos(angle) * r2;
          const y2 = Math.sin(angle) * r2;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--gold-light)"
              strokeWidth={major ? 2.4 : 1}
              opacity={major ? 0.9 : 0.42}
            />
          );
        })}
      </g>

      <path
        d="M 126 398 A 205 205 0 0 1 241 104"
        fill="none"
        stroke="var(--gold-light)"
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.58"
        filter="url(#rdlf-soft-shadow)"
      />

      <circle cx="300" cy="300" r="137" fill="url(#rdlf-disc)" stroke="oklch(0.94 0.012 85 / 0.35)" strokeWidth="1" filter="url(#rdlf-soft-shadow)" />
      <text x="300" y="274" textAnchor="middle" className="font-display" fill="var(--bone)" fontSize="27" fontWeight="600">
        <tspan x="300" dy="0">Gestão de</tspan>
        <tspan x="300" dy="32">ciclo de vida</tspan>
        <tspan x="300" dy="32">do contrato</tspan>
      </text>
      <circle cx="300" cy="430" r="10" fill="#FF3131" filter="url(#rdlf-green-glow)" />

      {stages.map((stage) => (
        <g key={stage.label} transform={`translate(${stage.x} ${stage.y})`}>
          <text textAnchor="middle" y="0" fill="var(--gold-light)" fontSize="24" fontFamily="Georgia, serif">
            {stage.icon}
          </text>
          <text textAnchor="middle" y="24" fill="var(--bone)" opacity="0.86" fontSize="12" fontFamily="Manrope, sans-serif">
            {stage.label.split("\n").map((line, index) => (
              <tspan key={line} x="0" dy={index === 0 ? 0 : 14}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ContractLifecycle() {
  return (
    <section
      id="contratos"
      className="relative isolate overflow-hidden py-24 md:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_75%_at_64%_48%,rgba(11,70,68,0.45),transparent_70%)]" />

      <div className="container-rdlf mx-auto max-w-[1240px]">
        <div className="grid min-h-[690px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">
          {/* LEFT */}
          <div className="relative">
            {/* small icon mark */}
            <div className="mb-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#F5F0E1]/60">
              <FileText className="h-5 w-5 text-[#F5F0E1]" />
            </div>

            <h2
              className="font-display max-w-[520px] text-[clamp(2.8rem,4.7vw,5rem)] leading-[0.9] tracking-[-0.02em] text-bone"
              style={{ fontWeight: 600 }}
            >
              Gestão de contratos
              <br />
              <span className="text-gold-light">não</span>
              <br />é só revisar
              <br />
              <span className="text-gold-light">documentos!</span>
            </h2>

            <div className="mt-8 h-px w-28 bg-white/30" />

            <p className="mt-8 max-w-md text-[15px] leading-[1.75] text-bone/75">
              É um processo completo que vai da requisição até o arquivamento,
              passando por fases como análise, elaboração, aprovação, execução,
              controle de prazos, renovação, auditoria e governança.
            </p>
          </div>

          {/* RIGHT — DIAL */}
          <div className="relative mx-auto aspect-square w-full max-w-[610px] overflow-visible lg:translate-x-4">
            <LifecycleDial />
          </div>
        </div>
      </div>
    </section>
  );
}
