# Landing Page DevClub — Desafio Full Stack

> Landing page institucional disruptiva construída com HTML, CSS e JavaScript puro para um desafio de recrutamento.

## Status

- **Fase:** auditoria final técnica — validação visual manual pendente
- **Prazo informado:** 23/07/2026
- **Dependências:** nenhuma
- **Publicação:** pendente

O objetivo é criar uma experiência memorável sem sacrificar clareza institucional, acessibilidade, responsividade, performance ou a capacidade de explicar a implementação em uma entrevista.

## O que existe neste marco

- estrutura semântica da página;
- design system inicial em custom properties;
- header responsivo com menu acessível;
- hero estático legível sem JavaScript;
- partículas em Canvas 2D formando um campo estelar radial de alta densidade ao redor do símbolo;
- símbolo oficial aplicado nas seis faces de um cubo 3D nativo;
- rotação contínua e suave do cubo, com deslocamento orgânico e seguimento do ponteiro ativado por clique;
- hover e foco verde com glow roxo nos controles do header;
- CTA principal com dois segmentos luminosos que percorrem a borda, colidem, invertem o sentido e alternam a paleta;
- cursor vetorial próprio com brilho azul suave em dispositivos com mouse;
- spotlight branco com seguimento interpolado;
- onda roxa e azul disparada por clique ou toque;
- reação temporária do símbolo quando a onda o alcança;
- redução de partículas e complexidade em telas menores;
- modo de movimento reduzido;
- símbolo oficial do DevClub no header, hero e footer;
- seção “Quem é o DevClub” reorganizada em uma introdução compacta, três indicadores e uma frase de encerramento;
- carrossel cíclico com 12 diferenciais, setas, teclado, arraste, swipe, indicador de posição e avanço automático pausável a cada dez segundos;
- campo de estrelas cadentes verdes em Canvas 2D presente na introdução, na jornada Full Stack, nos relatos conceituais, em Os Feras Dev e em Resultados;
- conteúdo com fontes registradas para apresentação, formações, empresas, fundador e comunidade, além de diferenciais editoriais sinalizados para validação;
- fotografia institucional de Rodolfo Mori;
- seção “Os Feras Dev” com Rodolfo em conteúdo oficial e quatro personagens conceituais claramente identificados;
- carrossel tridimensional circular de instrutores com palco holográfico, miniaturas laterais, teclado, toque e fallback estático;
- seção final “Resultados” com seis projetos conceituais ilustrados, carrossel circular, teclado, swipe e fallback estático;
- bloco de empresas dentro de “Resultados”, com ticker tipográfico horizontal no desktop, reel vertical no mobile e fallback estático;
- redes sociais oficiais e contato demonstrativo no footer;
- seção de relatos conceituais com quatro fitas verticais, destaque central e 32 narrativas explicitamente fictícias;

Os blocos institucionais preservam a arquitetura planejada. Afirmações específicas sem confirmação foram removidas ou sinalizadas para validação. Relatos, personagens e projetos conceituais foram autorizados para a demonstração do desafio, recebem avisos visíveis e não devem ser publicados como prova social, contratação, parceria ou resultado real do DevClub. Resultados reais continuam pendentes até existirem fontes com identificação e autorização suficientes.

## Stack

- HTML5 semântico
- CSS3
- JavaScript puro
- Canvas 2D
- Pointer Events
- `requestAnimationFrame`
- `IntersectionObserver` e `ResizeObserver`

Não há gerenciador de pacotes, bundler, framework ou biblioteca de animação.

## Estrutura

```text
/
├── AGENTS.md
├── README.md
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   ├── differentiators-carousel.js
│   ├── section-background.js
│   ├── testimonials-section.js
│   ├── instructors-carousel.js
│   ├── results-carousel.js
│   └── hero-effects.js
└── assets/
    ├── SOURCES.md
    ├── images/
    │   ├── instructors/
    │   └── results/
    ├── icons/
    └── logos/
```

