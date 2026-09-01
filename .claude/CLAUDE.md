## Spec-Driven Development
Este projeto usa Spec-Driven Development via GitHub Spec Kit. Ao trabalhar em uma nova feature, siga esta ordem, 

1. /speckit.specify
2. /speckit.clarify
3. /speckit.plan
4. /speckit.tasks
5. /speckit.analyze
6. /speckit.checklist

Depois de criar as tasks organize elas em waves.

Uma "wave" é um lote de tarefas que não têm dependência entre si — ou seja, podem ser feitas ao mesmo tempo
sem uma esperar o resultado da outra. O agente principal analisa o grafo de dependências das tasks geradas em
/speckit.tasks e agrupa em ondas sucessivas: a wave 1 contém tudo que pode começar já, a wave 2 contém o que
depende da wave 1 estar pronta, e assim por diante.
Para cada tarefa dentro de uma wave, o Claude decide qual dos três subagents chamar, seguindo o critério de custo
× complexidade descrito no description de cada arquivo. Antes de disparar qualquer execução, o agente apresenta
essa tabela de task → subagent para você aprovar, o que evita gastar capacidade de um modelo caro numa tarefa
trivial (ou o oposto: delegar algo crítico a um modelo simples demais).

## Criando os Subagents e Delegando por Wave
Em vez de só descrever em texto, dentro do CLAUDE.md , qual modelo usar para cada tipo de tarefa, o ideal é criar de fato
os subagents do Claude Code — arquivos reais na pasta .claude/agents/ , cada um já configurado com o modelo e o
nível de esforço (effort) certos. Assim, o CLAUDE.md só precisa dizer qual agent chamar, e o comportamento (modelo,
esforço, ferramentas permitidas) já vem embutido no próprio arquivo do agent


Cada subagent é um arquivo Markdown com um cabeçalho YAML (frontmatter). Crie três arquivos, um por nível de
complexidade:
.claude/agents/task-mecanica.md
.claude/agents/task-media.md
.claude/agents/task-critica.md


## GESTÃO DE KNOWN ISSUES — O PROTOCOLO
A pasta known-issues/ funciona como uma base de conhecimento de bugs já resolvidos no projeto. Antes de gastar
tempo investigando um problema do zero, o agente é instruído a primeiro checar se aquele sintoma já foi
documentado ali — se sim, aplica a correção já validada diretamente. Se o bug é novo, depois de resolvido ele deve
ser documentado num arquivo markdown com: o sintoma e como reproduzir, a causa raiz identificada, a correção
efetivamente aplicada e a data. Isso transforma cada bug resolvido numa entrada reutilizável, evitando que o
mesmo problema seja "redescoberto" e investigado do zero por qualquer instância futura do agente (ou por outro
desenvolvedor do time).
