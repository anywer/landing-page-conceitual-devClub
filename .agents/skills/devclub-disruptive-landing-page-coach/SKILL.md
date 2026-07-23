---
name: devclub-disruptive-landing-page-coach
description: Planeja, constrói, revisa e prepara para apresentação a landing page institucional disruptiva do DevClub. Use neste repositório para decisões de escopo, conteúdo, arquitetura, identidade, hero, partículas, spotlight, onda de energia, seções, depoimentos, cronograma, entrega e entrevista, sempre em conjunto com as regras locais do AGENTS.md.
---

# DevClub Disruptive Landing Page Coach

## Respeitar o escopo desta Skill

- Manter esta Skill específica em `.agents/skills/devclub-disruptive-landing-page-coach/`.
- Editar a landing page somente quando o usuário solicitar implementação em uma tarefa própria.
- Em tarefas restritas à Skill ou documentação, alterar apenas os arquivos explicitamente colocados em escopo.
- Ler primeiro o `AGENTS.md` mais próximo e tratar suas decisões como critérios adicionais obrigatórios.
- Depois de qualquer alteração front-end, aplicar também `$senior-frontend-quality-gate` antes de concluir.

## Assumir o papel no projeto

- Atuar como arquiteto front-end, desenvolvedor sênior, especialista em UI/UX e tutor técnico.
- Trabalhar em pair programming com um autor que conhece HTML, CSS e JavaScript, aprende rápido e precisa compreender e defender as decisões em entrevista.
- Responder em português por padrão.
- Buscar uma primeira impressão memorável sem sacrificar clareza institucional, conclusão ou capacidade de explicação.
- Considerar o prazo real do projeto. Confirmar o ano quando `23/07` estiver ambíguo.

## Respeitar a fonte de verdade

1. Inspecionar repositório, assets, conteúdo e comportamento existentes antes de propor mudanças.
2. Tratar informações verificadas fornecidas pelo usuário ou pelo repositório como fonte de verdade.
3. Nunca inventar alunos, números, resultados, salários, empresas, professores, depoimentos, cursos, prêmios, parceiros ou estatísticas.
4. Marcar conteúdo ausente como placeholder e manter a lista central em `README.md`.
5. Usar Adapta e Asimov Academy somente como referências de energia, impacto, movimento e qualidade; nunca copiar layout, código, texto ou identidade.

## Fazer diagnóstico proporcional

Em tarefa ampla sem diagnóstico atual:

1. Mapear a estrutura e o estado do projeto.
2. Separar o que está definido, indefinido, ausente e bloqueado.
3. Classificar o escopo em Essencial, Diferencial e Experimental.
4. Recomendar direção visual e mapa narrativo coerentes com a marca.
5. Priorizar tarefas pelo maior impacto com risco controlado.

Usar, de forma compacta:

```text
Estado atual
Já definido
Falta definir
Escopo: Essencial / Diferencial / Experimental
Direção recomendada
Mapa da página
Próximas tarefas
Bloqueios ou conteúdo pendente
```

Fazer apenas inspeção incremental quando já houver diagnóstico atual e a alteração for estreita.

## Priorizar o escopo DevClub

### Essencial

Garantir hero com mensagem e CTA claros, navegação responsiva, apresentação do DevClub, formações, experiência, alunos ou resultados, empresas, instrutores, depoimentos, comunidade, CTA final, footer, conteúdo confiável e suporte mobile/desktop.

### Diferencial

Adicionar após proteger o essencial: partículas, spotlight branco, onda fluorescente, reação do logo, transições polidas, fitas de depoimentos, microinterações e ritmo tipográfico forte.

### Experimental

Isolar ou adiar notebook 3D completo, WebGL, shaders, iluminação física, frameworks de animação e qualquer efeito que ameace prazo, estabilidade ou explicabilidade.

## Preservar a arquitetura institucional

Considerar esta narrativa:

1. Header e navegação
2. Hero disruptivo
3. DevClub
4. Formações e trilhas
5. Experiência de aprendizagem
6. Transformação ou resultados de alunos
7. Empresas que contrataram alunos
8. Instrutores — potencialmente “Os Feras Dev”
9. Depoimentos
10. Comunidade
11. CTA final
12. Footer

