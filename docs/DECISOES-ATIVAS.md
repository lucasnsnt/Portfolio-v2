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
- A animação antiga foi escolhida como base do loading: eco cursivo, nome distorcido e revelação em sequência.
- Hero, projetos e Lab concentram intensidade.
- Mobile recebe uma versão própria e mais leve.
- O deslocamento horizontal foi aprovado como mecânica real da abertura.
- Planos em profundidade, ponte tipográfica, faixas, máscaras e entradas defasadas formam a base de movimento atual.
- A animação não deve permanecer parada quando o usuário não rola: as mídias podem ter deriva contínua discreta, preservando legibilidade e desempenho.
- Imagens pessoais de referência podem ser usadas como matéria visual; a curadoria definitiva ainda depende da fotografia final.

## Implementação atual

- `app/page.tsx` é a entrada real do portfólio.
- `components/portfolio/` concentra a experiência principal aprovada.
- `/experiments/raw-cereal-hero` é somente uma rota temporária de compatibilidade e não define a arquitetura do produto.
- A seção inicial de serviços apresenta landing pages, sites institucionais e experiências sob medida; o texto ainda pode ser refinado sem alterar a estrutura aprovada.
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
