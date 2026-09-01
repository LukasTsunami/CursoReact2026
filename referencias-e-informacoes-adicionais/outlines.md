Outline de Slides — Curso de React (v3)
Hands-on, 5 aulas — Projeto: Tela de Escolha de Poltronas (Teatro)
Ordem de ensino 100% vinculada à prática — para revisão antes da geração do deck
Nota da v3: alinhado à spec 001-escolha-poltronas-teatro — agora são 10 pastas (fase-0 a fase-9); a nova fase-1 (tela inicial + listagem de teatros) entrou na aula 1, e o React Router passa a existir configurado desde a fase-0 (mas só vira conteúdo de aula na fase-8, na aula 4).

Sumário



1. Premissas e formato
5 aulas, das 7h às 10h com 40 min de intervalo (~2h20 líquidas por aula).
Curso 100% hands-on: cada conceito entra no momento em que o projeto precisa dele. O instrutor demonstra passo a passo; sem exercícios soltos durante a aula.
Projeto entregue pronto, separado em fases (uma pasta por fase, cada pasta contém a fase completa). Quem se perder abre a pasta da fase e segue dali.
Projeto em TypeScript de ponta a ponta, mas SEM ensinar TypeScript: os tipos do domínio já vêm prontos no repo e há um único slide de leitura deles (aula 1, slide 35). Consequência: propTypes saiu do curso — os tipos TS cumprem o papel de contrato.
ADRs em /docs/adr: um registro por tecnologia explicando o porquê da escolha (Vite, TypeScript, MSW, Immer, Zustand, React Router, React Hook Form, Zod, Testing Library).
Playbooks em /docs/playbooks: como cada tecnologia foi configurada, o porquê de cada configuração e o passo a passo do que foi feito. Padrão do curso: toda tecnologia nova aponta pro seu ADR + playbook.
Suíte de testes automatizados (Testing Library + MSW) como "juiz" — checkpoints em todas as aulas, que também funcionam como pontos de resgate.
Formato de cada aula: mini-bloco de JS útil pra aula (slides curtos, um tema por slide) + conceito React na hora do uso + aplicação no projeto + comentários do universo React no fechamento.
Legenda: C = conceito (slide falado) · LC = live coding (slide de apoio + código ao vivo) · T = checkpoint de testes · D = demo/discussão dirigida.
2. Mapa de fases do repositório (v3)
Agora são 10 pastas (fase-0 a fase-9) — a aula 1 fecha três fases porque termina com a navegação funcionando, o teatro renderizado E a seleção funcionando.
Fase
Conteúdo da pasta
Fecha na aula
fase-0
Boilerplate: Vite + TS, assets, CSS, SVGs, MSW configurado, React Router configurado (rotas respondem com placeholders), suíte de testes completa (toda vermelha), ADRs e playbooks em /docs
Aula 1 (início)
fase-1
Tela inicial ("reserve seu assento", prova social, selos de confiança) + listagem de teatros (cartões com título, descrição e nota) + navegação pelo menu até o teatro: componentes, props, map/key em elementos simples
Aula 1
fase-2
Teatro completo renderizado de JSON local: SVG, composição, Fragment, tipos do domínio em uso
Aula 1
fase-3
Seleção básica de poltronas: onClick, useState no Teatro, lifting state up, toggle com spread, destaque visual
Aula 1 (fim)
fase-4
Regras de negócio completas: status, regras herdadas, acessibilidade + refactor do toggle com Immer
Aula 2
fase-5
Dados via MSW: fetch inicial no useEffect, loading/erro, múltiplos layouts de teatro (useParams lendo a URL)
Aula 2 (fim)
fase-6
Tempo real: polling com cleanup, MSW simulando outros compradores + useContext (versão final da tela)
Aula 3
fase-7
Carrinho Zustand: store, action adicionarAoCarrinho, modal fora do Teatro
Aula 3 (fim)
fase-8
Reserva com prazo: holdTimer, expiração/liberação + React Router vira aula (rotas /checkout e /sucesso adicionadas)
Aula 4
fase-9
Checkout com React Hook Form + Zod, fluxo completo = projeto final
Aula 5


