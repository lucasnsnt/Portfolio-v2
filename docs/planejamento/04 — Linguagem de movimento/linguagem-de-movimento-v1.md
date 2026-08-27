# Linguagem de movimento — versão 1

## 1. Papel do movimento

O movimento será parte estrutural da identidade do portfólio. Ele deve transmitir uma matéria digital viva, organizar a passagem entre capítulos e demonstrar domínio técnico sem transformar a navegação em um obstáculo.

### Princípio central

> Movimento com função: revelar, orientar, conectar ou responder.

A intensidade geral desejada é alta, próxima de **8/10**, mas distribuída de forma desigual. Hero, projetos e Lab concentram a experimentação; serviços, textos e informações comerciais preservam estabilidade e clareza.

## 2. Cinco motivos recorrentes

### 2.1 Matéria em deslocamento

Texturas, grão, camadas e fotografias se movem lentamente, como se o site estivesse vivo mesmo quando o visitante não interage.

Possíveis aplicações:

- Deriva quase imperceptível de textura no hero.
- Movimento interno lento em fotografias.
- Camadas com velocidades ligeiramente diferentes.
- Pequenas respostas à posição do cursor.
- Distorção atmosférica localizada.

O movimento contínuo deve ser sutil. Ele cria presença, não exige atenção.

### 2.2 Revelação por definição

Conteúdos surgem atravessando estados de imperfeição até alcançar clareza.

Sequência possível:

```text
ruído → retícula → desfoque → imagem definida
```

Pode ser acionada por:

- Entrada no campo de visão.
- Hover sobre um projeto.
- Abertura de um case study.
- Mudança de capítulo.
- Conclusão do carregamento inicial.

Esse motivo conecta diretamente a materialidade visual ao ato de descobrir o trabalho.

### 2.3 Deslocamento entre capítulos

Projetos serão tratados como capítulos, não como uma grade de cards independentes.

Comportamento recomendado:

- O projeto atual sai lateralmente ou em diagonal.
- O seguinte entra em camadas.
- Título, mídia e metadados podem se mover em tempos diferentes.
- A transição deve preservar a noção de direção e progresso.

O scroll vertical será a base do site. Deslocamento horizontal controlado poderá aparecer apenas em **Selected Work** e em galerias, onde fizer sentido narrativo.

### 2.4 Texto por recorte

Títulos e frases curtas podem ser revelados por máscaras, cortes e mudanças de escala.

Usos permitidos:

- Linhas que sobem por uma máscara.
- Títulos que atravessam a viewport.
- Alteração controlada de largura ou espaçamento.
- Metadados que entram em sequência.
- Palavras parcialmente cortadas pelas bordas.

Aplicar principalmente no hero, títulos de seção, nomes de projetos e chamada final. Textos longos devem permanecer estáveis.

### 2.5 Resposta material

A interface responde ao visitante de modo físico e discreto.

Exemplos:

- Links e setas sofrem pequenos deslocamentos.
- A imagem de um projeto ganha definição no hover.
- O CTA inverte contraste ou revela uma textura.
- Camadas próximas ao cursor mudam levemente de profundidade.
- Áreas experimentais podem apresentar distorção localizada.

A resposta deve confirmar que algo é interativo, não competir com a ação.

## 3. Entrada e carregamento inicial

A entrada ideal deve durar aproximadamente **0,8 a 1,4 segundo** quando os recursos essenciais já estiverem disponíveis.

Sequência inicial sugerida:

1. Fundo escuro e matéria visual começam a se formar.
2. Textura ou imagem ganha definição.
3. Nome ou assinatura aparece por recorte.
4. Posicionamento e navegação entram em seguida.
5. A composição assume o estado vivo do hero.

### Reaproveitamento da animação atual

A animação de entrada do portfólio existente é uma candidata importante para se tornar a base do loading inicial. Antes de redesenhá-la, será necessário analisar sua implementação, identificar o que já funciona e adaptar ritmo, paleta, tipografia e transição para o novo hero.

O objetivo não é preservar a animação exatamente como está, mas aproveitar seu código e sua ideia como matéria autoral já existente.

### Restrições

- Não criar uma tela obrigatória de “Enter”.
- Não prolongar a espera apenas para exibir a animação.
- Não usar loader falso quando a página já puder ser utilizada.
- A entrada deve poder ser encurtada ou ignorada em visitas recorrentes.
- Se o carregamento real demorar mais, a animação precisa continuar informando progresso sem formar um loop cansativo.

## 4. Transições entre páginas e projetos

A passagem de uma página para outra deve parecer uma continuidade da mesma matéria visual.

Vocabulário sugerido:

- A mídia selecionada amplia ou muda de enquadramento.
- O nome do projeto permanece durante parte da passagem.
- Textura cobre ou dissolve a composição.
- O contraste muda entre escuro e claro.
- Metadados são substituídos em sequência.

Uma transição pode combinar esses recursos, mas deve possuir um gesto principal claramente reconhecível.

## 5. Scroll e navegação

- Scroll vertical como comportamento principal.
- Suavização leve apenas quando contribuir para a continuidade visual.
- Scroll horizontal limitado a Selected Work ou galerias específicas.
- Nenhuma seção deve parecer presa ou lenta sem necessidade narrativa.
- Conteúdo essencial não pode depender de uma sequência precisa de scroll.
- A posição atual e a direção de navegação devem continuar compreensíveis.

## 6. Cursor e estados interativos

O cursor padrão será preservado na maior parte do site.

Estados contextuais possíveis:

- `VIEW` sobre projetos.
- `DRAG` em galerias arrastáveis.
- Setas de direção em navegação lateral.
- Pequena distorção em áreas visuais específicas.

Evitar um cursor circular persistente semelhante ao de Dennis Snellenberg. A mudança só deve acontecer quando comunicar uma ação real.

## 7. Escala temporal

| Tipo | Duração inicial |
|---|---:|
| Microinteração | 120–250 ms |
| Links e botões | 180–300 ms |
| Entrada de seção | 400–700 ms |
| Troca de projeto | 600–1000 ms |
| Transição de página | 800–1200 ms |
| Movimento ambiente | Contínuo e lento |

Os números são pontos de partida para prototipagem. O ritmo será calibrado no navegador, considerando distância, peso visual e intenção de cada gesto.

## 8. Distribuição de intensidade

| Área | Intensidade aproximada | Direção |
|---|---:|---|
| Navegação | 2/10 | Estável e imediata |
| Hero | 9/10 | Imersivo e autoral |
| Selected Work | 8/10 | Narrativo e cinematográfico |
| Serviços | 3/10 | Claro e comercial |
| Case study | 4/10 | Conteúdo em primeiro lugar |
| Lab | 9/10 | Campo livre de experimentação |
| Sobre | 5/10 | Revelação humana gradual |
| Processo | 5/10 | Movimento orientando etapas |
| Contato | 7/10 | Encerramento marcante |
| Página de links | 4/10 | Identidade preservada, acesso rápido |

### Orçamento de movimento

Cada seção terá:

- Um movimento principal.
- No máximo dois movimentos secundários simultâneos.
- Elementos de leitura estáveis ao redor deles.

Essa regra impede que todos os componentes disputem atenção.

## 9. Mobile e touch

- Nenhuma informação ou ação dependerá de hover.
- Parallax e quantidade de camadas serão reduzidos.
- Texturas e vídeos terão versões mais leves.
- Interações horizontais responderão claramente a gesto de toque.
- O cursor contextual será removido.
- Transições serão mais curtas.
- O hero manterá sua ideia, mas poderá usar uma composição específica para telas pequenas.

Mobile não será uma versão sem identidade; será uma interpretação mais direta da mesma linguagem.

## 10. Movimento reduzido e acessibilidade

Com `prefers-reduced-motion` ativo:

- Remover parallax contínuo e distorções ligadas ao cursor.
- Substituir movimentos amplos por opacidade ou mudanças instantâneas.
- Garantir que o conteúdo exista sem depender de animações de revelação.
- Evitar autoplay quando não for necessário para compreender o projeto.
- Manter foco, navegação por teclado e estados interativos claros.

## 11. Referências aplicadas

### Raw Cereal

Referência principal para ritmo, escala, transições entre projetos e alternância entre imersão e clareza.

### Tonami Komuro

Referência para distorção, matéria digital, shaders e respostas sutis ao cursor.

### Dennis Snellenberg

Referência para fluidez de navegação e clareza dos estados interativos, sem copiar o cursor persistente.

### Sania e Aristide Benoist

Referências para recortes tipográficos, entradas editoriais, sobreposição e movimento cinematográfico.

### Yannick Gregoire

Referência para sequenciamento de metadados e pequenos sinais de sistema, preservando a legibilidade.

## 12. Auditoria técnica futura

Antes da implementação definitiva, serão realizadas duas leituras diferentes.

### Portfólio atual de Lucas

Analisar integralmente o código disponível para:

- Isolar a animação de entrada atual.
- Identificar componentes, assets e interações reutilizáveis.
- Entender a solução bilíngue existente.
- Verificar decisões técnicas que vale preservar ou substituir.
- Registrar o que pertence à identidade anterior e o que pode evoluir.

### Sites de referência

Estudar o comportamento e a implementação pública das referências, começando por Raw Cereal, para:

- Decompor transições, sequências e regras de movimento.
- Identificar quais efeitos são CSS, vídeo, canvas, WebGL ou bibliotecas de animação.
- Medir ritmo, duração, easing e resposta ao scroll.
- Entender estratégias de desempenho e adaptação mobile.
- Recriar princípios técnicos em experimentos próprios e isolados.

Essa auditoria não autoriza copiar código proprietário, assets, composição ou identidade. O objetivo é compreender mecanismos e produzir uma implementação original, coerente com a direção definida neste estudo.

## 13. Decisões aprovadas

- Cinco motivos: matéria em deslocamento, revelação por definição, deslocamento entre capítulos, texto por recorte e resposta material.
- Scroll vertical como base.
- Horizontal apenas em Selected Work e galerias adequadas.
- Cursor padrão com estados contextuais localizados.
- Entrada curta, com possibilidade de adaptar a animação do portfólio atual.
- Maior intensidade no hero, projetos e Lab.
- Clareza e estabilidade em serviços, textos longos e conversão.
- Versão mobile simplificada, mas autoral.
- Suporte completo a movimento reduzido.
- Estudo técnico do portfólio antigo e das referências antes da implementação final.

## 14. Questões para prototipagem

- Qual parte da animação atual continuará reconhecível na nova entrada?
- A revelação do hero deve usar fotografia, textura abstrata ou ambas?
- Selected Work funciona melhor com capítulos verticais ou com uma faixa horizontal controlada?
- Quais efeitos exigem WebGL e quais podem ser resolvidos de maneira mais leve?
- A transição entre homepage e case study deve preservar mídia, título ou textura como elemento contínuo?
- Qual limite de movimento mantém o nível experimental sem reduzir a confiança comercial?