Os assets oficiais usados localmente e suas origens estão documentados em `assets/SOURCES.md`. As demais pastas continuam disponíveis para materiais futuros autorizados.

## Conceito visual

O hero parte de um ambiente grafite quase preto, com o símbolo visual central e dominante em uma zona de energia ampla. A frase de posicionamento aparece acima do cubo; título, mensagem e ações ficam abaixo e à frente da composição. No mobile, as proporções são reduzidas sem inverter essa hierarquia.

O roxo e o azul aparecem como energia temporária da onda. A iluminação comum permanece branca, evitando transformar toda a interface em um gradiente colorido genérico.

## Como o hero funciona

### Distribuição das partículas

O sistema usa duas camadas de Canvas 2D. A contagem-base é multiplicada por 5,6 no desktop e por 4,4 no mobile. Do total, aproximadamente 60% formam o núcleo, 27% compõem um halo intermediário e 13% ocupam o campo externo. As três faixas se sobrepõem para evitar limites circulares visíveis e criar uma redução contínua de densidade a partir do símbolo.

A camada frontal recebe aproximadamente 3% da população no desktop e 2% no mobile, sempre retirada do núcleo. Essas partículas são menores e mais transparentes para criar profundidade sem esconder as faces do cubo. A amostragem combina um anel orgânico concentrado, uma faixa intermediária e posições externas com densidade baixa, produzindo o aspecto de noite estrelada sem clarear uniformemente as bordas.

### Cubo 3D do símbolo

O cubo é construído com seis faces HTML e `transform-style: preserve-3d`, sem biblioteca ou WebGL. Cada face reutiliza o símbolo oficial. O eixo vertical avança continuamente com velocidade baseada no tempo entre frames; inclinação e deslocamento recebem alvos orgânicos interpolados. Depois de um clique no ambiente, o cubo passa a acompanhar o ponteiro dentro de limites seguros; ao sair do hero, volta ao movimento orgânico central sem interromper a rotação.

### Cursor e CTA principal

O cursor luminoso usa um pequeno SVG decorativo acompanhado por JavaScript com interpolação. Ele só substitui o cursor nativo quando o navegador informa `hover: hover` e `pointer: fine`; toque e dispositivos sem mouse preservam o comportamento padrão.

O CTA principal utiliza dois gradientes cônicos recortados por máscara para formar segmentos flexíveis sobre o perímetro arredondado. Cada segmento começa em um lado, percorre a borda no sentido oposto ao outro e inverte sua direção quando a distância circular indica um encontro. Nesse instante, as cores avançam entre verde, roxo, azul e branco. Hover e foco pausam a lógica, ocultam os segmentos e transformam o botão em verde com glow roxo.

### Spotlight

Pointer Events guardam a posição desejada. A posição renderizada aproxima-se dela por interpolação a cada frame, produzindo a inércia suave. A distância entre cada partícula e o spotlight controla seu brilho branco. O símbolo usa a mesma posição em uma camada radial de luz sobre o cubo.

### Onda fluorescente

Cada clique ou toque cria uma onda com origem, instante inicial, duração e raio máximo. As partículas reagem à distância até a frente da onda, não apenas por estarem dentro de um círculo. Uma faixa de influência e um afterglow curto criam a sensação de propagação. Há limite de três ondas simultâneas.

Quando o raio alcança os limites visuais do símbolo oficial, ele recebe um glow roxo e azul mais intenso e mais duradouro que a reação das partículas.

### Performance

- contagem proporcional à área, com limites responsivos mesmo após o aumento solicitado;
- menos partículas e DPR menor no mobile;
- `devicePixelRatio` limitado a 1,75 no desktop e 1,35 no mobile;
- propriedades das partículas precomputadas e recriadas somente no resize;
- gradiente da onda armazenado após resize;
- progresso e raio de cada onda calculados uma vez por frame e reutilizados nas duas camadas;
- pausa fora da viewport e quando a aba está oculta;
- animação do CTA pausada em hover, foco, movimento reduzido, aba oculta e fora da viewport;
- cursor atualizado por `requestAnimationFrame` somente enquanto precisa alcançar a posição do ponteiro;
- nenhum elemento DOM criado por partícula;
- no modo de movimento reduzido, o loop contínuo para quando não há interação.

