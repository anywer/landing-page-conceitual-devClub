# AGENTS.md

## Identidade do projeto

Este repositório contém {{DESCRIÇÃO_DO_PROJETO}} para {{CONTEXTO_DO_DESAFIO}}.

Prazo confirmado: {{DATA_COMPLETA_OU_CONTEÚDO_PENDENTE}}

## Objetivo

Construir uma landing page institucional visualmente memorável e tecnicamente sólida para o DevClub.

Equilibrar:

- primeira impressão forte;
- identidade DevClub;
- comunicação institucional clara;
- usabilidade e acessibilidade;
- responsividade e performance;
- código que o autor consiga compreender, modificar e defender.

Não sacrificar a conclusão nem o uso da página por efeitos visuais.

## Perfil do autor

Considerar que o autor trabalha principalmente com HTML, CSS e JavaScript, aprende rápido e precisa explicar as decisões em entrevista.

Ao tomar uma decisão importante:

- explicar brevemente o que e por que foi feito;
- destacar o conceito relevante para entrevista;
- evitar abstrações desnecessárias;
- não explicar sintaxe trivial sem solicitação.

## Stack obrigatória

Usar:

- HTML5 semântico;
- CSS3;
- JavaScript puro.

Preferir APIs nativas do navegador.

Não introduzir sem aprovação explícita:

- frameworks front-end;
- TypeScript;
- frameworks ou utilitários CSS;
- preprocessadores;
- bibliotecas de animação, partículas ou 3D;
- bibliotecas de componentes;
- gerenciadores de pacotes ou bundlers;
- backend ou banco de dados.

Antes de recomendar uma dependência:

1. identificar o problema exato;
2. explicar por que a stack nativa não basta;
3. demonstrar o benefício;
4. estimar efeito no prazo e custo de aprendizado;
5. oferecer uma alternativa nativa;
6. aguardar aprovação.

## Fonte de verdade

Não inventar conteúdo institucional.

Nunca fabricar:

- números, salários, taxas ou resultados;
- nomes de alunos, empresas, tutores ou parceiros;
- depoimentos;
- cursos, prêmios ou certificações.

Quando faltar conteúdo:

- usar `[CONTEÚDO PENDENTE: descrição]`;
- manter uma lista central de substituições;
- não apresentar o placeholder como informação real.

Fontes aprovadas neste projeto: {{LISTAR_FONTES_OU_CONTEÚDO_PENDENTE}}

## Prioridades

### Essencial

- estrutura institucional completa;
- hero claro e CTA principal;
- navegação responsiva;
- DevClub, formações, alunos ou resultados, empresas, instrutores, depoimentos e comunidade;
- footer;
- desktop, tablet e mobile;
- acessibilidade e performance básicas;
- conteúdo verificável.

### Diferencial

- hero interativo com stack nativa;
- spotlight branco, partículas e onda de energia;
- fitas de depoimentos;
- transições e microinterações com propósito;
- tipografia e ritmo visual fortes.

### Experimental

- notebook 3D completo;
- WebGL, shaders ou iluminação complexa;
- qualquer interação que ameace o prazo, a estabilidade ou a explicabilidade.

Proteger o Essencial antes de iniciar o Experimental.

## Direção de marca

Usar voz energética, informal, motivadora, comunitária e acessível a iniciantes, sem infantilizar, confundir, exagerar ou prometer resultados não comprovados.

Usar referências visuais apenas para nível de impacto, movimento e composição. Não copiar layout, código, texto, imagens ou identidade.

Direção específica aprovada: {{DIREÇÃO_APROVADA_OU_CONTEÚDO_PENDENTE}}

## Arquitetura inicial

Considerar:

1. Header e navegação
2. Hero
3. Quem é o DevClub
4. Formações ou trilhas
5. Experiência de aprendizagem
6. Alunos ou transformação
7. Empresas
8. Instrutores
9. Depoimentos
10. Comunidade
11. CTA final
12. Footer

Justificar qualquer reordenação relevante.

## Regras do hero com spotlight

Aplicar esta seção somente depois de aprovar a direção de spotlight, partículas e onda. Caso outra direção seja escolhida, substituí-la por critérios equivalentes de legibilidade, fallback, responsividade, acessibilidade e performance.