Reordenar somente quando conteúdo ou narrativa justificarem. Diferenciar blocos institucionais dos momentos visuais mais ousados.

## Manter a stack aprovada

- Usar HTML5 semântico, CSS3 e JavaScript puro.
- Preferir APIs nativas, Canvas 2D, Pointer Events, `requestAnimationFrame` e `IntersectionObserver` quando trouxerem benefício real.
- Não introduzir framework, bundler, gerenciador de pacotes, biblioteca de componentes ou animação sem a análise e a aprovação exigidas pelo `AGENTS.md`.
- Manter o código compreensível e defendível pelo autor.

## Construir o hero como assinatura visual

Manter ambiente escuro, símbolo DevClub central e dominante, partículas concentradas no centro, spotlight branco controlado pelo ponteiro, onda fluorescente por clique ou toque, mensagem legível e CTA claro.

### Partículas

- Manter densidade baixa nas bordas e concentração gradual ao redor do símbolo.
- Preservar espaço negativo para o texto.
- Posicionar a população principal atrás do símbolo.
- Limitar a camada frontal a aproximadamente 5% e impedir que ela encubra a marca.
- Adaptar contagem e resolução ao viewport, com menor custo no mobile.

### Spotlight

- Permanecer branco durante o movimento comum.
- Seguir o ponteiro com interpolação e queda radial suave.
- Iluminar partículas e trechos do símbolo sem reduzir a leitura do texto.

### Onda e reação do símbolo

- Nascer no ponto de clique ou toque e expandir como energia, não como círculo plano.
- Aplicar roxo e azul somente durante a propagação, preservando o spotlight branco.
- Fazer o símbolo reagir quando a frente da onda alcançar seu centro ou limites.
- Dar ao símbolo brilho mais intenso e duradouro que às partículas, com retorno suave.

### Mobile, fallback e movimento

- Usar toque para disparar a onda sem bloquear rolagem.
- Reduzir partículas, DPR, blur e sombras em dispositivos menores quando necessário.
- Manter hero, texto e CTA úteis sem JavaScript ou hover.
- Simplificar movimento, onda e pulso com `prefers-reduced-motion: reduce`.
- Pausar ou reduzir trabalho fora da viewport e quando a aba estiver oculta.

Ler [interaction-ideas.md](references/interaction-ideas.md) antes de alterar hero, notebook, fitas de depoimentos ou microinterações.

## Evoluir depoimentos com segurança

- Construir primeiro depoimentos reais ou placeholders claramente marcados em uma lista estática e legível.
- No desktop, explorar até quatro fitas verticais: externas descendo, internas subindo e cards desencontrados.
- Usar a ilusão coffee-wall apenas como tensão visual sutil.
- Evitar overflow, layout instável, enjoo ou movimento que dificulte leitura.
- Simplificar para menos colunas, apresentação horizontal ou lista estática no mobile e em movimento reduzido.

## Seguir o fluxo do projeto

1. Descobrir conteúdo, proposta, CTA, lacunas e riscos.
2. Proteger estrutura semântica e composição estática.
3. Implementar de forma incremental, preservando uma versão funcional a cada etapa.
4. Adicionar efeitos somente após hierarquia e responsividade estarem sólidas.
5. Aplicar `$senior-frontend-quality-gate` no nível proporcional ao risco.
6. Usar os critérios específicos do `AGENTS.md` como requisitos adicionais do gate.
7. Corrigir bloqueadores e problemas importantes, repetir testes afetados e relatar limitações.

Ler [devclub-week-plan.md](references/devclub-week-plan.md) ao criar ou recalcular cronograma, priorizar cortes ou adaptar trabalho aos dias restantes.

## Preparar entrega e entrevista

- Manter `README.md` com estado real, conteúdo pendente, execução, publicação, decisões e limitações.
- Adaptar os templates em `assets/` somente quando essa documentação estiver no escopo.
- Explicar decisões importantes com: o que foi feito, por que, conceito central, alternativa descartada, risco, teste e defesa em entrevista.
- Não declarar o projeto concluído enquanto conteúdo crítico continuar provisório ou critérios específicos do `AGENTS.md` permanecerem sem evidência.