3. Aula 1 — Do zero à seleção de poltronas
Objetivo: terminar a aula com a navegação até o teatro funcionando, o mapa do teatro INTEIRO renderizado e as poltronas selecionáveis (fases 0, 1, 2 e 3). É a aula mais pesada — o bloco de apresentação (slides 1–8) deve ser rápido. A fase-1 (cartões de teatro) introduz componentes/props/map em elementos simples antes de o aluno encarar o SVG.
Nº
Slide
O que acontece
Tipo
1–8
Bloco existente do deck
Capa React.js, Agenda, Quem sou eu, Hobbies, Profissionalmente, Sobre o que gosto de falar, Tecnologias, Ecossistema (mantidos como estão — passar rápido, ~15 min)
C
9
Acordos
Combinados: perguntas a qualquer momento, 100% hands-on, código de todas as fases disponível, testes como juiz, ninguém fica pra trás
C
10
O que é React
Biblioteca (não framework), UI declarativa, comparação rápida com DOM manual
C
11
Apresentando o Desafio
DEMO da versão final rodando (última fase): navegar da home até o teatro, escolher poltronas, bloqueio em tempo real, comprar, checkout. "É isso que vamos construir"
D
12
Regras de negócio
As 7 regras num slide só
C
13
Como o React resolve isso?
Componentes como funções, estado → re-render, diagrama Teatro → Setor → Fileira → Assento
C
14
Baixando o projeto
Repo no GitHub. /fase-0 até /fase-9, cada pasta é o projeto completo daquela fase. Quem se perder abre a pasta e segue
LC
15
Tour pelo boilerplate (fase 0)
Vite + TypeScript, assets, CSS pronto, SVGs, MSW configurado, rotas já respondendo com placeholders (Router explicado na aula 4), suíte de testes
LC
16
ADRs: o porquê de cada tecnologia
/docs/adr — um registro por decisão (Vite, TypeScript, MSW, Immer, Zustand, Router, RHF, Zod, Testing Library). Ler UM juntos como exemplo
C+LC
17
Playbooks: como configurei cada coisa
/docs/playbooks — passo a passo de cada configuração e o porquê de cada opção. Padrão do curso: toda tecnologia nova aponta pro seu ADR + playbook
C+LC
18
O juiz: npm test
Rodar a suíte na fase 0, tudo vermelho, ler UM erro juntos (anatomia do error output)
T
19
ES6: arrow functions
Sintaxe, retorno implícito — exemplos que vamos usar hoje
C
20
ES6: template literals
Interpolação com crase — direto num exemplo do projeto
C
21
ES6: destructuring
De objeto e de array — é assim que vamos receber props
C
22
ES6: spread
Copiar arrays/objetos — vamos precisar já hoje no toggle de seleção
C
23
import / export
Módulos, default vs named — no código do projeto
LC
24
Primeiro componente: CartaoTeatro
Função que retorna JSX: um cartão de teatro com título fixo, renderizado na listagem
LC
25
JSX na prática
Chaves para expressões, className, atributos — mexendo no cartão ao vivo
LC
26
Props
titulo, descricao, nota descendo do pai pro filho — o mesmo cartão servindo pra qualquer teatro
LC
27
Listas: map
PaginaListaTeatros renderizando o array de teatros (teatros.json) com map
LC
28
A prop key
Por que a key existe, o que quebra sem ela (demo do warning e do bug de reconciliação)
C+D
29
Tela inicial + navegação
Hero "reserve seu assento", prova social, selos; menu leva pra /teatros e o clique no cartão leva pro teatro — o Link já vem pronto do boilerplate ("como isso funciona por dentro é assunto da aula 4")
LC
30
Checkpoint fase 1
npm test — home e listagem funcionando, navegação até o teatro. Testes da fase 1 verdes. Comparar com /fase-1
T
31
O que é SVG?
Gráfico vetorial: tags como elementos (rect, path, g, text). Por que SVG pro mapa do teatro e não divs (escala, formas curvas, precisão)
C
32
viewBox e coordenadas
O "palco" do desenho: sistema de coordenadas, escala dos setores entre si (onde fica o palco, plateia, balcão)
C
33
Componente Teatro
<Teatro /> com a tag <svg> e viewBox, renderizado na página do teatro
LC
34
Composição
Teatro renderiza <Setor /> hardcoded; Setor renderiza <Fileira /> — o mesmo padrão dos cartões, agora em árvore
LC
35
Os tipos do nosso domínio
ÚNICO slide de TypeScript do curso: Assento, Fileira, Setor, GlobalLayoutData — tipos prontos no repo, só leitura. "Não é curso de TS: os tipos documentam o domínio pra gente"
C
36
Como desenhamos um assento?
coordinateX / coordinateY posicionam, angulo rotaciona (transform), o shape vem de rect/path — anatomia do desenho antes do componente
C
37
Assento: quem se desenha
Componente Assento desenhando no SVG com as coordenadas e ângulo — props de novo, agora com números
LC
38
Fragment
Fileira devolvendo vários <Assento> sem wrapper extra no SVG
LC
39
Subindo os níveis
Fileira com map de assentos, Setor com map de fileiras, Teatro com map de setores — JSON local importado (sem fetch ainda)
LC
40
Checkpoint fase 2
npm test — teatro renderizado, testes da fase 2 verdes. Comparar com /fase-2
T
41
Eventos: onClick
onClick no Assento, console.log pra provar que dispara
LC
42
useState: anatomia
Valor, setter, re-render. Ciclo: evento → setState → re-render
C
43
Estado preso no filho
E se o useState morar no Assento? O beco sem saída: o Teatro não fica sabendo
D
44
Lifting state up
poltronasSelecionadas sobe pro Teatro — dado desce por props, evento sobe por callback (diagrama)
C
45
Callback aoSelecionar
Prop drilling de propósito: Teatro → Setor → Fileira → Assento
LC
46
Toggle de seleção
Adicionar/remover com spread e filter — versão rápida; imutabilidade a fundo fica pra aula 2
LC
47
Destaque visual
selecionado descendo por props, estilo do assento selecionado
LC
48
Checkpoint fase 3
npm test — seleção funcionando. Comparar com /fase-3. FIM DA AULA: navegação, teatro inteiro na tela e poltronas selecionáveis
T
49
Recap + Universo React
O que construímos; comentário: JSX vira JS (transpilação, papel do Vite)
C
50
Próxima aula
Teaser: regras de negócio de verdade e dados vindos de API
C


