# Auditoria da sequência de silhueta da ponte

Status: proposta para aprovação antes do tratamento em lote.

## Fonte auditada

- Diretório: `public/media/bridge/silhouette-motion/frames-clean/`
- Total: 151 frames WebP, 1440 × 1440.
- Peso atual aproximado: 63 MB.
- Percurso: perfil à esquerda → passagem frontal → pose final à direita.

## Diagnóstico

- Não existe um trecho inteiro dispensável: a rotação é contínua e os extremos cumprem funções diferentes.
- A silhueta, o enquadramento e os ombros permanecem estáveis durante o percurso.
- As variações faciais intermediárias serão ocultadas pelo tratamento aprovado e não justificam criar saltos na rotação.
- O excesso está na densidade temporal de 30 fps, inadequada para uma sequência controlada por scroll e desnecessária para o tratamento visual.

## Seleção principal proposta

Manter 51 frames, com intervalo regular de três frames:

```text
0001, 0004, 0007, 0010, 0013, 0016, 0019, 0022, 0025, 0028,
0031, 0034, 0037, 0040, 0043, 0046, 0049, 0052, 0055, 0058,
0061, 0064, 0067, 0070, 0073, 0076, 0079, 0082, 0085, 0088,
0091, 0094, 0097, 0100, 0103, 0106, 0109, 0112, 0115, 0118,
0121, 0124, 0127, 0130, 0133, 0136, 0139, 0142, 0145, 0148,
0151
```

Peso atual desse conjunto antes do tratamento e da otimização: aproximadamente 21 MB.

## Subconjunto mobile proposto

Usar 26 frames do conjunto principal, com intervalo de seis frames:

```text
0001, 0007, 0013, 0019, 0025, 0031, 0037, 0043, 0049, 0055,
0061, 0067, 0073, 0079, 0085, 0091, 0097, 0103, 0109, 0115,
0121, 0127, 0133, 0139, 0145, 0151
```

O fallback de movimento reduzido deverá usar somente o frame final `0151` ou uma troca simples entre os extremos, sem scrubbing.

## Frames não selecionados

Os outros 100 frames ficam fora do tratamento principal por redundância temporal, não por defeito visual. Eles devem permanecer preservados em `frames-clean/` até a sequência tratada ser validada no navegador. Nenhum arquivo deve ser excluído antes dessa validação.

## Próximo portão

1. Aplicar o tratamento aprovado somente aos 51 frames selecionados.
2. Montar a sequência real na ponte tipográfica.
3. Comparar continuidade em desktop, mobile e movimento reduzido.
4. Ajustar a densidade somente se houver stepping perceptível.
5. Excluir ou arquivar os frames redundantes apenas depois da aprovação renderizada.
