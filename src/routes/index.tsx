import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/rdlf/Header";
import { Hero } from "@/components/rdlf/Hero";
import { TrustStrip } from "@/components/rdlf/TrustStrip";
import { Manifesto } from "@/components/rdlf/Manifesto";
import { ProblemRiskSolution } from "@/components/rdlf/ProblemRiskSolution";
import { PracticeAreas } from "@/components/rdlf/PracticeAreas";
import { AboutAuthority } from "@/components/rdlf/AboutAuthority";
import { PlansSection } from "@/components/rdlf/PlansSection";
import { VideoTestimonials } from "@/components/rdlf/VideoTestimonials";
import { FAQ } from "@/components/rdlf/FAQ";
import { FinalCTA } from "@/components/rdlf/FinalCTA";
import { CinematicRDLFFooter } from "@/components/rdlf/CinematicRDLFFooter";
import { FloatingWhatsAppButton } from "@/components/rdlf/FloatingWhatsAppButton";
import { ScrollEffects } from "@/components/effects/ScrollEffects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abertura de Empresa em Vila Velha | Fraga Contabilidade" },
      { name: "description", content: "Abra sua empresa com segurança e orientação contábil. A Fraga Contabilidade ajuda na abertura de CNPJ, escolha do regime tributário e organização inicial da sua empresa em Vila Velha e no Espírito Santo." },
      { property: "og:title", content: "Abertura de Empresa em Vila Velha | Fraga Contabilidade" },
      { property: "og:description", content: "Abra sua empresa com clareza desde o primeiro dia. Orientação para abertura de CNPJ, escolha do regime tributário e contabilidade em Vila Velha e no Espírito Santo." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="rdlf-site-shell">
      <ScrollEffects />
      <Header />
      <main className="text-foreground">
        <Hero />
        <div className="reveal-on-scroll"><TrustStrip /></div>
        <div className="reveal-on-scroll"><Manifesto /></div>
        <div className="reveal-on-scroll"><ProblemRiskSolution /></div>
        <div className="reveal-on-scroll"><PracticeAreas /></div>
        <div className="reveal-on-scroll"><PlansSection /></div>
        <div className="reveal-on-scroll"><AboutAuthority /></div>
        <div className="reveal-on-scroll"><VideoTestimonials /></div>
        <div className="reveal-on-scroll"><FAQ /></div>
        <div className="reveal-on-scroll"><FinalCTA /></div>
      </main>
      <CinematicRDLFFooter />
      <FloatingWhatsAppButton />
    </div>
  );
}