4. Aula 2 — Regras de negócio e dados de verdade
Objetivo: todas as regras de negócio visuais funcionando, imutabilidade dominada (spread → Immer) e o layout vindo de uma API mockada.
Nº
Slide
O que acontece
Tipo
1
Capa + agenda da aula 2
"Regras de negócio e dados de verdade": imutabilidade com Immer, status, regras herdadas, fetch com MSW
C
2
Recap / ponto de partida
Abrir /fase-3 juntos
LC
3
Imutabilidade: por quê
Por que não mutar o state: comparação por referência, re-render que não acontece — demo do bug mutando direto
C+D
4
Spread puro
Atualização imutável de array e objeto — exemplos limpos
LC
5
Onde o spread dói
Atualizar um assento dentro de fileira dentro de setor: a pirâmide de spreads aninhados
D
6
Immer
produce(): escrever "mutação" segura, sem a pirâmide. ADR + playbook do Immer
C+LC
7
Refatorando o toggle
Toggle da aula 1 reescrito com Immer — antes vs depois lado a lado
LC
8
Estado derivado
quantidadePoltronasSelecionadas: por que NÃO é outro useState — calcula no render
C+LC
9
Renderização condicional
Ternário, early return, classes condicionais — o kit
C
10
Status do assento
Aplicando: disponivel, ocupado, bloqueado, quebrado, reservadoEspecial — cada um com seu visual
LC
11
Regras herdadas
Setor embargado, fileira reservada/manutenção, tipoAcesso — regrasHerdadas={ embargado, tipoAcesso } descendo mesclada
LC
12
Acessibilidade
Assento PCD: ícone e estilo próprios, continua clicável
LC
13
Checkpoint fase 4
npm test — todas as regras de negócio visuais verdes. Comparar com /fase-4
T
14
Promises e async/await
then/catch vs async/await — mini playground
C+LC
15
fetch
Requisição, response.json(), tratamento de erro
LC
16
MSW
O que é, por que mockar no service worker (rede de verdade, sem back-end). Apontar ADR + playbook
C
17
useEffect: anatomia
Efeito, array de dependências, cleanup — quando roda cada coisa
C
18
Fetch inicial do layout
useEffect + async/await chamando função separada que busca globalLayoutData no MSW
LC
19
Loading e erro
Estados de carregamento e falha — condicional de novo, agora com dados assíncronos
LC
20
Vários teatros
Redondo, funil, quadrado, multi-andar: mesmo componente, layouts diferentes vindos da "API" — a URL de cada teatro (useParams lendo :nomeDoTeatro) carrega seu layout; o payoff de ter tudo data-driven
D
21
Checkpoint fase 5
npm test — fetch, loading e erro verdes. Comparar com /fase-5
T
22
Recap + Universo React
Comentário: fizemos fetch na mão pra aprender; react-query/SWR fazem isso com cache e retry de graça
C
23
Próxima aula
Teaser: a tela atualizando sozinha e o carrinho que vive fora do Teatro
C


