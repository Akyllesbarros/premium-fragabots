import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/rdlf/Header";
import { Hero } from "@/components/rdlf/Hero";
import { TrustStrip } from "@/components/rdlf/TrustStrip";
import { Manifesto } from "@/components/rdlf/Manifesto";
import { ProblemRiskSolution } from "@/components/rdlf/ProblemRiskSolution";
import { PracticeAreas } from "@/components/rdlf/PracticeAreas";
import { Methodology } from "@/components/rdlf/Methodology";
import { AboutAuthority } from "@/components/rdlf/AboutAuthority";
import { FAQ } from "@/components/rdlf/FAQ";
import { FinalCTA } from "@/components/rdlf/FinalCTA";
import { CinematicRDLFFooter } from "@/components/rdlf/CinematicRDLFFooter";
import { Preloader } from "@/components/rdlf/Preloader";
import { FloatingWhatsAppButton } from "@/components/rdlf/FloatingWhatsAppButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Contabilidade em Vila Velha e para empresas no Brasil | Fraga Contabilidade" },
      { name: "description", content: "Conte com a Fraga Contabilidade para assessoria contábil, planejamento tributário, abertura de empresas, BPO financeiro e soluções estratégicas para o seu negócio." },
      { property: "og:title", content: "Fraga Contabilidade — Contabilidade estratégica desde 1974" },
      { property: "og:description", content: "+50 anos de experiência, +1.000 casos de sucesso. Fale com um especialista pelo WhatsApp." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="rdlf-site-shell">
      <Preloader />
      <Header />
      <main className="text-foreground">
        <Hero />
        <TrustStrip />
        <Manifesto />
        <ProblemRiskSolution />
        <PracticeAreas />
        <Methodology />
        <AboutAuthority />
        <FAQ />
        <FinalCTA />
      </main>
      <CinematicRDLFFooter />
      <FloatingWhatsAppButton />
    </div>
  );
}
