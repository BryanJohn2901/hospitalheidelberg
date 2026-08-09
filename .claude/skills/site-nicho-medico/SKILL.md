---
name: site-nicho-medico
description: Monta sites institucionais para clientes de nicho médico (clínicas, hospitais, consultórios, gestão hospitalar, laboratórios, PPPs em saúde) usando o layout/design system padrão da agência — HTML+Tailwind estático, com hero, seções institucionais, blog, widget de WhatsApp configurável e pipeline de build/SEO prontos. Use esta skill sempre que o usuário pedir para criar, montar, adaptar ou "reskinar" um site para um cliente da área de saúde, mencionar um novo projeto de site médico/hospitalar/clínica, pedir uma landing page ou site institucional para nicho médico, ou pedir para reaproveitar o "layout padrão" / "template" dos sites de saúde da agência. Também use ao criar um novo post de blog dentro de um site já construído com esse padrão, ou ao revisar copy de um site médico quanto a compliance de publicidade (CFM).
---

# Site — Nicho Médico (layout padrão da agência)

Base de layout extraída do site institucional **Supramed Saúde**
(github.com/BryanJohn2901/supramed) e generalizada para servir como ponto de partida em
qualquer projeto novo de site institucional para cliente do nicho médico/saúde: clínicas,
consultórios, hospitais, operadoras de gestão hospitalar, laboratórios, PPPs em saúde.

**O que este layout é:** site estático (HTML + Tailwind CSS + JS puro, sem
framework/backend), com identidade visual "confiança institucional em saúde" (paleta
escura + teal, tipografia Inter/Outfit), conversão 100% via WhatsApp contextual por
página, blog com SEO/schema completo, e pipeline de build que minifica/otimiza tudo antes
do deploy (Vercel).

**O que este layout NÃO é:** não tem agendamento online, área de paciente, prontuário,
e-commerce de produtos de saúde ou qualquer parte dinâmica/autenticada. Se o cliente
precisar de algo assim, este layout serve como o "shell" institucional (home, sobre,
serviços, blog, contato) e a parte transacional entra como integração à parte — não force
esse tipo de funcionalidade dentro deste padrão estático.

## Antes de começar: briefing rápido

Não presuma nada sobre o cliente — pergunte (ou confirme, se já foi dito na conversa):

1. **Quem é o cliente e qual o tipo de negócio** (clínica de um médico só, hospital,
   operadora/gestora, laboratório, rede de consultórios)? Isso muda a página "Nossa
   Atuação"/serviços e o tom de "Cases".
2. **Cor de marca** — tem identidade visual definida (logo, cor) ou parte do zero? Se
   parte do zero, o teal (`#0D9488`) do padrão original é uma escolha segura para saúde,
   mas vale perguntar se o cliente já tem preferência.
3. **Canal de conversão** — mantém o padrão "WhatsApp-only, sem formulário" ou o cliente
   quer formulário também (comum quando precisa qualificar/agendar por escrito)?
4. **Conteúdo disponível**: o cliente já tem fotos reais da estrutura/equipe, números
   (anos de mercado, atendimentos, certificações), CRM dos médicos responsáveis? Sem isso
   não dá pra preencher hero, stats-band e footer com dados reais — não inventar número.
5. **Domínio e dados de contato reais** (telefone, WhatsApp, e-mail, endereço) para
   `config.js`.

Se a pessoa já deu essas respostas na mensagem, não repita a pergunta — só confirme a
suposição e siga.

## Fluxo de trabalho

### 1. Copiar a base para o projeto novo

Copie tudo de `assets/` deste skill para a pasta do projeto do cliente. Estrutura de
saída esperada (nomes de pasta podem ser ajustados ao nicho, ex. `nossas-atuacoes/` vira
`servicos/` se fizer mais sentido para o cliente):

```
projeto-cliente/
├── index.html                (a partir de assets/templates/home.html)
├── 404.html
├── quem-somos/index.html
├── nossas-atuacoes/index.html   (ou servicos/, especialidades/...)
├── cases/index.html
├── blog/index.html
├── blog/<slug>/index.html    (um por post, via novo-post.sh)
├── fale-conosco/index.html
├── politica-privacidade/index.html
├── termos-de-uso/index.html
├── assets/css/site.css
├── assets/css/tailwind-input.css
├── assets/js/config.js       (a partir de config.template.js — ver abaixo)
├── assets/js/{whatsapp,site,analytics,blog,post-enhance}.js
├── assets/images/            (imagens reais do cliente — não existem no skill)
├── tailwind.config.js
├── build.js / build.sh
├── package.json
├── vercel.json
├── robots.txt                (a partir de robots.txt.template)
└── sitemap.xml                (gerado pelo build, não escrever à mão)
```

