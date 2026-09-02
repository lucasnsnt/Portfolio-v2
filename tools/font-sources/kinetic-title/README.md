# Fontes de geração — kinetic title

Estas fontes não são carregadas pelo produto. Elas existem somente para gerar os masters de contorno SVG do experimento tipográfico.

| Papel | Família | Origem |
|---|---|---|
| Estado inicial | BBH Bogle | Fonte principal existente do portfólio |
| Grotesca quebrada | Karrik Regular | Phantom Foundry / Velvetyne |
| Display orgânica | PicNic Regular | Marielle Nils / Velvetyne |
| Neo-blackletter | Fayte Regular Trial | That That Type / Type Department |
| Acento caligráfico | Jabin Regular | Kit tipográfico público das diretrizes Moonbeam |

Os arquivos em `moonbeam-brand/` são insumos locais de geração e não participam do bundle. Os contornos são normalizados para a altura da BBH Bogle; apenas os caracteres explicitamente listados em `ASSIGNMENTS` mudam em cada estado. As famílias OFL anteriores permanecem preservadas somente como material de comparação do experimento.

## Regras de compatibilidade com BBH Bogle

1. Igualar a altura óptica do master alternativo à altura da letra BBH correspondente.
2. Preservar a proporção real da fonte; não achatar nem estreitar o contorno para forçar compatibilidade.
3. Aplicar uma família preferencialmente em letras cuja largura normalizada fique entre `0,8x` e `1,32x` da largura da BBH. O `S` caligráfico é a exceção expressiva aprovada e recebe espaço próprio.
4. Alterar no máximo duas letras por palavra em cada master, sempre mantendo letras BBH como âncoras.
5. Não transformar duas letras vizinhas quando ambas ampliarem a largura da composição.
6. Exigir contraste reconhecível entre grotesca quebrada, display orgânica e neo-blackletter contemporânea; uma grotesca limpa semelhante não justifica um estado.
7. Evitar fontes com quantidade muito maior de contornos internos, pois os pontos intermediários do morph deixam de parecer uma letra.
8. Avaliar tanto o master completo quanto o ponto médio de cada transição; um estado final bonito não compensa uma interpolação ruim.
9. No `ENGINEER` contornado, preferir formas com esqueleto claro e serifas legíveis em traço fino.
10. O repouso e o retorno do loop permanecem exatamente em BBH Bogle.
11. O borrado aparece como halo secundário de baixa opacidade; o glifo principal permanece nítido.
