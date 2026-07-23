import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Fraga Contabilidade" },
      { name: "description", content: "Política de Privacidade da Fraga Contabilidade — como coletamos, usamos e protegemos seus dados." },
      { property: "og:title", content: "Política de Privacidade | Fraga Contabilidade" },
      { property: "og:description", content: "Como a Fraga Contabilidade coleta, usa e protege seus dados." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-foreground">
      <Link to="/aberturadeempresa" className="text-sm text-muted-foreground hover:text-foreground">← Voltar</Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Política de Privacidade</h1>
      <p className="mt-6 text-muted-foreground leading-relaxed">
        A Fraga Contabilidade respeita a sua privacidade e está comprometida com a proteção
        dos dados pessoais coletados através deste site, em conformidade com a Lei Geral de
        Proteção de Dados (LGPD — Lei nº 13.709/2018).
      </p>

      <h2 className="mt-10 text-xl font-semibold">1. Dados coletados</h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Coletamos apenas as informações que você nos fornece voluntariamente ao entrar em
        contato, como nome, telefone, e-mail e dados da sua empresa, além de dados de
        navegação (cookies, endereço IP e páginas visitadas) para fins estatísticos.
      </p>

      <h2 className="mt-8 text-xl font-semibold">2. Uso dos dados</h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Utilizamos seus dados para responder a solicitações, prestar atendimento, enviar
        informações sobre serviços contábeis e cumprir obrigações legais.
      </p>

      <h2 className="mt-8 text-xl font-semibold">3. Compartilhamento</h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais.
        Podemos compartilhá-los apenas quando exigido por lei ou por ordem de autoridade
        competente.
      </p>

      <h2 className="mt-8 text-xl font-semibold">4. Seus direitos</h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Você pode solicitar a qualquer momento a confirmação, correção, atualização ou
        exclusão dos seus dados pessoais, entrando em contato pelo WhatsApp da Fraga
        Contabilidade.
      </p>

      <h2 className="mt-8 text-xl font-semibold">5. Contato</h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Dúvidas sobre esta política podem ser encaminhadas via WhatsApp (27) 98848-2268.
      </p>
    </main>
  );
}