## Como funciona a divisão “Quem é o DevClub”

### Introdução e carrossel

A introdução preserva o título como elemento dominante, distribui missão, propósito e comunidade em indicadores leves e antecipa o carrossel no enquadramento de notebook. Os 12 cards permanecem como uma lista semântica no HTML. Com JavaScript, quatro clones de cada extremidade criam continuidade visual; depois da transição entre a cópia e o card real, a faixa é reposicionada sem animação.

O estado mantém separadamente o índice visual e o índice lógico. Setas, `ArrowLeft`, `ArrowRight`, arraste e swipe usam a mesma função de movimentação, atualizando o texto `01 / 12` e a barra de progresso. Cliques recebidos durante uma transição entram em uma fila curta, evitando concorrência de animações e acúmulo de listeners. Quando a seção entra na viewport, um avanço automático é agendado a cada dez segundos; interação, foco, aba oculta, saída da viewport e movimento reduzido pausam o ciclo. Os clones nas duas extremidades mantêm a passagem `12 → 01` e `01 → 12` visualmente contínua. Sem JavaScript, a lista continua rolável e usa scroll-snap nativo.

### Fundo de estrelas cadentes

`section-background.js` controla cinco instâncias independentes do mesmo campo em Canvas 2D: uma na divisão de apresentação, outra na jornada Full Stack, outra nos relatos conceituais, outra em “Os Feras Dev” e a última em “Resultados”. No mobile são criados seis rastros por canvas; em telas maiores, entre doze e vinte e dois conforme a largura. Cada objeto é reutilizado durante os frames, com cabeça de 1 a 3 px, cauda de 40 a 140 px e variações discretas de ângulo, velocidade e opacidade em um único verde.

O DPR é limitado a 1,15 no mobile e 1,5 nas demais telas. Cada instância usa `IntersectionObserver` para interromper seu próprio loop fora da viewport; `visibilitychange` pausa com a aba oculta e `ResizeObserver` recalcula o bitmap. Em movimento reduzido, o loop para e mantém de três a cinco rastros estáticos.

### Jornada visual Full Stack

A seção `formacoes` apresenta doze etapas em uma lista ordenada e semântica, conectadas por uma rota luminosa discreta. Os SVGs locais vêm do projeto Tabler Icons e têm a origem registrada em `assets/SOURCES.md`. `IntersectionObserver` ativa uma única entrada sequencial; sem JavaScript, todo o conteúdo permanece visível, e em movimento reduzido a entrada é exibida sem deslocamento, rotação ou blur.

### Relatos conceituais em fitas

A seção `depoimentos` substitui o antigo placeholder de método imediatamente depois da jornada Full Stack. Os 32 relatos ficam em uma lista semântica no HTML e funcionam como fonte de conteúdo para `testimonials-section.js`. Com JavaScript, os relatos são distribuídos em quatro fitas decorativas de oito itens: externa esquerda para baixo, interna esquerda para cima, interna direita para baixo e externa direita para cima. Cada grupo é duplicado uma única vez para formar o ciclo contínuo; as cópias ficam com `aria-hidden="true"` e todas as fitas são decorativas para tecnologias assistivas.

O destaque central percorre os mesmos 32 relatos de forma independente, sem exibir contador visual. Setas, `ArrowLeft` e `ArrowRight` usam navegação cíclica e uma fila curta protege transições rápidas. O autoplay ocorre a cada oito segundos e pausa quando o card recebe ponteiro, quando há foco na seção, durante toque, fora da viewport e com a aba oculta. Em telas menores, uma fita única percorre verticalmente os 32 relatos em ciclo contínuo; com `prefers-reduced-motion`, fitas e autoplay param, a lista completa volta a ficar visível e os controles continuam disponíveis.

