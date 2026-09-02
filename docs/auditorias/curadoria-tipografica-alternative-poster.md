# Curadoria tipográfica — pôster alternativo

## Referências fornecidas

As imagens em `/home/lucas/Desktop/fontes` definem a direção por quatro comportamentos recorrentes:

- grotesca desenhada à mão, quebrada mas legível;
- display orgânica, arredondada e inflada;
- neo-blackletter geométrica, condensada e contemporânea;
- matéria gráfica aplicada depois do desenho: xerox, halftone, blur e falha de impressão.

A direção não é gótico histórico, serifada editorial nem grotesca minimalista. A mistura deve parecer proveniente de flyers musicais, zines e pôsteres alternativos recentes.

## Régua de compatibilidade

BBH Bogle permanece como estado inicial e final. Para um master alternativo entrar no loop:

1. sua altura óptica é igualada à letra BBH correspondente;
2. sua proporção original é preservada;
3. a largura por caractere deve ficar preferencialmente entre `0,8x` e `1,32x` da BBH;
4. exceções precisam ter espaço reservado e função visual aprovada;
5. no máximo duas letras mudam em cada palavra por estado;
6. famílias largas não são aplicadas a caracteres vizinhos;
7. o master e o ponto médio da interpolação precisam continuar reconhecíveis;
8. o contorno de `ENGINEER` precisa manter um esqueleto legível;
9. blur e halftone são camadas secundárias; a forma principal não perde definição.

## Famílias avaliadas

### Karrik — selecionada

- Função: grotesca quebrada e vernacular.
- Melhor encaixe: `E 1,06x`, `F 1,03x`, `N 1,24x`, `S 1,32x`, `T 1,21x`.
- Origem: Phantom Foundry / Velvetyne, open source.
- Absorve das referências a irregularidade da Broke Grotesk sem simular desgaste dentro do contorno.

### PicNic — selecionada

- Função: estado arredondado, orgânico e grunge.
- Melhor encaixe: `S 1,28x`, `G 1,25x`, `I 1,19x`.
- Origem: Marielle Nils / Velvetyne, licença livre incluída nos arquivos.
- Aproxima o vocabulário de Drömmer e Gruner sem copiar suas formas.

### Fayte Trial — selecionada

- Função: neo-blackletter geométrica.
- Melhor encaixe: `A 0,85x`, `E 0,76x`, `F 0,89x`, `G 1,03x`, `N 0,92x`, `R 0,85x`, `S 1,08x`.
- Origem: trial oficial de That That Type / Type Department.
- É a família mais compatível metricamente com a BBH e a que produz a maior mudança de linguagem.

### Jabin — selecionada como exceção

- Função: `S` caligráfico e espaçado aprovado durante a iteração.
- Recebe reforço óptico leve e espaço próprio.
- Não é distribuída em outras letras porque sua complexidade de contornos prejudica a interpolação.

### Pilowlava — não selecionada

- Linguagem compatível, mas quase todas as maiúsculas ficam entre `1,77x` e `2,71x` da largura BBH.
- Exigiria compressão artificial ou mudança excessiva da composição.

### Le Murmure — não selecionada

- Boa condensação para pôster, porém a maioria das letras ocupa somente `0,49x–0,68x` da BBH.
- Criaria o encolhimento repentino já rejeitado.

## Distribuição aprovada para teste

```text
SOFTWARE
estado 1: S / Jabin, E / Karrik
estado 2: F / Karrik, R / PicNic
estado 3: T / Fayte, A / Fayte

ENGINEER
estado 1: E / Karrik, I / PicNic
estado 2: G / PicNic, E / Fayte
estado 3: N / Karrik, R / Fayte
```

O loop retorna integralmente à BBH Bogle.
