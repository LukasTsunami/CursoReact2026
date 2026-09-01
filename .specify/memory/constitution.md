<!--
Sync Impact Report
- Version change: 1.7.0 → 1.8.0
- Modified principles: Principle VI (Documentação Rastreável) passou a
  exigir uma 5ª seção "Quando reconsiderar" em todo ADR; Restrições
  Técnicas e de Conteúdo passou a exigir que comentários sobre um conceito
  recorrente em fase diferente reconheçam brevemente o padrão já visto em
  vez de reexplicar do zero ou omitir por completo. Motivado pelos gaps de
  baixa prioridade (B4, A6) identificados em PERSONAS.md.
- Added sections: none
- Removed sections: none
- Follow-up TODOs: none
-->

# Curso React (Poltronas de Teatro) Constitution

## Core Principles

### I. Fase Independente e Incremental
Cada pasta `fase-N` é o projeto COMPLETO daquela fase: possui seu próprio
`package.json`, roda sozinha com `npm install && npm run dev` e `npm test`,
sem depender de nenhuma outra pasta. O código entre duas fases consecutivas
DEVE ser idêntico exceto pelo diff da própria fase — um `diff -r fase-N
fase-N+1` mostra somente o que foi adicionado ou alterado.
**Rationale**: um aluno que se perdeu precisa conseguir abrir qualquer pasta
de fase e continuar dali; qualquer divergência não intencional entre fases
quebra esse ponto de resgate.

### II. Testes Como Juiz (NON-NEGOTIABLE)
A mesma suíte completa de testes existe em todas as fases
(`src/tests/fase-1.test.tsx` … `fase-9.test.tsx`). Na `fase-N`, os testes das
fases 1..N DEVEM passar e os das fases N+1..9 DEVEM falhar; na `fase-0` tudo
falha; na `fase-9` tudo passa. Esse critério verde/vermelho DEVE ser
confirmado rodando os testes de verdade em cada pasta — nunca presumido ou
declarado sem execução real. Todos os 9 itens de regra de negócio do domínio
DEVEM estar cobertos por pelo menos um teste, com nomes descritivos em
português lidos como especificação.
**Rationale**: os testes são o mecanismo de correção usado em aula ao vivo;
uma suíte que não reflete o estado real do código engana instrutor e alunos.

### III. Stack Fechada
A stack do projeto é fixa: Vite, React 18+, TypeScript, MSW, Immer, Zustand,
React Router, React Hook Form + Zod (+ `@hookform/resolvers`), Vitest,
Testing Library (react, jest-dom, user-event) e jsdom. Nenhuma biblioteca
fora dessa lista pode ser adicionada. `useRef` e `PropTypes` são proibidos em
qualquer fase — o `holdTimer` usa `useEffect` + `useState` + `setInterval`
com cleanup.
**Rationale**: o curso ensina um conjunto deliberado de ferramentas; cada
adição fora da lista dilui o material didático e quebra a promessa de ADR
por tecnologia.

### IV. Domínio em Português, React em Inglês
Componentes e conceitos de domínio usam nomes em português conforme a lista
oficial de tipos (`Teatro`, `Setor`, `Fileira`, `Assento`,
`poltronasSelecionadas`, `aoSelecionar`, `adicionarAoCarrinho`,
`regrasHerdadas`, `expiraEm`, `carrinhoAberto`, `liberarAssentos`, etc.).
Termos e APIs do React permanecem em inglês (`useState`, props, hooks). Os
tipos do domínio (`StatusAssento`, `Assento`, `Fileira`, `Setor`,
`GlobalLayoutData`, `TipoAcesso`) usam exatamente os nomes e formatos
definidos em `prompt.md`.
**Rationale**: mistura consistente reforça que o domínio de negócio é
independente da tecnologia usada para implementá-lo — uma lição central do
curso.

### V. TypeScript Simples e Didático
Todo o código é TypeScript, mas com tipos legíveis: sem generics avançados,
sem utility types exóticos. Os tipos existem para documentar o domínio, não
para demonstrar sofisticação de TS — o curso não ensina TypeScript, os
alunos apenas leem os tipos prontos.
**Rationale**: TypeScript é ferramenta de suporte aqui, não objeto de
ensino; complexidade de tipos desnecessária distrai do objetivo real de cada
aula (React).

