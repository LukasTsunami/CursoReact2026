# Passo a passo: fase-3 → fase-4

Esta fase parte de uma cópia integral da `fase-3` e adiciona as regras de
disponibilidade e acesso (US4 do spec). Ao final, `fase-1..4.test.tsx`
ficam verdes; `fase-5.test.tsx` até `fase-9.test.tsx` continuam vermelhos.

1. **Atualize `Setor.tsx`**: monte `regrasDoSetor = { embargado:
   setor.embargado, tipoAcesso: setor.tipoAcesso }` e passe para cada
   `Fileira`.

2. **Atualize `Fileira.tsx`**: receba `regrasDoSetor` e monte
   `regrasHerdadas = { bloqueadaPelaHierarquia: regrasDoSetor.embargado ||
   fileira.reservada || fileira.emManutencao, tipoAcesso:
   regrasDoSetor.tipoAcesso }`, passando para cada `Assento`.

3. **Atualize `Assento.tsx`**: calcule `podeSelecionar = status ===
   "disponivel" && !regrasHerdadas.bloqueadaPelaHierarquia` e use
   `disabled={!podeSelecionar}` no `<button>` (um botão nativo desabilitado
   já não dispara `onClick`, então isso resolve a guarda de seleção sem
   lógica extra). Adicione classes por `tipoAcesso` herdado
   (`assento--acesso-{tipo}`) e por acessibilidade
   (`assento--acessivel`).

4. **Crie `Legenda.tsx`**: lista fixa dos 3 `TipoAcesso` (`livre`,
   `pagante`, `exclusivoBradesco`) com rótulo e cor — não depende dos
   dados do teatro atual, é sempre a mesma legenda (resolve FR-006).

5. **Atualize `Teatro.tsx`**:
   - Calcule `quantidade` e `total` (soma de `preco` das
     `poltronasSelecionadas`) como estado derivado no render.
   - Troque o spread/filter do toggle por `produce()` do Immer (ver
     `docs/adr/0004-immer.md` e `docs/playbooks/immer.md`).
   - Renderize `<Legenda />` e um novo parágrafo `"Total: R$ ..."` (o
     contador de poltronas selecionadas continua com o mesmo texto exato
     das fases anteriores, para não quebrar `fase-3.test.tsx`).

6. **Adicione o CSS** (`assento--acesso-*`, `assento--acessivel`,
   `assento:disabled`, `.legenda*`, `.teatro__total`).

7. **Escreva os ADR/playbook do Immer** em `docs/adr/0004-immer.md` e
   `docs/playbooks/immer.md`.

8. **Rode `npm test`**: `fase-1.test.tsx` até `fase-4.test.tsx` devem
   ficar verdes; `fase-5.test.tsx` até `fase-9.test.tsx` continuam
   vermelhos. Rode `npm run build` para confirmar que compila sem erro de
   TypeScript.

**Checkpoint**: todas as regras de negócio visuais da spec (FR-002..FR-006,
FR-017) estão cobertas.
