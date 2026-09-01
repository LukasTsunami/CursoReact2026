# Data Model: Escolha de Poltronas de Teatro

Nomenclatura em português para o domínio (Principle IV). Tipos simples e
planos, sem generics (Principle V). Estes são os nomes e formatos oficiais —
qualquer tarefa de implementação deve usá-los literalmente.

## StatusAssento (enum)

```ts
type StatusAssento =
  | "disponivel"
  | "ocupado"
  | "bloqueado"
  | "quebrado"
  | "reservadoEspecial";
```

Introduzido na fase-4 (nas fases 2/3 todo assento do JSON de exemplo é
tratado como `"disponivel"` para simplificar a primeira demo visual).

## Assento

```ts
type Assento = {
  numero: number;
  preco: number;            // preço base; pode ser 0 (gratuito)
  acessibilidade: boolean;
  status: StatusAssento;
  coordinateX: number;
  coordinateY: number;
  angulo: number;           // rotação em graus no SVG
};
```

- **Regras de seleção** (US3, US4): selecionável apenas quando `status ===
  "disponivel"` E não pertence a uma `Fileira.reservada`/`emManutencao` nem a
  um `Setor.embargado` (regra herdada — FR-004).
- **Preço**: `preco` é o valor base; ajustes (meia-entrada) são
  responsabilidade do Carrinho, nunca mutam este campo (FR-017).

## Fileira

```ts
type Fileira = {
  id: string;
  nome: string;             // "A", "B", ...
  reservada: boolean;       // convidados especiais
  emManutencao: boolean;
  assentos: Assento[];
};
```

- Se `reservada || emManutencao`, nenhum `Assento` da fileira é selecionável,
  independente do `status` individual (FR-004).

## TipoAcesso (enum)

```ts
type TipoAcesso = "livre" | "pagante" | "exclusivoBradesco";
```

## Setor

```ts
type Setor = {
  id: string;
  nome: string;              // "Plateia A", "Balcão"...
  svgPath: string;           // recorte/contorno do bloco
  embargado: boolean;        // em obras
  tipoAcesso: TipoAcesso;
  fileiras: Fileira[];
};
```

- Se `embargado`, nenhum assento de nenhuma fileira do setor é selecionável
  (regra herdada, cascateando por toda a hierarquia — FR-004).
- `tipoAcesso` desce como regra herdada e deve ser comunicado na UI (FR-006).

## GlobalLayoutData

```ts
type GlobalLayoutData = {
  teatroId: string;              // slug, ex.: "teatro-municipal-de-sao-paulo"
  nome: string;                  // ex.: "Teatro Municipal de São Paulo"
  descricao: string;             // texto curto exibido no cartão da listagem (fase-1+)
  nota: number;                  // nota ilustrativa fixa, ex.: 4.7 (resolve FR-026 — não é calculada)
  formato: "classico" | "redondo" | "funil" | "multiAndar";
  cadeirasEstofadas: boolean;   // usado no useContext (fase-6+)
  viewBox: string;              // ex.: "0 0 1000 700"
  setores: Setor[];             // completo só no teatro-municipal-de-sao-paulo antes da fase-5; [] nos demais até serem preenchidos
};
```

- `teatroId` é o slug usado na URL (`/teatros/:nomeDoTeatro`, resolve FR-022)
  desde a fase-0. O teatro de exemplo padrão (usado nas fases 0–4, antes de
  existir seleção de múltiplos teatros na fase-5) é
  `teatroId: "teatro-municipal-de-sao-paulo"`,
  `nome: "Teatro Municipal de São Paulo"`, `formato: "classico"`.
- `descricao` e `nota` existem em todos os 4 teatros de exemplo desde a
  fase-0/1 (usados pela listagem — `fase-0/src/dados/teatros.json`), mesmo
  para os teatros cujo `setores` ainda está vazio.
- Representa a entidade **Teatro** da spec (US1, US2, FR-001, FR-008,
  FR-022, FR-025, FR-026).
- A partir da fase-5, vem de `GET /api/layout` (ver `contracts/`); nas fases
  1–4 é importado como JSON local em `src/dados/`.

## Estado de seleção em andamento (não persistido)

```ts
// vive em useState no componente Teatro (fase-3+)
type PoltronasSelecionadas = Array<{
  setorId: string;
  fileiraId: string;
  numero: number;
}>;
```

- Atualizado via callback `aoSelecionar` subindo de `Assento` até `Teatro`
  (prop drilling proposital — Principle IV/regra de estado do curso).
- Item removido automaticamente da lista se o assento correspondente deixar
  de estar disponível via polling, antes da compra (FR-010, US6).

## ItemCarrinho / Carrinho (Zustand — fase-7+)

```ts
type ItemCarrinho = {
  setorId: string;
  fileiraId: string;
  numero: number;
  precoBase: number;
  meiaEntrada: boolean;      // autodeclarado pelo usuário; comprovação é física, fora de escopo
};

// preco final do item = meiaEntrada ? precoBase / 2 : precoBase

type EstadoCarrinho = {
  itens: ItemCarrinho[];
  expiraEm: number | null;   // timestamp epoch ms; null = sem reserva ativa
  carrinhoAberto: boolean;
};
```

- Actions: `adicionarAoCarrinho(poltronasSelecionadas)`,
  `liberarAssentos()`.
- `expiraEm` alimenta o `holdTimer` da modal (contagem regressiva,
  `setInterval` + cleanup, sem `useRef` — Principle III).
- Ao expirar, `liberarAssentos()` limpa `itens` e `expiraEm` (FR-013, US8).

## Pedido (checkout — fase-9)

```ts
type EnderecoEntrega = {
  cep: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
};

type FormaPagamento = "cartaoCredito" | "pix" | "boleto";

type DadosCheckout = {
  nome: string;
  email: string;
  cpf: string;
  endereco: EnderecoEntrega;
  formaPagamento: FormaPagamento;
};

type Pedido = {
  id: string;
  itens: ItemCarrinho[];
  total: number;
  dadosComprador: DadosCheckout;
  criadoEm: string;          // ISO 8601
};
```

- `DadosCheckout` é validado por um schema Zod (`CheckoutSchema`) antes do
  envio — mensagens de erro por campo (FR-015).
- `Pedido` é o corpo de resposta de `POST /api/pedidos` (ver `contracts/`),
  usado para montar o resumo da tela `/sucesso` (FR-016).

## Relações

```
GlobalLayoutData 1───* Setor 1───* Fileira 1───* Assento
Carrinho (EstadoCarrinho) *───1 ItemCarrinho ──(referencia por setorId+fileiraId+numero)──> Assento
Pedido 1───* ItemCarrinho (cópia congelada no momento da compra)
```

## Transições de estado relevantes

- **Assento.status**: transições ocorrem apenas via simulação do MSW
  (polling) — nunca por ação direta do usuário sobre o próprio status (o
  usuário só manipula a *seleção*, não o status do assento).
- **EstadoCarrinho**: `sem itens` → `itens + expiraEm setado (comprar)` →
  (`expiraEm atingido` → `sem itens`) OU (`checkout confirmado` → `sem
  itens`, `Pedido` criado).
