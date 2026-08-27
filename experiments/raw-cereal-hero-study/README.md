# Experimento — hero em dois capítulos

## Objetivo

Testar uma abertura que converte scroll vertical em uma passagem horizontal curta: matéria visual primeiro, posicionamento profissional depois.

## Referência e princípio absorvido

Raw Cereal: uma cena imersiva conduz a uma cena informativa por meio de uma câmera sticky horizontal.

## Decisão própria

- Identidade visual quente e pós-digital.
- Primeira cena abstrata, sem reutilizar mídia externa.
- Segunda cena apresenta Lucas Santos, `Software Engineer`, oferta inicial e contato.
- Estrutura deliberadamente mais legível que a referência.
- Implementação nativa em React e CSS, sem GSAP nesta etapa.

## Movimento principal

Uma trilha vertical de 200vh controla o deslocamento de um frame com dois capítulos de 100vw.

## Mobile

Os capítulos se tornam verticais. A mudança de contexto continua por contraste, recorte e tipografia, sem scroll horizontal forçado.

## Fallback

Com `prefers-reduced-motion`, a hero abandona o sticky e apresenta as duas cenas em fluxo vertical.

## Conteúdo

O texto é provisório e serve apenas para validar hierarquia e clareza. Título profissional, assinatura e CTA finais continuam pendentes nos documentos do projeto.

## Rota de teste

`/experiments/raw-cereal-hero`

