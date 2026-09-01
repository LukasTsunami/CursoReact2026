# Contrato: API mockada (MSW)

Não há backend real — MSW intercepta estas rotas tanto no navegador
(`fase-5` em diante) quanto nos testes (`setupServer`, todas as fases a
partir da 5). Os formatos usam os tipos definidos em `data-model.md`.

## `GET /api/layout`

Introduzida na fase-5.

**Query params**:
- `teatroId` (opcional): quando presente, retorna o layout daquele teatro
  específico; quando ausente, retorna o layout padrão (clássico).

**Resposta 200**:

```json
{
  "teatroId": "teatro-municipal-de-sao-paulo",
  "nome": "Teatro Municipal de São Paulo",
  "formato": "classico",
  "cadeirasEstofadas": true,
  "viewBox": "0 0 1000 700",
  "setores": [ /* Setor[] — ver data-model.md */ ]
}
```
Corpo: `GlobalLayoutData` (ver `data-model.md`).

**Resposta de erro** (simulada sob demanda para testar o estado de erro —
FR-007): status `500`, corpo `{ "mensagem": "Falha ao carregar o layout do teatro" }`.

**Comportamento de polling (fase-6+)**: a cada nova chamada (a cada 5s pelo
cliente), o handler marca aleatoriamente algumas poltronas antes
`"disponivel"` como `"ocupado"` ou `"bloqueado"`, simulando outros
compradores (US6, FR-009). **Sob teste**, esse sorteio deve ser
determinístico (seed ou flag injetável no handler) para que os testes de
fase-6 não fiquem instáveis — ver `research.md`.

## `POST /api/pedidos`

Introduzida na fase-9.

**Corpo da requisição**: `DadosCheckout` + `itens: ItemCarrinho[]` (ver
`data-model.md`), validados no cliente por `CheckoutSchema` (Zod) antes do
envio.

**Resposta 201**:

```json
{
  "id": "pedido-001",
  "itens": [ /* ItemCarrinho[] */ ],
  "total": 240,
  "dadosComprador": { /* DadosCheckout */ },
  "criadoEm": "2026-08-31T12:00:00.000Z"
}
```
Corpo: `Pedido` (ver `data-model.md`). O cliente usa esta resposta para
montar o resumo exibido em `/sucesso` (FR-016).

**Resposta de erro** (para exercitar o edge case "envio do checkout falha"):
status `500`, corpo `{ "mensagem": "Não foi possível confirmar o pedido" }`.

## Notas de compatibilidade entre fases

- Nas fases 0–4, `GET /api/layout` e `POST /api/pedidos` **não são
  chamadas pela UI** — o layout vem de JSON local — mas o handler já existe
  em `src/mocks/handlers.ts` desde a fase-0 (boilerplate preparado,
  conforme `prompt.md`).
- A partir da fase-5, `GET /api/layout` passa a ser a única fonte de dados
  do teatro; o JSON local deixa de ser importado diretamente pela UI (pode
  permanecer como fixture usada pelo próprio handler do MSW).
- O parâmetro de rota `:nomeDoTeatro` (ver `contracts/rotas-ui.md`) usa o
  mesmo valor de `teatroId` — a partir da fase-5, ele pode ser repassado
  como o query param `teatroId` desta rota.
