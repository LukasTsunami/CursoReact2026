# Passo a passo: fase-1 → fase-2

Esta fase parte de uma cópia integral da `fase-1` e adiciona o mapa real
do teatro (US2 do spec). Ao final, `fase-1.test.tsx` e `fase-2.test.tsx`
ficam verdes; `fase-3.test.tsx` até `fase-9.test.tsx` continuam vermelhos.

1. **Adicione a foto de fundo** em `public/assets/
   teatro-municipal-de-sao-paulo.png` — como o caminho vem de dado JSON
   (`imagemUrl`), o arquivo precisa estar em `public/`, não em
   `src/assets/` (que só funciona com `import`).

2. **Crie `Assento.tsx`**: recebe `assento: Assento` e `nomeFileira:
   string`; renderiza um `<button>` com `style={{ left:
   `${coordinateX}%`, top: `${coordinateY}%`, width: `${largura}%`,
   height: `${altura}%`, transform: `translate(-50%, -50%)
   rotate(${rotacao}deg)` }}` — o botão fica centrado no ponto e cobre a
   poltrona da foto, inclusive a inclinação. O `aria-label` segue o
   formato `"Poltrona {fileira}{numero}, {status}[, acessível]"` (ex.:
   `"Poltrona A100, disponível, acessível"`).

3. **Crie `Fileira.tsx`**: recebe `fileira: Fileira` e renderiza um
   `Assento` por item de `fileira.assentos`, usando Fragment (`<>...</>`)
   e `key={assento.numero}`.

4. **Crie `Setor.tsx`**: recebe `setor: Setor` e renderiza uma `Fileira`
   por item de `setor.fileiras`, com `key={fileira.id}`.

5. **Crie `Teatro.tsx`**: recebe `layout: GlobalLayoutData`; contêiner
   `<div className="teatro">` com `position: relative`, contendo a
   `<img src={layout.imagemUrl} alt={`Mapa do teatro ${layout.nome}`}>` de
   fundo e um `Setor` por item de `layout.setores`.

6. **Atualize `PaginaTeatro.tsx`**: importe `layout-classico.json`
   (tipado como `GlobalLayoutData`) e renderize `<Teatro layout={...}>`
   dentro do `<main>`.

7. **Adicione o CSS** correspondente (`.teatro`, `.teatro__imagem`,
   `.assento`, `.assento--disponivel`, `.assento--ocupado` etc.) em
   `src/index.css`.

8. **Rode `npm test`**: `fase-1.test.tsx` e `fase-2.test.tsx` devem ficar
   verdes; `fase-3.test.tsx` até `fase-9.test.tsx` continuam vermelhos
   (ainda não há seleção). Rode `npm run build` para confirmar que
   compila sem erro de TypeScript.

**Checkpoint**: o teatro aparece completo e reconhecível (palco, setores,
fileiras, poltronas) na posição correta, mesmo sem nenhuma interação
ainda.
