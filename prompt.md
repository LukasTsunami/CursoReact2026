# PROMPT — Construção do repositório do curso de React

Você é um desenvolvedor sênior construindo o **repositório didático de um curso hands-on de React** de 5 aulas. O projeto é uma tela de escolha de poltronas de teatro (clone raso de Ticketmaster/Ingresso.com, mas para teatros). O instrutor demonstra passo a passo em aula; os alunos acompanham usando este repo. Sua entrega precisa ser **executável de verdade**: cada fase roda, cada teste declarado como verde passa de fato.

## Objetivo

Criar um repositório com a seguinte estrutura:

```
/
├── README.md
├── docs/
│   ├── adr/          (um ADR por tecnologia)
│   └── playbooks/    (um playbook por tecnologia)
├── fase-0/
├── fase-1/
├── fase-2/
├── fase-3/
├── fase-4/
├── fase-5/
├── fase-6/
├── fase-7/
└── fase-8/
```

**Cada pasta `fase-N` é o projeto COMPLETO daquela fase** — independente, com seu próprio `package.json`, rodando sozinha com `npm install && npm run dev` e `npm test`. Um aluno que se perdeu abre a pasta da fase e segue dali. A `fase-8` é o projeto pronto.

## Stack (não adicione nada além disso)

- Vite + React 18+ + **TypeScript**
- MSW (Mock Service Worker) — mocks no navegador E nos testes
- Immer
- Zustand
- React Router
- React Hook Form + Zod (+ @hookform/resolvers)
- Vitest + Testing Library (react, jest-dom, user-event) + jsdom

## Convenções obrigatórias

1. **Domínio em português, React em inglês**: componentes e conceitos do domínio se chamam `Teatro`, `Setor`, `Fileira`, `Assento`, `poltronasSelecionadas`, `aoSelecionar`, `adicionarAoCarrinho`, `regrasHerdadas`, `expiraEm`, `carrinhoAberto`, `liberarAssentos`. Termos de React ficam em inglês (`useState`, props, hooks).
2. **Tudo em TypeScript, mas TS simples**: tipos legíveis, sem generics avançados, sem utility types exóticos. Os tipos existem para documentar o domínio, não para impressionar. O curso NÃO ensina TS — os alunos só leem os tipos.
3. **Sem `useRef` e sem `PropTypes`** em lugar nenhum. O holdTimer usa `useEffect` + `useState` + `setInterval` com cleanup.
4. Componentes funcionais e arrow functions em todo o código (exceto `export default function` nos componentes de página, se preferir).
5. Comentários didáticos curtos **apenas onde um conceito aparece pela primeira vez** naquela fase (ex.: o primeiro `useEffect` com cleanup ganha 2–3 linhas de comentário; o segundo não).
6. Código idêntico entre fases consecutivas exceto pelo diff da fase — um `diff -r fase-2 fase-3` deve mostrar SÓ o que a fase 3 adiciona/muda.

## Tipos do domínio (use exatamente estes nomes)

```ts
type StatusAssento =
  | "disponivel" | "ocupado" | "bloqueado" | "quebrado" | "reservadoEspecial";

type Assento = {
  numero: number;
  preco: number;             // preço base; pode ser 0 (gratuito)
  acessibilidade: boolean;
  status: StatusAssento;
  coordinateX: number;
  coordinateY: number;
  angulo: number;            // rotação em graus no SVG
};

type Fileira = {
  id: string;
  nome: string;              // "A", "B", ...
  reservada: boolean;        // convidados especiais
  emManutencao: boolean;
  assentos: Assento[];
};

type TipoAcesso = "livre" | "pagante" | "exclusivoBradesco";

type Setor = {
  id: string;
  nome: string;              // "Plateia A", "Balcão"...
  svgPath: string;           // recorte/contorno do bloco
  embargado: boolean;        // em obras
  tipoAcesso: TipoAcesso;
  fileiras: Fileira[];
};

type GlobalLayoutData = {
  teatroId: string;
  nome: string;
  formato: "classico" | "redondo" | "funil" | "multiAndar";
  cadeirasEstofadas: boolean;   // usado no useContext (fase 5)
  viewBox: string;              // ex.: "0 0 1000 700"
  setores: Setor[];
};
```

## Regras de negócio (todas precisam estar cobertas por teste)

