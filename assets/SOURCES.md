# Fontes de conteúdo e assets

Consulta realizada em 17/07/2026. Somente canais públicos oficiais foram usados nesta integração.

## Conteúdo institucional do DevClub

- **Nome:** apresentação, público, formações, tecnologias, metodologia, comunidade e empresas citadas
- **Tipo:** informação institucional
- **Página de origem:** https://www.devclub.com.br/
- **Uso no projeto:** hero; seções `quem-somos`, `formacoes`, conteúdo institucional distribuído e CTA final
- **Arquivo local:** `index.html`
- **Data da consulta:** 17/07/2026
- **Alterações realizadas:** paráfrases curtas para adequação ao espaço da interface; nomes de formações, tecnologias e empresas preservados
- **Observações:** as empresas são apresentadas pelo site como contratantes de alunos, não como parceiras. Estatísticas divergentes e depoimentos com identidades genéricas não foram utilizados.

## Informações públicas sobre Rodolfo Mori

- **Nome:** Rodolfo Mori
- **Tipo:** biografia institucional
- **Páginas de origem:** https://devclub.com.br/sobre/ e https://www.rodolfomori.com/
- **Uso no projeto:** seção `feras-dev`
- **Arquivo local:** `index.html`
- **Data da consulta:** 21/07/2026
- **Alterações realizadas:** biografia resumida e parafraseada
- **Observações:** foram usados somente o papel de fundador, o início como eletricista no Metrô de São Paulo e a motivação declarada para criar o DevClub. A frase exibida no palco é identificada como mensagem editorial do desafio, não como citação documental de Rodolfo.

## Símbolo oficial do DevClub

- **Nome:** símbolo pixelado `{ DC }`
- **Tipo:** asset de marca em PNG
- **Página de origem:** https://www.devclub.com.br/
- **URL do asset:** https://www.devclub.com.br/figma/Group.png
- **Uso no projeto:** header, hero e footer
- **Arquivo local:** `assets/logos/devclub-symbol.png`
- **Data da consulta:** 17/07/2026
- **Alterações realizadas:** arquivo preservado; somente renomeado localmente
- **Observações:** o site oficial disponibiliza o símbolo em 62 × 62 px. O CSS preserva o aspecto pixelado ao ampliar; nenhuma versão SVG ou logo horizontal em arquivo separado foi encontrada na página.

## Fotografia institucional de Rodolfo Mori

- **Nome:** retrato de Rodolfo Mori
- **Tipo:** fotografia institucional
- **Página de origem:** https://www.devclub.com.br/
- **URL do asset:** https://www.devclub.com.br/figma/DevClub3654.png
- **Uso no projeto:** seção `feras-dev`
- **Arquivo local:** `assets/images/instructors/rodolfo-mori.webp`
- **Data da consulta:** 17/07/2026
- **Alterações realizadas:** redimensionada proporcionalmente de 1920 × 2880 para 960 × 1440 e convertida de PNG para WebP com qualidade 88
- **Observações:** proporção e conteúdo visual foram preservados; o enquadramento exibido é controlado por `object-fit` e `object-position`.

## Redes sociais e contato demonstrativo

- **Nome:** Instagram, YouTube, LinkedIn e e-mail demonstrativo
- **Tipo:** links institucionais e contato fictício
- **Página de origem:** https://www.devclub.com.br/
- **Uso no projeto:** footer
- **Arquivo local:** `index.html`
- **Data da consulta:** 17/07/2026
- **Alterações realizadas:** links oficiais conectados aos ícones existentes; contato substituído por um endereço reservado para demonstrações
- **Observações:** os perfis sociais foram usados como vinculados pelo footer oficial. O domínio `.test` identifica que `contato@projeto-devclub.test` é fictício e não representa um canal oficial.

## Conteúdo mantido como pendente

- Outros professores ou tutores não foram identificados com confiança suficiente nos dois canais consultados.
- Os depoimentos encontrados no site do DevClub usam nomes e empresas genéricos; não foram apresentados como depoimentos reais nesta landing page.
- Números de alunos e indicadores variam entre blocos da página oficial; nenhuma estatística foi reproduzida.
- Não foram baixadas marcas de empresas, pois a menção de contratação não concede automaticamente autorização para reutilizar seus logos.

## Ícones da jornada Full Stack

- **Projeto de origem:** Tabler Icons
- **Tipo:** ícones vetoriais SVG em traço
- **Repositório oficial:** https://github.com/tabler/tabler-icons
- **Licença:** MIT — https://github.com/tabler/tabler-icons/blob/main/LICENSE
- **Distribuição usada no download:** https://www.jsdelivr.com/package/npm/@tabler/icons
- **Uso no projeto:** seção `formacoes`, como símbolos decorativos associados aos nomes acessíveis das tecnologias
- **Data da consulta:** 20/07/2026
- **Alterações realizadas:** cor do traço ajustada para o verde DevClub `#39d353`; geometria, `viewBox` e proporções originais preservados

