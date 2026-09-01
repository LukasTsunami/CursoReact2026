# Playbook: Vite neste projeto

Este guia mostra como usar o Vite no dia a dia deste curso. Para o "porquê"
da escolha, veja `docs/adr/0001-vite.md`.

## Comandos comuns

Todos rodam de dentro da pasta da fase (ex.: `fase-0/`, `fase-3/`):

```bash
npm install       # instala as dependências daquela fase
npm run dev       # sobe o dev server com HMR em http://localhost:5173
npm run build     # tsc -b (checa tipos) + vite build (gera dist/)
npm run preview   # serve o resultado de `npm run build` localmente
```

Repare que `build` primeiro roda `tsc -b` e só depois `vite build`. Isso
significa que erros de TypeScript quebram o build mesmo que o Vite
conseguisse gerar o bundle sem eles — é proposital, é a checagem de tipos
funcionando como guarda-corpo.

## Convenções adotadas neste projeto

- **`index.html` na raiz da fase**, não dentro de `public/`. É o Vite quem
  processa esse HTML e injeta o script de entrada (`src/main.tsx`).
- **`public/`** é só para arquivos estáticos que devem ser copiados
  literalmente para o build (ex.: favicon), sem passar pelo bundler.
  Imagens usadas por componentes (como `src/assets/hero.png`) ficam em
  `src/assets/`, não em `public/`, para serem processadas/otimizadas pelo
  Vite.
- **Variáveis de ambiente** usam o prefixo `VITE_` e são acessadas via
  `import.meta.env.VITE_ALGUMA_COISA` — é assim que este projeto liga e
  desliga o MSW conforme o ambiente (ver `src/mocks/`).
- **`vite.config.ts`** deste projeto só tem o plugin `@vitejs/plugin-react`
  habilitado. Não adicione plugins novos sem necessidade real — o objetivo
  do curso é manter a configuração mínima e legível.

## Erros comuns e como resolver

- **"Cannot find module" em um import de imagem/CSS**: confira se o
  arquivo está em `src/`, não em `public/`. Imports (`import img from
  './hero.png'`) só funcionam para arquivos dentro de `src/`.
- **Variável de ambiente `undefined` em runtime**: o nome não começa com
  `VITE_`. Por segurança, o Vite só expõe ao código do navegador variáveis
  com esse prefixo — qualquer outra fica de fora do bundle.
- **Porta 5173 "já em uso"**: geralmente é outra fase do curso com o
  `npm run dev` ainda rodando em outro terminal. Feche o processo anterior
  ou deixe o Vite escolher a próxima porta livre automaticamente (ele
  sugere isso no próprio terminal).
- **HMR "trava" e não atualiza a tela**: em componentes que misturam
  exports de componente com exports de função utilitária no mesmo
  arquivo, o Fast Refresh do React pode falhar silenciosamente. Prefira um
  arquivo por componente, como já é o padrão em `src/componentes/` e
  `src/paginas/`.
- **`npm run build` falha mas `npm run dev` funcionava normalmente**: quase
  sempre é um erro de tipo que o `tsc -b` do passo de build pegou e o dev
  server (que não checa tipos, só transpila) deixou passar. Rode `tsc -b`
  isoladamente para ver a mensagem completa.
