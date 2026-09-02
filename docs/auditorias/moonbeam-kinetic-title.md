# Auditoria — morph tipográfico Moonbeam

## Escopo

- Fonte observada: gravação local `2026-09-01 12-49-23.mp4`, fornecida por Lucas.
- Área analisada: somente a palavra animada; interface do navegador, OBS, mídia e composição da referência foram excluídos dos recortes.
- Uso permitido no projeto: auditoria visual e temporal. Os recortes não podem ser importados pelo produto nem participar do build.

## Recortes de controle

| Estado | Tempo aproximado | Evidência |
|---|---:|---|
| Inicial | `1,5 s` | [initial.jpg](assets/moonbeam-kinetic-title/initial.jpg) |
| Master A | `2,5 s` | [state-a.jpg](assets/moonbeam-kinetic-title/state-a.jpg) |
| Master B | `3,7 s` | [state-b.jpg](assets/moonbeam-kinetic-title/state-b.jpg) |
| Master C | `5,3 s` | [state-c.jpg](assets/moonbeam-kinetic-title/state-c.jpg) |

## Comportamento confirmado

- Não existe scramble de caracteres nem roleta vertical.
- A palavra atravessa composições tipográficas pré-definidas.
- Os glifos possuem estados intermediários contínuos; não é apenas um crossfade.
- Cada mudança principal dura aproximadamente `180–230 ms`.
- Os estados permanecem legíveis por aproximadamente `0,8–1,5 s`.
- O encerramento em anel observado na referência foi explicitamente descartado por Lucas.
- A versão do portfólio retorna à BBH Bogle e reinicia o ciclo depois de uma pausa.

## Adaptação própria

- A aplicação real usa `SOFTWARE / ENGINEER` com BBH Bogle como estado inicial e final do loop.
- Os masters intermediários usam contornos reais de Karrik, PicNic, Fayte e, somente no `S`, Jabin, normalizados pela altura da BBH Bogle.
- Caracteres não selecionados permanecem exatamente no estado base; não recebem deformação residual.
- As fontes de referência ficam restritas aos insumos locais de geração; o navegador recebe somente os paths SVG resultantes.
- Cada estado transforma duas letras por palavra. Karrik introduz a grotesca quebrada, PicNic cria o estado orgânico, Fayte produz a ruptura neo-blackletter e Jabin preserva o `S` caligráfico aprovado.
- A seleção é feita por letra, não somente por família: após igualar a altura, a largura aceita fica entre `0,8x` e `1,32x` da BBH Bogle correspondente.
- Os glifos preservam suas proporções reais. O gerador abre espaço entre vizinhos e recentraliza a composição, sem encolhimento repentino.
- Jabin fica restrita ao `S`, com reforço óptico e espaço próprio; sua complexidade impede distribuição segura em outros caracteres.
- O anel final foi descartado; o ciclo retorna ao estado inicial.
- Movimento reduzido mantém apenas o estado inicial estático.

## Evidência gerada

Os estados e pontos médios próprios são renderizados por `tools/render-kinetic-title-states.mjs` em `tests/visual/kinetic-title/`. A geração dos paths é determinística e está em `tools/generate-kinetic-title-paths.py`.

## Status

Experimento técnico disponível em `/experiments/kinetic-title` e integrado à homepage real. Os estados determinísticos foram renderizados novamente; a inspeção do movimento completo em navegador continua obrigatória antes da aprovação visual final.
