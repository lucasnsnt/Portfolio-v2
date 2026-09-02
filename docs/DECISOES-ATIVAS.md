# Decisões ativas

## Produto

- Um site para clientes e recrutadores, com percursos diferentes dentro da mesma experiência.
- WhatsApp profissional como conversão principal.
- Landing pages como foco comercial inicial, sem limitar o catálogo de serviços.
- Português principal e opção em inglês.

## Identidade

- Conceito: arquivo digital em movimento.
- Intensidade experimental aproximada: 8/10.
- Base escura quente, creme, sépia, areia e bronze.
- Fotografia pessoal como parte da autoria.
- Textura, retícula, desfoque e código como matéria visual.
- Evitar estética corporativa, hacker, gamer, genérica ou luxuosa.

## Estrutura

```text
Hero
→ Selected Work
→ Serviços
→ Projeto em profundidade
→ Lab
→ Sobre
→ Processo
→ Contato
```

- A execução real começa na homepage; a antiga tela de fundação foi encerrada.
- A abertura conduz posicionamento e oferta para a seção inicial de serviços; `Selected Work` será o próximo capítulo acrescentado.

## Movimento

- Cinco motivos: matéria em deslocamento, revelação por definição, capítulos, texto por recorte e resposta material.
- Scroll vertical como base; horizontal apenas quando narrativamente justificado.
- O loading combina a contenção tipográfica e o contador observados em Aristide Benoist com a revelação vertical da página observada no Raw Cereal. Ele preserva apenas o eco cursivo, `LUCAS SANTOS` e o contador sobre fundo liso; a composição inteira sai para cima como uma única superfície.
- Hero, projetos e Lab concentram intensidade.
- Mobile recebe uma versão própria e mais leve.
- O deslocamento horizontal foi aprovado como mecânica real da abertura.
- Planos em profundidade, ponte tipográfica, faixas, máscaras e entradas defasadas formam a base de movimento atual.
- A ponte `DA IDEIA À INTERFACE` usa somente a sequência pessoal como camada temporária, sem a antiga mídia abstrata: a silhueta começa a entrar pela lateral assim que o deslocamento horizontal se inicia, avança conforme os frames respondem ao scroll e se dissolve junto da frase apenas quando a segunda hero ocupa completamente a viewport. O enquadramento visual fica restrito ao personagem e as bordas do frame se fundem ao fundo do site, sem revelar seu quadrado preto. No mobile a sequência é reduzida; com movimento reduzido, permanece um frame estático apenas na ponte.
- As três mídias da primeira hero se desprendem da composição durante a ponte, atravessam por trás da silhueta em tempos diferentes e se encaixam nos três primeiros módulos da faixa superior da segunda hero. A faixa permanece parada até o encaixe terminar e então retoma o movimento ambiente. No mobile, a transferência usa somente duas mídias; com movimento reduzido, os cartões intermediários são removidos e as mídias permanecem em seus estados estáticos de origem e destino.
- A segunda hero completa o deslocamento horizontal antes do fim do trecho fixo e permanece integralmente enquadrada, sem transformar o título, por um estado prolongado. Depois desse trecho, o scroll vertical segue normalmente para serviços enquanto, como movimento secundário da saída, `SOFTWARE` desce e `ENGINEER` sobe até ocuparem a mesma altura central. A resposta tipográfica é suavizada entre atualizações do scroll. No mobile, as palavras também convergem, com redução de escala para preservar a leitura; com movimento reduzido, o título permanece estático.
- A passagem da abertura para Serviços usa um handoff editorial próprio: a cena final da hero não corta diretamente para a próxima seção; ela entrega para uma zona sticky curta com metadado, linhas de arquivo, fragmento de mídia técnica e chamada tipográfica para `Onde eu entro`. A referência Raw Cereal contribui com o princípio de intervalo narrativo entre capítulos, mas a execução usa conteúdo, paleta e matéria visual do Portfolio v2. No mobile o handoff é mais direto; com movimento reduzido, a composição fica estática.
- A animação não deve permanecer parada quando o usuário não rola: as mídias podem ter deriva contínua discreta, preservando legibilidade e desempenho.
- Imagens pessoais de referência podem ser usadas como matéria visual; a curadoria definitiva ainda depende da fotografia final.

## Implementação atual

- `app/page.tsx` é a entrada real do portfólio.
- `components/portfolio/` concentra a experiência principal aprovada.
- `/experiments/raw-cereal-hero` é somente uma rota temporária de compatibilidade e não define a arquitetura do produto.
- A seção inicial de serviços apresenta landing pages, sites institucionais e experiências sob medida; o texto ainda pode ser refinado sem alterar a estrutura aprovada.
- Os subtextos da abertura foram aprovados como uma progressão: a primeira cena apresenta o propósito do trabalho; a segunda detalha os tipos de entrega e prepara a entrada da seção de serviços.
- O CTA final aponta provisoriamente para o Instagram até a URL profissional do WhatsApp ser definida.

## Desempenho

- Experiência completa, adaptada e essencial.
- Conteúdo e contato não dependem de efeitos pesados.
- Métricas são metas de otimização, não censura estética automática.
- Todo custo relevante deve ter função, medição e fallback.

## Pendências que não devem ser inventadas

- Título profissional definitivo.
- Nome público definitivo entre Lucas Santos, NSNT ou combinação.
- Texto definitivo das seções e microcopy da navegação.
- Projetos selecionados e sua classificação.
- Primeiro case study completo.
- Famílias tipográficas finais.
- Stack de animação e eventual uso de WebGL.
- Número profissional e URL final do WhatsApp.

Atualize este arquivo somente quando uma decisão for realmente aprovada.