5. Aula 3 — Tempo real e carrinho global
Objetivo: a tela se mantém atualizada sozinha (polling + cleanup), useContext entra como contraste ao prop drilling, e o carrinho nasce no Zustand com a modal fora do Teatro.
Nº
Slide
O que acontece
Tipo
1
Capa + agenda da aula 3
"Tempo real e carrinho global": polling, cleanup, useContext e Zustand
C
2
Recap / ponto de partida
Abrir /fase-5 juntos
LC
3
O problema do tempo real
DEMO do bug: outra pessoa comprou a poltrona 27 e sua tela nem ficou sabendo
D
4
Polling
Buscar de tempos em tempos: conceito e trade-offs vs WebSocket/SSE (1 slide, sem aprofundar)
C
5
Polling na prática
Segundo useEffect com intervalo refazendo a busca — a tela atualizando sozinha
LC
6
Por que o cleanup existe
Sem ele: vazamento, requisições órfãs, StrictMode invocando 2x — mostrar o estrago ao vivo
C+D
7
Simulando os outros
MSW marcando poltronas aleatórias como ocupadas/bloqueadas a cada resposta
LC
8
Checkpoint fase 6
npm test — versão final da TELA. Comparar com /fase-6
T
9
useContext: conceito
Injetar dado direto na árvore sem atravessar cada nível
C
10
useContext na prática
Teatro falando direto com Assento (cadeiras estofadas ou não) sem passar por Setor/Fileira
LC
11
Prop drilling vs Context
Quando cada um faz sentido; aviso antecipado: Context não é gerenciador de estado
C
12
O problema do carrinho
Comprar → reservar por um tempo → modal do carrinho, que vive FORA da árvore do Teatro
C
13
Estado local vs global
A régua: seleção em andamento = useState no Teatro; carrinho/reserva = store global (diagrama)
C
14
Zustand
create, store, actions, selector — anatomia mínima. Apontar ADR: por que Zustand e não Redux/Context
C
15
Store do carrinho
itens, expiraEm, carrinhoAberto + action adicionarAoCarrinho(poltronasSelecionadas)
LC
16
Botão Comprar
Teatro chama a action e entrega a seleção; poltronas viram reservadas temporariamente
LC
17
Modal do Carrinho
Montada no App (fora do Teatro), lendo direto da store — a prova de por que estado global existe
LC
18
Checkpoint fase 7
npm test — carrinho abrindo com os itens. Comparar com /fase-7
T
19
Recap + Universo React
Comentários: Zustand tem middleware Immer (amarra com a aula 2); react-query cuidaria do polling
C
20
Próxima aula
Teaser: o relógio da reserva e a navegação entre páginas
C


6. Aula 4 — Reserva com prazo e navegação
Objetivo: fechar o ciclo da reserva temporária (holdTimer + expiração) e finalmente explicar o React Router que rodava desde a fase-0, com o Zustand como cola entre as páginas. Aula com folga proposital — é o colchão pra atrasos acumulados.
Nº
Slide
O que acontece
Tipo
1
Capa + agenda da aula 4
"Reserva com prazo e navegação": holdTimer, expiração, React Router
C
2
Recap / ponto de partida
Abrir /fase-7 juntos
LC
3
Preço: quem manda é o carrinho
Preço base vem do assento/setor; meia-entrada e ajustes são responsabilidade do carrinho
LC
4
holdTimer
Contagem regressiva lendo expiraEm da store: setInterval dentro de useEffect com cleanup (na modal, não no Teatro)
LC
5
Reserva expirou
Action de liberar assentos ao zerar o timer — fluxo completo de reserva temporária
LC
6
SPA e navegação
O problema: "páginas" sem recarregar o navegador
C
7
React Router: abrindo a caixa-preta
Rotas, Route e Link — explicando o que já rodava desde a fase-0 (/, /teatros, /teatros/:nomeDoTeatro) e o useParams usado na aula 2. Apontar ADR + playbook
C+LC
8
Rotas novas do fluxo de compra
/checkout (esqueleto) e /sucesso — montando ao vivo sobre as rotas existentes
LC
9
Zustand como cola
DEMO: navegar do teatro pro checkout e o carrinho continua lá — estado global sobrevive à troca de rota
D
10
Checkpoint fase 8
npm test — timer, expiração e rotas verdes. Comparar com /fase-8
T
11
Panorama de gerenciadores
Redux Toolkit, Jotai, MobX, Elf, Overmind — mesmo problema, sabores diferentes (1 slide)
C
12
Teaser: formulários
DEMO do jeito ruim: formulário grande com useState — re-render a cada tecla, boilerplate, validação manual. "Aula 5 resolve isso"
D
13
Próxima aula
Teaser: checkout profissional e o mundo lá fora
C


