# Build, configuração e deploy

## Arquitetura

Site 100% estático (HTML/CSS/JS puro, sem framework/backend). Tailwind é usado só como
ferramenta de build (CLI, purga classes não usadas) — não há CDN do Tailwind em produção.
Deploy recomendado: Vercel (build automático a cada push), mas qualquer host estático
funciona (`dist/` é a pasta final).

## Padrão de configuração central (`config.js`)

**O ponto mais importante para adaptar o layout a um cliente novo.** Todo dado que muda
por cliente (telefone, WhatsApp, e-mail, endereço, textos de mensagem por página) fica
em UM único arquivo: `assets/js/config.template.js` neste skill → vira
`assets/js/config.js` no projeto do cliente.

```js
window.SUPRAMED_CONFIG = {   // renomear para <PREFIXO>_CONFIG (ex.: DRFULANO_CONFIG)
    gtmId: '',
    whatsappNumber: '554131663610',       // DDI 55 + DDD + número, só dígitos
    phoneDisplay: '(41) 3166-3610',
    phoneTel: '+554131663610',
    contactEmail: 'contato@dominio.com.br',
    addressDisplay: 'Endereço completo',
    siteUrl: 'https://dominio.com.br',
    whatsappLabel: 'Fale Conosco',
    whatsappWidgetTitle: 'Nome do Cliente',
    whatsappWidgetGreeting: 'Mensagem de saudação do widget de WhatsApp.',
    whatsappWidgetLogo: '/logo.jpeg',
    whatsappMessages: {
        default: 'Mensagem padrão quando a página não tem uma específica.',
        home: 'Mensagem pré-preenchida quando o clique vem da Home.',
        'quem-somos': 'Mensagem pré-preenchida quando vem de Quem Somos.',
        // uma chave por data-page / slug de página — ver whatsapp.js
    }
};
```

**Passos para adaptar por cliente:**
1. Renomear a variável global (`SUPRAMED_CONFIG` → algo único do projeto) em
   `config.js` **e** em todo lugar que a lê: `whatsapp.js` (`getConfig()`),
   `analytics.js` (`var cfg = window.SUPRAMED_CONFIG`). É um find-and-replace simples.
2. Preencher todos os campos com dados reais do cliente.
3. Escrever uma mensagem de WhatsApp por página/seção relevante — cada mensagem já dá
   contexto pro atendente saber de onde veio o lead (isso é a maior vantagem do padrão:
   rastreamento de origem do lead sem precisar de UTM/analytics extra).
4. Nunca commitar números de teste/placeholder (`5511999999999`) num build de produção —
   isso é item bloqueante de pré-lançamento (ver checklist mais abaixo).

`data-page="<slug>"` no `<body>` de cada HTML é o que conecta a página à mensagem certa
em `whatsappMessages`. Se não houver `data-page`, `whatsapp.js` deduz o slug pela URL.

## Pipeline de build (`build.js` via `npm run build`)

1. Compila Tailwind (CLI, `--minify`, purga por `content` do `tailwind.config.js`).
2. Minifica CSS (`site.css` + `tailwind-built.css`) com CleanCSS nível 2.
3. Minifica e reescreve paths do JS com Terser.
4. Otimiza imagens (`sharp`: JPEG qualidade 80/mozjpeg, PNG compressionLevel 9) e copia
   `assets/docs/` (PDFs) como estão.
5. Copia arquivos de raiz (favicon, logos, `og-image.jpg`, robots.txt).
6. Minifica HTML de cada página listada em `HTML_PAGES` (**atualizar essa lista sempre
   que criar uma página nova** — é um array manual em `build.js`), reescrevendo
   `/assets/css/` → `/css/`, `/assets/js/` → `/js/`, `/assets/images/` → `/assets/` e
   aplicando cache-busting (`?v=<hash-do-commit>`).
7. Gera `sitemap.xml` automaticamente a partir de `HTML_PAGES` + `SITEMAP_META` (usa
   `dateModified`/`datePublished` do JSON-LD de cada página como `<lastmod>`).
8. Valida que todo caminho `/css|js|assets/...` referenciado no HTML final existe em
   `dist/` — falha o build (`process.exit(1)`) se faltar algum arquivo. Isso pega link
   quebrado de imagem/asset antes do deploy.

Existe também `build.sh` (versão bash equivalente, mais simples, sem otimização de
imagem/minificação — útil se Node não estiver disponível). Preferir `build.js`/`npm run
build` como padrão.

Scripts do `package.json`:
- `npm run build` → gera `dist/`
- `npm run build:css` → só recompila o Tailwind (útil durante desenvolvimento)
- `npm run start` → serve `dist/` localmente em `localhost:4173`

## `vercel.json`

- `buildCommand: npm run build`, `outputDirectory: dist`.
- `cleanUrls: true` + `trailingSlash: true` → URLs sempre terminam em `/`, sem `.html`.
- Redirect automático `www.` → domínio raiz (ajustar `host` para o domínio do cliente).
- Redirects 301 de URLs antigas de slug de blog para o post atual — só necessário se
  o cliente estiver migrando de outro site e precisar preservar SEO de URLs existentes.
- Headers de cache agressivo (`immutable`, 1 ano) para `/css/`, `/js/`, e cache mais
  curto para `/assets/` (imagens) — já configurado, normalmente não precisa mexer.
- Security headers padrão (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) — manter.

## Criar um novo post de blog (`novo-post.sh`)

Script interativo que pergunta slug, título, meta description, categoria, imagem de capa
e tempo de leitura, gera `blog/<slug>/index.html` a partir de
`_template-post/index.html` substituindo os placeholders, e adiciona a entrada no
`sitemap.xml`. Depois de rodar o script, ainda faltam 3 passos manuais:
1. Adicionar a página nova em `HTML_PAGES` (`build.js`) para ela ser incluída no build.
2. Adicionar o card do post em `blog-index.html` (listagem).
3. Adicionar uma entrada em `META` dentro de `assets/js/post-enhance.js` (categoria,
   data, tempo de leitura, data de atualização) — sem isso o breadcrumb/TOC/sidebar do
   post não são enriquecidos corretamente.
4. Se o post deve aparecer na home ("Notícias"), atualizar aquela seção manualmente.

## Checklist de pré-lançamento (adaptar de `PENDENCIAS-PRE-LANCAMENTO.md`)

Bloqueante antes de publicar:
- [ ] Telefone/WhatsApp real preenchido em `config.js` (nunca subir com número de teste)
- [ ] `gtmId` real ou vazio (analytics.js já ignora automaticamente se vazio/placeholder)
- [ ] Domínio verificado no Google Search Console + sitemap enviado
- [ ] Deploy com HTTPS + redirect `www` ↔ domínio canônico configurado
- [ ] Revisão jurídica de Política de Privacidade e Termos de Uso
- [ ] Revisão de compliance de publicidade médica (ver `compliance-medico.md`) em toda
      página que menciona procedimentos, resultados ou especialidades

Importante na primeira semana:
- [ ] Links reais de redes sociais (Instagram/LinkedIn/Facebook)
- [ ] CNPJ, razão social e endereço confirmados no rodapé
- [ ] Validar todo número/estatística usado no site com o cliente (nunca estimar)
- [ ] PageSpeed mobile (meta comum: LCP < 2,5s) — otimização de imagem do `build.js` já
      ajuda bastante, mas vale medir depois do deploy real