### VI. Documentação Rastreável
Toda tecnologia nova introduzida no projeto tem um ADR em `docs/adr/`
(Contexto → Decisão → Alternativas consideradas → Consequências → Quando
reconsiderar) e um playbook em `docs/playbooks/` (passo a passo de
configuração com o porquê de cada opção), ambos escritos para iniciantes. A
seção "Quando reconsiderar" é curta (2–3 frases) e descreve em que cenário
essa escolha deixaria de ser a certa (ex.: escala, requisito ausente hoje) —
é só contexto de mundo real, não abre espaço para implementar nada além do
que a fase pede. Cada `fase-N` (1–9) tem um
`PASSO-A-PASSO.md` descrevendo em passos numerados como sair da fase
anterior e chegar naquela, citando arquivos e qual bloco de testes fica
verde ao final. Toda fase, incluindo a `fase-0`, tem também um `README.md`
próprio explicando o que aquela pasta especificamente contém. ADRs,
playbooks, README e PASSO-A-PASSO DEVEM ser compreensíveis por alguém que
nunca assistiu a nenhuma aula do curso — não podem pressupor contexto
verbal do instrutor ou conteúdo que só existe nos slides.
**Rationale**: o material precisa funcionar como referência de consulta
pós-curso, não só como script de aula; isso inclui quem só tem acesso ao
repositório (sem ter assistido a nenhuma aula ao vivo) e quem chegou
atrasado numa aula e está tentando se recuperar sozinho pelo repositório.

## Restrições Técnicas e de Conteúdo

Comentários didáticos são curtos e aparecem apenas onde um conceito surge
pela primeira vez naquela fase (ex.: o primeiro `useEffect` com cleanup
ganha 2–3 linhas; o segundo não repete a explicação). Cada comentário DEVE
ser autocontido — explica o conceito em si, nunca presume que o leitor
"acabou de ver" ou "acabou de fazer" algo na aula (proibido abrir um
comentário com frases como "continuando o que fizemos" ou equivalentes);
quem abre o arquivo direto, sem ter ouvido nenhuma explicação verbal,
precisa conseguir entender o comentário sozinho. Quando um conceito já
comentado em fase anterior reaparece em contexto diferente (ex.: cleanup de
`useEffect` visto no polling da fase-6 reaparecendo no holdTimer da
fase-8), o comentário novo reconhece brevemente o padrão já visto e foca só
na diferença — nunca reexplica do zero, nunca omite por completo.
Componentes são
funcionais e usam arrow functions, exceto `export default function` em
componentes de página quando preferível. O estado do projeto segue a régua
definida em `prompt.md`: `useState` no `Teatro` para seleção em andamento
(prop drilling proposital via `aoSelecionar`), Zustand (`useCarrinho`) para
carrinho/reserva (a modal do carrinho vive fora da árvore do Teatro), e
`useContext` (`TeatroContext`) apenas para injeção estática
(`cadeirasEstofadas`) — nunca como gerenciador de estado. Estado derivado
(ex.: quantidade de selecionadas) é sempre calculado no render, nunca
duplicado em outro `useState`. Dados de exemplo (JSON de layout) precisam
cobrir todos os casos de status e regra herdada, e o mapa do teatro deve
parecer um teatro de verdade visualmente já na `fase-1`.

**Sem complexidade não ensinada**: nenhuma fase introduz uma técnica,
abstração ou camada que não esteja sendo explicitamente ensinada naquele
ponto do curso. Isso inclui, especificamente:

1. **Otimização de performance não pedida**: `useCallback`, `useMemo`,
   `React.memo`, debounce/throttle de eventos ou requisições, memoização
   manual. O código fica "ingênuo" de propósito (ex.: `buscarLayout` sendo
   recriada a cada render) a menos que a fase peça o contrário.
2. **Hooks customizados de abstração**: proibido criar `useFetchLayout()`,
   `useInterval()`, `useHoldTimer()` ou qualquer hook extraído "para
   reutilizar". `prompt.md` já decide que fica inline, dentro do próprio
   componente, com `useEffect` + `useState` + `setInterval` diretos.
3. **Correção retroativa de fases anteriores**: uma fase nunca "arruma" um
   padrão propositalmente imperfeito de uma fase anterior (ex.: o spread
   manual da fase-2, que só é substituído por Immer na fase-3 como parte da
   lição). Cada fase só aplica o diff descrito para ela — nunca refatora
   silenciosamente o que veio antes.
4. **Error handling além do pedido**: nada de `try/catch` generalizado,
   retry com backoff, circuit breaker ou Error Boundaries do React. Basta o
   loading/erro simples que a spec da fase pede.
5. **Validação além do necessário**: `CheckoutSchema` valida formato/tamanho
   dos campos, nunca lógica de negócio real (ex.: algoritmo de dígito
   verificador de CPF) — o dado nunca é usado para nada além da demo.
6. **Camada de cliente de API**: chamadas usam `fetch` direto; proibido
   introduzir Axios ou um wrapper genérico de cliente HTTP em `servicos/`.