O avatar `assets/icons/avatar-conceptual.svg` foi desenhado no próprio projeto como uma silhueta genérica. Não representa uma pessoa real e evita associar as narrativas fictícias a fotografias identificáveis.

### Os Feras Dev

A seção `feras-dev` aparece imediatamente depois dos relatos e substitui o antigo placeholder de instrutores. Rodolfo Mori inicia como item ativo com fotografia e biografia de fontes oficiais. Lara Nunes, Davi Rocha, Camila Torres e Ícaro Martins são personagens conceituais; nomes, retratos gerados, funções, especialidades e falas são identificados como fictícios no próprio bloco e em `assets/SOURCES.md`.

Sem JavaScript, os cinco perfis formam uma lista semântica completa. Com JavaScript, a mesma lista assume três posições visuais — anterior, ativa e próxima — sem duplicar conteúdo ou reordenar o DOM. `instructors-carousel.js` mantém um índice circular, atualiza as posições somente por atributos de estado e usa a Web Animations API para mover os perfis. O item que chega ao centro completa uma volta no eixo Y; uma fila de um comando protege cliques rápidos. Em movimento reduzido, a volta é removida e a troca usa apenas crossfade e escala curta.

O palco central usa perspectiva, bordas verdes, cantos luminosos, grade, scanline, base de luz e reflexo violeta discretos. Hover revela os detalhes no desktop; foco, Enter, Espaço, Escape e toque controlam o mesmo conteúdo sem depender de hover. As setas permanecem fora das fotografias e o layout mobile reduz profundidade e miniaturas sem bloquear a rolagem vertical.

### Resultados conceituais

A seção `resultados` encerra o conteúdo imediatamente depois de `feras-dev`; não existe outra `section` entre ela e o footer. HubCentral, DevPort, AgendaZen, FinanSys, VivaLocal e Aurora AI são nomes e projetos fictícios criados para demonstrar possibilidades de portfólio, sem alegar contratação, parceria, remuneração ou resultado verificado do DevClub. O aviso editorial fica visível no cabeçalho da própria seção.

Sem JavaScript, os seis projetos permanecem em uma lista semântica completa. Com JavaScript, `results-carousel.js` mantém um item ativo e duas prévias laterais sem duplicar ou reordenar conteúdo. Os controles, as setas do teclado e o gesto horizontal usam o mesmo índice circular; a Web Animations API combina a troca de profundidade com uma meia volta curta da interface que chega ao centro. A entrada só é revelada quando a seção alcança a viewport. Em movimento reduzido, rotação, blur e deslocamentos de entrada são removidos ou encurtados.

Os seis mockups fornecidos para os projetos foram convertidos de PNG para WebP e armazenados localmente. Cada imagem usa dimensões explícitas, carregamento tardio e `object-fit: contain`, mantendo a composição sem deformação dentro do palco. Uma extensão escurecida da própria imagem preenche possíveis laterais. O gradiente inferior conecta o visual à área de texto e encobre métricas ou associações ilustrativas presentes nos rodapés dos mockups, evitando apresentá-las como fatos, sem hotlink ou dependência externa.

Depois do carrossel de projetos e antes do CTA existente, o bloco “Empresas que contratam os nossos alunos” apresenta Rodobens, iFood, DevClub, Meta, Apple e Samsung. A associação é uma composição conceitual autorizada para o desafio e recebe, imediatamente abaixo do letreiro, um aviso de que não representa parceria, contratação confirmada, vínculo comercial ou endosso ao DevClub.

