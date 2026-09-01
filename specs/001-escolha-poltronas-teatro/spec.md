# Feature Specification: Escolha de Poltronas de Teatro

**Feature Branch**: `001-escolha-poltronas-teatro`

**Created**: 2026-08-31

**Status**: Draft

**Input**: User description: "Repositório didático de um curso hands-on de React de 5 aulas: uma tela de escolha de poltronas de teatro (clone raso de Ticketmaster/Ingresso.com para teatros), entregue como 10 pastas independentes (fase-0 a fase-9), cada uma o projeto COMPLETO daquela fase. Progressão: tela inicial + listagem de teatros → mapa estático → seleção → regras de negócio → dados via API mockada → tempo real → carrinho → reserva com prazo e navegação → checkout completo. Cada fase tem suíte de testes completa como critério de corretude. Documentação obrigatória: README, ADRs, playbooks, passo-a-passo por fase."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navegar da tela inicial até um teatro (Priority: P1)

Um visitante abre o site e vê uma tela inicial simples de divulgação ("reserve seu assento"), navega até uma listagem de teatros disponíveis (cada um com título, descrição e nota) e escolhe um teatro para prosseguir.

**Why this priority**: É a porta de entrada do produto e introduz, de forma mais leve, os conceitos de listagem e navegação entre páginas antes de o usuário chegar ao mapa de poltronas (mais denso). Sem ela, não há como um visitante real chegar à tela de seleção a partir do zero.

**Independent Test**: Pode ser testado abrindo a tela inicial, navegando pelo menu até a listagem de teatros, e clicando em um teatro da lista — entrega valor de navegação mesmo sem nenhuma poltrona ainda ser exibida.

**Acceptance Scenarios**:

1. **Given** o visitante abre o site, **When** a tela inicial carrega, **Then** uma chamada principal convidando a reservar um assento é exibida, junto de seções de prova social e de selos de confiança.
2. **Given** a tela inicial carregada, **When** o visitante rola a página, **Then** uma grade visual mostra tipos de espetáculo (ópera, teatro, dança, apresentação musical) sobre um fundo com imagens de teatro e ópera.
3. **Given** a tela inicial aberta, **When** o visitante aciona o item de menu para a listagem de teatros, **Then** ele é levado a uma tela com um cartão por teatro disponível, cada um exibindo título, descrição e nota.
4. **Given** a listagem de teatros exibida, **When** o visitante clica em um teatro específico, **Then** ele é levado à tela daquele teatro.

---

### User Story 2 - Visualizar o mapa do teatro (Priority: P1)

Um visitante chega à tela de um teatro específico e vê o teatro inteiro desenhado: palco, setores, fileiras e poltronas posicionados de forma reconhecível como um teatro de verdade.

**Why this priority**: Sem um mapa visualmente compreensível, nenhuma outra interação (seleção, compra) faz sentido. É a base de tudo que vem depois na jornada de compra.

**Independent Test**: Pode ser testado abrindo a tela de um teatro com um layout carregado e verificando que palco, setores, fileiras e poltronas aparecem nas posições esperadas — entrega valor mesmo sem nenhuma interação.

**Acceptance Scenarios**:

1. **Given** um layout de teatro com setores, fileiras e poltronas definidos, **When** a tela é aberta, **Then** o palco e todos os setores/fileiras/poltronas são desenhados nas posições e formato configurados.
2. **Given** um layout com poltronas de diferentes status (disponível, ocupada, bloqueada, quebrada, acessível), **When** o mapa é renderizado, **Then** cada poltrona exibe uma aparência visual distinta correspondente ao seu status.

---

### User Story 3 - Selecionar poltronas disponíveis (Priority: P1)

Um usuário clica em uma ou mais poltronas disponíveis para marcá-las como candidatas à compra, podendo desmarcar a escolha antes de finalizar.

**Why this priority**: É a interação central da tela — sem seleção não há como avançar para compra. Entrega valor de forma isolada mesmo sem regras de negócio avançadas ainda.

**Independent Test**: Pode ser testado clicando em poltronas disponíveis e verificando que ficam marcadas/destacadas, e que clicar novamente desmarca — sem depender de carrinho ou checkout.

**Acceptance Scenarios**:

1. **Given** uma poltrona disponível, **When** o usuário clica nela, **Then** ela fica marcada como selecionada e visualmente destacada.
2. **Given** uma poltrona já selecionada, **When** o usuário clica nela novamente, **Then** ela é desmarcada.
3. **Given** nenhuma poltrona selecionada, **When** o usuário abre a tela, **Then** a contagem de poltronas selecionadas é zero.
4. **Given** uma poltrona disponível, **When** o usuário clica para selecioná-la, **Then** o número, o preço e os detalhes (acessibilidade, status) daquela poltrona são exibidos ao usuário.

---

### User Story 4 - Respeitar regras de disponibilidade e acesso (Priority: P1)

O sistema impede a seleção de poltronas indisponíveis ou em áreas restritas, sinaliza poltronas de acessibilidade e comunica o tipo de acesso de cada setor.

**Why this priority**: São as regras de negócio que tornam a simulação de compra de ingressos realista e correta; sem elas o usuário poderia "comprar" algo impossível.

**Independent Test**: Pode ser testado tentando selecionar poltronas ocupadas, bloqueadas, quebradas, ou pertencentes a fileiras/setores reservados/embargados, e confirmando que nenhuma seleção ocorre; poltronas de acessibilidade continuam selecionáveis quando disponíveis.

**Acceptance Scenarios**:

1. **Given** uma poltrona ocupada, bloqueada ou quebrada, **When** o usuário clica nela, **Then** nenhuma seleção é registrada.
2. **Given** uma fileira marcada como reservada ou em manutenção, **When** o usuário tenta selecionar qualquer poltrona dessa fileira, **Then** a seleção é recusada.
3. **Given** um setor embargado, **When** o usuário tenta selecionar qualquer poltrona desse setor ou de suas fileiras, **Then** a seleção é recusada em toda a área.
4. **Given** uma poltrona de acessibilidade disponível, **When** o usuário clica nela, **Then** ela é selecionada normalmente e mantém sua marcação visual própria.
5. **Given** um setor com tipo de acesso livre, pagante ou exclusivo, **When** o mapa é exibido, **Then** o tipo de acesso do setor é visível ao usuário.

---

### User Story 5 - Carregar dados dinamicamente e trocar de teatro (Priority: P2)

O usuário vê o teatro sendo carregado a partir de uma fonte de dados externa, com indicação de carregamento e de erro, e pode escolher entre diferentes teatros com layouts distintos.

**Why this priority**: Torna a aplicação orientada a dados reais (não fixos no código), habilitando múltiplos cenários de teatro — mas o valor central de seleção já existe sem isso.

**Independent Test**: Pode ser testado observando o estado de carregamento ao abrir a tela, o estado de erro quando a busca falha, e a troca de teatro exibindo um layout diferente.

**Acceptance Scenarios**:

1. **Given** a tela é aberta, **When** os dados do teatro ainda não chegaram, **Then** um indicador de carregamento é exibido.
2. **Given** a busca de dados falha, **When** isso ocorre, **Then** uma mensagem de erro compreensível é exibida no lugar do mapa.
3. **Given** múltiplos teatros disponíveis, **When** o usuário escolhe um teatro diferente, **Then** o mapa é atualizado para refletir o novo layout (formato, setores, fileiras).

---

### User Story 6 - Ser avisado em tempo real sobre mudanças de disponibilidade (Priority: P2)

Enquanto o usuário decide quais poltronas escolher, poltronas reservadas por outros compradores ficam indisponíveis automaticamente na tela, sem que o usuário precise recarregar a página.

**Why this priority**: Simula concorrência real de compra de ingressos, evitando que o usuário tente comprar algo que já foi vendido — mas não é pré-requisito para a jornada básica de seleção e compra.

**Independent Test**: Pode ser testado observando que, após um intervalo, poltronas antes disponíveis passam a aparecer como ocupadas/bloqueadas sem ação do usuário, e que uma poltrona selecionada que se torna indisponível é tratada adequadamente (deixa de contar como selecionada).

**Acceptance Scenarios**:

1. **Given** a tela aberta e aguardando, **When** o tempo de atualização automática se passa, **Then** o status de disponibilidade das poltronas é atualizado na tela sem recarregar a página.
2. **Given** uma poltrona selecionada pelo usuário, **When** ela se torna indisponível por ação simulada de outro comprador antes da compra, **Then** ela deixa de estar selecionada e o usuário é informado visualmente.

---