7. Aula 5 — Checkout profissional + o mundo lá fora
Objetivo: fechar o fluxo com React Hook Form + Zod e encerrar com a visão de ecossistema e pragmatismo, amarrando com os ADRs do próprio projeto.
Nº
Slide
O que acontece
Tipo
1
Capa + agenda da aula 5
"Checkout profissional + o mundo lá fora": React Hook Form, Zod e o ecossistema
C
2
Recap / ponto de partida
Abrir /fase-8 juntos; relembrar a demo do formulário ruim
LC
3
React Hook Form
Uncontrolled components, register, handleSubmit — por que performa melhor. ADR + playbook
C
4
Zod
Schema declarativo, validação em runtime. Gancho: os tipos TS protegem em tempo de compilação; Zod é o guardião do runtime — dos dados que entram de fora
C
5
Tela de checkout
Dados pessoais, endereço, pagamento — consumindo os itens do carrinho direto da store
LC
6
Validando com Zod
Schema + mensagens de erro nos campos, integração com React Hook Form
LC
7
Fechando o pedido
Submit → MSW → navegar pra /sucesso com resumo dos assentos comprados (resgatados da store)
LC
8
Checkpoint fase 9
npm test — suíte INTEIRA verde. Projeto completo = /fase-9
T
9
A ilusão da biblioteca única
React é minimalista; a comunidade cria soluções infinitas — a fadiga de escolhas é real
C
10
Como escolher sem surtar
Tailwind vs Styled vs Radix, Vite vs Webpack — critério: problema de negócio e manutenibilidade, não hype. Amarrar com os ADRs do projeto: "foi exatamente isso que fiz"
C
11
A guerra do estado
Mapa: useState/useReducer (local) · useContext (injeção estática, baixa frequência) · Zustand/Redux/Jotai/MobX (global de verdade)
C
12
O alerta do Context
Context API não substitui gerenciador de estado — re-renders em cascata
C
13
O salto pro Next.js
SPA vs SSR/SSG/RSC: SEO, carga inicial, hidratação, Server Components — por que o mercado migra
C
14
Nem tudo precisa de Next
Dashboards internos vivem muito bem como SPA — limite da ferramenta
C
15
Over-engineering
O erro clássico: microsserviço e store global pra problema de useState
C
16
Conclusão do curso
O melhor código é o que o próximo dev lê, altera e testa sem perder os cabelos
C
17
Próximos passos + referências
Docs oficiais, react.dev, roadmap sugerido, o repo (com ADRs e playbooks) fica no ar
C
18
Encerramento
Agradecimento + contato
C


8. Notas de calibragem
Total: ~124 slides, mas a maioria é curta (um tema por slide) ou de apoio ao live coding — o ritmo real é ditado pelo código.
Aula 1 é a mais densa (50 slides, fecha 4 fases). O bloco da fase-1 (slides 24–30) amortece a densidade: componentes, props, map e key entram em cartões HTML simples antes de o aluno encarar o SVG. Válvulas de escape: os slides 41–48 (bloco de seleção) deslizam pro início da aula 2 sem quebrar dependências — a fase-3 vira o recap.
Aula 4 é a mais leve de propósito: absorve atrasos das aulas 2 e 3. Se sobrar tempo, o teaser de formulários (slide 12) pode virar o início real do checkout.
Todo checkpoint (T) é ponto de resgate: quem se perdeu abre a pasta da fase correspondente e segue.
Padrão recorrente: toda tecnologia nova entra com referência ao seu ADR (por quê) e playbook (como configurei) — reforça o material de consulta pós-curso.
React Router segue o mesmo padrão do MSW: configurado e funcionando desde a fase-0, mas só vira conteúdo de aula quando o projeto precisa do conceito (aula 4 / fase-8). Na aula 1 o aluno usa a navegação pronta sem abrir a caixa-preta; na aula 2 o useParams aparece de passagem; na aula 4 tudo é explicado.
A demo da versão final na aula 1 (slide 11) é o contrato do curso: o aluno vê aonde vai chegar antes da primeira linha de código.