Os seis nomes são interpretações tipográficas em HTML, feitas somente com a fonte já declarada pelo projeto e fallbacks do sistema. Nenhum logo, fonte proprietária ou cor comercial dessas empresas foi incorporado. O letreiro usa branco-neon como camada dominante, extrusão curta e definida, reflexo verde traseiro e uma sombra violeta distante. Peso, largura, inclinação e espaçamento variam por nome para criar personalidades distintas sem tentar reproduzir exatamente os desenhos proprietários. A moldura grafite combina grade, pontos, linhas luminosas, perspectiva leve, scanline lenta e máscaras nas extremidades para sugerir um painel tridimensional de arena.

Com JavaScript, `results-carousel.js` mantém o estado do letreiro separado do estado do carrossel. A partir de `56rem`, uma única faixa animada contém a lista original e um clone inacessível, deslocando-se linearmente da direita para a esquerda sem pausar no hover. Em telas menores, a lista usa um índice lógico, um clone controlado do primeiro item, `transitionend` e fallback de tempo para formar um reel vertical contínuo. `IntersectionObserver` e `visibilitychange` pausam o movimento apenas quando ele deixa de ser útil. Sem JavaScript ou com `prefers-reduced-motion`, os seis nomes permanecem visíveis em uma grade estática; nenhum Canvas ou loop por palavra foi criado.

### Estado do conteúdo

Os 12 cards compõem uma visão editorial fornecida no briefing. Métricas, marcas e nomes de produto não confirmados foram removidos; a disponibilidade dos recursos ainda deve ser validada com uma fonte institucional antes da publicação, como informa o aviso visível no próprio bloco.

## Acessibilidade e progressive enhancement

- `lang="pt-BR"`, landmarks e um único `h1`;
- link para pular ao conteúdo;
- foco visível de alto contraste;
- menu mobile com `aria-expanded`, Escape e devolução de foco;
- alvos interativos com dimensão confortável;
- canvases decorativos ocultos da árvore acessível;
- carrossel identificado como região, controles com nomes acessíveis, posição anunciada e clones ocultos da árvore assistiva;
- relatos conceituais com identificação editorial discreta, controles nomeados, região central anunciada e clones das fitas ocultos da árvore assistiva;
- instrutores com distinção visível entre pessoa real e personagens conceituais, item ativo operável por teclado, estado expandido, região viva e controles nomeados;
- resultados com aviso conceitual visível, lista estática completa, região nomeada, estado anunciado, setas de teclado e gesto horizontal;
- empresas em uma única lista semântica; clones visuais ocultos da árvore assistiva, aviso conceitual visível e nomes preservados como texto;
- viewport do carrossel operável pelas setas do teclado e com foco visível;
- texto e CTAs permanecem no HTML;
- navegação permanece disponível sem JavaScript;
- cursor personalizado restrito a mouse preciso, sem bloquear cliques, e cursor nativo preservado no toque;
- `prefers-reduced-motion: reduce` fixa o cubo, remove o pulso de escala, reduz a onda, interrompe o movimento contínuo e oculta os segmentos orbitais;
- `touch-action: pan-y` e listeners passivos preservam a rolagem por toque.

## Como executar localmente

Abra o arquivo `index.html` em um navegador moderno. Todos os estilos, scripts e assets são locais; não há instalação, comando de build ou servidor obrigatório.

## Validação realizada

A tabela abaixo registra a validação acumulada do projeto. Na auditoria final, os arquivos foram validados por sintaxe, aninhamento, semântica, ARIA, referências locais, conteúdo, tecnologias e integração estrutural. O navegador interno recusou recarregar a URL local `file://` por política de segurança; por isso, console, foco, toque e enquadramento visual precisam de uma nova passada manual antes da publicação. Os registros de navegador nas linhas seguintes são evidências acumuladas de revisões anteriores, não uma repetição automatizada desta auditoria.

