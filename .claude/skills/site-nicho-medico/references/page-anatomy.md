# Anatomia das páginas

Cada página é um `.html` estático e autocontido (sem includes/templating no servidor —
header, footer e `<head>` são repetidos em cada arquivo). Isso é intencional: o site é 100%
estático, publicado direto (Vercel), sem backend. Os templates de referência estão em
`assets/templates/`. **Não copie o conteúdo Supramed** (PPP, hospitais, "+35 anos", etc.)
— copie a estrutura de seções e troque o conteúdo pelo do nicho do cliente atual.

## `home.html` — Página inicial

1. Hero carrossel (3 slides/abas) — ver `references/components.md#hero`.
2. Faixa de números/estatísticas (`.stats-band`).
3. "O desafio" — 2 colunas: texto à esquerda, grid 2×2 de cards de dor/contexto à
   direita. Serve para conectar a dor do público-alvo à proposta do cliente.
4. "Nossa atuação" — grid estilo especialidades/serviços (o bloco mais extenso da home;
   é onde entram os serviços médicos específicos do cliente).
5. "Sobre nós" — colagem de fotos + texto institucional resumido (link para Quem Somos).
6. "Como atuamos" — `.method-steps` numerado.
7. "Gestão por performance" (ou equivalente de diferencial de resultado/qualidade).
8. Vídeo ou case em destaque — bloco com player/thumbnail + texto de apoio.
9. Case detalhado — prova social concreta (número de leitos, pacientes atendidos, etc.
   — adaptar para métrica real do nicho: pacientes/mês, procedimentos, avaliação, etc.).
10. Notícias/blog — 2-3 posts recentes em destaque.
11. Diferenciais em formato FAQ (`.faq-item`).
12. CTA final (`.cta-band`) com botão `.btn-primary` para WhatsApp.

## `quem-somos.html` — Institucional / sobre

`.page-hero--image` no topo (foto real da estrutura/equipe) → história/missão →
diferenciais → prova social (selos, números, certificações) → CTA final.

## `servicos-atuacao.html` (era "nossas-atuacoes" na Supramed) — Serviços/especialidades

Página dedicada a detalhar cada frente de atuação/especialidade médica com mais
profundidade do que a home. Um bloco por serviço, com ícone, título, descrição e
eventualmente um link "saiba mais" ou CTA de WhatsApp específico daquele serviço
(`data-whatsapp-page="nome-do-servico"` — ver `build-and-config.md`).

## `cases.html` — Cases / prova social

Estudo de caso detalhado com números, fotos e narrativa "problema → solução → resultado".
Para nicho médico sem case de PPP, adaptar para: casos de sucesso de tratamento (sem
prometer resultado individual — ver `references/compliance-medico.md`), certificações
recebidas, parcerias com hospitais/planos de saúde, prêmios.

## `blog-index.html` — Listagem do blog

Grid de cards de post com filtro por categoria (`data-blog-filter` /
`data-blog-category`, lógica em `blog.js`). Cada card: imagem, categoria, título, resumo,
data, tempo de leitura.

## `blog-post.html` — Template de artigo (`_template-post/index.html` na origem)

Contém placeholders `{{SLUG}}`, `{{TITULO}}`, `{{DESCRICAO}}`, `{{CATEGORIA}}`,
`{{IMAGEM}}`, `{{TEMPO_LEITURA}}`, `{{DATA}}`, `{{DATA_ISO}}` — usado pelo script
`novo-post.sh` para gerar posts novos por substituição de texto. Estrutura:
breadcrumb (auto) → `.post-layout` com `.post-article` (conteúdo real, H2s com `id` para
gerar TOC automático) + `.post-sidebar` (metadados, compartilhar, TOC, links). Ver processo
completo de criação de post em `references/build-and-config.md#novo-post`.

## `fale-conosco.html` — Contato

Sem formulário (decisão de produto da Supramed: **contato 100% via WhatsApp**, ver
`PENDENCIAS-PRE-LANCAMENTO.md` original — "Formulários removidos — contato via WhatsApp").
Cards de canais de contato (`.contact-whatsapp-card`, `.contact-channel`) + endereço +
horário de atendimento, se aplicável. Avalie com o usuário se o cliente atual quer manter
esse padrão "sem formulário" ou se prefere formulário (ex.: clínicas que precisam
qualificar pré-agendamento por escrito) — não é uma regra fixa do nicho médico, é uma
escolha de produto que pode mudar por cliente.

## `contato-redirect.html` — Redirecionamento

Página simples que existe só por compatibilidade de SEO/links antigos e redireciona para
`/fale-conosco/`. Ver o redirect equivalente e mais permanente em `vercel.json`
(`redirects`). Normalmente nem precisa existir num projeto novo — comece direto com
`/fale-conosco/` como única URL de contato e não crie esse redirect a menos que haja uma
URL legada para preservar.

## `politica-privacidade.html` / `termos-de-uso.html` — Páginas legais

`.page-hero--center` + texto corrido. **Sempre sinalizar ao cliente que precisa de
revisão jurídica antes de publicar** — o texto gerado é um rascunho, não parecer legal.
Para clínicas/consultórios que coletam dados de saúde, considerar menção a LGPD com
atenção especial a dados sensíveis de saúde (art. 11 da LGPD).

## `404.html`

`.page-hero--center` simples, mensagem amigável + link para home + (opcional) link para
WhatsApp. Vercel já trata isso automaticamente com `cleanUrls`/`trailingSlash` em
`vercel.json` — só precisa existir o arquivo.

## Convenção de URLs

Cada página vive em `pasta/index.html` (ex.: `/quem-somos/index.html`) para gerar URLs
limpas (`/quem-somos/`) sem `.html` — exceto `index.html` (home) e `404.html` na raiz.
Sempre criar a pasta, nunca `quem-somos.html` solto.
