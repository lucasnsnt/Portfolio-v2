# Experimento — mecânica de abertura em capítulos / estudo 02

## Objetivo

Reproduzir de forma neutra e mais fiel a densidade mecânica observada na abertura do Raw Cereal antes de aplicar a identidade definitiva do Portfolio v2.

## Referência e princípio absorvido

Raw Cereal: uma cena imersiva maior que a viewport conduz a uma cena informativa por meio de câmera sticky horizontal, intervalo entre capítulos, frase vertical, mídia em profundidade e faixas contínuas.

## Decisão própria

- Estética deliberadamente provisória e identificada como laboratório.
- Nenhum asset ou código da referência participa do experimento.
- Primeira cena com três planos de mídia simulada e mudança de enquadramento.
- Intervalo real entre capítulos com frase dividida em movimentos opostos.
- Segunda cena com duas faixas de mídia, máscaras tipográficas e entradas defasadas.
- Eventos de cor localizados nas mídias, mantendo o sistema ao redor neutro.
- Implementação nativa em React e CSS, sem GSAP nesta etapa.

## Movimento principal

Uma trilha vertical de 300vh controla um frame de 260vw: abertura de 130vw, intervalo de 30vw e arquivo final de 100vw.

O progresso é dividido em quatro sinais independentes:

```text
progresso global
→ entrada da ponte
→ revelação do arquivo
→ estabilização de conteúdo e CTA
```

## Mobile

O gesto horizontal permanece controlado pelo scroll vertical, com tipografia, planos e faixas redimensionados. Nenhuma interação depende de hover.

## Fallback

Com `prefers-reduced-motion`, a câmera abandona o sticky, as cenas entram em fluxo vertical e os marquees deixam de se mover.

## Conteúdo

Todo texto, cor de mídia e composição é provisório. Esta rota valida apenas coreografia, profundidade, ritmo, legibilidade durante o deslocamento e custo técnico.

## Diferença em relação ao estudo 01

O primeiro estudo tinha apenas o deslocamento do frame e pequenas transformações decorativas. O estudo 02 adiciona:

- parallax entre planos;
- alteração de escala e saturação;
- sobreposição progressiva;
- ponte tipográfica dividida;
- mídia da próxima cena antecipada;
- dois marquees em sentidos contrários;
- máscara de entrada do título;
- conteúdo e CTA estabilizados depois da mídia;
- indicador real de progresso.

## Rota de teste

`/experiments/raw-cereal-hero`