| Verificação | Ambiente | Estado |
|---|---|---|
| Console | Navegador interno | Sem avisos ou erros locais após carregamento, rotação, seguimento do ponteiro, spotlight e múltiplos cliques |
| Responsividade | 360 × 800, 390 × 844, 768 × 900, 1024 × 768, 1366 × 768 e 1440 × 900 px | Sem overflow horizontal; 1,1 / 2 / 3 / 4 cards conforme a faixa e controles com pelo menos 44 px |
| Header e menu | Mobile e desktop | Alternância responsiva confirmada; Escape fecha o menu, devolve o foco ao botão e os controles recebem destaque verde com glow roxo em hover/foco |
| CTA e cursor | Mouse, teclado e 390 × 844, 768 × 900 e 1024 × 900 px | Segmentos percorreram a borda em sentidos opostos, inverteram e trocaram de cor no encontro; foco pausou e ocultou as linhas; cursor acompanhou o ponteiro sem bloquear o CTA |
| Cubo 3D | 390 × 844, 768 × 900 e 1024 × 900 px | Seis faces carregadas, rotação contínua confirmada por amostragem e deslocamento seguindo o ponteiro depois do clique |
| Spotlight e onda | Ponteiro e cliques repetidos no desktop | Spotlight atualizado, reação do símbolo mantida por mais tempo que a onda e retorno ao repouso observados |
| Carrossel | Setas, teclado, arraste, loop reverso, 12 cliques consecutivos e resize durante transição | Índice, clones, progresso e alinhamento permaneceram coerentes; último → primeiro sem salto visível |
| Cards | Mouse preciso e seis larguras responsivas | Luz acompanhou o ponteiro, inclinação permaneceu abaixo de 2,2°, alturas ficaram iguais e não houve recorte |
| Fundo das divisões | Revisão de cinco hosts e do ciclo de vida compartilhado | Contagem e DPR responsivos, `pointer-events: none`, pausa fora da viewport/aba oculta e fallback reduzido presentes; a quinta instância aguarda inspeção visual |
| Relatos conceituais | 360, 390, 768, 1024, 1366 e 1440 px; setas, teclado, cliques rápidos e autoplay | 32 fontes únicas, quatro fitas com sentidos alternados, navegação cíclica, pausa por foco e fora da viewport, controles de 54 px e nenhum overflow horizontal |
| Assets | Navegador e servidor local | Símbolo carregado em todas as ocorrências; fotografia carregada em 960 × 1440 sem distorção quando a seção entra na viewport |
| Resultados | Verificação estática de HTML, CSS e JavaScript | Última seção do documento, seis projetos conceituais identificados, seis imagens WebP locais com dimensões reservadas, fallback em lista, navegação circular, teclado, swipe, anúncio de estado e redução de movimento presentes; inspeção visual pendente |
| Letreiro de empresas | Verificação estática de HTML, CSS e JavaScript | Bloco dentro de Resultados e entre carrossel e CTA; seis nomes na ordem definida, uma lista acessível, clones ocultos, ticker/reel isolados, pausa por viewport/aba, fallback estático e redução de movimento presentes; inspeção visual e de console pendente |
| Semântica e âncoras | Verificação estática | Um `h1`, seis `h2`, nenhum ID duplicado, todos os vínculos ARIA resolvidos e todos os links internos com destino |
| Links oficiais | DOM do navegador | CTA, e-mail, Instagram, YouTube e LinkedIn apontam para os destinos registrados em `assets/SOURCES.md` |
| Auditoria final estática | Projeto completo | Sete scripts com sintaxe válida, chaves CSS balanceadas, tags estruturais balanceadas, referências locais resolvidas, IDs únicos, vínculos ARIA resolvidos e ausência de dependências ou imports externos |

### Não verificado no navegador

- Toque em dispositivo físico não estava disponível; o caminho de Pointer Events e `touch-action` foi inspecionado no código.
- A sequência completa de Tab e o zoom de 200% não puderam ser automatizados; foco visível, semântica e fechamento por Escape foram verificados.
- `prefers-reduced-motion` não pôde ser emulado; a media query e o ramo JavaScript foram inspecionados.
- A pausa ao ocultar a aba foi validada por inspeção do ciclo de vida; o navegador de teste não expôs emulação confiável de aba oculta.
- O fallback com JavaScript desabilitado foi revisado estaticamente, mas não executado no navegador.
- Foram obtidas capturas em 390 × 844 e 1024 × 900 px; em 1440 × 900 px, layout, overflow, recorte e dimensões foram verificados pelo DOM renderizado.