1. O usuário seleciona uma ou mais poltronas para comprar.
2. Poltrona pode estar indisponível: ocupada, bloqueada ou quebrada — e aí não dispara seleção.
3. Enquanto o usuário escolhe, poltronas podem ficar indisponíveis (outros compradores, via polling).
4. Fileira ou setor inteiro pode estar reservado (convidados especiais) — nada ali é selecionável.
5. Assentos de acessibilidade têm marcação visual própria e continuam selecionáveis.
6. Setor ou fileira embargado para obras bloqueia tudo abaixo (regra herdada).
7. Setor pode ser livre, pagante ou exclusivo (ex.: Bradesco) — o `tipoAcesso` desce como regra herdada e aparece na UI.
8. Comprar → poltronas ficam reservadas temporariamente com prazo (`expiraEm`), modal do carrinho abre; expirou → poltronas são liberadas.
9. Preço: o base vem do assento/setor, mas ajustes (meia-entrada) são responsabilidade do carrinho.

## Arquitetura de estado (regra do curso)

O estado **não vive só no Teatro nem só no Zustand**:

- **`useState` no `Teatro`**: `poltronasSelecionadas` (seleção em andamento) — desce por props, eventos sobem por callback (`aoSelecionar`) atravessando Setor → Fileira → Assento (prop drilling proposital).
- **Zustand (`useCarrinho`)**: `itens`, `expiraEm`, `carrinhoAberto`, actions `adicionarAoCarrinho` e `liberarAssentos`. A modal do Carrinho monta no `App`, FORA da árvore do Teatro, lendo direto da store.
- **`useContext` (`TeatroContext`)**: apenas `cadeirasEstofadas`, injetado do Teatro direto no Assento (fase 5) — exemplo de injeção estática, não gerenciador de estado.
- Estado derivado calculado no render (`quantidade = selecionadas.length`), nunca duplicado em outro `useState`.

## O que cada fase contém

| Fase | Conteúdo (diff sobre a anterior) |
|------|----------------------------------|
| **fase-0** | Boilerplate: Vite+TS, CSS pronto, MSW configurado (mas ainda não usado pela UI), suíte de testes COMPLETA (toda vermelha), tipos do domínio em `/src/tipos.ts`, JSON de layout em `/src/dados/`. Nenhum componente de domínio — `App` renderiza um placeholder. |
| **fase-1** | Teatro estático renderizado a partir de JSON local importado: `Teatro`, `Setor`, `Fileira`, `Assento`, composição, `map`/`key`, Fragment, SVG com viewBox, assentos posicionados por `coordinateX/Y` e rotacionados por `angulo`. Sem interação. |
| **fase-2** | Seleção básica: `onClick` no Assento, `poltronasSelecionadas` via `useState` no Teatro, lifting state up, callback `aoSelecionar` descendo por prop drilling, toggle com spread/filter, destaque visual do selecionado. |
| **fase-3** | Regras de negócio completas: visual por `status`, regras herdadas (`regrasHerdadas={ embargado, tipoAcesso }`), fileira reservada/manutenção, acessibilidade, estado derivado (quantidade + total), refactor do toggle e das atualizações aninhadas com **Immer**. |
| **fase-4** | Dados via MSW: `GET /api/layout` com `useEffect` + `fetch` + async/await (função `buscarLayout` separada), estados de loading e erro, e **múltiplos teatros** (clássico, redondo, funil, multi-andar) selecionáveis por um `<select>` simples — mesmo componente, layouts diferentes. |
| **fase-5** | Tempo real: segundo `useEffect` com `setInterval` (polling a cada 5s) + cleanup; MSW passa a simular outros compradores (marca poltronas aleatórias como ocupadas/bloqueadas a cada resposta, de forma **determinística sob teste** — ver seção de testes); `TeatroContext` com `cadeirasEstofadas`. |
| **fase-6** | Carrinho: store Zustand (`/src/stores/carrinho.ts`), botão Comprar no Teatro chamando `adicionarAoCarrinho(poltronasSelecionadas)`, `expiraEm = agora + 5min`, modal `CarrinhoModal` montada no App lendo da store, com itens e total. |
| **fase-7** | Reserva com prazo + navegação: holdTimer na modal (countdown lendo `expiraEm`, `setInterval` + cleanup, **sem useRef**), expiração chama `liberarAssentos`; React Router com `/teatro`, `/checkout` (esqueleto), `/sucesso`; o carrinho sobrevive à troca de rota. |
| **fase-8** | Checkout completo: React Hook Form + Zod (`CheckoutSchema`: nome, email, cpf, endereço, forma de pagamento), erros por campo, itens vindos da store, `POST /api/pedidos` no MSW, redirect para `/sucesso` com resumo do pedido. Projeto final. |

