# Quickstart: validando o repositório de fases

Este guia valida que o entregável funciona de ponta a ponta, fase a fase.
Para detalhes de dados e API, ver `data-model.md` e `contracts/api-mock.md`;
para as rotas, ver `contracts/rotas-ui.md`.

## Pré-requisitos

- Node.js LTS instalado
- Repositório clonado com as 10 pastas `fase-0` .. `fase-9` presentes

## Validar uma fase individualmente

Em qualquer `fase-N`:

```bash
cd fase-N
npm install
npm run dev     # abre a tela inicial em http://localhost:5173 (ou porta livre)
```

Em outro terminal, ainda dentro de `fase-N`:

```bash
npm test         # roda toda a suíte fase-1..fase-9
npm run build    # confirma que compila sem erro de TypeScript
```

**Resultado esperado do `npm test`** (critério de corretude, Principle II /
SC-006):

| Pasta | Testes que DEVEM passar | Testes que DEVEM falhar |
|---|---|---|
| fase-0 | nenhum | fase-1 .. fase-9 |
| fase-1 | fase-1 | fase-2 .. fase-9 |
| fase-2 | fase-1, fase-2 | fase-3 .. fase-9 |
| ... | ... | ... |
| fase-9 | fase-1 .. fase-9 | nenhum |

Se o resultado real não bater com esta tabela para a pasta em questão, a
fase não está pronta — não declare a tarefa concluída sem essa confirmação.

## Validar as rotas (a partir da fase-0, FR-022/FR-023/FR-024/FR-025)

Em qualquer `fase-N` (0 em diante), com `npm run dev` rodando:

1. Abrir `http://localhost:5173/` — a tela inicial deve aparecer (a partir
   da fase-1: hero "Reserve seu assento" + seções fake de Prova Social e
   Selos de Confiança; na fase-0 é só um placeholder).
2. Abrir `http://localhost:5173/teatros` — a listagem de teatros deve
   aparecer (a partir da fase-1: um cartão por teatro, com título,
   descrição e nota).
3. Abrir `http://localhost:5173/teatros/teatro-municipal-de-sao-paulo` — a
   página do teatro deve aparecer (mapa real a partir da fase-2).

Isso já deve responder desde a `fase-0` (mesmo que só com placeholders),
mesmo antes de qualquer aula sobre rotas — ver `contracts/rotas-ui.md`.

## Validar a jornada completa (fase-9)

Com `fase-9` rodando (`npm run dev`):

1. Abrir `/` — ver a tela inicial; ir até `/teatros` pelo menu e ver a
   listagem de teatros (US1).
2. Clicar num teatro da listagem — o mapa do teatro deve aparecer com
   palco, setores e poltronas em posições reconhecíveis (US2).
3. Selecionar 2–3 poltronas disponíveis; confirmar que poltronas
   ocupadas/bloqueadas/quebradas/de fileira reservada/de setor embargado não
   respondem ao clique (US3, US4).
4. Trocar de teatro no seletor e confirmar que o layout muda (US5).
5. Aguardar ~5s sem interagir e observar alguma poltrona mudar de status
   sozinha na tela (US6).
6. Clicar em "Comprar" — a modal do carrinho deve abrir com os itens e o
   total corretos, e um contador regressivo visível (US7, US8).
7. Deixar o prazo expirar (ou avançar o relógio, se estiver testando) e
   confirmar que os assentos voltam a ficar disponíveis (US8).
8. Repetir a seleção e a compra, navegar até `/checkout`, preencher o
   formulário com um campo inválido (ex.: e-mail malformado) e confirmar que
   aparece um erro específico naquele campo (US9).
9. Corrigir o campo e enviar — confirmar redirecionamento para `/sucesso`
   com o resumo do pedido (US9).

## Validar a documentação

```bash
ls docs/adr        # deve conter 9 arquivos, um por tecnologia da stack
ls docs/playbooks   # idem
ls fase-*/PASSO-A-PASSO.md   # deve existir em fase-1 .. fase-9
ls fase-*/README.md          # deve existir em fase-0 .. fase-9
```

## Validar o diff mínimo entre fases (Principle I)

```bash
diff -rq fase-3 fase-4 --exclude=node_modules --exclude=dist
```

A saída deve conter apenas os arquivos que a tabela de fases do
`prompt.md`/`plan.md` descreve como alterados/adicionados naquela transição
— qualquer arquivo fora dessa lista indica divergência não intencional.
