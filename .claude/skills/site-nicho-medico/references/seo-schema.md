# SEO e dados estruturados

## `<head>` padrão (repetir em toda página, com valores próprios)

```html
<title>Nome do Cliente | Proposta de valor em poucas palavras</title>
<meta name="description" content="...até ~160 caracteres, com número/prova concreta se houver...">
<link rel="canonical" href="https://dominio.com.br/caminho-da-pagina/">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Nome do Cliente">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://dominio.com.br/og-image.jpg">
<meta property="og:url" content="https://dominio.com.br/caminho-da-pagina/">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://dominio.com.br/og-image.jpg">
```

`og-image.jpg` deve ser 1200×630, ~20KB (usar o padrão do template original como
referência de tamanho/peso). Uma imagem por post de blog é recomendável (`og-image` do
post ≠ og-image geral do site) para melhor preview ao compartilhar artigos.

## JSON-LD — Organization (uma vez, na home)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nome do Cliente",
  "description": "...",
  "url": "https://dominio.com.br",
  "logo": "https://dominio.com.br/logo.png",
  "email": "contato@dominio.com.br",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "...",
    "addressRegion": "UF",
    "addressCountry": "BR"
  },
  "sameAs": ["https://wa.me/55..."],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contato@dominio.com.br",
    "contactType": "customer service",
    "availableLanguage": "Portuguese"
  }
}
```

Para clínicas/consultórios (pessoa física ou PJ prestando atendimento direto ao
paciente), avaliar usar `@type: "MedicalOrganization"` ou `"MedicalClinic"` em vez de
`"Organization"` genérico — schema.org tem tipos específicos de saúde
(`MedicalOrganization`, `Hospital`, `Physician`, `MedicalClinic`) que ajudam o Google a
entender melhor o negócio. Confirmar qual se aplica ao caso antes de usar.

## JSON-LD — WebSite (uma vez, na home)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nome do Cliente",
  "url": "https://dominio.com.br",
  "description": "...",
  "publisher": { "@type": "Organization", "name": "Nome do Cliente" },
  "inLanguage": "pt-BR"
}
```

## JSON-LD — Article (uma por post de blog)

Precisa incluir `datePublished` e `dateModified` em formato `YYYY-MM-DD` — o `build.js`
lê esses campos automaticamente para preencher `<lastmod>` no sitemap, então **manter o
formato exato** é importante para o build funcionar.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "image": "https://dominio.com.br/assets/...",
  "datePublished": "2026-05-29",
  "dateModified": "2026-05-29",
  "author": { "@type": "Organization", "name": "Nome do Cliente" },
  "publisher": { "@type": "Organization", "name": "Nome do Cliente", "logo": { "@type": "ImageObject", "url": "https://dominio.com.br/logo.png" } }
}
```

## JSON-LD — BreadcrumbList (uma por post/página interna)

`post-enhance.js` lê esse schema para renderizar o breadcrumb visual automaticamente —
por isso ele precisa existir e estar correto em cada post de blog, não é só decoração
para o Google.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dominio.com.br/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://dominio.com.br/blog/" },
    { "@type": "ListItem", "position": 3, "name": "Título do Post", "item": "https://dominio.com.br/blog/slug/" }
  ]
}
```

## FAQPage (opcional, na seção de FAQ da home ou de uma página de serviço)

Se a seção de diferenciais/FAQ tiver perguntas reais e específicas (não genéricas),
vale marcar com `@type: "FAQPage"` para elegibilidade a rich results — mas só se as
perguntas e respostas no schema forem **idênticas** ao texto visível na página (Google
penaliza schema que não bate com o conteúdo visível).

## `robots.txt` e `sitemap.xml`

`robots.txt` (`assets/robots.txt.template`) é fixo — só trocar a URL do sitemap:
```
User-agent: *
Allow: /

Sitemap: https://dominio.com.br/sitemap.xml
```

`sitemap.xml` **não se edita à mão** — é gerado pelo `build.js` (função
`generateSitemap()`) a partir de `HTML_PAGES` + `SITEMAP_META`. Ao adicionar página nova,
adicionar nas duas listas dentro de `build.js` (ver `references/build-and-config.md`).

## Boas práticas de imagem já embutidas no layout

- `loading="lazy"` em toda imagem abaixo da dobra; hero usa `loading="eager"
  fetchpriority="high"` na primeira imagem (LCP).
- `width`/`height` explícitos em `<img>` para evitar layout shift (CLS).
- `decoding="async"` como padrão.
- Fallback de imagem quebrada via JS (`initImageFallback` em `site.js`) — troca por uma
  imagem de stock genérica se o `src` der erro 404. Útil durante desenvolvimento, mas
  **substituir pelas imagens reais do cliente antes de publicar** — não deixar o
  fallback genérico em produção.