- Manter título, apoio e CTA legíveis em todos os estados.
- Garantir composição estática funcional antes dos efeitos.
- Usar ambiente escuro, símbolo central e partículas concentradas gradualmente no centro.
- Manter partículas principais atrás do símbolo e camada frontal esparsa.
- Manter o spotlight comum branco, suave e interpolado.
- Separar a onda roxa e azul disparada por clique ou toque.
- Fazer o logo reagir de forma mais intensa e duradoura que as partículas.
- Reduzir partículas e complexidade no mobile.
- Não bloquear a rolagem por toque.
- Oferecer fallback sem JavaScript e com movimento reduzido.
- Pausar ou reduzir trabalho fora da viewport e com a aba oculta.

## HTML

- Definir `lang="pt-BR"`, charset e viewport.
- Usar um único `h1` e hierarquia lógica.
- Usar landmarks semânticos.
- Usar links para navegação e botões para ações.
- Não usar `onclick` inline.
- Fornecer textos alternativos e labels adequados.
- Preservar conteúdo compreensível sem CSS e JavaScript.

## CSS

- Centralizar tokens em `:root`.
- Trabalhar mobile first.
- Usar Grid e Flexbox intencionalmente.
- Evitar `!important`, alturas fixas perigosas e posicionamento absoluto estrutural.
- Prevenir overflow horizontal.
- Fornecer foco visível e hover apenas como melhoria.
- Respeitar `prefers-reduced-motion`.
- Manter seletores e escalas compreensíveis.

## JavaScript

- Usar JavaScript puro e `addEventListener`.
- Preferir Pointer Events para entradas cruzadas.
- Validar elementos antes de manipulá-los.
- Evitar globais desnecessárias.
- Encapsular efeitos complexos.
- Separar estado, entrada, atualização e renderização.
- Usar `requestAnimationFrame` para animações.
- Evitar leituras de layout e alocações caras por frame.
- Usar JavaScript apenas quando HTML e CSS forem insuficientes.

## Processo de edição

Antes de editar:

- ler as instruções aplicáveis;
- inspecionar arquivos e estado atual;
- identificar estilos e comportamentos reutilizáveis;
- preservar trabalho válido e mudanças do usuário.

Durante a edição:

- fazer mudanças focadas;
- não reescrever arquivos inteiros sem necessidade;
- não mudar a direção visual silenciosamente;
- não adicionar conteúdo falso ou dependência não aprovada;
- manter um marco funcional a cada etapa.

Depois da edição:

- listar arquivos alterados;
- resumir implementação e decisões;
- explicar como testar;
- registrar testes e resultados;
- relatar limitações e itens não verificados;
- recomendar o próximo passo de maior valor.

Usar checkpoints antes de fechar a direção visual, adicionar dependência, substituir arquitetura funcional, iniciar experimento de alto risco, alegar performance final ou declarar conclusão.

## Validação obrigatória

Antes de concluir um marco:

- inspecionar console e erros JavaScript;
- testar larguras representativas de desktop, tablet e mobile;
- testar larguras intermediárias problemáticas;
- verificar overflow horizontal;
- testar navegação, botões, links e âncoras;
- testar teclado e foco;
- verificar headings e landmarks;
- verificar contraste e textos alternativos;
- testar movimento reduzido;
- testar toque quando aplicável;
- confirmar que o hero não bloqueia a rolagem;
- confirmar pausa ou redução das animações quando apropriado;
- relatar o que não puder ser verificado.

## Definição de pronto

Considerar o projeto pronto somente quando:

- todas as seções essenciais estiverem presentes;
- a primeira dobra tiver impacto e clareza;
- conteúdo real substituir placeholders críticos;
- navegação e CTA funcionarem;
- responsividade estiver sólida;
- não houver erro relevante no console nem overflow acidental;
- teclado, foco e movimento reduzido estiverem adequados;
- imagens importantes estiverem otimizadas;
- README e instruções de publicação estiverem completos;
- testes e limitações estiverem documentados;
- o autor conseguir explicar as decisões centrais.

## Dados específicos deste repositório

- CTA principal: {{CTA_OU_CONTEÚDO_PENDENTE}}
- Público: {{PÚBLICO_OU_CONTEÚDO_PENDENTE}}
- Conteúdo aprovado: {{LOCAL_OU_CONTEÚDO_PENDENTE}}
- Assets aprovados: {{LOCAL_OU_CONTEÚDO_PENDENTE}}
- Deploy: {{PLATAFORMA_OU_CONTEÚDO_PENDENTE}}
- Limitações conhecidas: {{LISTA_OU_NENHUMA_CONFIRMADA}}