7. **Reorganização de pastas fora do combinado**: sem `index.ts` de barrel
   export, sem pastas `utils/`/`helpers/` genéricas — só a estrutura descrita
   no plano da feature.
8. **Testes com snapshot ou utilitários genéricos**: testes usam asserts
   específicos e legíveis (conforme Principle II), nunca `toMatchSnapshot`
   nem fábricas de teste genéricas não pedidas.
9. **Zustand com middleware não pedido**: a store usa `create` simples;
   proibido adicionar `persist`, o middleware `immer` do Zustand, ou
   qualquer outro middleware não descrito na spec/plano da fase.
10. **Acessibilidade além do combinado**: a marcação visual/`aria-label` de
    poltronas de acessibilidade (Principle IV) é suficiente; focus traps,
    regiões ARIA live completas ou navegação por teclado avançada não fazem
    parte de nenhuma fase, a menos que uma spec futura peça explicitamente.
11. **Normalização de dados**: os dados do teatro ficam na estrutura
    aninhada exata de `data-model.md` (`Teatro.setores[].fileiras[].assentos[]`);
    proibido normalizar em `Record<string, Assento>`/mapas indexados por id
    "para performance ou acesso mais rápido".
12. **Biblioteca de data-fetching**: proibido reintroduzir React Query, SWR
    ou similar — já vedado pela Stack Fechada (Principle III), mas citado
    aqui explicitamente porque é a tentação mais comum na fase-4/5 (fetch
    manual existe para ensinar o conceito, não porque falta uma lib melhor).
13. **CSS além de CSS puro**: proibido introduzir CSS Modules,
    styled-components, Tailwind ou qualquer framework/metodologia de CSS —
    o projeto usa CSS simples em arquivo(s) `.css` puro, conforme já
    decidido em `prompt.md`.
14. **Code splitting de rotas**: proibido usar `React.lazy`/`Suspense` para
    dividir as rotas da fase-7/8 — são só três rotas, sem necessidade real,
    e o conceito não é ensinado.
15. **Abstração de setup de testes**: proibido criar um `test-utils.tsx`
    genérico que embrulha todos os providers/matchers customizados; cada
    teste renderiza com os providers necessários escritos por extenso, para
    ficar claro o que está sendo testado.
16. **TypeScript além do simples nos testes de tipo**: proibido usar
    discriminated unions elaboradas com exhaustiveness check via `never`
    para `StatusAssento` ou tipos correlatos — reforça a Principle V (tipos
    legíveis, sem sofisticação de TS) especificamente contra essa tentação.
17. **Tooling de CI/git não pedido**: proibido adicionar GitHub Actions,
    Husky, commitlint ou hooks de git como parte da entrega das 10 fases —
    está fora do escopo da feature atual, mesmo que Conventional Commits
    apareça como prática desejada no README original do projeto.
18. **Data APIs do React Router** (`loader`, `action`, `useLoaderData`,
    `useFetcher`): proibido migrar a busca de dados de dentro do componente
    (`useEffect` + `useState` de loading/erro, como a fase-4 ensina) para a
    camada de configuração de rota. Exemplo do que NÃO fazer:

    ```tsx
    // ✅ O que a fase-4 ensina (mantenha assim):
    function App() {
      const [layout, setLayout] = useState<GlobalLayoutData | null>(null);
      const [carregando, setCarregando] = useState(true);
      const [erro, setErro] = useState(false);

      useEffect(() => {
        async function carregar() {
          setCarregando(true);
          try {
            setLayout(await buscarLayout());
          } catch {
            setErro(true);
          } finally {
            setCarregando(false);
          }
        }
        carregar();
      }, []);

      // ... renderiza com base em carregando/erro/layout
    }

    // ❌ PROIBIDO — migração pra data router (não ensinada em nenhuma aula):
    const router = createBrowserRouter([
      {
        path: "/teatro",
        loader: async () => buscarLayout(), // busca fora do componente
        element: <TeatroPagina />,
      },
    ]);

    function TeatroPagina() {
      const layout = useLoaderData() as GlobalLayoutData; // sem useState/useEffect
      const fetcher = useFetcher(); // revalidação sem navegar — conceito novo
      // ...
    }
    ```

    O lado direito é mais idiomático na documentação atual do React Router,
    mas move a busca de dados para fora do componente e introduz
    `loader`/`useLoaderData`/`useFetcher`, conceitos que nenhuma aula
    ensina — e contradiz o que a fase-4 constrói manualmente (loading/erro
    como estado local).
