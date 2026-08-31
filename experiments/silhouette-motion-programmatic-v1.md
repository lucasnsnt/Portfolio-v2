# Silhouette motion — tratamento programático v1

## Hipótese

Uma sequência estável e mais física pode ser obtida diretamente de
`frames-selected`, sem regenerar o retrato: o corpo real fornece a máscara e o
movimento; o tratamento fornece apenas luz de borda, matéria e ocultação.

## Referência e transformação

- Yannick Gregoire contribui com a ideia de uma figura mediada por sistema no
  loading, não com a técnica ASCII nem com a composição.
- A linguagem própria do projeto troca branco/preto puro por preto quente,
  bronze e creme envelhecido.
- O rosto não progride até a definição. A presença humana é comunicada por
  postura, cabelo, ombros e rotação da silhueta.

## Tratamento

1. Extrair uma máscara do corpo já isolado sobre preto.
2. Construir uma borda interna e externa a partir dessa máscara.
3. Manter o miolo da figura preto, incluindo todo o rosto.
4. Recuperar textura mínima apenas das regiões originalmente escuras, como
   cabelo e camiseta.
5. Adicionar um eco bronze curto e scanlines discretas, ambos derivados da
   mesma máscara para não introduzir fragmentos.

## Custo e adaptação

O processamento acontece antes do build. No navegador, o custo é equivalente
ao de reproduzir uma sequência WebP comum. Mobile pode usar metade dos frames ou
uma versão em vídeo. Com movimento reduzido, um único frame intermediário serve
como fallback.

## Comando reproduzível

```bash
python3 tools/generate-silhouette-motion.py \
  --input public/media/bridge/silhouette-motion/frames-selected \
  --output public/media/bridge/silhouette-motion/frames-silhouette-programmatic-v1
```

## Estado

Experimento isolado. Não substituir os frames usados pela homepage antes de
comparar a animação completa em desktop, mobile e movimento reduzido.