## Testes (o "juiz" do curso)

- A **mesma suíte completa** existe em todas as fases, organizada por fase: `src/tests/fase-1.test.tsx` … `src/tests/fase-8.test.tsx`.
- Scripts no `package.json` de cada fase: `test` (roda tudo), `test:fase1` … `test:fase8` (por arquivo).
- **Critério de corretude por pasta**: na `fase-N`, os testes das fases 1..N passam e os das fases N+1..8 falham. Na `fase-0`, tudo falha; na `fase-8`, tudo passa. **Execute os testes de verdade em cada pasta e confirme isso antes de dar a fase por concluída.**
- Nomes de teste descritivos em português, escritos para serem lidos como especificação (ex.: `"não permite selecionar assento quebrado"`, `"libera os assentos quando a reserva expira"`).
- Use Testing Library com queries acessíveis (`getByRole`, `aria-label` nos assentos: `aria-label="Poltrona A27, disponível"`), MSW nos testes, `vi.useFakeTimers()` para polling e holdTimer.
- A simulação de "outros compradores" do MSW precisa ser **determinística sob teste** (ex.: seed/flag injetável) para os testes de tempo real não flutuarem.
- Falha de teste deve produzir mensagem legível pra iniciante — prefira asserts específicos a snapshots.

## Dados e visual

- Crie um `layout-classico.json` (e variações redondo/funil/multi-andar) com coordenadas SVG **plausíveis**: palco no topo, 2–3 setores (ex.: Plateia A, Plateia B, Balcão), 4–6 fileiras por setor, 8–14 assentos por fileira, fileiras do balcão em curva (usando `angulo`). O mapa precisa parecer um teatro de verdade ao rodar `npm run dev`.
- Garanta no dado exemplos de TODOS os casos: assentos quebrados, ocupados, bloqueados, com acessibilidade, uma fileira reservada, um setor embargado, um setor `exclusivoBradesco`.
- CSS pronto e caprichado o suficiente (o curso não ensina CSS): estados visuais distintos por status, selecionado bem evidente, modal decente. Sem framework de CSS.

## Documentação

1. **`README.md` raiz**: o que é o curso, como usar as fases, como rodar, tabela de fases.
2. **`docs/adr/`** — um ADR por tecnologia (vite, typescript, msw, immer, zustand, react-router, react-hook-form, zod, testing-library), formato: Contexto → Decisão → Alternativas consideradas → Consequências. Escritos para iniciantes lerem.
3. **`docs/playbooks/`** — um playbook por tecnologia: passo a passo de COMO foi configurada, com o porquê de cada opção de configuração (cada flag/campo relevante do config comentado).
4. **`fase-N/PASSO-A-PASSO.md`** em cada fase (1–8): como sair da fase anterior e chegar nesta, em passos numerados, apontando arquivos e citando qual bloco de testes fica verde ao final.

## Processo de execução (siga nesta ordem)

1. Construa a `fase-8` mentalmente primeiro (é a referência), mas **materialize as pastas incrementalmente: fase-0 → fase-8**, cada uma copiada da anterior + diff da fase.
2. A cada fase: rode `npm test` e confirme o critério de corretude (1..N verdes, resto vermelho). Rode `npm run build` para garantir que compila sem erro de TS.
3. Depois da fase-8: revise os `PASSO-A-PASSO.md` contra o diff real entre pastas.
4. Entregue ao final um sumário: árvore de pastas, contagem de testes por fase (verdes/vermelhos em cada pasta) e pendências, se houver.

## Critérios de aceite (checklist final)

- [ ] 9 pastas de fase, todas rodando com `npm install && npm run dev` e `npm test`
- [ ] Critério verde/vermelho por fase confirmado com execução real
- [ ] Nenhum `useRef`, nenhum `PropTypes`, nenhuma lib fora da stack
- [ ] Nomenclatura do domínio em português conforme a lista
- [ ] Todos os 9 itens de regra de negócio cobertos por pelo menos um teste
- [ ] ADRs + playbooks + PASSO-A-PASSO presentes e consistentes com o código
- [ ] Mapa do teatro visualmente reconhecível como teatro ao rodar a fase-1