### User Story 7 - Adicionar poltronas ao carrinho e ver resumo (Priority: P1)

O usuário, após selecionar poltronas, aciona a compra e vê um resumo do carrinho com os itens escolhidos e o valor total.

**Why this priority**: É o passo que transforma "seleção" em "intenção de compra" — junto com a seleção, forma o núcleo mínimo de valor da aplicação.

**Independent Test**: Pode ser testado selecionando poltronas, acionando "comprar", e verificando que o resumo do carrinho exibe os itens corretos e o total calculado.

**Acceptance Scenarios**:

1. **Given** uma ou mais poltronas selecionadas, **When** o usuário aciona a compra, **Then** um resumo do carrinho é exibido com as poltronas escolhidas e o valor total.
2. **Given** o carrinho aberto, **When** o usuário consulta o total, **Then** o valor exibido corresponde à soma dos preços das poltronas do carrinho, com eventuais ajustes aplicados.

---

### User Story 8 - Reserva com prazo e navegação entre páginas (Priority: P2)

As poltronas adicionadas ao carrinho ficam reservadas temporariamente com uma contagem regressiva visível; se o prazo expira, as poltronas são liberadas automaticamente. O usuário pode navegar entre a tela do teatro, o checkout e a confirmação sem perder o conteúdo do carrinho.

**Why this priority**: Adiciona realismo e urgência à reserva, e viabiliza um fluxo de múltiplas telas — mas a compra em si (US7) já entrega valor sem isso.

**Independent Test**: Pode ser testado adicionando itens ao carrinho, observando a contagem regressiva, deixando o prazo expirar e confirmando que as poltronas voltam a ficar disponíveis; e navegando entre páginas verificando que o carrinho permanece com os mesmos itens.

**Acceptance Scenarios**:

1. **Given** poltronas reservadas no carrinho, **When** o usuário observa a reserva, **Then** uma contagem regressiva do prazo é exibida.
2. **Given** o prazo de reserva expira sem finalização da compra, **When** isso ocorre, **Then** as poltronas voltam a ficar disponíveis para outros usuários.
3. **Given** um carrinho com itens, **When** o usuário navega da tela do teatro para o checkout, **Then** os itens do carrinho continuam presentes.

---

### User Story 9 - Concluir a compra (checkout) (Priority: P1)

O usuário preenche seus dados pessoais, endereço e forma de pagamento, recebe validação de erros por campo, confirma o pedido e vê uma tela de sucesso com o resumo da compra.

**Why this priority**: É o fechamento do fluxo de valor completo do produto — sem checkout, a "compra" nunca se concretiza.

**Independent Test**: Pode ser testado preenchendo o formulário de checkout com dados válidos e inválidos, verificando mensagens de erro por campo, e confirmando que a submissão válida leva a uma tela de sucesso com o resumo do pedido.

**Acceptance Scenarios**:

1. **Given** o formulário de checkout com um campo inválido ou vazio, **When** o usuário tenta enviar, **Then** uma mensagem de erro específica aparece junto ao campo e o envio é bloqueado.
2. **Given** todos os campos do formulário preenchidos corretamente, **When** o usuário confirma o pedido, **Then** o pedido é registrado e o usuário é levado a uma tela de sucesso com o resumo dos itens comprados.

---

### Edge Cases