### 2. Configurar identidade e dados do cliente

1. Editar `tailwind.config.js` — trocar `brand.teal` (e a família `saude`/`vida`/
   `qualidade` se fizer sentido) pela cor do cliente. Ver `references/design-tokens.md`.
2. Renomear `window.SUPRAMED_CONFIG` para um nome único do projeto em `config.js`,
   `whatsapp.js` e `analytics.js`, e preencher todos os campos com dados reais (nunca
   deixar número de WhatsApp de teste). Ver `references/build-and-config.md`.
3. Trocar logo, favicon, `og-image.jpg` pelos do cliente.

### 3. Montar as páginas

Para cada página, usar o template correspondente em `assets/templates/` como referência
de **estrutura**, mas reescrever todo o conteúdo (textos, números, imagens, ícones de
serviço) para o cliente atual — nunca deixar texto da Supramed. Consultar:

- `references/page-anatomy.md` — o que cada página precisa ter, seção por seção.
- `references/components.md` — catálogo de classes CSS já prontas (hero, cards, CTA,
  FAQ, stats-band, widget de WhatsApp etc.) para reaproveitar em vez de criar do zero.
- `references/design-tokens.md` — cores, fontes, espaçamento.

### 4. SEO e dados estruturados

Preencher `<title>`, meta description, Open Graph e os JSON-LD (Organization/WebSite na
home, Article + BreadcrumbList em cada post) conforme `references/seo-schema.md`. Manter
o formato de data `YYYY-MM-DD` em `datePublished`/`dateModified` — o build depende disso
para gerar o sitemap.

### 5. Compliance de publicidade médica

Antes de finalizar qualquer copy (home, serviços, cases, posts de blog), rodar a
checklist de `references/compliance-medico.md` — promessa de resultado, superlativos sem
prova, depoimento com adjetivo de superioridade, foto de paciente sem autorização, CRM/RQE
visível. Isso vale tanto para texto que você escrever quanto para texto que o cliente
mandar pronto — sinalizar problema em vez de publicar direto.

### 6. Novo post de blog (quando o projeto já está no ar)

Seguir o processo em `references/build-and-config.md#criar-um-novo-post-de-blog-novo-postsh`
— rodar `novo-post.sh`, depois lembrar dos 3 passos manuais que o script não faz sozinho
(registrar em `HTML_PAGES` no `build.js`, adicionar card em `blog/index.html`, adicionar
entrada em `post-enhance.js`).

### 7. Build e validação antes de entregar/publicar

```bash
npm install
npm run build     # gera dist/ com CSS/JS minificados, imagens otimizadas, sitemap
npm run start      # serve dist/ localmente para conferir antes do deploy
```

O `build.js` falha (exit 1) se algum path de asset referenciado no HTML não existir —
rodar o build é a forma mais rápida de pegar link/imagem quebrada antes de mandar pro
cliente ver.

### 8. Checklist final de pré-lançamento

Ver lista completa em `references/build-and-config.md#checklist-de-pré-lançamento`.
Itens bloqueantes mais comuns de esquecer: WhatsApp real (não o de teste), revisão
jurídica de política de privacidade/termos, e a checklist de compliance médica do passo 5.

## Quando NÃO usar este padrão como está

- Cliente precisa de agendamento online integrado, telemedicina, ou área logada de
  paciente → este layout serve de shell institucional, mas a parte transacional precisa
  de stack própria (backend real) — não tente simular isso em HTML estático.
- Cliente é e-commerce de produtos de saúde (farmácia online, suplementos) → estrutura de
  catálogo/carrinho não existe aqui; considerar WooCommerce/Tray (ver stack usual da
  agência) em vez de forçar este layout institucional.
- Cliente quer captar lead por formulário qualificado (não só WhatsApp) → dá pra
  adicionar, mas não é o padrão pronto — avisar que é uma extensão, não algo "de fábrica"
  deste kit.
