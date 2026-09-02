# Kinetic title morph — v1

## Hipótese

Uma composição seletiva de famílias complementares pode levar `SOFTWARE / ENGINEER` por masters legíveis sem apagar a BBH Bogle que identifica a hero.

## Referência e princípio absorvido

- Referência: demonstração tipográfica Moonbeam registrada em vídeo por Lucas.
- Princípio: interpolar a construção de glifos entre masters legíveis, com transições curtas e pausas longas.
- Adaptação: BBH Bogle como repouso; Karrik como grotesca quebrada, PicNic como display orgânica, Fayte como neo-blackletter e Jabin somente no `S`; sem anel final.

## Implementação

- Rota: `/experiments/kinetic-title`.
- Estado inicial e final: BBH Bogle.
- Cada master altera somente os caracteres distribuídos pela referência; os demais permanecem exatamente no estado base.
- Estados alternativos usam contornos reais de Karrik, PicNic, Fayte e Jabin.
- Duração do loop: `6,4 s`, com pausas longas e transições curtas.
- Runtime: SVG/SMIL com paths compatíveis; nenhuma dependência de animação.
- Pausa automática fora da viewport e quando a aba fica oculta.
- Fallback: SVG estático com movimento reduzido.
- Semântica: o `h2` expõe `aria-label="Software Engineer"`; os SVGs são decorativos.

## Custo observado

- Dados de paths: aproximadamente `120 KB` antes da compressão do bundle.
- Nenhuma fonte adicional é enviada ao navegador.
- Nenhum canvas, WebGL ou atualização React por frame.

## Evidência visual

- Referência recortada: `docs/auditorias/assets/moonbeam-kinetic-title/`.
- Estados próprios e transições intermediárias: `tests/visual/kinetic-title/`.

## Decisão

A mecânica foi integrada à homepage. A aprovação final ainda depende da comparação do loop real em desktop, mobile e movimento reduzido.
