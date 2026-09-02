# Biblioteca visual

Esta área reúne matéria-prima e derivações visuais antes de qualquer asset ser aprovado para o produto.

```text
assets/
├── curated/            # seleção dos acervos fornecidos por Lucas
├── external-sources/   # arquivos externos com origem e licença verificadas
└── derived/            # transformações autorais produzidas para o portfólio
```

Nada dentro de `assets/` é servido automaticamente pelo site. Somente uma derivação aprovada, otimizada e copiada deliberadamente para `public/` pode entrar no produto.

## Fluxo

1. Registrar a fonte no manifesto correspondente.
2. Guardar o original sem alterações na categoria adequada.
3. Criar transformações somente dentro de `derived/`.
4. Validar função, direitos, exposição de dados, desktop, mobile e movimento reduzido.
5. Promover para `public/` apenas a versão final necessária.