## Conteúdo pendente

- [x] Integrar o símbolo oficial disponível no site do DevClub.
- [x] Trocar as marcas provisórias `DC` e `{ DC }` pelo asset local.
- [ ] Aprovar o título conceitual do hero com o responsável pela entrega.
- [x] Conectar a mensagem de apoio e os CTAs a informações e destinos oficiais.
- [x] Integrar apresentação institucional, formações e experiência de aprendizado verificadas.
- [ ] Fornecer histórias de alunos e resultados reais com fontes; até lá, manter a vitrine conceitual claramente identificada.
- [x] Registrar empresas citadas oficialmente como contratantes de alunos.
- [x] Integrar Rodolfo Mori e sua fotografia institucional.
- [ ] Identificar outros professores ou tutores em fonte oficial confiável.
- [ ] Substituir os relatos conceituais por depoimentos reais somente após obter identidade, fonte e autorização verificáveis.
- [x] Integrar informações com fonte sobre comunidade e redes sociais; contato permanece explicitamente fictício.
- [ ] Confirmar autoria final e plataforma de publicação.
- [ ] Validar institucionalmente a disponibilidade dos recursos descritos no carrossel de diferenciais antes da publicação.

O título “O código certo para iluminar a sua carreira!”, o nome “Os Feras Dev”, os personagens fictícios e os seis projetos de Resultados permanecem como conteúdo conceitual autorizado para o desafio, não como afirmações institucionais. As fontes e transformações de assets estão registradas em `assets/SOURCES.md`.

## Próximos milestones

1. Validar a copy institucional integrada com o responsável pela entrega.
2. Obter histórias de alunos, resultados, outros instrutores e depoimentos com identificação e autorização verificáveis.
3. Validar se a demonstração com relatos conceituais deve permanecer na apresentação final.
4. Quando houver autorizações, revisar os textos e trocar o conteúdo fictício sem alterar a arquitetura acessível das fitas.
5. Concluir documentação de publicação e preparação para entrevista.

## Uso de IA no processo

A IA está sendo usada como parceira de pair programming para planejamento, implementação, revisão, testes e explicação das decisões. O trabalho segue regras explícitas do repositório: não inventar conteúdo institucional, não instalar dependências e manter o código compreensível pelo autor. Todo conteúdo, asset e decisão de marca ainda precisa de validação humana antes da entrega.

## Decisões defendíveis em entrevista

- **Canvas em vez de partículas no DOM:** reduz a quantidade de elementos e centraliza a renderização visual.
- **Progressive enhancement:** conteúdo, navegação e CTA continuam compreensíveis se o JavaScript falhar.
- **Duas camadas de partículas:** controlam separadamente profundidade, quantidade e transparência sem criar centenas de elementos no DOM.
- **Cubo com CSS 3D:** entrega volume e movimento usando transformações nativas, mantendo a implementação pequena e explicável.
- **APIs nativas:** reduzem dependências, tempo de aprendizado e risco no prazo.
- **Efeitos isolados em `hero-effects.js`:** separa a interação complexa do comportamento geral da interface.
- **Carrossel com lista e clones controlados:** conserva o conteúdo no HTML, entrega continuidade visual e mantém o estado compreensível sem uma biblioteca.
- **Canvas isolado por seção:** limita custo e área visual do novo fundo; observadores pausam trabalho quando ele deixa de ser útil.
- **Fitas com CSS e ciclo de vida controlado:** entregam movimento contínuo por `transform`, enquanto `IntersectionObserver`, visibilidade da aba e movimento reduzido impedem trabalho desnecessário.
- **Prova social transparente:** a interface demonstra o conceito visual sem apresentar narrativas fictícias como resultados reais.