- O que acontece quando uma poltrona selecionada pelo usuário se torna indisponível (via atualização em tempo real) antes de ele finalizar a compra?
- O que acontece quando o prazo de reserva expira enquanto o resumo do carrinho está aberto na tela?
- O que acontece quando todas as poltronas de um setor ou fileira estão indisponíveis (ocupadas/bloqueadas)?
- O que acontece quando o envio do checkout falha (erro de rede ou do serviço de pedidos)?
- O que acontece quando o usuário tenta acessar diretamente a tela de checkout sem nenhum item no carrinho?
- O que acontece quando o usuário tenta selecionar uma poltrona de uma fileira ou setor restrito (reservado/embargado) por qualquer meio de interação disponível?
- O que acontece quando um teatro da listagem ainda não tem seu mapa de poltronas completo (ex.: antes de a fase que preenche aquele layout específico existir)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE renderizar visualmente um mapa de teatro reconhecível (palco, setores, fileiras, poltronas) a partir dos dados de layout fornecidos.
- **FR-002**: Usuários DEVEM poder selecionar e desmarcar poltronas disponíveis clicando nelas.
- **FR-003**: O sistema DEVE impedir a seleção de poltronas ocupadas, bloqueadas ou quebradas.
- **FR-004**: O sistema DEVE impedir a seleção de qualquer poltrona pertencente a uma fileira reservada ou em manutenção, ou a um setor embargado, incluindo tudo hierarquicamente abaixo dessa restrição.
- **FR-005**: O sistema DEVE marcar visualmente poltronas de acessibilidade, mantendo-as selecionáveis quando disponíveis.
- **FR-006**: O sistema DEVE comunicar ao usuário o tipo de acesso (livre, pagante, exclusivo) de cada setor, representando cada tipo com uma cor distinta no mapa e explicando o significado de cada cor em uma legenda visível.
- **FR-007**: O sistema DEVE exibir um estado de carregamento enquanto os dados do teatro são obtidos, e um estado de erro compreensível caso a obtenção falhe.
- **FR-008**: Usuários DEVEM poder escolher entre múltiplos teatros com layouts diferentes.
- **FR-009**: O sistema DEVE atualizar automaticamente a disponibilidade das poltronas em intervalos regulares, sem exigir recarregamento da página.
- **FR-010**: O sistema DEVE remover da seleção do usuário qualquer poltrona que se torne indisponível antes da confirmação da compra, informando o usuário dessa mudança.
- **FR-011**: Usuários DEVEM poder adicionar as poltronas selecionadas a um carrinho e visualizar um resumo com os itens e o valor total.
- **FR-012**: O sistema DEVE reservar temporariamente as poltronas adicionadas ao carrinho por um prazo determinado, exibindo uma contagem regressiva visível.
- **FR-013**: O sistema DEVE liberar automaticamente as poltronas reservadas quando o prazo de reserva expira.
- **FR-014**: Usuários DEVEM poder navegar entre a tela de seleção, o checkout e a confirmação sem perder o conteúdo do carrinho.
- **FR-015**: Usuários DEVEM poder preencher dados pessoais, endereço e forma de pagamento no checkout, recebendo mensagens de erro específicas por campo antes da submissão.
- **FR-016**: O sistema DEVE confirmar o pedido e exibir um resumo da compra ao usuário após a submissão bem-sucedida do checkout.
- **FR-017**: O preço final de cada poltrona no carrinho DEVE partir do preço base do assento/setor, permitindo ajustes aplicados no carrinho. O único ajuste em escopo é a meia-entrada: o usuário pode marcar um item do carrinho como meia-entrada (autodeclarado, sem captura de documento — a comprovação é responsabilidade do comprador na entrada do teatro), reduzindo o valor daquele item pela metade no total.
- **FR-018**: O repositório entregue DEVE ser organizado em 10 incrementos independentes e executáveis (fase-0 a fase-9), cada um instalável e testável isoladamente.
- **FR-019**: Cada incremento DEVE conter uma suíte de testes automatizados que verifica exatamente as regras de negócio e capacidades disponíveis até aquele incremento (nem mais, nem menos).
- **FR-020**: O repositório DEVE incluir um registro de decisão (ADR) e um guia de configuração (playbook) por tecnologia adotada, além de um guia passo a passo por incremento, todos escritos para leitores iniciantes.
- **FR-021**: Ao selecionar uma poltrona (clique), o sistema DEVE exibir ao usuário o número, o preço e os detalhes (acessibilidade, status) daquela poltrona, antes da confirmação da compra.
- **FR-022**: A tela de um teatro específico DEVE estar organizada como uma página com layout completo (cabeçalho e rodapé) envolvendo o mapa do teatro, e DEVE ser acessível por uma URL própria daquele teatro (ex.: `/teatros/teatro-municipal-de-sao-paulo`), desde o primeiro incremento entregue — mesmo antes de a navegação entre múltiplas páginas (US8) ser construída como funcionalidade visível ao usuário.
- **FR-023**: A URL raiz do site DEVE exibir uma tela inicial de divulgação (não a tela de um teatro), com uma chamada principal convidando o visitante a reservar um assento, e ao menos duas seções de conteúdo ilustrativo: prova social e selos de confiança.
- **FR-024**: O sistema DEVE exibir um item de menu, acessível a partir de qualquer página, que leve à listagem de teatros.
- **FR-025**: A listagem de teatros DEVE exibir um cartão por teatro disponível, cada um com título, descrição e nota, e cada cartão DEVE levar à página daquele teatro específico ao ser clicado.
- **FR-026**: A nota exibida para cada teatro na listagem é um valor ilustrativo fixo (não calculado a partir de avaliações reais de usuários).
- **FR-027**: A tela inicial DEVE usar imagens de teatro e de ópera como plano de fundo, e DEVE exibir uma grade visual (estilo "bento grid") ilustrando os tipos de espetáculo que acontecem nos teatros, cobrindo ao menos: ópera, teatro (peça com atuação), dança, e uma apresentação musical — as imagens são ilustrativas/decorativas, sem link para conteúdo dinâmico.

