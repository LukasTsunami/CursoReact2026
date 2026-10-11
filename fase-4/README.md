# fase-4 — Respeitar regras de disponibilidade e acesso (US4)

Esta fase adiciona as regras de negócio que tornam a seleção realista:
poltronas indisponíveis não respondem ao clique, fileiras/setores
restritos bloqueiam tudo abaixo na hierarquia, e o tipo de acesso de cada
setor fica visível numa legenda.

## Base herdada das fases anteriores

O mapa é o da fase-2 (650 poltronas medidas sobre a foto, botão cobrindo
cada poltrona). Nesta fase, a borda colorida de `assento--acesso-*` passa
a ser o contorno da poltrona na foto.

## O que esta fase adiciona sobre a fase-3

- **`Assento`** ganha o botão `disabled` sempre que `status !==
  "disponivel"` OU a poltrona herda um bloqueio (`regrasHerdadas.
  bloqueadaPelaHierarquia`); poltronas de acessibilidade ganham uma marca
  visual própria (`assento--acessivel`), independente do status.
- **`Setor`/`Fileira`** calculam `regrasHerdadas` descendo mesclado: o
  `Setor` contribui `embargado`/`tipoAcesso`; a `Fileira` mescla sua
  própria `reservada`/`emManutencao` para decidir se toda a fileira está
  bloqueada, independente do status individual de cada poltrona.
- **`Legenda`** (novo componente): lista os três `TipoAcesso` (Livre,
  Pagante, Exclusivo Bradesco) com uma cor cada, sempre visível abaixo do
  mapa (resolve FR-006).
- **`Teatro`** ganha estado derivado (`quantidade`, `total`), sempre
  calculado no render — nunca duplicado em outro `useState` — e o toggle
  de `poltronasSelecionadas` foi refatorado para usar **Immer**
  (`produce`) no lugar do spread manual das fases 1–3.

## Como rodar

```bash
npm install
npm run dev
npm test        # fase-1..4 verdes; fase-5..9 vermelhos
npm run build   # deve compilar sem erro de TypeScript
```
