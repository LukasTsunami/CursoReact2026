# Passo a passo: fase-2 → fase-3

Esta fase parte de uma cópia integral da `fase-2` e adiciona a seleção de
poltronas (US3 do spec). Ao final, `fase-1..3.test.tsx` ficam verdes;
`fase-4.test.tsx` até `fase-9.test.tsx` continuam vermelhos.

1. **Crie `DetalhesPoltrona.tsx`**: recebe `poltrona: PoltronaDetalhe`
   (`fileiraNome`, `numero`, `preco`, `status`, `acessibilidade`) e
   mostra um parágrafo no formato `"Poltrona {fileira}{numero} — R$
   {preco} — {status}[, acessível]"`.

2. **Atualize `Assento.tsx`**: adicione as props `selecionada: boolean` e
   `aoClicar: () => void`; o `<button>` ganha `onClick={aoClicar}`, e o
   `aria-label`/`className` passam a refletir `", selecionada"` /
   `"assento--selecionada"` quando `selecionada` é `true`.

3. **Atualize `Fileira.tsx` e `Setor.tsx`**: threadeiem as props
   `estaSelecionada` e `aoSelecionar` até o `Assento`, passando também
   `setorId`/`fileira.id`/`fileira.nome` como identificadores.

4. **Atualize `Teatro.tsx`**:
   - `useState<PoltronaSelecionada[]>([])` para `poltronasSelecionadas`
     (`{ setorId, fileiraId, numero }`).
   - `aoSelecionar` faz toggle: se já está selecionada, filtra ela fora;
     senão, adiciona ao array **com spread** (`[...poltronasSelecionadas,
     novaItem]` — o refactor com Immer é assunto da fase-4).
   - `useState<PoltronaDetalhe | null>(null)` para a última poltrona
     selecionada, atualizado sempre que uma nova seleção acontece.
   - Renderiza o contador `"Poltronas selecionadas: {n}"` (estado
     derivado, calculado no render) e o `DetalhesPoltrona` quando houver
     uma poltrona selecionada.

5. **Adicione o CSS** (`.assento--selecionada`, `.teatro__contador`,
   `.detalhes-poltrona`) em `src/index.css`.

6. **Rode `npm test`**: `fase-1.test.tsx` até `fase-3.test.tsx` devem
   ficar verdes; `fase-4.test.tsx` até `fase-9.test.tsx` continuam
   vermelhos (ainda não há guarda de seleção nem regras herdadas). Rode
   `npm run build` para confirmar que compila sem erro de TypeScript.

**Checkpoint**: a interação central da tela funciona — clicar seleciona e
desmarca, com destaque visual e detalhes da poltrona.