### Key Entities

- **Teatro**: representa o espaço físico completo, com identificação, nome, descrição, nota ilustrativa, formato visual e o conjunto de setores que o compõem. Também é a entidade exibida de forma resumida (título, descrição, nota) nos cartões da listagem de teatros.
- **Setor**: agrupamento de fileiras dentro do teatro; carrega se está embargado (bloqueado para obras) e qual seu tipo de acesso (livre/pagante/exclusivo).
- **Fileira**: agrupamento de poltronas dentro de um setor; pode estar reservada para convidados especiais ou em manutenção.
- **Poltrona (Assento)**: unidade selecionável de um teatro, com preço base, indicação de acessibilidade, status de disponibilidade e posição visual.
- **Carrinho/Reserva**: conjunto de poltronas escolhidas pelo usuário para compra, com prazo de reserva e valor total.
- **Pedido**: registro criado ao final do checkout, associando os itens do carrinho aos dados pessoais, de endereço e de pagamento do comprador.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Um novo visitante consegue identificar o palco e distinguir pelo menos dois setores diferentes em até 5 segundos após o mapa carregar.
- **SC-002**: Um usuário consegue selecionar 3 poltronas disponíveis e chegar ao resumo do carrinho em menos de 30 segundos, partindo da tela inicial.
- **SC-003**: 100% das tentativas de seleção de poltronas indisponíveis (ocupadas, bloqueadas, quebradas, em fileira reservada ou setor embargado) são recusadas — nenhuma resulta em seleção.
- **SC-004**: Quando outro comprador simulado reserva uma poltrona, a mudança aparece na tela do usuário em até 5 segundos, sem nenhuma ação manual dele.
- **SC-005**: Um usuário consegue concluir a compra, do carrinho até a confirmação, em menos de 3 minutos.
- **SC-006**: Para cada um dos 10 incrementos entregues, a execução da sua suíte de testes produz exatamente a divisão esperada de aprovados/reprovados (somente as regras disponíveis até aquele incremento passam).
- **SC-007**: Uma pessoa sem contato prévio com um incremento consegue instalar e rodar aquela pasta (servidor de desenvolvimento e testes) usando apenas os comandos documentados no guia daquele incremento, sem ajuda externa.
- **SC-008**: Um novo visitante consegue ir da tela inicial até a página de um teatro específico (passando pela listagem) em até 15 segundos.

## Assumptions

- O pagamento no checkout é simulado (não há integração com gateway de pagamento real); a submissão é tratada por um serviço mockado.
- Não há autenticação/login de usuário — qualquer visitante pode navegar, selecionar poltronas e finalizar a compra.
- Existe uma única moeda e o único ajuste de preço no carrinho é a meia-entrada (autodeclarada pelo usuário, sem captura de CPF/documento — a comprovação é cobrada fisicamente na entrada do teatro, fora do escopo do sistema), sem negociação de preço por poltrona.
- O comportamento de "outros compradores" reservando poltronas em tempo real é simulado de forma determinística apenas para fins de teste automatizado; em uso normal (fora dos testes) pode ser aleatório.
- O público-alvo do próprio repositório são estudantes de um curso de React de 5 aulas; cada um dos 10 incrementos corresponde a um ponto de checkpoint dentro dessas aulas.
- O conteúdo da tela inicial (prova social, selos de confiança) e a nota de cada teatro na listagem são ilustrativos/fictícios, criados para fins didáticos — não representam avaliações ou depoimentos reais.
- Nem todo teatro listado precisa ter seu mapa de poltronas completo desde o primeiro incremento em que aparece na listagem; setores/fileiras/poltronas de um teatro específico são preenchidos na fase que introduz aquele layout.
