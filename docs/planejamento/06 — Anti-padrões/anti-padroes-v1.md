# Anti-padrões — versão 1

## 1. Objetivo

Este documento ajuda a identificar decisões automáticas, genéricas ou incoerentes durante o design e a implementação com IA.

Ele não é uma lista rígida de elementos proibidos. Recursos associados ao chamado “visual de IA” podem ser usados quando fizerem parte das referências, tiverem função clara e forem adaptados à identidade do projeto.

### Princípio central

> Evitar o automático, não o recurso.

Um gradiente, uma borda arredondada, um efeito de blur ou uma animação de entrada não tornam um site genérico isoladamente. O problema aparece quando essas escolhas são aplicadas por padrão, acumuladas sem intenção e desconectadas do conteúdo.

## 2. Hierarquia de decisão

Quando uma regra deste documento entrar em conflito com uma solução visual, a decisão seguirá esta ordem:

1. Clareza, acessibilidade e função.
2. Direção criativa aprovada.
3. Princípios extraídos das referências.
4. Conteúdo e materiais próprios de Lucas.
5. Consistência com a linguagem visual e de movimento.
6. Lista geral de sinais associados a interfaces geradas por IA.

As referências não autorizam cópia literal. Elas orientam ritmo, comportamento, composição e intenção.

## 3. Sinais visuais genéricos

Observar com atenção:

- Hero sempre centralizado com título, descrição e dois botões.
- Sequência automática de três cards para qualquer conteúdo.
- Todas as superfícies com borda, sombra e grande arredondamento.
- Glassmorphism ou blur aplicado por reflexo.
- Gradiente roxo-azul usado como atalho para “tecnologia”.
- Paleta padrão de frameworks mantida sem adaptação.
- Uma única fonte neutra escolhida sem testes.
- Ícones genéricos usados como decoração.
- Imagens de banco ou abstrações artificiais sem relação com Lucas.
- Espaçamento perfeitamente uniforme, sem ritmo ou hierarquia.
- Mesmo tratamento visual para todas as seções.
- Mesmo `fade-in-up` aplicado a todos os elementos.

Esses elementos podem existir individualmente quando forem coerentes com as referências. O alerta está na repetição previsível e na ausência de uma razão específica.

## 4. Riscos específicos da nossa direção

O estilo experimental também pode se tornar artificial ou pouco funcional.

Evitar:

- Aplicar textura pesada como filtro global.
- Transformar toda imagem em halftone da mesma maneira.
- Usar metadados pequenos apenas como decoração.
- Fazer todos os elementos se moverem simultaneamente.
- Criar um scroll artificialmente lento.
- Esconder conteúdo atrás de distorções.
- Usar WebGL quando uma solução mais leve produzir o mesmo resultado.
- Fazer o cursor personalizado competir com ações comuns.
- Deixar a estética de arquivo virar interface hacker ou terminal.
- Misturar tantas referências que nenhuma decisão pareça própria.
- Reproduzir páginas, transições ou composições inteiras do Raw Cereal ou de outra referência.

## 5. Regra de intensidade

A IA tende a distribuir tudo em intensidade média. O portfólio trabalhará com contraste deliberado:

- Hero, Selected Work e Lab podem ser intensos.
- Serviços, processo e textos longos devem ser mais estáveis.
- Uma seção terá um movimento principal e no máximo dois secundários.
- Áreas de leitura receberão menos textura e interferência.
- O conteúdo decide a força do efeito, não o contrário.

## 6. Uso das referências

Antes de criar uma seção, registrar:

- Qual é a função da seção.
- Qual referência contribui para ela.
- Qual princípio será absorvido.
- O que será alterado para se tornar próprio.
- Qual decisão autoral não veio diretamente de nenhuma referência.

Exemplo:

```text
Seção: Selected Work
Referência: Raw Cereal
Princípio: projetos apresentados como capítulos de grande escala
Adaptação: paleta quente, materialidade impressa e conteúdo de Lucas
Decisão própria: revelação por definição entre retícula e interface limpa
```

Cada referência fornece princípios específicos; nenhuma fornece uma página pronta.

## 7. Escrita e posicionamento

Evitar frases que poderiam pertencer a qualquer profissional:

- “Apaixonado por tecnologia.”
- “Transformando ideias em experiências digitais.”
- “Onde criatividade encontra inovação.”
- “Soluções modernas, impactantes e eficientes.”
- “Eleve sua presença digital.”
- “Experiências únicas e memoráveis.”

Também observar:

- Adjetivos sem evidência.
- Estruturas sempre simétricas.
- Grupos de três usados mecanicamente.
- Excesso de títulos, listas e resumos.
- Frases excessivamente polidas e sem opinião.
- Vocabulário distante da maneira real de Lucas se comunicar.
- Chamadas vagas como “Saiba mais” quando existe uma ação mais específica.

### Direção de escrita

- Dizer primeiro o que Lucas faz.
- Preferir verbos e exemplos concretos.
- Usar primeira pessoa quando ela trouxer autoria.
- Preservar variação de ritmo e escolhas pessoais.
- Manter profissionalismo sem construir uma voz corporativa fictícia.
- Revisar o português e o inglês separadamente, sem tradução literal automática.

## 8. Credibilidade dos projetos

Evitar:

- Apresentar projeto conceitual como contratação real.
- Inventar resultados, números ou depoimentos.
- Sugerir uso comercial quando ele não aconteceu.
- Criar clientes fictícios sem indicar o caráter do exercício.
- Mostrar apenas telas sem explicar contexto e participação.
- Prometer capacidades que o projeto não demonstra.

Classificações possíveis:

- Projeto real.
- Conceito independente.
- Estudo acadêmico.
- Experimento técnico.
- Em desenvolvimento.

A classificação deve ser clara, mas não precisa dominar visualmente a apresentação.

## 9. Implementação com IA

Evitar:

- Pedir o site inteiro em um único prompt.
- Usar somente adjetivos como “moderno”, “criativo” e “profissional”.
- Aceitar a primeira composição funcional.
- Permitir que a IA escolha silenciosamente fontes, cores ou bibliotecas.
- Adicionar dependências para efeitos pequenos sem justificar.
- Construir desktop e improvisar mobile no final.
- Repetir componentes apenas porque já foram gerados.
- Declarar uma seção concluída sem renderização e inspeção visual.
- Corrigir um problema local redesenhando todo o sistema.
- Documentar apenas o código, sem registrar a intenção visual.

### Processo obrigatório

1. Definir função e conteúdo da seção.
2. Selecionar princípios das referências.
3. Determinar uma decisão autoral própria.
4. Criar uma composição ou protótipo pequeno.
5. Implementar uma seção ou interação por vez.
6. Comparar desktop e mobile no navegador.
7. Auditar clareza, identidade, movimento, desempenho e acessibilidade.
8. Remover decisões que não possuam função ou origem consciente.

## 10. Auditoria de cada entrega

Perguntas obrigatórias:

- Esta solução parece pertencer especificamente a Lucas?
- Consigo explicar a função de cada efeito?
- Qual referência influenciou a decisão e como ela foi transformada?
- Existe alguma escolha que entrou apenas porque a IA costuma fazê-la?
- A seção continua clara sem animação?
- O conteúdo é verdadeiro e específico?
- Mobile possui composição própria?
- Existe contraste real de intensidade em relação às seções vizinhas?
- Algo foi adicionado apenas para parecer sofisticado?
- A experiência continua rápida e utilizável?

## 11. Fontes consultadas

- Avoid AI Design: https://github.com/funboy322/avoid-ai-design
- No Slop UI: https://github.com/LeoStehlik/no-slop-ui
- SuperDesign Prompts: https://github.com/superdesigndev/superdesign-prompts
- Avoid AI Writing: https://github.com/conorbronsdon/avoid-ai-writing
- Discussão no r/nocode: https://www.reddit.com/r/nocode/comments/1txeeg2/how_do_you_stop_aibuilt_websites_from_looking/
- Discussão no r/LocalLLM: https://www.reddit.com/r/LocalLLM/comments/1rr0fb1/all_ai_websites_and_designs_look_the_same_has/
- Figma, How to use AI to create a website: https://www.figma.com/resource-library/how-to-use-ai-to-create-a-website/

As fontes comunitárias representam experiências e opiniões, não regras universais. Foram usadas para reconhecer padrões recorrentes e compará-los com as necessidades específicas deste projeto.

## 12. Decisão aprovada

- A lista de anti-padrões será contextual, não absoluta.
- Referências, conteúdo e intenção autoral prevalecem sobre proibições genéricas.
- Elementos associados ao “visual de IA” continuam permitidos quando possuírem função clara.
- O foco será eliminar decisões automáticas e combinações previsíveis.
- O experimentalismo será preservado, mas passará por critérios de clareza, desempenho e coerência.

## 13. Resumo

> Não queremos esconder o uso de IA. Queremos garantir que ela execute uma direção criada para Lucas, em vez de decidir automaticamente como o portfólio deve parecer.
