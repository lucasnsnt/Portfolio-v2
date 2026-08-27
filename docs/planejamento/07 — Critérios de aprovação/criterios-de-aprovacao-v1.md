# Critérios de aprovação — versão 1

## 1. Sistema de avaliação

Cada protótipo será avaliado em três níveis:

- **Obrigatório:** se falhar, não pode ser aprovado.
- **Qualidade:** deve atingir pelo menos 4 de 5.
- **Diferencial:** confirma que a solução possui identidade própria.

Os critérios orientam decisões, mas não substituem julgamento visual. Em um projeto experimental, desempenho, clareza e expressão serão equilibrados conforme a função de cada seção.

## 2. Clareza — obrigatório

Em poucos segundos, o visitante deve entender:

- Quem é Lucas.
- Que ele desenvolve sites e soluções digitais.
- Que trabalha como freelancer.
- Como visualizar projetos.
- Como solicitar um orçamento.

Nenhum efeito pode esconder navegação, texto ou ação importante.

## 3. Identidade — qualidade mínima 4/5

O protótipo deve transmitir:

- Materialidade pós-digital.
- Paleta quente e escura.
- Sensação jovem e alternativa.
- Presença humana.
- Equilíbrio entre precisão técnica e imperfeição visual.

Pergunta de controle:

> Se o nome de Lucas pudesse ser trocado pelo de qualquer desenvolvedor sem alterar o site, a identidade ainda está genérica.

## 4. Referências e originalidade — obrigatório

Para cada seção, devemos conseguir responder:

- Qual referência contribuiu?
- Qual princípio foi absorvido?
- Como ele foi transformado?
- O que existe de próprio nessa solução?

O resultado não pode reproduzir integralmente composição, assets, código ou transições de uma referência.

## 5. Conteúdo e credibilidade — obrigatório

- Projetos classificados corretamente.
- Nenhuma métrica, contratação ou depoimento inventado.
- Serviços compreensíveis.
- Textos específicos e sem frases genéricas.
- Português e inglês revisados separadamente.
- Participação de Lucas explicada nos projetos.

## 6. Movimento — qualidade mínima 4/5

- Cada animação revela, orienta, conecta ou responde.
- Uma ação principal por seção.
- Intensidade variável ao longo da página.
- Entrada inicial curta e funcional.
- Scroll previsível.
- Conteúdo utilizável sem animações.
- Nenhum movimento existe apenas para preencher espaço.

## 7. Conversão — obrigatório

O visitante deve conseguir:

- Identificar os serviços.
- Encontrar o WhatsApp rapidamente.
- Entender como funciona uma contratação.
- Perceber que existe uma pessoa real por trás do trabalho.
- Chegar ao contato sem atravessar interações desnecessárias.

## 8. Desktop, mobile e acessibilidade — obrigatório

- Mobile possui composição própria.
- Nenhuma ação depende exclusivamente de hover.
- Navegação por teclado funciona.
- Contraste e tamanhos permanecem legíveis.
- `prefers-reduced-motion` é respeitado.
- Foco e estados interativos são visíveis.
- Texto importante não existe apenas dentro de imagens.

A adaptação mobile é prioritária e não será tratada como correção posterior.

## 9. Desempenho adaptativo

O portfólio pode aceitar um custo maior de processamento ou carregamento quando ele sustentar uma decisão visual importante. Esse custo deve ser medido, justificado e acompanhado por uma alternativa mais leve.

### 9.1 Experiência completa

Para desktop e dispositivos capazes:

- Texturas vivas.
- WebGL ou canvas quando necessário.
- Transições completas.
- Mídia em maior definição.
- Maior quantidade de camadas.

### 9.2 Experiência adaptada

Para mobile, conexão limitada ou dispositivos menos potentes:

- Menos partículas e camadas.
- Canvas com resolução limitada.
- Vídeos e texturas mais leves.
- Movimentos simplificados.
- Substituição de efeitos pesados por versões visuais equivalentes.

### 9.3 Experiência essencial

Para movimento reduzido, falha de WebGL ou condições inadequadas:

- Conteúdo, projetos, navegação e contato disponíveis.
- Imagem ou vídeo como fallback de shaders.
- Transições simples.
- Identidade preservada por tipografia, composição, cor e assets.

### Obrigatório para aprovação

- Navegação e contato nunca bloqueados pelos efeitos.
- Ausência de travamentos persistentes.
- Mobile utilizável e visualmente coerente.
- Fallback para efeitos incompatíveis ou pesados.
- Animações pausadas quando estiverem fora da tela.
- Conteúdo essencial priorizado no carregamento.
- Loading relacionado ao estado real da página.

### Metas técnicas

Core Web Vitals e medições de frame rate serão metas de otimização, não regras automáticas para remover decisões visuais relevantes.

Referência inicial:

- LCP próximo ou inferior a 2,5 segundos.
- INP próximo ou inferior a 200 ms.
- CLS próximo ou inferior a 0,1.

Os valores serão avaliados em aparelhos e conexões representativos. Caso uma meta não seja atingida, será necessário entender o impacto real e justificar o compromisso antes da aprovação.

## 10. Loading inicial

A animação de entrada do portfólio atual será analisada como base para o loading da nova experiência.

### Função

- Introduzir a identidade.
- Cobrir o carregamento do conteúdo essencial.
- Preparar o primeiro estado visual do hero.
- Evitar que mídia ou efeitos apareçam incompletos.

### Sequência recomendada

```text
início da animação
→ carregamento de navegação, tipografia e primeiro estado do hero
→ entrada do site já funcional
→ carregamento progressivo das partes pesadas restantes
```

### Critérios

- O loading não deve esperar por toda a página.
- A animação não deve prolongar artificialmente a espera.
- Deve existir um tempo máximo e uma saída segura.
- Em visitas recorrentes, poderá ser encurtado ou omitido.
- Se um efeito pesado falhar, o site deve abrir com seu fallback.
- O visitante deve receber uma primeira tela completa, e não uma composição quebrada enquanto assets essenciais chegam.

## 11. Qualidade técnica — obrigatório

- Componentes possuem funções claras.
- Código antigo só é reaproveitado após análise.
- Dependências são adicionadas com justificativa.
- Não existem erros visíveis no navegador.
- Links, idiomas e canais de contato funcionam.
- Comportamento consistente nos navegadores definidos para o projeto.
- Efeitos experimentais estão isolados o suficiente para serem substituídos ou simplificados.

## 12. Diferencial

Para ser considerado realmente forte, o protótipo deve possuir pelo menos um momento que:

- Seja reconhecível como parte da identidade de Lucas.
- Demonstre capacidade técnica.
- Seja lembrado depois da visita.
- Não dependa apenas das referências para funcionar.

## 13. Regra final

Uma seção será aprovada quando:

```text
cumprir todos os critérios obrigatórios
+ atingir 4/5 em identidade
+ atingir 4/5 em movimento
+ possuir uma decisão autoral explicável
+ funcionar em sua versão mobile ou adaptada
```

## 14. Fontes técnicas

- Core Web Vitals: https://web.dev/articles/defining-core-web-vitals-thresholds
- Three.js, responsive design e resolução interna: https://threejs.org/manual/en/responsive.html
- MDN, prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion
- MDN, otimização de animações: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS

## 15. Resumo

> O site não precisa ter o peso de uma página estática. Ele precisa abrir de forma confiável, adaptar sua complexidade e preservar a mesma identidade mesmo quando os efeitos mais pesados forem reduzidos.

Bonito não basta: cada entrega deve ser clara, verdadeira, original, funcional e reconhecível como parte do universo de Lucas.
