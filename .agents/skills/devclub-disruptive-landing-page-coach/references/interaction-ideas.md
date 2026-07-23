# Ideias de interação para a landing page DevClub

## Sumário

- [Critério de escolha](#critério-de-escolha)
- [Hero com spotlight](#hero-com-spotlight)
- [Notebook animado](#notebook-animado)
- [Depoimentos em fitas verticais](#depoimentos-em-fitas-verticais)
- [Microinterações de alto impacto e baixo risco](#microinterações-de-alto-impacto-e-baixo-risco)
- [Ordem segura de implementação](#ordem-segura-de-implementação)

## Critério de escolha

Avaliar cada ideia por impacto percebido, custo de implementação, risco no prazo, custo de performance, acessibilidade, fallback e capacidade do autor de explicá-la. Validar a composição estática antes do movimento.

| Ideia | Impacto | Custo | Risco | Prioridade |
|---|---:|---:|---:|---|
| Símbolo com spotlight e partículas | Alto | Médio | Médio controlável | Diferencial recomendado |
| Onda fluorescente ao clique ou toque | Alto | Médio | Médio | Diferencial incremental |
| Reação elegante do logo | Médio/alto | Baixo/médio | Baixo | Diferencial |
| Notebook 3D completo | Alto | Alto | Alto | Experimental |
| Fitas verticais de depoimentos | Alto | Médio | Médio | Diferencial após versão estática |
| Microinterações de foco, botão e card | Médio | Baixo | Baixo | Diferencial seguro |

## Hero com spotlight

### Conceito

Manter um ambiente inicialmente escuro, com o símbolo DevClub parcialmente revelado. Fazer um spotlight branco seguir o ponteiro com leve inércia. Concentrar partículas no centro e disparar uma onda roxa e azul no clique ou toque, sem alterar permanentemente o spotlight branco.

### Vantagens

- Criar uma assinatura visual ligada à ideia de revelar potencial.
- Produzir forte resposta ao ponteiro sem exigir framework.
- Permitir implementação incremental e cortes seguros.
- Adaptar-se melhor a mobile e movimento reduzido do que uma cena 3D complexa.

### Riscos

- Comprometer a legibilidade se texto, logo e partículas disputarem atenção.
- Consumir CPU/GPU com partículas, blur, DPR ou loops sem limite.
- Bloquear scroll ao capturar eventos de toque incorretamente.
- Parecer genérico se não usar proporções, símbolo e narrativa próprios da DevClub.

### Estratégia nativa recomendada

1. Construir o hero estático e legível.
2. Usar Canvas 2D para as partículas, não centenas de nós DOM.
3. Gerar densidade não uniforme: pouca nas bordas e concentração controlada no centro.
4. Manter partículas de fundo atrás do símbolo e no máximo cerca de 5% na camada frontal.
5. Guardar posição-alvo e posição-renderizada do ponteiro; interpolar entre elas.
6. Usar gradiente radial branco para o spotlight e preservar queda suave.
7. Representar cada onda por origem, tempo inicial, raio e duração; reaproveitar estruturas quando possível.
8. Misturar roxo e azul apenas na faixa da onda e manter o estado comum branco.
9. Disparar a reação do logo quando o raio atingir o centro ou os limites do símbolo.
10. Fazer o logo brilhar mais e por mais tempo que as partículas, sem pulso agressivo.
11. Adaptar a contagem de partículas à área, limitar DPR e reduzir blur no mobile.
12. Pausar ou reduzir o loop fora da viewport e quando a aba estiver oculta.

### Fallbacks

- Sem JavaScript: exibir composição estática, logo, título, texto e CTA completos.
- Sem hover: usar toque para uma onda curta e manter a rolagem livre.
- Movimento reduzido: congelar ou desacelerar partículas, remover inércia e simplificar onda e escala.
- Dispositivo lento: reduzir partículas, sombras e resolução do canvas antes de remover conteúdo.

### Recomendação

Priorizar esta direção. Ela oferece alto impacto com arquitetura progressiva, stack nativa e pontos claros de corte. Só aumentar a complexidade depois de validar legibilidade, toque, movimento reduzido e desempenho.

## Notebook animado

### Conceito

Mostrar um notebook inicialmente fechado e de costas, fazê-lo girar, desacelerar, abrir, ligar a tela e revelar o símbolo DevClub.

### Vantagens

- Contar uma história visual reconhecível ligada ao aprendizado de programação.
- Criar uma sequência cinematográfica forte quando executada com alto acabamento.

### Riscos

- Exigir perspectiva, várias peças, sincronização, oclusão e estados responsivos difíceis.
- Consumir grande parte de uma semana em polimento e correções.
- Ficar artificial sem assets ou modelagem de alta qualidade.
- Criar problemas de movimento, mobile, carregamento e manutenção.
- Ser mais difícil de explicar e depurar para o perfil do autor.

### Custo e alternativa

Classificar como Experimental. Não usar Three.js, GSAP ou outra dependência sem a análise e a aprovação previstas. Como alternativa nativa, usar uma moldura 2D de tela com pequena transformação CSS, brilho de inicialização e revelação do símbolo; ou manter o spotlight como experiência principal.

### Critério de abandono

Interromper cedo se um protótipo estático responsivo e uma sequência reduzida não estiverem convincentes sem prejudicar texto, CTA ou prazo. Manter um fallback estático pronto antes do experimento.

## Depoimentos em fitas verticais

### Composição desktop

- Manter uma área central de conteúdo e fitas laterais.
- Usar até quatro colunas quando houver espaço: externas descendo e internas subindo.
- Deslocar cards e linhas sutilmente para sugerir a ilusão Café Wall sem distorcer o texto.
- Repetir cards apenas quando necessário para continuidade visual e ocultar duplicatas de tecnologias assistivas.
- Preservar contraste, tamanho de texto e pausas visuais suficientes para leitura.

### Estratégia técnica

1. Construir primeiro uma lista semântica e estática de depoimentos reais ou placeholders marcados.
2. Organizar colunas com Grid; usar transformações apenas como camada visual.
3. Atualizar uma variável de progresso no máximo uma vez por frame, evitando trabalho pesado no evento de scroll.
4. Aplicar `transform: translate3d()` com velocidades e sentidos controlados.
5. Restringir o efeito à seção e limitar o deslocamento para evitar grandes áreas vazias.
6. Usar `IntersectionObserver` para ativar trabalho apenas quando a seção estiver próxima.
7. Evitar alturas artificiais excessivas e qualquer overflow horizontal.

### Mobile e acessibilidade

- Reduzir para uma ou duas colunas, carrossel controlável ou lista estática.
- Preferir lista estática em movimento reduzido.
- Não mover o card que esteja focado ou sendo lido ativamente.
- Manter a ordem do DOM independente da direção visual das colunas.
- Não fabricar depoimentos; identificar claramente conteúdo provisório.

## Microinterações de alto impacto e baixo risco

| Interação | Propósito | Implementação segura |
|---|---|---|
| CTA com brilho curto | Reforçar ação principal | Pseudo-elemento e transição CSS |
| Sublinhado direcional no menu | Mostrar navegação ativa | Transformação CSS e foco equivalente |
| Cards com leve elevação | Indicar interatividade | `transform` e sombra discretos |
| Revelação de seção | Guiar ritmo de leitura | `IntersectionObserver`, distância curta |
| Linha energética entre etapas | Conectar a jornada | Gradiente e escala CSS |
| Contorno reagindo ao foco | Melhorar feedback e acesso | `:focus-visible` com alto contraste |
| Pulso curto no logo após onda | Confirmar propagação | Classe temporária ou estado do canvas |
| Mudança sutil de luz no header | Dar profundidade ao scroll | Classe e custom property, sem loop contínuo |

Manter poucas interações consistentes. Remover qualquer efeito que não melhore feedback, orientação, hierarquia ou narrativa.

## Ordem segura de implementação

1. Hero e depoimentos estáticos.
2. Responsividade e acessibilidade básicas.
3. Partículas com distribuição central.
4. Spotlight branco.
5. Onda fluorescente.
6. Reação do logo.
7. Fitas de depoimentos.
8. Microinterações restantes.
9. Movimento reduzido, toque, pausa fora da viewport e perfil de performance.
10. Polimento somente após passar nos critérios funcionais.
