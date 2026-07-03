import { createFileRoute } from "@tanstack/react-router";
import { HoldingHeader } from "@/components/holding/HoldingHeader";
import { HoldingHero } from "@/components/holding/HoldingHero";
import { HoldingTrustStrip } from "@/components/holding/HoldingTrustStrip";
import { HoldingManifesto } from "@/components/holding/HoldingManifesto";
import { HoldingProblemRiskSolution } from "@/components/holding/HoldingProblemRiskSolution";
import { HoldingPracticeAreas } from "@/components/holding/HoldingPracticeAreas";
import { HoldingAboutAuthority } from "@/components/holding/HoldingAboutAuthority";
import { HoldingPlansSection } from "@/components/holding/HoldingPlansSection";
import { VideoTestimonials } from "@/components/rdlf/VideoTestimonials";
import { HoldingFAQ } from "@/components/holding/HoldingFAQ";
import { HoldingFinalCTA } from "@/components/holding/HoldingFinalCTA";
import { HoldingCinematicRDLFFooter } from "@/components/holding/HoldingCinematicRDLFFooter";
import { HoldingFloatingWhatsAppButton } from "@/components/holding/HoldingFloatingWhatsAppButton";
import { ScrollEffects } from "@/components/effects/ScrollEffects";
import { GoldenDivider } from "@/components/effects/GoldenDivider";

export const Route = createFileRoute("/holding")({
  head: () => ({
    meta: [
      { title: "Holding Familiar em Vila Velha | Fraga Contabilidade" },
      { name: "description", content: "Estruture uma holding familiar com a Fraga Contabilidade. Planejamento sucessório, proteção patrimonial e planejamento tributário para famílias em Vila Velha, no Espírito Santo e em todo o Brasil." },
      { property: "og:title", content: "Holding Familiar em Vila Velha | Fraga Contabilidade" },
      { property: "og:description", content: "Proteja o patrimônio da sua família com uma holding bem estruturada. Orientação da Fraga em planejamento sucessório, integralização de bens e governança familiar." },
    ],
  }),
  component: HoldingLandingPage,
});

function HoldingLandingPage() {
  return (
    <div className="rdlf-site-shell">
      <ScrollEffects />
      <HoldingHeader />
      <main className="text-foreground">
        <HoldingHero />
        <div className="reveal-on-scroll"><HoldingTrustStrip /></div>
        <div className="reveal-on-scroll"><HoldingManifesto /></div>
        <div className="reveal-on-scroll"><HoldingProblemRiskSolution /></div>
        <div className="reveal-on-scroll"><HoldingPracticeAreas /></div>
        <div className="reveal-on-scroll"><HoldingPlansSection /></div>
        <div className="reveal-on-scroll"><HoldingAboutAuthority /></div>
        <div className="reveal-on-scroll"><VideoTestimonials /></div>
        <div className="reveal-on-scroll"><HoldingFAQ /></div>
        <div className="reveal-on-scroll">
          <GoldenDivider className="mt-16" />
          <HoldingFinalCTA />
        </div>
      </main>
      <HoldingCinematicRDLFFooter />
      <HoldingFloatingWhatsAppButton />
    </div>
  );
}
