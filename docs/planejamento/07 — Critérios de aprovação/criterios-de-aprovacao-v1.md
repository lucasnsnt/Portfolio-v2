# Critérios de aprovação

Uma entrega precisa cumprir todos os itens obrigatórios e preservar identidade e movimento com qualidade.

## Obrigatório

- Em poucos segundos, identificar Lucas, sua oferta, projetos e contato.
- Projetos e participação classificados com verdade; nenhum dado inventado.
- Referência, transformação e decisão própria explicáveis.
- Serviços e contato acessíveis sem atravessar efeitos desnecessários.
- Mobile com composição própria; teclado, foco, contraste e `prefers-reduced-motion` funcionais.
- Conteúdo essencial disponível sem animação, vídeo, canvas ou WebGL.
- Links e idiomas válidos; console sem erros visíveis.
- Dependências e reaproveitamento de código justificados.

## Qualidade

- Identidade pós-digital, quente, humana e reconhecível: mínimo 4/5.
- Movimento com função, intensidade variável e scroll previsível: mínimo 4/5.
- Ao menos um momento autoral e memorável demonstra capacidade técnica.

## Desempenho adaptativo

- Experiência completa em dispositivos capazes; adaptada em mobile/conexão limitada; essencial em movimento reduzido ou falha de efeito.
- Pausar animações fora da tela, priorizar conteúdo essencial e limitar loading ao estado real.
- Referências iniciais: LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1; desvios exigem medição e justificativa.

## Evidência de conclusão

```text
npm run check
+ renderização desktop e mobile inspecionada
+ fallback/reduced motion verificado
+ conteúdo factual conferido
```
