# Design tokens

Fonte: `tailwind.config.js` (bundled em `assets/tailwind.config.js`). Este é o arquivo que
define a identidade visual do site — é o primeiro lugar a editar quando o cliente muda.

## Cores

```js
colors: {
  brand: {
    dark: '#0A0F1C',      // fundo escuro (header top bar, footer, seções CTA)
    navy: '#1E293B',      // variação escura secundária
    light: '#F8FAFC',     // fundo claro alternado entre seções
    teal: '#0D9488',      // cor de destaque / CTA principal
    tealHover: '#0F766E', // hover do teal
    tealLight: '#5EEAD4'  // acento claro (gradientes, glow)
  },
  saude:      { light: '#5EEAD4', dark: '#0D9488' },  // gradiente temático 1
  vida:       { light: '#FDA4AF', dark: '#E11D48' },  // gradiente temático 2
  qualidade:  { light: '#93C5FD', dark: '#2563EB' },  // gradiente temático 3
  neutral:    { light: '#E2E8F0', dark: '#0A0F1C' },
  sec: { yellow: '#FBBF24', orange: '#F97316', red: '#EF4444', green: '#10B981', blue: '#3B82F6', purple: '#8B5CF6' },
  palette: { 50: '#FFFFFF', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B' }
}
```

`brand.teal` é a cor de identidade do cliente — é praticamente a única cor que precisa
mudar entre projetos. `brand.dark` pode virar mais neutro (cinza-azulado, verde-petróleo,
bordô) dependendo do posicionamento do cliente (hospital público vs. clínica premium vs.
laboratório, etc.), mas mantenha sempre um par escuro/claro com contraste alto o
suficiente para texto branco em cima.

`saude`, `vida`, `qualidade` alimentam os gradientes de fundo (`gradient-saude`,
`gradient-vida`, `gradient-qualidade`, `gradient-neutral` em `backgroundImage`) usados em
ícones de cards e na seção de CTA. Ajuste os tons mantendo a mesma lógica (uma cor clara +
uma escura da mesma família) para não quebrar `bg-gradient-saude` etc. já usados no HTML.

**Regra prática ao adaptar para um novo nicho médico:** troque `brand.teal` pela cor
primária da marca do cliente, ajuste `saude`/`vida`/`qualidade` para tons harmônicos com
ela, e deixe `brand.dark`, `brand.light` e `palette.*` como estão — eles são neutros e
funcionam para praticamente qualquer marca de saúde.

## Tipografia

```js
fontFamily: {
  sans: ['Inter', 'sans-serif'],      // corpo de texto
  heading: ['Outfit', 'sans-serif'],  // usado via font-heading (raro)
  display: ['Outfit', 'sans-serif']   // títulos grandes (h1/h2 de seção) via font-display
}
```

Google Fonts carregadas no `<head>`: `Inter:wght@400;500;600;700` +
`Outfit:wght@500;600;700;800`. Se o cliente tiver identidade visual própria com outra
fonte, troque aqui e no `<link>` de fontes do `<head>` — mas o padrão Inter (corpo) +
Outfit (títulos) funciona bem para o tom "institucional/saúde/confiança" que esse layout
transmite.

## Ícones e bibliotecas externas (via CDN, não precisam de build)

- **Font Awesome 6** (`fa-solid`, `fa-regular`, `fa-brands`) — todos os ícones do layout.
- **AOS (Animate on Scroll) 2.3.1** — `data-aos="fade-up"`, `data-aos="fade-right"`,
  `data-aos="zoom-in"` etc. em seções e cards. Inicializado em `site.js` (`AOS.init(...)`).

## Escala de espaçamento / padrão visual

- Container: `container mx-auto px-6`.
- Seções institucionais: `py-24` (ou `py-24 lg:py-32` em seções de destaque/CTA).
- Cards: `rounded-2xl` (cards de conteúdo) a `rounded-3xl` (cards maiores/imagens),
  `border border-palette-100` sobre fundo `bg-brand-light` para cards neutros.
- Botões: pill-shaped (`rounded-full`), ver `.btn-primary` e `.btn-nav-cta` em
  `references/components.md`.
- Sombra de elevação: `shadow-lg`/`shadow-xl` em CTAs e cards flutuantes.
