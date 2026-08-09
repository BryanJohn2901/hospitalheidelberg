# Catálogo de componentes

Todas as classes abaixo estão definidas em `assets/css/site.css` (1500+ linhas, CSS puro
que complementa o Tailwind). Elas já existem prontas — ao montar uma página nova, **reuse
essas classes em vez de inventar CSS novo**. Consulte `assets/css/site.css` diretamente
(via `view`/`grep -n`) quando precisar ver a implementação exata de alguma.

## Header / navegação

- `#header` — fixo no topo, com barra superior escura (`bg-brand-dark`, contato + redes)
  e barra de navegação principal (`.main-nav`, glass/blur, some ao rolar via classe
  `.scrolled` adicionada por `site.js`).
- `.nav-link-active` — item de menu ativo (pill preenchida com `brand.teal`).
- `.btn-nav-cta` / `.btn-nav-cta--mobile` — botão de CTA no header ("Fale com um
  especialista"), sempre com ícone do WhatsApp.
- `#menuBtn` + `#mobileMenu` — hambúrguer mobile. `site.js` transforma isso num drawer
  lateral (`.mobile-drawer`, `.mobile-drawer__panel`, `.mobile-drawer__backdrop`)
  automaticamente no `DOMContentLoaded` — não precisa reimplementar o JS, só manter os
  ids `menuBtn`/`mobileMenu` no HTML de cada página.

## Hero

Duas variantes, escolha uma por página:

- **Hero carrossel** (só a home) — `.hero-carousel`, `.hero-slide` (+ `.active`),
  `.hero-slide-img`, `.hero-slide-overlay`, abas `.hero-tab` (+ `.active`) e barra de
  progresso `.hero-progress`. Controlado por funções inline `heroGoTo()`, `heroPrev()`,
  `heroNext()` (script no fim do `home.html`, ver bloco `<script>` antes de `</body>`).
  Ideal para transmitir múltiplas frentes de atuação (ex.: 3 especialidades, 3 públicos).
- **Hero de página interna** — `.page-hero` com variantes `.page-hero--image` (com foto
  de fundo + `.page-hero__bg` + `.page-hero__overlay`) ou `.page-hero--light` (fundo claro
  sólido, sem foto) e `.page-hero--center` (conteúdo centralizado, usado em páginas legais
  e 404). Estrutura interna: `.page-hero__eyebrow` (categoria pequena acima do título),
  `.page-hero__title` (h1), `.page-hero__subtitle`.

## Números / prova social

- `.stats-band` + `.stats-band__grid` + `.stats-band__item` (`__value` + `__label`) —
  faixa de estatísticas logo abaixo do hero da home (ex: "+35 anos", "+100 municípios").
  Sempre usar números reais e verificáveis do cliente — nunca inventar.
- `.kpi-grid` + `.kpi-chip` — chips de indicadores menores, usados dentro de seções de
  conteúdo (não em faixa isolada).
- `.testimonial-card` (+ `__text`, `__author`, `__role`) — card de depoimento com aspas
  estilizadas via `::before`.

## Conteúdo institucional

- **Cards neutros de "desafio/diferencial"**: `p-6 rounded-2xl bg-brand-light border
  border-palette-100`, ícone Font Awesome colorido `text-brand-teal` no topo, `<h3
  class="font-bold text-brand-dark text-base mb-2">` + parágrafo `text-sm text-gray-500`.
  Usado em grids 2×2 (`grid sm:grid-cols-2 gap-4`).
- `.method-steps` + `.method-step` (`__num`, `__title`, `__text`) — passo a passo
  numerado ("Como atuamos").
- `.pillar-list` — lista com ícone de check à esquerda (`li i`), para pilares/benefícios.
- Galeria: `.gallery-overlay` (+ `--tall`), `.gallery-caption` (+ `--lg`), `.gallery-badge`,
  `.gallery-title` (+ `--lg`) — grid de fotos com legenda sobreposta (usado em Cases /
  Quem Somos para mostrar instalações).
- `.about-collage img` — colagem de fotos na seção "Sobre nós".

## FAQ

- `.faq-item` (+ `.active`), `.faq-answer` (altura animada via `.active .faq-answer`),
  `.faq-icon` (rotaciona quando ativo). JS de toggle está inline no HTML da página que usa
  FAQ (procure `faq-item` no arquivo antes de copiar a seção).

## CTA / conversão

- `.cta-band` (+ `--photo` quando tem foto de fundo) — faixa de CTA final de página,
  normalmente com `bg-gradient-neutral` + blobs de glow (`blur-[120px] rounded-full`
  posicionados absolutamente) e botão `.btn-primary`.
- `.btn-primary` — botão sólido `brand.teal`, usado no CTA principal de cada página.
- `.btn-whatsapp` — variante de botão específica para WhatsApp (ícone + texto).
- `.link-whatsapp` — link de texto simples com ícone WhatsApp (menos destaque que botão).
- `.contact-whatsapp-card` + `.contact-channel` (+ `__icon`, `--whatsapp`) — cards de
  canais de contato na página Fale Conosco.

## Widget flutuante de WhatsApp

Bloco de classes `.whatsapp-widget-root`, `.whatsapp-float` (+ `__ring`), `.whatsapp-panel`
(+ `__header`, `__chat`, `__composer`, `__actions`) — **não precisa escrever HTML manual
para isso**: `assets/js/whatsapp.js` monta o widget inteiro via JS a partir de
`window.SUPRAMED_CONFIG` (renomear a variável global por projeto — ver
`references/build-and-config.md`). Só é preciso:
1. Incluir `whatsapp.js` no fim da página.
2. Ter `window.<PREFIXO>_CONFIG` definido antes dele (via `config.js`).
3. Marcar links/botões que devem abrir o WhatsApp com `class="js-whatsapp"` (abre direto)
   ou `class="js-whatsapp-open"` (abre o painel do widget).

## Blog / artigo

- `.post-breadcrumb` (+ `__list`, `__item`, `__link`, `__current`) — breadcrumb do post,
  gerado automaticamente por `post-enhance.js` a partir do JSON-LD `BreadcrumbList` da
  página (não escrever à mão).
- `.post-layout` (grid duas colunas em desktop) + `.post-article` (coluna de conteúdo) +
  `.post-sidebar` (+ `__card`, `__block`, `__title`, `__meta`, `__share`, `__toc`,
  `__links`) — sumário/TOC gerado automaticamente a partir dos `<h2 id="...">` do artigo.
- `.post-related__grid` (+ `__head`, `__intro`) — bloco de "posts relacionados" no fim.
- Filtro de categorias na listagem do blog: atributos `data-blog-filter` (botões) e
  `data-blog-category` (cards de post) — lógica pronta em `assets/js/blog.js`.

## Footer

- `#footer` — fundo `bg-brand-dark`, grid de 12 colunas com logo+descrição, navegação,
  lista de especialidades/expertise e canais de contato.
- `.footer-certs__inner` (+ `__seal-link`, `__seal`, `__text`) — bloco opcional de
  selos/certificações (ex.: "Hospital Amigo da Criança"). Só incluir se o cliente tiver
  certificação real para mostrar — não inventar selo.
- Botão "voltar ao topo" no canto do rodapé (`onclick="window.scrollTo(...)"`, sem JS
  externo necessário).

## Regra geral ao montar uma seção nova

Antes de escrever CSS/classe nova, procure em `assets/css/site.css` se já existe um
componente parecido (`grep -n "^\." assets/css/site.css`). Esse layout foi construído para
ser reaproveitado entre projetos — a maior parte de qualquer página nova deve sair
combinando componentes já existentes com o conteúdo do cliente, não criando visual do
zero.
