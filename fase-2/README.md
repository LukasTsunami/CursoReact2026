# fase-2 — Visualizar o mapa do teatro (US2)

Esta fase substitui o placeholder de `/teatros/:nomeDoTeatro` pelo mapa
real do teatro: uma foto de fundo do teatro com poltronas posicionadas em
cima dela como áreas clicáveis (ainda sem interação — isso é a fase-3).

## O que esta fase adiciona sobre a fase-1

- **`public/assets/teatro-municipal-de-sao-paulo.png`**: a foto de fundo
  usada pelo `Teatro` — referenciada pelo campo `imagemUrl` do
  `GlobalLayoutData` (por vir de dado JSON, e não de um `import`, o
  arquivo mora em `public/`, não em `src/assets/`; ver
  `docs/playbooks/vite.md`).
- **`Teatro`** (`src/componentes/Teatro.tsx`): contêiner `position:
  relative` com a foto de fundo (`<img>`) e a lista de `Setor` por cima.
- **`Setor`** (`src/componentes/Setor.tsx`): agrupa as `Fileira` do
  setor — não desenha nenhum contorno, a área do setor já está na foto.
- **`Fileira`** (`src/componentes/Fileira.tsx`): usa `Fragment`
  (`<>...</>`) para renderizar a lista de `Assento` daquela fileira.
- **`Assento`** (`src/componentes/Assento.tsx`): um `<button>` que cobre
  exatamente a poltrona desenhada na foto — `position: absolute` com
  centro em `coordinateX`/`coordinateY`, tamanho `largura`/`altura` e
  inclinação `rotacao` (tudo em percentual/graus sobre a imagem) — com
  `aria-label` descrevendo número e status (ex.: `"Poltrona A100,
  disponível, acessível"`). Os estados são camadas translúcidas que
  deixam o rótulo impresso na foto legível.
- **`PaginaTeatro`** agora renderiza `<Teatro>` a partir do
  `layout-classico.json` local.

`layout-classico.json` traz as **650 poltronas** desenhadas em
`teatro-municipal-de-sao-paulo.png` (12 blocos; Plateia com fileiras A–H
e J, como na foto), cada uma medida sobre a imagem, inclusive a
inclinação dos setores laterais. A numeração segue a da foto por bloco
(Plateia Esquerdo 100–109, Central 150–159, Direito 120–129, Frisa
200/300/400, Camarote 500/550/600, Galeria 700/750/800), sequencial da
esquerda para a direita — por isso nenhum `aria-label` se repete entre
blocos, mesmo com todos recomeçando a fileira em "A".

## O que ainda não existe

- Clicar numa poltrona ainda não faz nada — isso é a fase-3.

## Como rodar

```bash
npm install
npm run dev     # abre em http://localhost:5173/teatros/teatro-municipal-de-sao-paulo
npm test        # fase-1 e fase-2 verdes; fase-3..9 vermelhos
npm run build   # deve compilar sem erro de TypeScript
```