| Tecnologia | Arquivo local | URL original do SVG |
|---|---|---|
| HTML | `assets/icons/learning-path/brand-html5.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/brand-html5.svg |
| CSS | `assets/icons/learning-path/brand-css3.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/brand-css3.svg |
| JavaScript | `assets/icons/learning-path/brand-javascript.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/brand-javascript.svg |
| Git e GitHub | `assets/icons/learning-path/brand-git.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/brand-git.svg |
| React | `assets/icons/learning-path/brand-react.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/brand-react.svg |
| TypeScript | `assets/icons/learning-path/brand-typescript.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/brand-typescript.svg |
| Node.js | `assets/icons/learning-path/brand-nodejs.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/brand-nodejs.svg |
| Banco de Dados | `assets/icons/learning-path/database.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/database.svg |
| Docker | `assets/icons/learning-path/brand-docker.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/brand-docker.svg |
| Full Stack | `assets/icons/learning-path/stack-2.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/stack-2.svg |
| Pós-graduação | `assets/icons/learning-path/school.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/school.svg |
| MBA em Tecnologia | `assets/icons/learning-path/briefcase-2.svg` | https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/briefcase-2.svg |

## Avatar dos relatos conceituais

- **Nome:** Avatar conceitual genérico
- **Tipo:** SVG vetorial autoral
- **Origem:** criado localmente para este projeto, sem fonte externa
- **Uso no projeto:** miniaturas das fitas, lista estática e relato central da seção `depoimentos`
- **Arquivo local:** `assets/icons/avatar-conceptual.svg`
- **Alterações realizadas:** não se aplica; o arquivo foi desenhado para representar uma silhueta genérica em verde e grafite
- **Observações:** não retrata uma pessoa real e acompanha apenas narrativas explicitamente fictícias.

## Retratos conceituais de “Os Feras Dev”

- **Nomes dos personagens:** Lara Nunes, Davi Rocha, Camila Torres e Ícaro Martins
- **Tipo:** retratos editoriais fotorealistas gerados por IA
- **Origem:** gerados com a ferramenta integrada de geração de imagens da OpenAI em 21/07/2026
- **Uso no projeto:** seção `feras-dev`
- **Arquivos locais:** `assets/images/instructors/lara-nunes.webp`, `davi-rocha.webp`, `camila-torres.webp` e `icaro-martins.webp`
- **Alterações realizadas:** recorte proporcional para 960 × 1440 px e conversão para WebP com qualidade 88; nenhuma pessoa real foi usada como referência
- **Direção comum dos prompts:** personagem adulto fictício; retrato editorial de equipe de tecnologia; braços cruzados; fundo grafite escuro; recorte verde; preenchimento violeta; enquadramento vertical consistente; sem texto, logos, uniforme esportivo, troféus, marcas ou watermark
- **Variações individuais:** Lara — cabelos cacheados presos e blazer grafite; Davi — cabeça raspada, barba curta e jaqueta preta; Camila — cabelo curto, óculos e blazer grafite; Ícaro — cabelo ondulado e jaqueta técnica grafite
- **Observações:** nomes, imagens, cargos, especialidades, descrições e frases desses quatro personagens são conteúdo conceitual criado exclusivamente para o desafio e não representam integrantes reais do DevClub.

## Projetos conceituais de “Resultados”

- **Nomes dos projetos:** HubCentral, DevPort, AgendaZen, FinanSys, VivaLocal e Aurora AI
- **Tipo:** nomes, descrições e mockups de interface conceituais
- **Origem:** imagens fornecidas pelo responsável pelo desafio em 22/07/2026; conteúdo conceitual autorizado pela exceção explícita do `AGENTS.md`
- **Uso no projeto:** seção `resultados`
- **Arquivos locais:** `assets/images/results/hub-central.webp`, `dev-port.webp`, `agenda-zen.webp`, `finan-sys.webp`, `viva-local.webp` e `aurora-ai.webp`
- **Alterações realizadas:** conversão dos PNGs fornecidos para WebP com qualidade 92, sem alteração de proporção; o CSS usa `object-fit: contain`, extensão escurecida do próprio mockup nas áreas livres e esmaecimento inferior para integrar imagem e texto e ocultar métricas ou associações ilustrativas presentes no rodapé das artes
- **Assets externos:** nenhum; todos os mockups usados pela página estão armazenados localmente
- **Observações:** os projetos são fictícios, aparecem identificados como conceituais na própria seção e não representam alunos, contratações, parcerias, empresas ou resultados verificados do DevClub.

## Interpretações tipográficas das empresas em “Resultados”

- **Nomes exibidos:** Rodobens, iFood, DevClub, Meta, Apple e Samsung
- **Tipo:** nomes de marcas reais representados como texto HTML em composição conceitual
- **Origem da citação das empresas:** https://www.devclub.com.br/
- **Titulares:** cada nome e marca pertence ao respectivo titular
- **Formato usado no projeto:** texto HTML; nenhum arquivo de logo foi baixado ou incorporado
- **Fonte tipográfica:** somente a pilha já existente no projeto — Inter, Segoe UI, Arial e `sans-serif`; nenhuma fonte proprietária das empresas foi instalada
- **Data da consulta:** 21/07/2026
- **Transformação visual:** branco-neon como camada dominante, extrusão curta e definida, reflexo verde traseiro e sombra violeta distante; diferenças de peso, largura, inclinação, caixa e espaçamento preservam personalidade sem reproduzir exatamente wordmarks proprietários. O suporte grafite usa grade, pontos, linhas luminosas, perspectiva leve, scanline lenta e máscaras de entrada e saída para formar um painel de arena.
- **Uso no projeto:** ticker desktop e reel mobile dentro da seção `resultados`
- **Observações:** uso demonstrativo e não comercial, sem alegação de parceria, contratação confirmada, vínculo comercial ou endosso. A associação entre as empresas e a contratação de alunos nesta composição é conceitual; as empresas e seus nomes são reais.