19. **Motor de renderização SVG genérico**: usar diretamente
    `coordinateX`/`coordinateY`/`angulo`/`svgPath` como vêm nos dados;
    proibido construir uma abstração de "shapes" configuráveis ou um
    sistema de layout genérico por cima do SVG.
20. **Immer vazando pra fases anteriores**: `produce()` só aparece a partir
    da fase-3, exatamente onde o curso introduz o conceito; proibido usá-lo
    já na fase-1/2 "porque é mais limpo" — o spread manual daquelas fases é
    proposital (reforça o item 3 desta lista).
21. **Tipos derivados de schema Zod**: `DadosCheckout` e os demais tipos do
    domínio são os tipos manuais definidos em `data-model.md`; proibido
    substituí-los por `z.infer<typeof CheckoutSchema>`, o que criaria uma
    segunda fonte de verdade de tipo em vez da mais simples e explícita.
22. **Portal de DOM para o carrinho**: `CarrinhoModal` é "fora da árvore do
    Teatro" no sentido de onde o componente é montado no JSX (direto no
    `App`), não no sentido de DOM — proibido usar
    `ReactDOM.createPortal` ou qualquer mecanismo de portal.
23. **Config/feature-flags para valores literais**: o intervalo de polling
    (5s), o prazo de reserva (5min) e valores semelhantes ficam como
    literais inline no código, exatamente como o curso ensina; proibido
    extrair para um arquivo de configuração com variáveis de ambiente.

**Regra de fechamento**: esta lista não é exaustiva por definição — na
dúvida sobre qualquer técnica, abstração ou padrão não listado aqui, a
implementação mais literal e direta de `prompt.md`, `data-model.md` e da
spec da fase corrente sempre vence sobre qualquer "boa prática" geral,
recomendação de documentação de biblioteca, ou instinto de generalização
que a aula não esteja explicitamente ensinando naquele ponto. Isso vale
para qualquer subagent (task-mecanica/task-media/task-critica) e para
qualquer emenda futura a esta constituição.

**Rationale**: o objetivo é que o código pareça exatamente o que o
instrutor escreveria ao vivo, sem um assistente de IA "corrigindo"
proativamente um padrão que os alunos ainda não viram — introduzir esses
conceitos fora de hora confunde mais do que ajuda, quebra a progressão de
dor→solução que o curso usa como ferramenta pedagógica, e nenhuma fase deste
curso tem escala ou necessidade real que justifique essas camadas.

## Fluxo de Desenvolvimento e Critérios de Aceite

As fases são materializadas incrementalmente, `fase-0` → `fase-9`, cada uma
copiada da anterior mais o diff da fase (a `fase-9` é pensada mentalmente
primeiro como referência). A cada fase: rodar `npm test` e confirmar o
critério verde/vermelho da Principle II, e rodar `npm run build` para
garantir compilação sem erro de TypeScript. Depois da `fase-9`, revisar os
`PASSO-A-PASSO.md` contra o diff real entre pastas. O checklist final de
aceite exige: as 10 pastas de fase rodando via `npm install && npm run dev` e
`npm test`; critério verde/vermelho confirmado por execução real em cada
pasta; ausência de `useRef`, `PropTypes`, biblioteca fora da stack, ou
qualquer item da lista "Sem complexidade não ensinada" (otimizações,
hooks customizados, correção retroativa de fases, error handling extra,
validação excessiva, cliente HTTP genérico, barrel exports, snapshot tests,
middleware do Zustand, acessibilidade além do combinado); nomenclatura de
domínio em português consistente; os 9 itens de regra de
negócio cobertos por teste; ADRs, playbooks, PASSO-A-PASSO e README
presentes em cada fase e consistentes com o código; mapa do teatro
visualmente reconhecível desde a `fase-2`; navegação inicial (tela inicial
+ listagem de teatros) funcionando desde a `fase-1`.

## Governance

Esta constituição tem precedência sobre qualquer outra prática ou preferência
individual dentro do projeto. Emendas exigem: descrição da mudança, ajuste de
versão conforme semver (MAJOR para remoção/redefinição incompatível de
princípio, MINOR para adição de princípio ou seção, PATCH para
esclarecimentos e correções), atualização do Sync Impact Report no topo deste
arquivo, e propagação para os templates e comandos de Spec Kit que dependam
do conteúdo alterado. Qualquer plano, spec ou task gerada pelo fluxo Spec Kit
deve ser verificada contra estes princípios antes de ser aprovada; complexidade
que viole a Principle III (Stack Fechada) ou a Principle I (Fase Independente)
deve ser justificada explicitamente ou rejeitada.

**Version**: 1.8.0 | **Ratified**: 2026-08-31 | **Last Amended**: 2026-08-31
