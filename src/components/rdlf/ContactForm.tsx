import { useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";
import { RDLFAnimatedLayerButton } from "./motion/RDLFAnimatedLayerButton";
import { WorldClassCard } from "./motion/WorldClassCard";

const WHATSAPP_NUMBER = "5527988496428";


const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  company: z.string().trim().min(2, "Informe a empresa").max(120),
  email: z.string().trim().email("E-mail inválido").max(160),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido").max(40),
  area: z.string().min(1, "Selecione uma área"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consentimento obrigatório" }),
  }),
});

const areas = [
  "Propriedade Intelectual",
  "Contratos",
  "Consultoria Preventiva",
  "Estruturação Jurídica",
  "Compliance",
  "Conflitos",
  "Não sei ainda",
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: form.get("name"),
      company: form.get("company"),
      email: form.get("email"),
      whatsapp: form.get("whatsapp"),
      area: form.get("area"),
      message: form.get("message"),
      consent: form.get("consent") === "on",
    };
    const result = schema.safeParse(payload);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setStatus("loading");
    try {
      const d = result.data;
      const lines = [
        "Olá Fraga, gostaria de agendar um diagnóstico.",
        "",
        `Nome: ${d.name}`,
        `Empresa: ${d.company}`,
        `E-mail: ${d.email}`,
        `WhatsApp: ${d.whatsapp}`,
        `Área de interesse: ${d.area}`,
      ];
      if (d.message) lines.push("", `Mensagem: ${d.message}`);
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
      console.log("[BuildStatic] ContactForm -> WhatsApp", url);
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("success");
      formEl.reset();
    } catch (err) {
      console.error("[BuildStatic] ContactForm error", err);
      setStatus("error");
    }
  }




  return (
    <section id="contato" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.30_0.045_175/0.15),transparent_60%)]" />
      </div>
      <div className="container-rdlf grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Agendar diagnóstico</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.03em] text-bone mt-5">
              Vamos ler o{" "}
              <span className="italic text-[color:var(--gold-light)]">mapa jurídico</span> da
              sua empresa juntos.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-bone/65 leading-relaxed max-w-md text-[15px]">
              Conta brevemente o cenário. Em até 1 dia útil retornamos com a melhor forma
              de conduzir o diagnóstico.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 space-y-4 text-sm text-bone/70 max-w-sm">
              <Detail k="Resposta" v="Até 1 dia útil" />
              <Detail k="Formato" v="Reunião online estruturada" />
              <Detail k="Confidencialidade" v="NDA disponível sob solicitação" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <WorldClassCard radius="rounded-3xl" intensity="soft" noSpotlight>
          <form
            onSubmit={onSubmit}
            className="glass-card rounded-3xl p-7 md:p-9 space-y-5"
            noValidate
          >

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nome" name="name" error={errors.name} />
              <Field label="Empresa" name="company" error={errors.company} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="E-mail" name="email" type="email" error={errors.email} />
              <Field label="WhatsApp" name="whatsapp" error={errors.whatsapp} />
            </div>
            <div>
              <label className="eyebrow block mb-2">Área de interesse</label>
              <select
                name="area"
                defaultValue=""
                className="w-full bg-ink/60 border border-white/10 rounded-xl px-4 py-3 text-bone text-sm focus:border-[color:var(--gold)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]/20 transition-all"
              >
                <option value="" disabled>
                  Selecione…
                </option>
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              {errors.area && <ErrorText msg={errors.area} />}
            </div>
            <div>
              <label className="eyebrow block mb-2">Mensagem</label>
              <textarea
                name="message"
                rows={4}
                maxLength={1000}
                placeholder="Conte brevemente o cenário da empresa."
                className="w-full bg-ink/60 border border-white/10 rounded-xl px-4 py-3 text-bone text-sm focus:border-[color:var(--gold)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]/20 transition-all resize-none"
              />
            </div>

            <label className="flex items-start gap-3 text-xs text-bone/60 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-ink accent-[color:var(--gold)]"
              />
              <span>
                Autorizo o contato pela Fraga para tratativas relacionadas a este pedido,
                conforme a Política de Privacidade.
              </span>
            </label>
            {errors.consent && <ErrorText msg={errors.consent} />}

            <RDLFAnimatedLayerButton
              type="submit"
              className="w-full"
              disabled={status === "loading"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "loading" ? (
                  <motion.span
                    key="l"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando
                  </motion.span>
                ) : status === "success" ? (
                  <motion.span
                    key="s"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Recebido. Retornaremos em breve.
                  </motion.span>
                ) : (
                  <motion.span
                    key="i"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    Enviar pedido
                  </motion.span>
                )}
              </AnimatePresence>
            </RDLFAnimatedLayerButton>

            {status === "error" && (
              <p className="text-xs text-destructive flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5" />
                Não foi possível enviar. Tente novamente.
              </p>
            )}
          </form>
          </WorldClassCard>
        </Reveal>

      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full bg-ink/60 border border-white/10 rounded-xl px-4 py-3 text-bone text-sm placeholder:text-bone/30 focus:border-[color:var(--gold)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]/20 transition-all"
      />
      {error && <ErrorText msg={error} />}
    </div>
  );
}

function ErrorText({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 text-[11px] text-destructive flex items-center gap-1.5">
      <AlertCircle className="h-3 w-3" /> {msg}
    </p>
  );
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <span className="eyebrow">{k}</span>
      <span className="text-bone">{v}</span>
    </div>
  );
}
