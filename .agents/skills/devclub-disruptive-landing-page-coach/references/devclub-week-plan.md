# Plano intensivo DevClub em sete dias

Usar como base e recalcular conforme o estado real do projeto. Não presumir o ano da data `23/07`; confirmar quando isso afetar o cronograma. Proteger um pequeno buffer final e cortar experimentos antes de cortar conteúdo, acessibilidade ou validação.

## Antes de distribuir os dias

1. Contar dias e horas úteis restantes.
2. Levantar arquivos prontos, conteúdo verificado, assets ausentes e bloqueios.
3. Definir CTA, direção visual e marco mínimo de entrega.
4. Separar Essencial, Diferencial e Experimental.
5. Atribuir responsável e prazo para cada conteúdo externo.
6. Reservar tempo para correções após os testes, não apenas para construção.

## Dia 1 — Estratégia e fundação

**Objetivo:** eliminar decisões estruturais tardias.

- Auditar o repositório e o briefing.
- Consolidar proposta de valor, público, narrativa e CTA.
- Mapear seções e lacunas de conteúdo.
- Classificar escopo e escolher a direção inicial do hero.
- Preparar a estrutura semântica base e a lista de conteúdo pendente.

**Saída:** arquitetura aprovada, escopo priorizado, arquivos-base funcionais e conteúdo pendente identificado.

**Não avançar se:** ainda houver dúvida material sobre CTA, ordem da página ou disponibilidade dos principais conteúdos.

## Dia 2 — Design system, header e hero estático

**Objetivo:** estabelecer identidade e primeira dobra legível antes dos efeitos.

- Definir tokens de cor, tipografia, espaçamento, largura, raio, sombra e movimento.
- Implementar header e navegação responsiva.
- Construir composição estática do hero, símbolo, mensagem e CTA.
- Validar mobile, teclado, contraste e fallback sem JavaScript.
- Adicionar a base de partículas somente após a composição estar sólida.

**Saída:** header funcional e hero estático forte em larguras representativas.

**Corte recomendado:** adiar o notebook completo; manter spotlight e partículas como próximo diferencial.

## Dia 3 — Conteúdo institucional

**Objetivo:** completar o núcleo informativo.

- Implementar DevClub, formações, trilhas e experiência de aprendizagem.
- Criar componentes simples e reutilizáveis com HTML e CSS.
- Ajustar ritmo, escaneabilidade e transições entre seções.
- Verificar fontes e marcar placeholders sem fingir conteúdo real.

**Saída:** narrativa institucional compreensível do hero até as formações.

## Dia 4 — Prova social e comunidade

**Objetivo:** criar confiança com conteúdo verificável.

- Implementar alunos ou resultados, empresas, instrutores e comunidade.
- Usar “Os Feras Dev” apenas se o tom e o conteúdo sustentarem o naming.
- Preparar depoimentos em formato estático e legível antes da animação.
- Validar textos alternativos, headings e adaptação mobile.

**Saída:** todas as seções essenciais presentes, mesmo que alguns dados permaneçam claramente pendentes.

## Dia 5 — Interatividade de alto valor

**Objetivo:** elevar o impacto sem desestabilizar a página.

- Completar spotlight, onda de cor e reação do logo de forma incremental.
- Implementar fitas de depoimentos somente sobre uma versão estática funcional.
- Adicionar poucas microinterações com propósito.
- Criar modos mobile, touch e movimento reduzido.
- Medir comportamento e cortar efeitos que não mantenham resposta aceitável.

**Saída:** diferenciais funcionais com fallbacks seguros e sem bloquear leitura ou rolagem.

## Dia 6 — QA e correções

**Objetivo:** transformar uma boa demonstração em entrega confiável.

- Executar os checklists de qualidade e acessibilidade.
- Testar desktop, tablet, mobile, teclado, toque, zoom e movimento reduzido.
- Inspecionar console, links, CTAs, overflow e ordem de headings.
- Otimizar imagens e efeitos; pausar trabalho fora da viewport.
- Corrigir primeiro falhas funcionais, depois inconsistências visuais.

**Saída:** nenhum defeito essencial conhecido sem plano explícito de correção.

## Dia 7 — Polimento e apresentação

**Objetivo:** fechar a entrega e preparar a defesa técnica.

- Fazer uma última revisão visual e de conteúdo real.
- Concluir README, AGENTS.md e instruções de publicação.
- Publicar ou documentar o processo de deploy autorizado.
- Registrar testes, limitações e conteúdo pendente.
- Ensaiar demonstração, decisões, alternativas e perguntas prováveis.

**Saída:** link ou pacote de entrega verificável e apresentação técnica ensaiada.

## Comprimir quando houver menos de sete dias

- **5–6 dias:** unir dias 1 e 2; unir dias 3 e 4; preservar um dia inteiro de QA e entrega.
- **3–4 dias:** entregar hero estático forte, conteúdo completo e somente um diferencial seguro; deixar fitas ou onda avançada como corte.
- **1–2 dias:** congelar experimentos; concluir estrutura, responsividade, conteúdo, CTA, acessibilidade básica, documentação mínima e deploy.
- **Poucas horas:** reparar o fluxo crítico e a primeira dobra; não iniciar nova interação complexa.

## Regras de corte

1. Cortar primeiro 3D, WebGL e notebook complexo.
2. Depois simplificar fitas, parallax e quantidade de partículas.
3. Preservar sempre conteúdo institucional, navegação, CTA, mobile, teclado, contraste e movimento reduzido.
4. Manter fallbacks estáticos para todo efeito removido.
5. Registrar cortes como decisões de produto e prazo, não como funcionalidades concluídas.
